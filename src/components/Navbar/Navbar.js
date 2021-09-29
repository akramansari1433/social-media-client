import {
   AppBar,
   Button,
   IconButton,
   makeStyles,
   Toolbar,
   Tooltip,
} from "@material-ui/core";
import { Home, Notifications } from "@material-ui/icons";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const useStyle = makeStyles({
   navContainer: {
      margin: "auto",
      "& SVG": {
         color: "#fff",
      },
   },
});

export default function Navbar() {
   const classes = useStyle();
   const { authenticated } = useSelector((state) => state.user);
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

                     <Tooltip title="Notifications" placement="top">
                        <IconButton>
                           <Notifications />
                        </IconButton>
                     </Tooltip>
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
