import React from "react";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { makeStyles, Tooltip } from "@material-ui/core";
import { likePost, unlikePost } from "../../redux/actions/dataActions";
import { Comment, FavoriteBorder } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import DeletePost from "./DeletePost";

const useStyle = makeStyles({
   card: {
      margin: "0 20px",
      marginBottom: 15,
   },
});

export default function Post({ post }) {
   const dispatch = useDispatch();
   const {
      user: {
         likes,
         authenticated,
         credentials: { handle },
      },
   } = useSelector((state) => state);
   const classes = useStyle();

   const likedPost = () => {
      if (likes && likes.find((like) => like.postId === post.postId)) {
         return true;
      } else return false;
   };

   const like = () => {
      dispatch(likePost(post.postId));
   };

   const unlike = () => {
      dispatch(unlikePost(post.postId));
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

   const deleteButton =
      authenticated && post.userHandle === handle ? (
         <DeletePost postId={post.postId} />
      ) : null;

   return (
      <Card className={classes.card}>
         <CardHeader
            avatar={<Avatar aria-label="recipe" src={post.userImage}></Avatar>}
            action={deleteButton}
            title={
               <Typography
                  color="primary"
                  component={Link}
                  to={`/users/${post.userHandle}`}
               >
                  {post.userHandle}
               </Typography>
            }
            subheader={format(post.createdAt)}
         ></CardHeader>
         <CardContent>
            <Typography variant="body2" color="inherit">
               {post.body}
            </Typography>
         </CardContent>
         <CardActions disableSpacing>
            {likeButton}
            <span>{post.likeCount} Likes</span>
            <Tooltip title="Comment" placement="top-end">
               <IconButton aria-label="share">
                  <Comment color="secondary" />
               </IconButton>
            </Tooltip>
            <span>{post.commentCount} Comments</span>
         </CardActions>
      </Card>
   );
}
