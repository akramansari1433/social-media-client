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

import { makeStyles, Tooltip } from "@material-ui/core";

import { Comment } from "@material-ui/icons";
import { useSelector } from "react-redux";
import DeletePost from "./DeletePost";
import PostDialog from "./PostDialog";
import LikeButton from "./LikeButton";

const useStyle = makeStyles({
   card: {
      marginBottom: 15,
   },
});

export default function Post({ post, openDialog }) {
   const {
      user: {
         authenticated,
         credentials: { handle },
      },
   } = useSelector((state) => state);
   const classes = useStyle();

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
            <LikeButton postId={post.postId} />
            <span>{post.likeCount} Likes</span>
            <Tooltip title="Comment" placement="top-end">
               <IconButton aria-label="share">
                  <Comment color="secondary" />
               </IconButton>
            </Tooltip>
            <span>{post.commentCount} Comments</span>
            <PostDialog
               postId={post.postId}
               userHandle={post.userHandle}
               openDialog={openDialog}
            />
         </CardActions>
      </Card>
   );
}
