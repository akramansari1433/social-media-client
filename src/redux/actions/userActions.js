import axios from "axios";
import {
   SET_USER,
   SET_ERRORS,
   CLEAR_ERRORS,
   LOADING_UI,
   SET_UNAUTHENTICATED,
   LOADING_USER,
   MARK_NOTIFICATIONS_READ,
} from "../types";

export const loginUser = (userData, history) => (dispatch) => {
   dispatch({ type: LOADING_UI });
   axios
      .post("/user/login", userData)
      .then((res) => {
         const FBIdToken = `Bearer ${res.data.token}`;
         localStorage.setItem("FBIdToken", FBIdToken);
         axios.defaults.headers.common["Authorization"] = FBIdToken;
         dispatch(getUserData());
         dispatch({ type: CLEAR_ERRORS });
         history.push("/");
      })
      .catch((err) => {
         dispatch({
            type: SET_ERRORS,
            payload: err.response.data,
         });
      });
};

export const getUserData = () => (dispatch) => {
   dispatch({ type: LOADING_USER });
   axios
      .get("/user/getAuthenticatedUser")
      .then((res) => {
         dispatch({
            type: SET_USER,
            payload: res.data,
         });
      })
      .catch((err) => console.log(err));
};

export const signupUser = (newUserData, history) => (dispatch) => {
   dispatch({ type: LOADING_UI });
   axios
      .post("/user/signup", newUserData)
      .then((res) => {
         const FBIdToken = `Bearer ${res.data.token}`;
         localStorage.setItem("FBIdToken", FBIdToken);
         axios.defaults.headers.common["Authorization"] = FBIdToken;
         dispatch(getUserData());
         dispatch({ type: CLEAR_ERRORS });
         history.push("/");
      })
      .catch((err) => {
         dispatch({
            type: SET_ERRORS,
            payload: err.response.data,
         });
      });
};

export const logoutUser = () => (dispatch) => {
   localStorage.removeItem("FBIdToken");
   delete axios.defaults.headers.common["Authorization"];
   dispatch({
      type: SET_UNAUTHENTICATED,
   });
};

export const uploadImage = (formData) => (dispatch) => {
   dispatch({ type: LOADING_USER });
   axios
      .post("/user/image", formData)
      .then(() => {
         dispatch(getUserData());
      })
      .catch((err) => {
         console.log(err);
      });
};

export const editUserDetails = (userDetails) => (dispatch) => {
   dispatch({ type: LOADING_USER });
   axios
      .post("/user/addUserDetails", userDetails)
      .then(() => {
         dispatch(getUserData());
      })
      .catch((err) => console.log(err));
};

export const markNotificationsRead = (notificationIds) => (dispatch) => {
   axios
      .post(`/user/notifications`, notificationIds)
      .then((res) => {
         dispatch({
            type: MARK_NOTIFICATIONS_READ,
         });
      })
      .catch((err) => {
         console.log(err);
      });
};
