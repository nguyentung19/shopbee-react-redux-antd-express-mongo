import cartAdminApi from "../../../api/admin/cartAdmin.api";

// Action type
export const ACT_GET_CART_LIST = "ACT_GET_CART_LIST";
export const ACT_UPDATE_STATUS = "ACT_UPDATE_STATUS";
export const ACT_ADD_CART = "ACT_ADD_CART";
export const ACT_DELETE_CART = "ACT_DELETE_CART";
export const ACT_GET_ORDERS_BY_CLIENT_ID = "ACT_GET_ORDERS_BY_CLIENT_ID";

// Action
export const actGetCartList = (cartList) => {
  return {
    type: ACT_GET_CART_LIST,
    payload: { cartList },
  };
};

export const actUpdateStatus = (id, status) => {
  return {
    type: ACT_UPDATE_STATUS,
    payload: { id, status },
  };
};

export const actAddCart = (newCart) => {
  return {
    type: ACT_ADD_CART,
    payload: { newCart },
  };
};

export const actDeleteCart = (id) => {
  return {
    type: ACT_DELETE_CART,
    payload: { id },
  };
};

export const actGetOrdersByClientId = (data) => {
  return {
    type: ACT_GET_ORDERS_BY_CLIENT_ID,
    payload: { data },
  };
};
// Action Async
export const actGetCartListAsync = () => {
  return async (dispatch) => {
    try {
      const data = await cartAdminApi.getCartList();
      const { cartList } = data.data;

      dispatch(actGetCartList(cartList));
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  };
};

export const actUpdateStatusAsync = (id, status) => {
  return async (dispatch) => {
    try {
      const response = await cartAdminApi.updateStatus(id, status);

      if (response.data.success) {
        dispatch(actUpdateStatus(id, status));
      }

      return {
        success: true,
        data: response.data.data,
      };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  };
};

export const actDeleteCartAsync = (id) => {
  return async (dispatch) => {
    try {
      const response = await cartAdminApi.deleteCart(id);

      const data = response.data;

      if (data.success) {
        dispatch(actDeleteCart(id));

        return {
          success: true,
          result: data.response,
        };
      }
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  };
};

export const actGetClientOrders = (clientId) => {
  return async (dispatch) => {
    try {
      const response = await cartAdminApi.getClientOrders(clientId);

      const { data } = response;

      if (data.success) {
        dispatch(actGetOrdersByClientId(data.response));

        return {
          success: true,
          data: data.response,
        };
      }
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  };
};

// add cart bên phía client
export const actAddCartAsync = (userId, cart) => {
  return async (dispatch) => {
    try {
      const response = await cartAdminApi.addCart(userId, cart);

      const data = response.data;

      if (data.success) {
        dispatch(actAddCart(data.reponse));
      }

      return {
        success: true,
        data: data.response,
      };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  };
};
