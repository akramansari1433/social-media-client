import { Grid, makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreatePost from "../components/Post/CreatePost";
import Post from "../components/Post/Post";
import Profile from "../components/Profile/Profile";
import { getPosts } from "../redux/actions/dataActions";
import PostSkeleton from "../utils/PostSkeleton";

const useStyles = makeStyles({
   profile: {
      padding: "0 1rem",
   },
   post: {
      padding: "0 1rem",
   },
});

export default function Home() {
   const classes = useStyles();
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getPosts());
   }, [dispatch]);

   const {
      authenticated,
      credentials,
      loading: userLoading,
   } = useSelector((state) => state.user);
   const { posts, loading } = useSelector((state) => state.data);

   const createPost =
      authenticated && !userLoading ? (
         <CreatePost credentials={credentials} />
      ) : null;

   return (
      <Grid container>
         <Grid item sm={4} xs={12} className={classes.profile}>
            <Profile />
         </Grid>
         <Grid item sm={8} xs={12} className={classes.post}>
            {createPost}
            {!loading ? (
               posts.map((post) => <Post post={post} key={post.postId} />)
            ) : (
               <PostSkeleton />
            )}
         </Grid>
      </Grid>
   );
}
