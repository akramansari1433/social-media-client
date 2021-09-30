import { Button, Grid, makeStyles, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitComment } from "../../redux/actions/dataActions";

const useStyles = makeStyles({
   button: {},
   visibleSeparator: {
      width: "100%",
      borderBottom: "1px solid rgba(0,0,0,0.1)",
      margin: "10px 0",
   },
   profilePic: {
      maxWidth: "100%",
      height: 60,
      borderRadius: "50%",
      objectFit: "cover",
   },
   commentBody: {
      marginLeft: 10,
   },
});

function CommentForm({ postId }) {
   const classes = useStyles();
   const dispatch = useDispatch();
   const {
      authenticated,
      credentials: { imageUrl },
   } = useSelector((state) => state.user);
   const [body, setBody] = useState();

   const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(submitComment(postId, { body }));
      e.target.reset();
   };

   const commentForm = authenticated ? (
      <Grid item sm={12} style={{ textAlign: "center" }}>
         <form onSubmit={handleSubmit}>
            <Grid container>
               <Grid item sm={2}>
                  <img
                     src={imageUrl}
                     alt="profile pic"
                     className={classes.profilePic}
                  />
               </Grid>
               <Grid item sm={7} xs={9}>
                  <TextField
                     type="text"
                     label="Comment on post"
                     required
                     onChange={(e) => setBody(e.target.value)}
                     fullWidth
                     className={classes.commentBody}
                  />
               </Grid>
               <Grid item sm={3} xs={12}>
                  <Button
                     type="submit"
                     variant="contained"
                     className={classes.button}
                  >
                     Submit
                  </Button>
               </Grid>
            </Grid>
         </form>
         <hr className={classes.visibleSeparator} />
      </Grid>
   ) : null;
   return commentForm;
}

export default CommentForm;
