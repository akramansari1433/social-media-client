import {
   Button,
   IconButton,
   makeStyles,
   Paper,
   Tooltip,
   Typography,
} from "@material-ui/core";
import React, { Fragment } from "react";
import MuiLink from "@material-ui/core/Link";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CalendarToday, Edit, LocationOn } from "@material-ui/icons";
import LinkIcon from "@material-ui/icons/Link";
import { format } from "timeago.js";
import { uploadImage } from "../../redux/actions/userActions";
import EditDetails from "./EditDetails";
import ProfileSkeleton from "../../utils/ProfileSkeleton";

const useStyles = makeStyles({
   paper: {
      padding: 20,
      marginBottom: 20,
   },
   profile: {
      "& .image-wrapper": {
         textAlign: "center",
         position: "relative",
         "& button": {
            position: "absolute",
            top: "80%",
            left: "70%",
         },
      },
      "& .profile-image": {
         width: 200,
         height: 200,
         objectFit: "cover",
         maxWidth: "100%",
         borderRadius: "50%",
      },
      "& .profile-details": {
         textAlign: "center",
         "& span, svg": {
            verticalAlign: "middle",
         },
         "& a": {
            color: "#00bcd4",
         },
      },
      "& hr": {
         border: "none",
         margin: "0 0 10px 0",
      },
      "& svg.button": {
         "&:hover": {
            cursor: "pointer",
         },
      },
   },
   buttons: {
      textAlign: "center",
      "& a": {
         margin: "20px 10px",
      },
   },
   editButton: {
      display: "flex",
      margin: "auto",
   },
});

function Profile() {
   const classes = useStyles();
   const dispatch = useDispatch();
   const {
      user: { credentials, loading, authenticated },
   } = useSelector((state) => state);

   const handleImageChange = (e) => {
      const image = e.target.files[0];
      const formData = new FormData();
      formData.append("image", image, image.name);
      dispatch(uploadImage(formData));
   };

   const handleEditPicture = () => {
      const fileInput = document.getElementById("imageInput");
      fileInput.click();
   };

   let profile = !loading ? (
      authenticated ? (
         <Paper className={classes.paper}>
            <div className={classes.profile}>
               <div className="image-wrapper">
                  <img
                     src={credentials.imageUrl}
                     alt="profilePic"
                     className="profile-image"
                  />
                  <input
                     type="file"
                     id="imageInput"
                     onChange={handleImageChange}
                     hidden="hidden"
                  />
                  <Tooltip title="Edit profile picture" placement="top">
                     <IconButton onClick={handleEditPicture}>
                        <Edit color="secondary" />
                     </IconButton>
                  </Tooltip>
               </div>
               <hr />
               <div className="profile-details">
                  <MuiLink
                     component={Link}
                     to={`/users/${credentials.handle}`}
                     variant="h5"
                     style={{ color: "#000a12" }}
                  >
                     @{credentials.handle}
                  </MuiLink>
                  <hr />
                  {credentials.bio && (
                     <Typography variant="body2">{credentials.bio}</Typography>
                  )}
                  <hr />
                  {credentials.location && (
                     <Fragment>
                        <LocationOn />
                        <span>{credentials.location}</span>
                        <hr />
                     </Fragment>
                  )}
                  {credentials.website && (
                     <Fragment>
                        <LinkIcon />
                        <a
                           href={credentials.website}
                           target="_blank"
                           rel="noopener noreferrer"
                           style={{ color: "#000a12" }}
                        >
                           {" "}
                           {credentials.website}
                        </a>
                        <hr />
                     </Fragment>
                  )}
                  <CalendarToday color="primary" />
                  <span>Joined {format(credentials.createdAt)}</span>
               </div>
               <EditDetails className={classes.editButton} />
            </div>
         </Paper>
      ) : (
         <Paper className={classes.paper}>
            <Typography variant="body2" align="center">
               No profile found, please login again.
            </Typography>
            <div className={classes.buttons}>
               <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to="/login"
               >
                  Login
               </Button>
               <Button
                  variant="contained"
                  color="secondary"
                  component={Link}
                  to="/signup"
               >
                  Signup
               </Button>
            </div>
         </Paper>
      )
   ) : (
      <ProfileSkeleton />
   );
   return profile;
}

export default Profile;
