import productClient from "../../../api/client/productAdmin.api";

// ACTION TYPE
export const ACT_FETCH_ALL_CLIENT_PRODUCTS = "ACT_FETCH_ALL_CLIENT_PRODUCTS";
export const ACT_LIKE_PRODUCT = "ACT_LIKE_PRODUCT";
export const ACT_CART_PRODUCT = "ACT_CART_PRODUCT";
export const ACT_FILTER_PRODUCT = "ACT_FILTER_PRODUCT";
export const ACT_MINUS_CART = "ACT_MINUS_CART";
export const ACT_PLUS_CART = "ACT_PLUS_CART";
export const ACT_DELETE_SINGLE_ITEM = "ACT_DELETE_SINGLE_ITEM ";
export const ACT_RESET_CART = "ACT_RESET_CART";
export const ACT_SEARCH_PRODUCT = "ACT_SEARCH_PRODUCT";

// ACTION
export const actFetchAllClientProduct = (productList, count, page) => {
  return {
    type: ACT_FETCH_ALL_CLIENT_PRODUCTS,
    payload: { productList, count, page },
  };
};

export const actLikeProduct = (productId) => {
  return {
    type: ACT_LIKE_PRODUCT,
    payload: { productId },
  };
};

export const actCartProduct = (productId) => {
  return {
    type: ACT_CART_PRODUCT,
    payload: { productId },
  };
};

export const actFilterProduct = (category) => {
  return {
    type: ACT_FILTER_PRODUCT,
    payload: { category },
  };
};

export const actMinusCart = (id) => {
  return {
    type: ACT_MINUS_CART,
    payload: { id },
  };
};

export const actPlusCart = (id) => {
  return {
    type: ACT_PLUS_CART,
    payload: { id },
  };
};

export const actDeleteItem = (record) => {
  return {
    type: ACT_DELETE_SINGLE_ITEM,
    payload: { record },
  };
};

export const actResetCart = () => {
  return {
    type: ACT_RESET_CART,
  };
};

export const actSearchProduct = (queryString) => {
  return {
    type: ACT_SEARCH_PRODUCT,
    payload: { queryString },
  };
};

// ACTION ASYNC
export const actFetchAllProductsClientAsync = ({ limit, page } = {}) => {
  return async (dispatch) => {
    try {
      const response = await productClient.getList({ limit, page });
      const { data, count } = response.data;
      dispatch(actFetchAllClientProduct(data, count, page));
      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  };
};
