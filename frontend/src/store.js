import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userReducer,
  userDetailsReducer,
  allUsersReducer,
  forgotPasswordReducer,
  profileReducer,
} from "./reducers/userReducer";
import {
  productReviewsReducer,
  reviewReducer,
  productsReducer,
  newProductReducer,
  productReducer,
  productDetailsReducer,
  newReviewReducer,
} from "./reducers/productReducer";

const reducer = combineReducers({
  userDetails: userDetailsReducer,
  allUsers: allUsersReducer,
  forgotPassword: forgotPasswordReducer,
  profile: profileReducer,
  user: userReducer,
  products: productsReducer,
  newProduct: newProductReducer,
  product: productReducer,
  productDetails: productDetailsReducer,
  newReviewReducer: newReviewReducer,
  reviewReducer: reviewReducer,
  productReviewsReducer: productReviewsReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
