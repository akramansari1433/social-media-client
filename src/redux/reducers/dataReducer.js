import {
   SET_POST,
   LOADING_DATA,
   LIKE_POST,
   UNLIKE_POST,
   DELETE_POST,
   CREATE_POST,
   SET_POSTS,
   SUBMIT_COMMENT,
   SET_MESSAGES,
   SEND_MESSAGE,
} from "../types";

const initialState = {
   posts: [],
   post: {},
   loading: false,
   messages: [],
};

export default function dataReducer(state = initialState, action) {
   switch (action.type) {
      case LOADING_DATA:
         return {
            ...state,
            loading: true,
         };
      case SET_POSTS:
         return {
            ...state,
            posts: action.payload,
            loading: false,
         };
      case SET_POST:
         return {
            ...state,
            post: action.payload,
         };
      case CREATE_POST:
         return {
            ...state,
            posts: [action.payload, ...state.posts],
         };
      case LIKE_POST:
      case UNLIKE_POST:
         let index = state.posts.findIndex(
            (post) => post.postId === action.payload.postId
         );
         state.posts[index] = action.payload;
         if (state.post.postId === action.payload.postId) {
            state.post = action.payload;
         }

         return {
            ...state,
         };
      case SUBMIT_COMMENT:
         return {
            ...state,
            post: {
               ...state.post,
               comments: [action.payload, ...state.post.comments],
            },
         };
      case DELETE_POST:
         let i = state.posts.findIndex(
            (post) => post.postId === action.payload
         );
         state.posts.splice(i, 1);
         return {
            ...state,
         };
      case SET_MESSAGES:
         return {
            ...state,
            messages: action.payload,
         };
      case SEND_MESSAGE:
         return {
            ...state,
            messages: [action.payload, ...state.messages],
         };

      default:
         return state;
   }
}
