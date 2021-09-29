import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import { Button, TextField } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { createNewPost } from "../../redux/actions/dataActions";

const useStyles = makeStyles({
   card: {
      margin: "0 20px",
      marginBottom: 15,
   },
   button: {
      flexDirection: "row-reverse",
   },
});

function CreatePost({ credentials }) {
   const dispatch = useDispatch();
   const [body, setBody] = useState();
   const { loading } = useSelector((state) => state.UI);
   const classes = useStyles();

   const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(createNewPost({ body }));
      e.target.reset();
   };

   return (
      <Card className={classes.card}>
         <form onSubmit={handleSubmit}>
            <CardHeader
               avatar={
                  <Avatar aria-label="recipe" src={credentials.imageUrl} />
               }
               title={
                  <TextField
                     required
                     variant="outlined"
                     placeholder={`Whats in your mind, ${credentials.handle}`}
                     fullWidth
                     multiline
                     rows={2}
                     onChange={(e) => setBody(e.target.value)}
                  />
               }
            />
            <CardActions className={classes.button}>
               <Button
                  color="secondary"
                  type="submit"
                  variant="outlined"
                  disabled={loading}
               >
                  Share
               </Button>
            </CardActions>
         </form>
      </Card>
   );
}

export default CreatePost;
