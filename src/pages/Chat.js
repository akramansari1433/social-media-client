import React, { useEffect, useState } from "react";
import { Button, Grid, makeStyles, TextField } from "@material-ui/core";
import FlipMove from "react-flip-move";
import { Send } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { getMessages, sendMessage } from "../redux/actions/dataActions";
import Message from "../components/Message/Message";
import { Redirect } from "react-router";

const useStyles = makeStyles({
   form: {
      position: "fixed",
      bottom: "0",
      backgroundColor: "#e9e9eb",
      width: "100%",
      zIndex: "1",
   },
   container: {
      display: "flex",
      alignItems: "center",
      padding: "10px",
   },
   formInput: {
      flex: "1",
   },
   sendButton: {
      flex: "0",
   },
});

function Chat() {
   const dispatch = useDispatch();
   const classes = useStyles();
   const { messages, loading } = useSelector((state) => state.data);
   const { handle } = useSelector((state) => state.user.credentials);
   const { authenticated } = useSelector((state) => state.user);
   const [message, setMessage] = useState();

   useEffect(() => {
      dispatch(getMessages());
   });

   const handleSubmit = (event) => {
      event.preventDefault();
      const newMessage = {
         userHandle: handle,
         message,
      };
      dispatch(sendMessage(newMessage));
      event.target.reset();
   };

   const chatMarkup = authenticated ? (
      <div>
         <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container className={classes.container}>
               <Grid item className={classes.formInput}>
                  <TextField
                     required
                     variant="outlined"
                     placeholder={`Whats in your mind`}
                     fullWidth
                     onChange={(e) => setMessage(e.target.value)}
                  />
               </Grid>
               <Grid item className={classes.sendButton}>
                  <Button type="submit">
                     <Send />
                  </Button>
               </Grid>
            </Grid>
         </form>

         <FlipMove style={{ marginBottom: "80px" }}>
            {loading ? (
               <p>Loading...</p>
            ) : (
               messages.map((message) => (
                  <Message
                     userHandle={handle}
                     message={message}
                     key={message.timestamp}
                  />
               ))
            )}
         </FlipMove>
      </div>
   ) : (
      <Redirect to="/login" />
   );

   return chatMarkup;
}

export default Chat;
