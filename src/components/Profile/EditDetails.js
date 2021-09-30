import {
   Button,
   Dialog,
   DialogActions,
   DialogContent,
   DialogTitle,
   makeStyles,
   TextField,
} from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUserDetails } from "../../redux/actions/userActions";

const useStyle = makeStyles({
   form: {
      padding: "0 20px",
   },
   textField: {
      margin: "10px auto 10px auto",
   },
   button: {
      margin: "10px auto",
      display: "flex",
   },
});

function EditDetails() {
   const classes = useStyle();
   const dispatch = useDispatch();
   const [open, setOpen] = useState(false);
   const [bio, setBio] = useState();
   const [website, setWebsite] = useState();
   const [location, setLocation] = useState();

   const { credentials } = useSelector((state) => state.user);

   const mapUserDetailsToState = (credentials) => {
      setBio(credentials.bio ? credentials.bio : "");
      setWebsite(credentials.website ? credentials.website : "");
      setLocation(credentials.location ? credentials.location : "");
   };

   const handleOpen = () => {
      setOpen(true);
      mapUserDetailsToState(credentials);
   };

   const handleClose = () => {
      setOpen(false);
   };

   useEffect(() => {
      mapUserDetailsToState(credentials);
   }, [credentials]);

   const handleSubmit = () => {
      const userDetails = {
         bio,
         website,
         location,
      };
      dispatch(editUserDetails(userDetails));
      handleClose();
   };

   return (
      <Fragment>
         <Button
            onClick={handleOpen}
            variant="outlined"
            color="secondary"
            className={classes.button}
         >
            <Edit color="secondary" />
            <span>Edit Profile</span>
         </Button>

         <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>Edit your details.</DialogTitle>
            <DialogContent>
               <form className={classes.form}>
                  <TextField
                     name="bio"
                     focused
                     className={classes.textField || ""}
                     type="text"
                     label="Bio"
                     multiline
                     rows={3}
                     placeholder="A short bio about yourself"
                     fullWidth
                     value={bio}
                     onChange={(e) => setBio(e.target.value)}
                  />
                  <TextField
                     name="website"
                     focused
                     className={classes.textField}
                     type="text"
                     label="Website"
                     placeholder="Your personal/professional website"
                     fullWidth
                     value={website}
                     onChange={(e) => setWebsite(e.target.value)}
                  />
                  <TextField
                     name="location"
                     focused
                     className={classes.textField}
                     type="text"
                     label="Location"
                     placeholder="Where you live"
                     fullWidth
                     value={location}
                     onChange={(e) => setLocation(e.target.value)}
                  />
               </form>
            </DialogContent>
            <DialogActions>
               <Button onClick={handleClose} color="primary">
                  Cancel
               </Button>
               <Button onClick={handleSubmit} color="primary">
                  Save
               </Button>
            </DialogActions>
         </Dialog>
      </Fragment>
   );
}

export default EditDetails;
