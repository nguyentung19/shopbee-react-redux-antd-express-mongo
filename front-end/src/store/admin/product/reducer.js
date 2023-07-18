import {
  ACT_ADD_NEW_PRODUCT,
  ACT_DELETE_MANY_PRODUCTS,
  ACT_DELETE_SINGLE_PRODUCT,
  ACT_EDIT_SINGLE_PRODUCT,
  ACT_FETCH_ALL_CATEGORIES,
  ACT_FETCH_ALL_PRODUCTS,
} from "./action";

const initialState = {
  products: [],
  categoriesByName: [],
};

const productReducer = (productState = initialState, action) => {
  switch (action.type) {
    case ACT_FETCH_ALL_PRODUCTS: {
      return {
        ...productState.products,
        products: action.payload.products,
      };
    }
    case ACT_FETCH_ALL_CATEGORIES: {
      return {
        ...productState,
        categoriesByName: action.payload.categories,
      };
    }
    case ACT_ADD_NEW_PRODUCT: {
      return {
        ...productState,
        products: [...productState.products, action.payload.newProduct],
      };
    }
    case ACT_DELETE_SINGLE_PRODUCT: {
      return {
        ...productState,
        products: productState.products.filter((product) => {
          return product._id !== action.payload.id;
        }),
      };
    }
    case ACT_DELETE_MANY_PRODUCTS: {
      return {
        ...productState,
        products: productState.products.filter(
          (product) => !action.payload.idArray.includes(product._id)
        ),
      };
    }

    case ACT_EDIT_SINGLE_PRODUCT: {
      return {
        ...productState,
        products: productState.products.map((product) => {
          if (product._id === action.payload.editProduct._id) {
            return action.payload.editProduct;
          }
          return product;
        }),
      };
    }

    default:
      return productState;
  }
};

export default productReducer;
