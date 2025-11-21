import React from 'react';
import { View, Text, StyleSheet, ScrollView, Switch } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useOrderContext } from '../context/OrderContext';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { orderHistory } = useOrderContext();

  // Calculate stats from order history
  const totalEarnings = orderHistory.reduce((sum, order) => sum + order.price, 0);
  const completedOrders = orderHistory.length;
  const avgRating = 4.8; // This would typically come from a rating system

  // Driver info
  const [isOnline, setIsOnline] = React.useState(true);

  return (
    <ScrollView style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <Text style={styles.title}>Driver Profile</Text>
      
      {/* Profile Card */}
      <View style={styles.profileCard}>
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>MA</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Mohamed Ali</Text>
            <Text style={styles.profileRating}>{avgRating} ★</Text>
          </View>
        </View>
        
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>Online Status</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isOnline ? "#2196F3" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setIsOnline}
            value={isOnline}
          />
          <Text style={[styles.statusValue, isOnline ? styles.online : styles.offline]}>
            {isOnline ? 'Online' : 'Offline'}
          </Text>
        </View>
      </View>

      {/* Stats Card */}
      <View style={styles.statsCard}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{completedOrders}</Text>
          <Text style={styles.statLabel}>Completed Orders</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{totalEarnings} EGP</Text>
          <Text style={styles.statLabel}>Total Earnings</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{avgRating}</Text>
          <Text style={styles.statLabel}>Avg. Rating</Text>
        </View>
      </View>

      {/* Driver Details */}
      <View style={styles.detailsCard}>
        <Text style={styles.detailsTitle}>Driver Details</Text>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Phone:</Text>
          <Text style={styles.detailValue}>+201234567890</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Vehicle:</Text>
          <Text style={styles.detailValue}>Car - ABC 1234</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>License:</Text>
          <Text style={styles.detailValue}>LIC-7890</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Joined:</Text>
          <Text style={styles.detailValue}>Jan 15, 2024</Text>
        </View>
      </View>

      {/* Settings */}
      <View style={styles.settingsCard}>
        <Text style={styles.detailsTitle}>Settings</Text>
        
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Notifications</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={true ? "#2196F3" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            value={true}
          />
        </View>
        
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Location Sharing</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={true ? "#2196F3" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            value={true}
          />
        </View>
        
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Close Orders Only</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={false ? "#2196F3" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            value={false}
          />
        </View>
      </View>
    </ScrollView>
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
  profileCard: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 15,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileRating: {
    fontSize: 16,
    color: '#FF9800',
    fontWeight: 'bold',
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  statusValue: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  online: {
    color: '#4CAF50',
  },
  offline: {
    color: '#F44336',
  },
  statsCard: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  statLabel: {
    fontSize: 14,
    color: '#66',
    marginTop: 5,
    textAlign: 'center',
  },
  detailsCard: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 15,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  detailValue: {
    fontSize: 16,
    color: '#666',
  },
  settingsCard: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 15,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
 },
});
