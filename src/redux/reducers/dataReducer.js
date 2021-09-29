import {
   SET_POST,
   LOADING_DATA,
   LIKE_POST,
   UNLIKE_POST,
   DELETE_POST,
   CREATE_POST,
} from "../types";

const initialState = {
   posts: [],
   post: {},
   loading: false,
};

export default function dataReducer(state = initialState, action) {
   switch (action.type) {
      case LOADING_DATA:
         return {
            ...state,
            loading: true,
         };
      case SET_POST:
         return {
            ...state,
            posts: action.payload,
            loading: false,
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
         return {
            ...state,
         };
      case DELETE_POST:
         let i = state.posts.findIndex(
            (post) => post.postId === action.payload
         );
         state.posts.splice(i, 1);
         return {
            ...state,
         };

      default:
         return state;
   }
}
