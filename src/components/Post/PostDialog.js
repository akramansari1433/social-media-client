import {
   CircularProgress,
   Dialog,
   DialogContent,
   Grid,
   IconButton,
   makeStyles,
   Tooltip,
   Typography,
} from "@material-ui/core";
import { Close, Comment, UnfoldMore } from "@material-ui/icons";
import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getPost } from "../../redux/actions/dataActions";
import { format } from "timeago.js";
import LikeButton from "./LikeButton";
import Comments from "./Comments";
import CommentForm from "./CommentForm";

const useStyles = makeStyles({
   invisibleSeparator: {
      border: "none",
      margin: 4,
   },
   visibleSeparator: {
      width: "100%",
      borderBottom: "1px solid rgba(0,0,0,0.1)",
      margin: "10px 0",
   },
   profilePic: {
      maxWidth: 200,
      height: 200,
      borderRadius: "50%",
      objectFit: "cover",
   },
   dialogContent: {
      padding: 20,
   },
   closeButton: {
      position: "absolute",
      left: "90%",
   },
   progressDiv: {
      textAlign: "center",
      margin: "20px 0",
   },
   expandButton: {
      display: "flex",
      marginLeft: "auto",
   },
});

function PostDialog({ postId, userHandle }) {
   const classes = useStyles();
   const dispatch = useDispatch();
   const [open, setOpen] = useState(false);
   const {
      data: {
         post: {
            userImage,
            createdAt,
            body,
            likeCount,
            commentCount,
            comments,
         },
      },
      UI,
   } = useSelector((state) => state);

   const handleOpen = () => {
      setOpen(true);
      dispatch(getPost(postId));
   };

   const handleClose = () => {
      setOpen(false);
   };

   const dialogMarkup = UI.loading ? (
      <div className={classes.progressDiv}>
         <CircularProgress size={200} thickness={2} />
      </div>
   ) : (
      <Grid container>
         <Grid item sm={5}>
            <img
               src={userImage}
               alt="Profile Pic"
               className={classes.profilePic}
            />
         </Grid>
         <Grid item sm={7}>
            <Typography
               component={Link}
               color="primary"
               variant="h5"
               to={`/user/${userHandle}`}
            >
               @{userHandle}
            </Typography>
            <hr className={classes.invisibleSeparator} />
            <Typography variant="body2" color="textSecondary">
               {format(createdAt)}
            </Typography>
            <hr className={classes.invisibleSeparator} />
            <Typography variant="body1">{body}</Typography>
            <LikeButton postId={postId} />
            <span>{likeCount} Likes</span>
            <Tooltip title="Comment" placement="top-end">
               <IconButton aria-label="share">
                  <Comment color="secondary" />
               </IconButton>
            </Tooltip>
            <span>{commentCount} Comments</span>
         </Grid>
         <hr className={classes.visibleSeparator} />
         <CommentForm postId={postId} />
         <Comments comments={comments} />
      </Grid>
   );
   return (
      <Fragment>
         <Tooltip title="Expand post" placement="top-end">
            <IconButton
               aria-label="share"
               onClick={handleOpen}
               className={classes.expandButton}
            >
               <UnfoldMore color="secondary" />
            </IconButton>
         </Tooltip>
         <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <Tooltip title="Close" placement="top-end">
               <IconButton
                  aria-label="share"
                  onClick={handleClose}
                  className={classes.closeButton}
               >
                  <Close color="secondary" />
               </IconButton>
            </Tooltip>
            <DialogContent className={classes.dialogContent}>
               {dialogMarkup}
            </DialogContent>
         </Dialog>
      </Fragment>
   );
}

export default PostDialog;
