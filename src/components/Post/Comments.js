import { Grid, makeStyles, Typography } from "@material-ui/core";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { format } from "timeago.js";

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
      maxWidth: "100%",
      height: 70,
      objectFit: "cover",
      borderRadius: "50%",
   },
   commentData: {
      marginLeft: 20,
   },
});

function Comments({ comments }) {
   const classes = useStyles();
   return (
      <Grid container>
         {comments.map((comment, index) => {
            const { body, createdAt, userImage, userHandle } = comment;
            return (
               <Fragment key={createdAt}>
                  <Grid item sm={12}>
                     <Grid container>
                        <Grid item sm={2}>
                           <img
                              src={userImage}
                              alt="profile pic"
                              className={classes.profilePic}
                           />
                        </Grid>
                        <Grid item sm={9}>
                           <div className={classes.commentData}>
                              <Typography
                                 variant="h6"
                                 component={Link}
                                 to={`/users/${userHandle}`}
                              >
                                 {userHandle}
                              </Typography>
                              <Typography variant="body2" color="textSecondary">
                                 {format(createdAt)}
                              </Typography>
                              <hr className={classes.invisibleSeparator} />
                              <Typography variant="body1">{body}</Typography>
                           </div>
                        </Grid>
                     </Grid>
                  </Grid>
                  {index !== comments.length - 1 && (
                     <hr className={classes.visibleSeparator} />
                  )}
               </Fragment>
            );
         })}
      </Grid>
   );
}

export default Comments;
