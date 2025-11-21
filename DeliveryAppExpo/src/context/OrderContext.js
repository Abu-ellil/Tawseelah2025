import React, { createContext, useContext, useReducer } from 'react';

// Initial state
const initialState = {
 orders: [
    {
      id: '1',
      customerName: 'Ahmed Mohamed',
      customerAddress: '123 Main Street, Cairo',
      customerPhone: '+201234567890',
      orderDetails: 'Food delivery',
      price: 150,
      distance: '2.5 km',
      estimatedTime: '15 min',
      status: 'available', // available, accepted, picked_up, delivered, completed
      customerLocation: {
        latitude: 30.0444,
        longitude: 31.2357,
      },
    },
    {
      id: '2',
      customerName: 'Fatima Ali',
      customerAddress: '456 Nile Street, Giza',
      customerPhone: '+201234567891',
      orderDetails: 'Grocery delivery',
      price: 200,
      distance: '3.2 km',
      estimatedTime: '20 min',
      status: 'available',
      customerLocation: {
        latitude: 30.0644,
        longitude: 31.2557,
      },
    },
    {
      id: '3',
      customerName: 'Omar Hassan',
      customerAddress: '789 Pyramids Street, Giza',
      customerPhone: '+201234567892',
      orderDetails: 'Document delivery',
      price: 75,
      distance: '1.8 km',
      estimatedTime: '12 min',
      status: 'available',
      customerLocation: {
        latitude: 30.0844,
        longitude: 31.2757,
      },
    },
  ],
  activeOrder: null,
  orderHistory: [],
};

// Action types
const actionTypes = {
  ACCEPT_ORDER: 'ACCEPT_ORDER',
  UPDATE_ORDER_STATUS: 'UPDATE_ORDER_STATUS',
  SET_ACTIVE_ORDER: 'SET_ACTIVE_ORDER',
  COMPLETE_ORDER: 'COMPLETE_ORDER',
  ADD_ORDER: 'ADD_ORDER',
  UPDATE_ORDER_PRICE: 'UPDATE_ORDER_PRICE',
};

// Reducer
const orderReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ACCEPT_ORDER:
      const updatedOrders = state.orders.map(order =>
        order.id === action.payload.orderId
          ? { ...order, status: 'accepted', price: action.payload.price }
          : order
      );
      
      const acceptedOrder = updatedOrders.find(order => order.id === action.payload.orderId);
      
      return {
        ...state,
        orders: updatedOrders,
        activeOrder: acceptedOrder,
      };

    case actionTypes.UPDATE_ORDER_STATUS:
      // Update in orders list
      const updatedOrdersWithStatus = state.orders.map(order =>
        order.id === action.payload.orderId
          ? { ...order, status: action.payload.status }
          : order
      );
      
      // Update active order if it's the same order
      let updatedActiveOrder = state.activeOrder;
      if (state.activeOrder && state.activeOrder.id === action.payload.orderId) {
        updatedActiveOrder = { ...state.activeOrder, status: action.payload.status };
      }
      
      return {
        ...state,
        orders: updatedOrdersWithStatus,
        activeOrder: updatedActiveOrder,
      };

    case actionTypes.SET_ACTIVE_ORDER:
      return {
        ...state,
        activeOrder: action.payload,
      };

    case actionTypes.COMPLETE_ORDER:
      const completedOrder = state.orders.find(order => order.id === action.payload.orderId);
      
      // Remove from orders list and add to history
      const remainingOrders = state.orders.filter(order => order.id !== action.payload.orderId);
      const updatedHistory = [
        ...state.orderHistory,
        { ...completedOrder, completedAt: new Date().toISOString() }
      ];
      
      return {
        ...state,
        orders: remainingOrders,
        activeOrder: state.activeOrder && state.activeOrder.id === action.payload.orderId ? null : state.activeOrder,
        orderHistory: updatedHistory,
      };

    case actionTypes.ADD_ORDER:
      return {
        ...state,
        orders: [...state.orders, action.payload],
      };

    case actionTypes.UPDATE_ORDER_PRICE:
      const updatedOrdersWithPrice = state.orders.map(order =>
        order.id === action.payload.orderId
          ? { ...order, price: action.payload.price }
          : order
      );
      
      // Update active order if it's the same order
      let updatedActiveOrderWithPrice = state.activeOrder;
      if (state.activeOrder && state.activeOrder.id === action.payload.orderId) {
        updatedActiveOrderWithPrice = { ...state.activeOrder, price: action.payload.price };
      }
      
      return {
        ...state,
        orders: updatedOrdersWithPrice,
        activeOrder: updatedActiveOrderWithPrice,
      };

    default:
      return state;
  }
};

// Create context
const OrderContext = createContext();

// Provider component
export const OrderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(orderReducer, initialState);

 // Actions
  const acceptOrder = (orderId, price) => {
    dispatch({
      type: actionTypes.ACCEPT_ORDER,
      payload: { orderId, price }
    });
  };

  const updateOrderStatus = (orderId, status) => {
    dispatch({
      type: actionTypes.UPDATE_ORDER_STATUS,
      payload: { orderId, status }
    });
  };

  const setActiveOrder = (order) => {
    dispatch({
      type: actionTypes.SET_ACTIVE_ORDER,
      payload: order
    });
  };

  const completeOrder = (orderId) => {
    dispatch({
      type: actionTypes.COMPLETE_ORDER,
      payload: { orderId }
    });
  };

  const addOrder = (order) => {
    dispatch({
      type: actionTypes.ADD_ORDER,
      payload: order
    });
  };

  const updateOrderPrice = (orderId, price) => {
    dispatch({
      type: actionTypes.UPDATE_ORDER_PRICE,
      payload: { orderId, price }
    });
  };

  return (
    <OrderContext.Provider
      value={{
        ...state,
        acceptOrder,
        updateOrderStatus,
        setActiveOrder,
        completeOrder,
        addOrder,
        updateOrderPrice,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

// Custom hook to use the order context
export const useOrderContext = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrderContext must be used within an OrderProvider');
  }
  return context;
};
