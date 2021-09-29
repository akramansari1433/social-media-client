import {
   Button,
   Dialog,
   DialogActions,
   DialogTitle,
   IconButton,
   Tooltip,
} from "@material-ui/core";
import { DeleteOutline } from "@material-ui/icons";
import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { deletePost } from "../../redux/actions/dataActions";

function DeletePost({ postId }) {
   const dispatch = useDispatch();
   const [open, setOpen] = useState(false);

   const handleOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };

   const removePost = () => {
      dispatch(deletePost(postId));
      setOpen(false);
   };

   return (
      <Fragment>
         <Tooltip title="Delete post" placement="top">
            <IconButton onClick={handleOpen}>
               <DeleteOutline color="secondary" />
            </IconButton>
         </Tooltip>
         <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
            <DialogTitle>Are you sure want to delete this post?</DialogTitle>
            <DialogActions>
               <Button onClick={handleClose} color="primary">
                  Cancel
               </Button>
               <Button onClick={removePost} color="secondary">
                  Delete
               </Button>
            </DialogActions>
         </Dialog>
      </Fragment>
   );
}

export default DeletePost;
