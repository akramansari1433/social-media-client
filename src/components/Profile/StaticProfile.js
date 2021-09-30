import React, { Fragment } from "react";
import { makeStyles, Paper, Typography } from "@material-ui/core";
import MuiLink from "@material-ui/core/Link";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import { CalendarToday, LocationOn } from "@material-ui/icons";
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
   },
});

function StaticProfile({ profile }) {
   const classes = useStyles();
   const { handle, createdAt, imageUrl, bio, website, location } = profile;
   return (
      <Paper className={classes.paper}>
         <div className={classes.profile}>
            <div className="image-wrapper">
               <img src={imageUrl} alt="profilePic" className="profile-image" />
            </div>
            <hr />
            <div className="profile-details">
               <MuiLink
                  component={Link}
                  to={`/users/${handle}`}
                  variant="h5"
                  style={{ color: "#000a12" }}
               >
                  @{handle}
               </MuiLink>
               <hr />
               {bio && <Typography variant="body2">{bio}</Typography>}
               <hr />
               {location && (
                  <Fragment>
                     <LocationOn />
                     <span>{location}</span>
                     <hr />
                  </Fragment>
               )}
               {website && (
                  <Fragment>
                     <LinkIcon />
                     <a
                        href={website}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#000a12" }}
                     >
                        {" "}
                        {website}
                     </a>
                     <hr />
                  </Fragment>
               )}
               <CalendarToday color="primary" />
               <span>Joined {format(createdAt)}</span>
            </div>
         </div>
      </Paper>
   );
}

export default StaticProfile;
