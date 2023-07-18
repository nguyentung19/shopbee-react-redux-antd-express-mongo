import {
  ACT_ADD_CART,
  ACT_DELETE_CART,
  ACT_GET_CART_LIST,
  ACT_GET_ORDERS_BY_CLIENT_ID,
  ACT_UPDATE_STATUS,
} from "./cart.action";

const initialState = {
  cartList: [],
  ordersByClientId: [],
};

const cartReducer = (cartState = initialState, action) => {
  switch (action.type) {
    case ACT_GET_CART_LIST: {
      return {
        ...cartState,
        cartList: action.payload.cartList,
      };
    }
    case ACT_UPDATE_STATUS: {
      return {
        ...cartState,
        cartList: cartState.cartList.map((cartItem) => {
          if (cartItem._id === action.payload.id) {
            return {
              ...cartItem,
              status: action.payload.status,
            };
          }
          return cartItem;
        }),
      };
    }

    case ACT_ADD_CART: {
      return {
        ...cartState,
        cartList: [...cartState.cartList, action.payload.newCart],
      };
    }

    case ACT_DELETE_CART: {
      return {
        ...cartState,
        cartList: cartState.cartList.filter(
          (cartItem) => cartItem._id !== action.payload.id
        ),
      };
    }

    case ACT_GET_ORDERS_BY_CLIENT_ID: {
      return {
        ...cartState,
        ordersByClientId: action.payload.data,
      };
    }

    default:
      return cartState;
  }
};

export default cartReducer;
