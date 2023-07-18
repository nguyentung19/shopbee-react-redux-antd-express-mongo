import {
  ACT_EDIT_USER,
  ACT_LOGIN_SUCCESS,
  ACT_LOGOUT_USER,
} from "./auth.action";

const initialState = {
  token: localStorage.getItem("token"),
  currentUser: "",
};

const authReducer = (authState = initialState, action) => {
  switch (action.type) {
    case ACT_LOGIN_SUCCESS: {
      localStorage.setItem("token", action.payload.token);
      return {
        ...authState,
        token: action.payload.token,
        currentUser: action.payload.user,
      };
    }
    case ACT_LOGOUT_USER: {
      localStorage.removeItem("token");
      return {
        ...authState,
        token: "",
        currentUser: "",
      };
    }
    case ACT_EDIT_USER: {
      return {
        ...authState,
        currentUser: action.payload.updatedUser,
      };
    }
    default:
      return authState;
  }
};

export default authReducer;
