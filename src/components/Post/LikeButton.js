import { IconButton, Tooltip } from "@material-ui/core";
import { FavoriteBorder } from "@material-ui/icons";
import FavoriteIcon from "@material-ui/icons/Favorite";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { likePost, unlikePost } from "../../redux/actions/dataActions";

function LikeButton({ postId }) {
   const dispatch = useDispatch();
   const {
      user: { likes, authenticated },
   } = useSelector((state) => state);

   const likedPost = () => {
      if (likes && likes.find((like) => like.postId === postId)) {
         return true;
      } else return false;
   };

   const like = () => {
      dispatch(likePost(postId));
   };

   const unlike = () => {
      dispatch(unlikePost(postId));
   };
   const likeButton = !authenticated ? (
      <Tooltip title="Like" placement="top-end">
         <Link to="/login">
            <IconButton aria-label="share">
               <FavoriteBorder color="secondary" />
            </IconButton>
         </Link>
      </Tooltip>
   ) : likedPost() ? (
      <Tooltip title="Undo like" placement="top-end">
         <Link to="/login">
            <IconButton aria-label="share" onClick={unlike}>
               <FavoriteIcon color="secondary" />
            </IconButton>
         </Link>
      </Tooltip>
   ) : (
      <Tooltip title="Like" placement="top-end">
         <Link to="/login">
            <IconButton aria-label="share" onClick={like}>
               <FavoriteBorder color="secondary" />
            </IconButton>
         </Link>
      </Tooltip>
   );
   return likeButton;
}

export default LikeButton;
