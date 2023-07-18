import categoryApi from "../../../api/admin/category";
import productApi from "../../../api/admin/productAdmin.api";

// ACTION TYPES
export const ACT_FETCH_ALL_PRODUCTS = "ACT_FETCH_ALL_PRODUCTS";
export const ACT_FETCH_ALL_CATEGORIES = "ACT_FETCH_ALL_CATEGORIES";
export const ACT_ADD_NEW_PRODUCT = "ACT_ADD_NEW_PRODUCT";
export const ACT_DELETE_SINGLE_PRODUCT = "ACT_DELETE_SINGLE_PRODUCT";
export const ACT_DELETE_MANY_PRODUCTS = "ACT_DELETE_MANY_PRODUCT";
export const ACT_EDIT_SINGLE_PRODUCT = "ACT_EDIT_SINGLE_PRODUCT";

// ACTION
export const actFetchAllProducts = (products) => {
  return {
    type: ACT_FETCH_ALL_PRODUCTS,
    payload: { products },
  };
};

export const actFetchAllCategories = (categories) => {
  return {
    type: ACT_FETCH_ALL_CATEGORIES,
    payload: { categories },
  };
};

export const actAddNewProduct = (newProduct) => {
  return {
    type: ACT_ADD_NEW_PRODUCT,
    payload: { newProduct },
  };
};

export const actDeleteSingleProduct = (id) => {
  return {
    type: ACT_DELETE_SINGLE_PRODUCT,
    payload: { id },
  };
};

export const actDeleteManyProducts = (idArray) => {
  return {
    type: ACT_DELETE_MANY_PRODUCTS,
    payload: { idArray },
  };
};

export const actEditSingleProduct = (editProduct) => {
  return {
    type: ACT_EDIT_SINGLE_PRODUCT,
    payload: { editProduct },
  };
};

// ACTION ASYNC
export const actFetchAllProductsAsync = () => {
  return async (dispatch) => {
    try {
      // fetch all products => reducer
      const response = await productApi.getList();
      const { data } = response.data;
      dispatch(actFetchAllProducts(data));

      // fetch all categories for add & edit => reducer
      const fetchAllCategories = await categoryApi.getList();
      const dataCategories = fetchAllCategories.data.data;

      // format categories to get all name
      const categoriesByName = dataCategories.map((category) => category.name);
      dispatch(actFetchAllCategories(categoriesByName));
    } catch (error) {
      console.log(error);
    }
  };
};

export const actAddNewProductAsync = (newProduct) => {
  return async (dispatch) => {
    try {
      const response = await productApi.addNewProduct(newProduct);
      const { data } = response.data;
      dispatch(actAddNewProduct(data));
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  };
};

export const actDeleteProductAsync = (id) => {
  return async (dispatch) => {
    try {
      return await productApi.deleteProduct(id).then((data) => {
        Array.isArray(id)
          ? dispatch(actDeleteManyProducts(id))
          : dispatch(actDeleteSingleProduct(id));

        return {
          success: true,
          data,
        };
      });
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  };
};

export const actEditProductAsync = (editProduct) => {
  return async (dispatch) => {
    try {
      const response = await productApi.editProduct(editProduct);
      const { data } = response.data;

      dispatch(actEditSingleProduct(data));

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
