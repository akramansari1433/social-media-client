import { makeStyles, Paper } from "@material-ui/core";
import { CalendarToday, LocationOn } from "@material-ui/icons";
import React from "react";
import noImg from "../Images/no-img.png";
import LinkIcon from "@material-ui/icons/Link";

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

   handle: {
      height: 20,
      backgroundColor: "rgba(0,0,0, 0.6)",
      width: 80,
      margin: "0 auto 7px auto",
   },
   fullLine: {
      height: 15,
      backgroundColor: "rgba(0,0,0,0.6)",
      width: "100%",
      marginBottom: 10,
   },
   halfLine: {
      height: 15,
      backgroundColor: "rgba(0,0,0,0.6)",
      width: "50%",
      marginBottom: 10,
   },
});

function ProfileSkeleton() {
   const classes = useStyles();
   return (
      <Paper className={classes.paper}>
         <div className={classes.profile}>
            <div className="image-wrapper">
               <img src={noImg} alt="profilePic" className="profile-image" />
            </div>
            <hr />
            <div className="profile-details">
               <div className={classes.handle} />
               <hr />
               <div className={classes.fullLine} />
               <div className={classes.fullLine} />
               <hr />
               <LocationOn color="primary" /> <span>Location</span>
               <hr />
               <LinkIcon color="primary" /> https://website.com
               <hr />
               <CalendarToday color="primary" /> Joined date
            </div>
         </div>
      </Paper>
   );
}

export default ProfileSkeleton;
