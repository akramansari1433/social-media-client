import { Grid } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Post from "../components/Post/Post";
import StaticProfile from "../components/Profile/StaticProfile";
import { getUserData } from "../redux/actions/dataActions";

function User() {
   const dispatch = useDispatch();
   const { posts, loading } = useSelector((state) => state.data);
   const [profile, setProfile] = useState(null);
   const { handle } = useParams();

   useEffect(() => {
      dispatch(getUserData(handle));
      axios
         .get(`/user/${handle}`)
         .then((res) => {
            setProfile(res.data.user);
         })
         .catch((err) => {
            console.log(err);
         });
   }, [dispatch, handle]);

   const postsMarkup = loading ? (
      <p>Loading data...</p>
   ) : posts.length === 0 ? (
      <p style={{ textAlign: "center" }}>No posts from this user.</p>
   ) : (
      posts.map((post) => <Post key={post.postId} post={post} />)
   );
   return (
      <Grid container>
         <Grid item sm={4} xs={12}>
            {profile === null ? (
               <p>Loading profile...</p>
            ) : (
               <StaticProfile profile={profile} />
            )}
         </Grid>
         <Grid item sm={8} xs={12}>
            {postsMarkup}
         </Grid>
      </Grid>
   );
}

export default User;
