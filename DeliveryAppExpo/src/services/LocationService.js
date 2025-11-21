import Geolocation from 'react-native-geolocation-service';
import { Alert, Platform, PermissionsAndroid } from 'react-native';

class LocationService {
  // Request location permission
 requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location to provide delivery services.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true; // iOS handles permissions differently
  };

  // Get current location
  getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      this.requestLocationPermission().then(hasPermission => {
        if (!hasPermission) {
          reject(new Error('Location permission not granted'));
          return;
        }

        Geolocation.getCurrentPosition(
          (position) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              accuracy: position.coords.accuracy,
            });
          },
          (error) => {
            reject(error);
          },
          {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 10000,
          }
        );
      });
    });
  };

  // Watch position for real-time tracking
  watchPosition = (callback) => {
    return new Promise((resolve, reject) => {
      this.requestLocationPermission().then(hasPermission => {
        if (!hasPermission) {
          reject(new Error('Location permission not granted'));
          return;
        }

        const watchId = Geolocation.watchPosition(
          (position) => {
            callback({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              accuracy: position.coords.accuracy,
            });
          },
          (error) => {
            reject(error);
          },
          {
            enableHighAccuracy: true,
            distanceFilter: 10, // Update every 10 meters
            interval: 5000, // Update every 5 seconds
            fastestInterval: 2000, // Fastest update every 2 seconds
          }
        );
        
        resolve(watchId);
      });
    });
  };

  // Clear watch
  clearWatch = (watchId) => {
    Geolocation.clearWatch(watchId);
  };

  // Calculate distance between two points (in kilometers)
  calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = this.toRadians(lat2 - lat1);
    const dLon = this.toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1)) *
      Math.cos(this.toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
  };

  // Convert degrees to radians
  toRadians = (degrees) => {
    return degrees * (Math.PI / 180);
  };

  // Estimate delivery time based on distance (in minutes)
  estimateDeliveryTime = (distance) => {
    // Assuming average speed of 20 km/h
    const timeInHours = distance / 20;
    const timeInMinutes = timeInHours * 60;
    // Add some buffer time for stops, traffic, etc.
    return Math.round(timeInMinutes * 1.3);
  };
}

export default new LocationService();
