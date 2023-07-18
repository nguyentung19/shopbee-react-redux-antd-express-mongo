import authAdminApi from "../../../api/admin/authAdmin.api";

// Action Types
export const ACT_SET_TOKEN = "ACT_SET_TOKEN";
export const ACT_LOGIN_SUCCESS = "ACT_LOGIN_SUCCESS";
export const ACT_LOGOUT_USER = "ACT_LOGOUT_USER";
export const ACT_EDIT_USER = "ACT_EDIT_USER";

// Action
export const actSetToken = (token) => {
  return {
    type: ACT_SET_TOKEN,
    payload: { token },
  };
};

export const actLoginSuccess = (token, user) => {
  return {
    type: ACT_LOGIN_SUCCESS,
    payload: {
      token,
      user,
    },
  };
};

export const actLogout = () => {
  return {
    type: ACT_LOGOUT_USER,
  };
};

export const actEditUser = (updatedUser) => {
  return {
    type: ACT_EDIT_USER,
    payload: { updatedUser },
  };
};

// Action Async
export const actFetchMeWithToken = (token) => {
  return async (dispatch) => {
    try {
      const response = await authAdminApi.getUserWithToken(token);
      const user = response.data.user;

      await dispatch(actLoginSuccess(token, user));

      return {
        success: true,
        user,
      };
    } catch (error) {
      dispatch(actLogout());
      return {
        success: false,
        error,
      };
    }
  };
};

export const actLoginAsync = ({ email, password }) => {
  return async (dispatch) => {
    try {
      const response = await authAdminApi.login({ email, password });

      // get token from server
      const { token } = response.data;

      //   // save token to reducer
      //   await dispatch(actSetToken(token));

      // get user's info
      const getUserInfo = await dispatch(actFetchMeWithToken(token));

      if (getUserInfo.success) {
        return {
          success: true,
          token,
          user: getUserInfo.user.user,
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
