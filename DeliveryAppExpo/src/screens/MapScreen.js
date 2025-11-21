import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useOrderContext } from '../context/OrderContext';
import LocationService from '../services/LocationService';

export default function MapScreen() {
  const { activeOrder, updateOrderStatus, completeOrder } = useOrderContext();
  const [region, setRegion] = useState({
    latitude: 30.0444, // Cairo coordinates
    longitude: 31.2357,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 30.0444,
    longitude: 31.2357,
  });
  const [watchId, setWatchId] = useState(null);
  const [distance, setDistance] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(0);
  
  const insets = useSafeAreaInsets();

  // Start watching location when component mounts
  useEffect(() => {
    if (activeOrder) {
      startLocationTracking();
      
      // Calculate initial distance and time
      const initialDistance = LocationService.calculateDistance(
        currentLocation.latitude,
        currentLocation.longitude,
        activeOrder.customerLocation.latitude,
        activeOrder.customerLocation.longitude
      );
      setDistance(initialDistance.toFixed(1));
      setEstimatedTime(LocationService.estimateDeliveryTime(initialDistance));
    }
    
    // Cleanup on unmount
    return () => {
      if (watchId) {
        LocationService.clearWatch(watchId);
      }
    };
  }, [activeOrder]);

  const startLocationTracking = async () => {
    if (!activeOrder) return;
    
    try {
      const id = await LocationService.watchPosition((newLocation) => {
        setCurrentLocation(newLocation);
        
        // Update map region to follow user
        setRegion({
          latitude: newLocation.latitude,
          longitude: newLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
        
        // Recalculate distance and time to customer location
        const newDistance = LocationService.calculateDistance(
          newLocation.latitude,
          newLocation.longitude,
          activeOrder.customerLocation.latitude,
          activeOrder.customerLocation.longitude
        );
        setDistance(newDistance.toFixed(1));
        setEstimatedTime(LocationService.estimateDeliveryTime(newDistance));
      });
      
      setWatchId(id);
    } catch (error) {
      console.log('Location tracking error:', error);
      Alert.alert('Error', 'Could not start location tracking');
    }
  };

  const handleNavigate = () => {
    Alert.alert('Navigation', 'Starting navigation to destination');
  };

  const handleUpdateStatus = (status) => {
    if (activeOrder) {
      updateOrderStatus(activeOrder.id, status);
      Alert.alert('Status Updated', `Order status updated to: ${status}`);
    } else {
      Alert.alert('No Active Order', 'Please accept an order first');
    }
  };

  const handleCompleteOrder = () => {
    if (activeOrder) {
      completeOrder(activeOrder.id);
      Alert.alert('Order Completed', 'Order has been marked as completed');
    } else {
      Alert.alert('No Active Order', 'Please accept an order first');
    }
  };

  // Get customer location from active order
  const customerLocation = activeOrder ? activeOrder.customerLocation : {
    latitude: 30.0644,
    longitude: 31.2557,
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <Text style={styles.title}>Delivery Map</Text>
      <View style={styles.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={region}
          onRegionChange={setRegion}
        >
          <Marker
            coordinate={currentLocation}
            title="Your Location"
            description="Current position"
            pinColor="blue"
          />
          <Marker
            coordinate={customerLocation}
            title="Destination"
            description="Customer location"
            pinColor="red"
          />
        </MapView>
        <View style={styles.infoPanel}>
          <Text style={styles.infoText}>Distance: {distance} km</Text>
          <Text style={styles.infoText}>Estimated Time: {estimatedTime} min</Text>
          {activeOrder && (
            <>
              <Text style={styles.infoText}>Customer: {activeOrder.customerName}</Text>
              <Text style={styles.infoText}>Order: {activeOrder.orderDetails}</Text>
            </>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleNavigate}>
            <Text style={styles.buttonText}>Start Navigation</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.statusButton]} 
            onPress={() => handleUpdateStatus('on the way')}
          >
            <Text style={styles.buttonText}>On the Way</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.completeButton]} 
            onPress={handleCompleteOrder}
          >
            <Text style={styles.buttonText}>Complete</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    marginVertical: 10,
  },
  mapContainer: {
    flex: 1,
    margin: 10,
  },
  map: {
    flex: 1,
    borderRadius: 10,
  },
  infoPanel: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 10,
    borderRadius: 5,
    zIndex: 1,
  },
  infoText: {
    fontSize: 14,
    marginVertical: 2,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 1,
  },
  button: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
  },
  statusButton: {
    backgroundColor: '#FF9800',
  },
  completeButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
