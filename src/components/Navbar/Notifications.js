import {
   Badge,
   IconButton,
   Menu,
   MenuItem,
   Tooltip,
   Typography,
} from "@material-ui/core";
import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { markNotificationsRead } from "../../redux/actions/userActions";
import { format } from "timeago.js";
import { Chat, Favorite } from "@material-ui/icons";
import { Link } from "react-router-dom";

function Notifications() {
   const dispatch = useDispatch();
   const [anchorEl, setAnchorEl] = useState(null);
   const { notifications } = useSelector((state) => state.user);

   const onMenuOpened = () => {
      let unreadNotificationsIds = notifications
         .filter((not) => !not.read)
         .map((not) => not.notificationId);
      dispatch(markNotificationsRead(unreadNotificationsIds));
   };

   const handleOpen = (e) => {
      setAnchorEl(e.currentTarget);
   };

   const handleClose = () => {
      setAnchorEl(null);
      onMenuOpened();
   };

   let notificationIcon;
   if (notifications && notifications.length > 0) {
      notifications.filter((not) => not.read === false).length > 0
         ? (notificationIcon = (
              <Badge
                 badgeContent={
                    notifications.filter((not) => not.read === false).length
                 }
                 color="secondary"
              >
                 <NotificationsIcon />
              </Badge>
           ))
         : (notificationIcon = <NotificationsIcon />);
   } else {
      notificationIcon = <NotificationsIcon />;
   }

   let notificationsMarkup =
      notifications && notifications.length > 0 ? (
         notifications.map((not) => {
            const verb = not.type === "like" ? "liked" : "commented on";
            const time = format(not.createdAt);
            const iconColor = not.read ? "primary" : "secondary";
            const icon =
               not.type === "like" ? (
                  <Favorite color={iconColor} style={{ marginRight: 10 }} />
               ) : (
                  <Chat color={iconColor} style={{ marginRight: 10 }} />
               );
            return (
               <MenuItem key={not.createdAt} onClick={handleClose}>
                  {icon}
                  <Typography
                     component={Link}
                     variant="body1"
                     color={iconColor}
                     to={`/users/${not.recipient}/post/${not.postId}`}
                  >
                     {not.sender} {verb} your post {time}
                  </Typography>
               </MenuItem>
            );
         })
      ) : (
         <MenuItem onClick={handleClose}>
            You have no notifications yet.
         </MenuItem>
      );
   return (
      <Fragment>
         <Tooltip placement="top" title="Notifications">
            <IconButton
               aria-owns={anchorEl ? "simple menu" : undefined}
               aria-haspopup="true"
               aria-controls="not-menu"
               onClick={handleOpen}
            >
               {notificationIcon}
            </IconButton>
         </Tooltip>
         <Menu
            anchorEl={anchorEl}
            id="not-menu"
            open={Boolean(anchorEl)}
            onClose={handleClose}
            style={{ marginTop: 50 }}
         >
            {notificationsMarkup}
         </Menu>
      </Fragment>
   );
}

export default Notifications;
