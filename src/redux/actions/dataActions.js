import axios from "axios";
import {
   SET_POST,
   LOADING_DATA,
   LIKE_POST,
   UNLIKE_POST,
   DELETE_POST,
   LOADING_UI,
   SET_ERRORS,
   CLEAR_ERRORS,
   CREATE_POST,
} from "../types";

//get all post
export const getPosts = () => (dispatch) => {
   dispatch({ type: LOADING_DATA });
   axios
      .get("/post/all")
      .then((res) => {
         dispatch({
            type: SET_POST,
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
