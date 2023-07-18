import categoryApi from "../../../api/admin/category";

// ACTION TYPES
export const ACT_FETCH_ALL_CATEGORIES = "ACT_FETCH_ALL_CATEGORIES ";
export const ACT_ADD_NEW_CATEGORY = "ACT_ADD_NEW_CATEGORY ";
export const ACT_DELETE_SINGLE_CATEGORY = "ACT_DELETE_SINGLE_CATEGORY";
export const ACT_DELETE_MANY_CATEGORIES = "ACT_DELETE_MANY_CATEGORIES ";
export const ACT_EDIT_CATEGORY = "ACT_EDIT_CATEGORY ";

// ACTION
export const actFetchAllCategories = (categories) => {
  return {
    type: ACT_FETCH_ALL_CATEGORIES,
    payload: { categories },
  };
};

export const actAddNewCategory = (data) => {
  return {
    type: ACT_ADD_NEW_CATEGORY,
    payload: { data },
  };
};

export const actDeleteSingleCategory = (id) => {
  return {
    type: ACT_DELETE_SINGLE_CATEGORY,
    payload: { id },
  };
};

export const actDeleteManyCategories = (idsArray) => {
  return {
    type: ACT_DELETE_MANY_CATEGORIES,
    payload: { idsArray },
  };
};

export const actEditCategory = (updatedCategory) => {
  return {
    type: ACT_EDIT_CATEGORY,
    payload: { updatedCategory },
  };
};

// ACTION ASYNC
export const actFetchAllCategoriesAsync = () => {
  return async (dispatch) => {
    try {
      const response = await categoryApi.getList();
      const categories = response.data.data;
      dispatch(actFetchAllCategories(categories));
    } catch (error) {
      console.log(error);
    }
  };
};

export const actAddNewCategoryAsync = (data) => {
  return async (dispatch) => {
    try {
      const response = await categoryApi.addNewCategory(data);
      const result = response.data.data;
      dispatch(actAddNewCategory(result));
    } catch (error) {
      console.log(error);
    }
  };
};

export const actDeleteCategoryAsync = (id) => {
  return async (dispatch) => {
    try {
      return await categoryApi.deleteSingleCategory(id).then(() => {
        Array.isArray(id)
          ? dispatch(actDeleteManyCategories(id))
          : dispatch(actDeleteSingleCategory(id));
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const actEditCategoryAsync = (editCategory) => {
  return async (dispatch) => {
    try {
      const response = await categoryApi.editCategory(editCategory);
      const updatedCategory = response.data.data;
      await dispatch(actEditCategory(updatedCategory));
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  };
};
