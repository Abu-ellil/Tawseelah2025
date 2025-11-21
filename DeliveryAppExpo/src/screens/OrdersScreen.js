import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, Linking } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useOrderContext } from '../context/OrderContext';
import NotificationService from '../services/NotificationService';
import LocationService from '../services/LocationService';

export default function OrdersScreen() {
  const { orders, acceptOrder } = useOrderContext();
  const [currentLocation, setCurrentLocation] = useState(null);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  // Initialize location and notifications
  useEffect(() => {
    // Get current location to determine close orders
    LocationService.getCurrentLocation()
      .then(location => {
        setCurrentLocation(location);
        
        // Check for close orders and send notifications
        checkCloseOrders(location);
      })
      .catch(error => {
        console.log('Location error:', error);
        // If location fails, still load orders
        checkCloseOrders(null);
      });
  }, []);

  // Check for close orders and send notifications
  const checkCloseOrders = (currentLoc) => {
    orders.forEach(order => {
      if (order.status === 'available' && currentLoc) {
        const distance = LocationService.calculateDistance(
          currentLoc.latitude,
          currentLoc.longitude,
          order.customerLocation.latitude,
          order.customerLocation.longitude
        );
        
        // If order is within 3km, send notification
        if (distance <= 3) {
          NotificationService.scheduleCloseOrderNotification({
            ...order,
            distance: `${distance.toFixed(1)} km`,
            estimatedTime: `${LocationService.estimateDeliveryTime(distance)} min`
          });
        }
      }
    });
  };

  const handleAcceptOrder = (orderId, customPrice = null) => {
    const order = orders.find(order => order.id === orderId);
    const price = customPrice !== null ? customPrice : order.price;
    
    Alert.prompt(
      'Accept Order',
      `Do you want to accept this order for ${price} EGP? You can modify the price if needed.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Accept', 
          onPress: (inputPrice) => {
            const newPrice = inputPrice ? parseFloat(inputPrice) : price;
            if (inputPrice && isNaN(newPrice)) {
              Alert.alert('Error', 'Please enter a valid price');
              return;
            }
            
            // Use the context to accept the order with the new price
            acceptOrder(orderId, newPrice || price);
            
            Alert.alert(
              'Order Accepted', 
              `Order accepted with price ${newPrice || price} EGP`,
              [
                { text: 'OK' },
                { 
                  text: 'View on Map', 
                  onPress: () => navigation.navigate('Map') 
                }
              ]
            );
          }
        },
      ],
      'plain-text',
      customPrice ? customPrice.toString() : price.toString()
    );
  };

  const handleCallCustomer = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <Text style={styles.customerName}>{item.customerName}</Text>
        <Text style={styles.price}>{item.price} EGP</Text>
      </View>
      <Text style={styles.address}>{item.customerAddress}</Text>
      <Text style={styles.details}>{item.orderDetails}</Text>
      <View style={styles.orderFooter}>
        <Text style={styles.distance}>{item.distance}</Text>
        <Text style={styles.time}>{item.estimatedTime}</Text>
        {item.status === 'available' ? (
          <>
            <TouchableOpacity 
              style={styles.acceptButton} 
              onPress={() => handleAcceptOrder(item.id)}
            >
              <Text style={styles.acceptButtonText}>Accept Order</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.callButton} 
              onPress={() => handleCallCustomer(item.customerPhone)}
            >
              <Text style={styles.callButtonText}>Call</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.statusText}>
            {item.status === 'accepted' ? 'Accepted' : 'Completed'}
          </Text>
        )}
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.title}>Available Orders</Text>
      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
 );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
 title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
  },
  listContent: {
    paddingHorizontal: 15,
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  customerName: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  address: {
    fontSize: 14,
    color: '#66',
    marginBottom: 5,
  },
  details: {
    fontSize: 14,
    color: '#88',
    marginBottom: 10,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  distance: {
    fontSize: 14,
    color: '#66',
  },
  time: {
    fontSize: 14,
    color: '#666',
  },
  acceptButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
    marginRight: 5,
 },
  acceptButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  callButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  callButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  statusText: {
    fontSize: 14,
    color: '#666',
    fontWeight: 'bold',
  },
});
