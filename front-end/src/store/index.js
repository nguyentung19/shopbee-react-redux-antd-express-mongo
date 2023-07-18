import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";
import thunk from "redux-thunk";
import categoryReducer from "./admin/category/reducer";
import productReducer from "./admin/product/reducer";
import productClientReducer from "./client/productClient/reducer.productClient";
import authReducer from "./admin/auth/auth.reducer";
import userReducer from "./admin/user/reducer.user";
import cartReducer from "./admin/cart/cart.reducer";

const rootReducer = combineReducers({
  Category: categoryReducer,
  Product: productReducer,
  ProductClient: productClientReducer,
  AuthAdmin: authReducer,
  UserAdmin: userReducer,
  CartAdmin: cartReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
