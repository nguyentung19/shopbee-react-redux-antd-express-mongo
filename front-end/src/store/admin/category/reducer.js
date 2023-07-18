import {
  ACT_ADD_NEW_CATEGORY,
  ACT_DELETE_MANY_CATEGORIES,
  ACT_DELETE_SINGLE_CATEGORY,
  ACT_EDIT_CATEGORY,
  ACT_FETCH_ALL_CATEGORIES,
} from "./action";

const initialState = {
  categories: [],
  categoryListByName: [],
};

const categoryReducer = (categoryState = initialState, action) => {
  switch (action.type) {
    case ACT_FETCH_ALL_CATEGORIES: {
      return {
        ...categoryState,
        categories: [...action.payload.categories],
        categoryListByName: action.payload.categories.map(
          (category) => category.name
        ),
      };
    }
    case ACT_ADD_NEW_CATEGORY: {
      return {
        ...categoryState,
        categories: [...categoryState.categories, action.payload.data],
      };
    }
    case ACT_DELETE_SINGLE_CATEGORY: {
      return {
        ...categoryState,
        categories: categoryState.categories.filter(
          (category) => category._id !== action.payload.id
        ),
      };
    }
    case ACT_DELETE_MANY_CATEGORIES: {
      return {
        ...categoryState,
        categories: categoryState.categories.filter(
          (category) => !action.payload.idsArray.includes(category._id)
        ),
      };
    }
    case ACT_EDIT_CATEGORY: {
      const { updatedCategory } = action.payload;
      return {
        ...categoryState,
        categories: categoryState.categories.map((category) => {
          if (category._id === updatedCategory._id) {
            return updatedCategory;
          }
          return category;
        }),
      };
    }
    default:
      return categoryState;
  }
};

export default categoryReducer;
