import {
  ACT_ADD_NEW_USER,
  ACT_DELETE_MANY_USERS,
  ACT_DELETE_SINGLE_USER,
  ACT_FETCH_ALL_USERS,
} from "./action.user";

const initialState = {
  users: [],
};

const userReducer = (userState = initialState, action) => {
  switch (action.type) {
    case ACT_FETCH_ALL_USERS: {
      return {
        ...userState,
        users: action.payload.data,
      };
    }
    case ACT_ADD_NEW_USER: {
      return {
        ...userState,
        users: [...userState.users, action.payload.newUser],
      };
    }
    case ACT_DELETE_SINGLE_USER: {
      return {
        ...userState,
        users: userState.users.filter((user) => user._id !== action.payload.id),
      };
    }
    case ACT_DELETE_MANY_USERS: {
      return {
        ...userState,
        users: userState.users.filter(
          (user) => !action.payload.idArray.includes(user._id)
        ),
      };
    }
    default:
      return userState;
  }
};

export default userReducer;
