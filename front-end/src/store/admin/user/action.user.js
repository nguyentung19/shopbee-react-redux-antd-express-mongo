import userAdminApi from "../../../api/admin/userAdmin.api";
import { actEditUser } from "../auth/auth.action";

// Action types
export const ACT_FETCH_ALL_USERS = "ACT_FETCH_ALL_USERS";
export const ACT_ADD_NEW_USER = "ACT_ADD_NEW_USER";
export const ACT_DELETE_SINGLE_USER = "ACT_DELETE_SINGLE_USER";
export const ACT_DELETE_MANY_USERS = "ACT_DELETE_MANY_USERS";

// Action
export const actFetchAllUsers = (data) => {
  return {
    type: ACT_FETCH_ALL_USERS,
    payload: { data },
  };
};

export const actAddNewUser = (newUser) => {
  return {
    type: ACT_ADD_NEW_USER,
    payload: { newUser },
  };
};

export const actDeleteSingleUser = (id) => {
  return {
    type: ACT_DELETE_SINGLE_USER,
    payload: { id },
  };
};

export const actDeleteManyUsers = (idArray) => {
  return {
    type: ACT_DELETE_MANY_USERS,
    payload: { idArray },
  };
};

// Action Async
export const actRegisterAsync = (data) => {
  return async (dispatch) => {
    try {
      const response = await userAdminApi.register(data);

      const newUser = response.data.data;

      dispatch(actAddNewUser(newUser));

      return {
        success: true,
        message: "Đã đăng ký thành công",
      };
    } catch (error) {
      return {
        success: false,
        error: error.response.data.error,
      };
    }
  };
};

export const actFetchUsersAsync = () => {
  return async (dispatch) => {
    try {
      const response = await userAdminApi.getUsers();
      const users = response.data.data;

      dispatch(actFetchAllUsers(users));

      return {
        success: true,
        data: users,
      };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  };
};

export const actDeleteSingleUserAsync = (id) => {
  return async (dispatch) => {
    try {
      return await userAdminApi.deleteUser(id).then((data) => {
        Array.isArray(id)
          ? dispatch(actDeleteManyUsers(id))
          : dispatch(actDeleteSingleUser(id));

        return {
          success: true,
          result: data.result,
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

export const actEditUserAsync = (user) => {
  return async (dispatch) => {
    try {
      return await userAdminApi.editUser(user).then((result) => {
        if (result.data.success) {
          dispatch(actEditUser(result.data.user));

          return {
            success: true,
            user: result.data,
          };
        }
      });
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  };
};
