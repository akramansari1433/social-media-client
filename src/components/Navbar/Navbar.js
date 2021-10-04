import {
   AppBar,
   Button,
   Dialog,
   DialogActions,
   DialogTitle,
   IconButton,
   makeStyles,
   Toolbar,
   Tooltip,
} from "@material-ui/core";
import { ExitToApp, Home } from "@material-ui/icons";
import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../redux/actions/userActions";
import Notifications from "./Notifications";

const useStyle = makeStyles({
   navContainer: {
      margin: "auto",
      "& SVG": {
         color: "#fff",
      },
   },
});

export default function Navbar() {
   const dispatch = useDispatch();
   const classes = useStyle();
   const { authenticated } = useSelector((state) => state.user);
   const [open, setOpen] = useState(false);

   const handleOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };

   const handleSubmit = () => {
      dispatch(logoutUser());
      setOpen(false);
   };

   return (
      <div>
         <AppBar position="fixed">
            <Toolbar className={classes.navContainer}>
               {authenticated ? (
                  <Fragment>
                     <Tooltip title="Home" placement="top">
                        <Link to="/">
                           <IconButton>
                              <Home />
                           </IconButton>
                        </Link>
                     </Tooltip>

                     <Notifications />

                     <Tooltip title="Logout" placement="top">
                        <IconButton onClick={handleOpen}>
                           <ExitToApp color="secondary" />
                        </IconButton>
                     </Tooltip>
                     <Dialog
                        open={open}
                        onClose={handleClose}
                        fullWidth
                        maxWidth="xs"
                     >
                        <DialogTitle>Are you sure want logout?</DialogTitle>
                        <DialogActions>
                           <Button
                              onClick={handleClose}
                              color="primary"
                              variant="outlined"
                           >
                              Cancel
                           </Button>
                           <Button
                              onClick={handleSubmit}
                              color="secondary"
                              variant="outlined"
                           >
                              Logout
                           </Button>
                        </DialogActions>
                     </Dialog>
                  </Fragment>
               ) : (
                  <Fragment>
                     <Button color="inherit" component={Link} to="/login">
                        Login
                     </Button>
                     <Button color="inherit" component={Link} to="/">
                        Home
                     </Button>
                     <Button color="inherit" component={Link} to="/signup">
                        Signup
                     </Button>
                  </Fragment>
               )}
            </Toolbar>
         </AppBar>
      </div>
   );
}
