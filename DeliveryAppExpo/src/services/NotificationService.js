import { Alert, Platform } from 'react-native';
import PushNotification from 'react-native-push-notification';

class NotificationService {
  constructor() {
    this.configure();
  }

 configure = () => {
    PushNotification.configure({
      // (required) Called when a remote or local notification is opened or received
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
      },

      // Should the initial notification be popped automatically
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       */
      requestPermissions: true,
    });

    // Create a default channel for Android
    if (Platform.OS === 'android') {
      PushNotification.createChannel(
        {
          channelId: 'delivery-channel', // (required)
          channelName: 'Delivery Notifications', // (required)
          channelDescription: 'Notifications for delivery orders', // (optional) default: undefined
          playSound: true, // (optional) default: true
          soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
          importance: 4, // (optional) default: 4
          vibrate: true, // (optional) default: true
        },
        (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed
      );
    }
  };

  // Schedule a local notification for a new order
  scheduleOrderNotification = (order) => {
    PushNotification.localNotification({
      channelId: 'delivery-channel',
      title: 'New Order Available!',
      message: `Order from ${order.customerName} - ${order.distance} away`,
      bigText: `New order details:\nCustomer: ${order.customerName}\nAddress: ${order.customerAddress}\nPrice: ${order.price} EGP\nDistance: ${order.distance}`,
      playSound: true,
      soundName: 'default',
      actions: '["Accept", "Ignore"]', // Android only
    });
  };

  // Schedule a notification for close orders
  scheduleCloseOrderNotification = (order) => {
    PushNotification.localNotification({
      channelId: 'delivery-channel',
      title: 'Close Order Available!',
      message: `Order from ${order.customerName} is ${order.distance} away`,
      bigText: `Close order available:\nCustomer: ${order.customerName}\nAddress: ${order.customerAddress}\nPrice: ${order.price} EGP\nDistance: ${order.distance}\nEstimated Time: ${order.estimatedTime}`,
      playSound: true,
      soundName: 'default',
      actions: '["Accept", "Ignore"]', // Android only
    });
 };

  // Schedule a notification for order updates
  scheduleOrderUpdateNotification = (orderId, status, message) => {
    PushNotification.localNotification({
      channelId: 'delivery-channel',
      title: `Order ${orderId} Update`,
      message: message,
      playSound: true,
      soundName: 'default',
    });
  };

  // Clear all notifications
  clearAllNotifications = () => {
    PushNotification.cancelAllLocalNotifications();
  };
}

export default new NotificationService();
