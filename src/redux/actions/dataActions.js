import axios from "axios";
import {
   SET_POSTS,
   LOADING_DATA,
   LIKE_POST,
   UNLIKE_POST,
   DELETE_POST,
   LOADING_UI,
   SET_ERRORS,
   CLEAR_ERRORS,
   CREATE_POST,
   SET_POST,
   STOP_LOADING,
   SUBMIT_COMMENT,
   SET_MESSAGES,
   SEND_MESSAGE,
} from "../types";

//get all post
export const getPosts = () => (dispatch) => {
   dispatch({ type: LOADING_DATA });
   axios
      .get("/post/all")
      .then((res) => {
         dispatch({
            type: SET_POSTS,
            payload: res.data,
         });
      })
      .catch((err) => {
         dispatch({
            type: SET_POST,
            payload: [],
         });
      });
};

//get post
export const getPost = (postId) => (dispatch) => {
   dispatch({ type: LOADING_UI });
   axios
      .get(`/post/${postId}`)
      .then((res) => {
         dispatch({
            type: SET_POST,
            payload: res.data,
         });
         dispatch({ type: STOP_LOADING });
      })
      .catch((err) => {
         console.log(err);
      });
};

//create post
export const createNewPost = (newPost) => (dispatch) => {
   dispatch({
      type: LOADING_UI,
   });
   axios
      .post("/post", newPost)
      .then((res) => {
         dispatch({
            type: CREATE_POST,
            payload: res.data,
         });
         dispatch({ type: CLEAR_ERRORS });
      })
      .catch((err) => {
         dispatch({
            type: SET_ERRORS,
            payload: err.response.data,
         });
      });
};

//like a post
export const likePost = (postId) => (dispatch) => {
   axios
      .get(`/post/like/${postId}`)
      .then((res) => {
         dispatch({
            type: LIKE_POST,
            payload: res.data,
         });
      })
      .catch((err) => console.log(err));
};

//unlike post
export const unlikePost = (postId) => (dispatch) => {
   axios
      .get(`/post/unlike/${postId}`)
      .then((res) => {
         dispatch({
            type: UNLIKE_POST,
            payload: res.data,
         });
      })
      .catch((err) => console.log(err));
};

//comment on post
export const submitComment = (postId, commentData) => (dispatch) => {
   axios
      .post(`/post/comment/${postId}`, commentData)
      .then((res) => {
         dispatch({
            type: SUBMIT_COMMENT,
            payload: res.data,
         });
      })
      .catch((err) => {
         console.log(err);
      });
};

//delete post
export const deletePost = (postId) => (dispatch) => {
   axios
      .delete(`/post/${postId}`)
      .then(() => {
         dispatch({
            type: DELETE_POST,
            payload: postId,
         });
      })
      .catch((err) => console.log(err));
};

//get user data
export const getUserData = (userHandle) => (dispatch) => {
   dispatch({ type: LOADING_DATA });
   axios
      .get(`/user/${userHandle}`)
      .then((res) => {
         dispatch({
            type: SET_POSTS,
            payload: res.data.posts,
         });
      })
      .catch(() => {
         dispatch({
            type: SET_POSTS,
            payload: null,
         });
      });
};

//get messages
export const getMessages = () => (dispatch) => {
   axios
      .get("/chat/getAllMessage")
      .then((res) => {
         dispatch({
            type: SET_MESSAGES,
            payload: res.data,
         });
      })
      .catch((err) => {
         dispatch({
            type: SET_MESSAGES,
            payload: [],
         });
      });
};

//send message
export const sendMessage = (message) => (dispatch) => {
   axios
      .post("chat/sendMessage", message)
      .then((res) => {
         dispatch({
            type: SEND_MESSAGE,
            payload: res.data,
         });
      })
      .catch((err) => {
         console.log(err);
      });
};
