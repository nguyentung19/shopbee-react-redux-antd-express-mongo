import {
  ACT_CART_PRODUCT,
  ACT_DELETE_SINGLE_ITEM,
  ACT_FETCH_ALL_CLIENT_PRODUCTS,
  ACT_FILTER_PRODUCT,
  ACT_LIKE_PRODUCT,
  ACT_MINUS_CART,
  ACT_PLUS_CART,
  ACT_RESET_CART,
  ACT_SEARCH_PRODUCT,
} from "./action.productClient";

const initialState = {
  products: [],
  filterCategory: "",
  cart: 0,
  count: 0,
  page: 0,
  limit: 3,
  queryString: "",
};

const productClientReducer = (productState = initialState, action) => {
  switch (action.type) {
    case ACT_FETCH_ALL_CLIENT_PRODUCTS: {
      const updatedProduct = action.payload.productList.map((product) => {
        return {
          ...product,
          like: false,
          cart: 0,
        };
      });
      return {
        ...productState,
        products: [...productState.products, ...updatedProduct],
        count: action.payload.count,
        fakeProducts: productState.products,
        page: action.payload.page ?? 1,
      };
    }
    case ACT_LIKE_PRODUCT: {
      return {
        ...productState,
        products: productState.products.map((product) => {
          if (product._id === action.payload.productId) {
            return {
              ...product,
              like: !product.like,
            };
          }
          return product;
        }),
      };
    }
    case ACT_CART_PRODUCT: {
      return {
        ...productState,
        cart: productState.cart + 1,
        products: productState.products.map((product) => {
          if (product._id === action.payload.productId) {
            return {
              ...product,
              cart: product.cart + 1,
            };
          }
          return product;
        }),
      };
    }
    case ACT_FILTER_PRODUCT: {
      return {
        ...productState,
        filterCategory: action.payload.category,
      };
    }
    case ACT_MINUS_CART: {
      return {
        ...productState,
        products: productState.products.map((product) => {
          if (product._id === action.payload.id) {
            return {
              ...product,
              cart: product.cart - 1,
            };
          }
          return product;
        }),
        cart: productState.cart - 1,
      };
    }
    case ACT_PLUS_CART: {
      return {
        ...productState,
        products: productState.products.map((product) => {
          if (product._id === action.payload.id) {
            return {
              ...product,
              cart: product.cart + 1,
            };
          }

          return product;
        }),
        cart: productState.cart + 1,
      };
    }
    case ACT_DELETE_SINGLE_ITEM: {
      return {
        ...productState,
        products: productState.products.map((product) => {
          if (product._id === action.payload.record._id) {
            return {
              ...product,
              cart: 0,
            };
          }
          return product;
        }),
        cart: productState.cart - action.payload.record.cart,
      };
    }
    case ACT_RESET_CART: {
      return {
        ...productState,
        products: productState.products.map((product) => {
          return {
            ...product,
            cart: 0,
          };
        }),
        cart: 0,
      };
    }
    case ACT_SEARCH_PRODUCT: {
      return {
        ...productState,
        queryString: action.payload.queryString,
      };
    }
    default:
      return productState;
  }
};

export default productClientReducer;
