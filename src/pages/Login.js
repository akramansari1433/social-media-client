import {
   Button,
   CircularProgress,
   Grid,
   makeStyles,
   TextField,
   Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import AppIcon from "../Images/icon.png";
//redux
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/actions/userActions";

const useStyle = makeStyles({
   textField: {
      margin: "15px 0",
      width: 300,
   },
   grid: {
      textAlign: "center",
   },
   form: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
   },
   button: {
      margin: "20px 0",
      width: 200,
      height: 40,
      position: "relative",
   },
   error: {
      color: "red",
   },
   progress: {
      position: "absolute",
   },
});

function Login() {
   const {
      UI: { loading, errors },
   } = useSelector((state) => state);
   const classes = useStyle();
   const [email, setEmail] = useState();
   const [password, setPassword] = useState();
   const dispatch = useDispatch();
   const history = useHistory();

   const handleSubmit = (e) => {
      e.preventDefault();
      const userData = {
         email,
         password,
      };
      dispatch(loginUser(userData, history));
   };

   return (
      <div>
         <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
         >
            <Grid item sm className={classes.grid}>
               <img src={AppIcon} alt="icon" />
               <Typography variant="h2">Login</Typography>
               <form onSubmit={handleSubmit} className={classes.form}>
                  <TextField
                     variant="outlined"
                     label="Email"
                     type="email"
                     onChange={(e) => setEmail(e.target.value)}
                     className={classes.textField}
                     required
                  />
                  <TextField
                     variant="outlined"
                     label="Password"
                     type="password"
                     onChange={(e) => setPassword(e.target.value)}
                     className={classes.textField}
                     required
                  />
                  {errors.general && (
                     <Typography variant="body2" className={classes.error}>
                        {errors.general}
                     </Typography>
                  )}
                  <Button
                     type="submit"
                     variant="contained"
                     color="primary"
                     className={classes.button}
                     disabled={loading}
                  >
                     {loading ? (
                        <CircularProgress
                           className={classes.progress}
                           color="secondary"
                           size={30}
                        />
                     ) : (
                        "Login"
                     )}
                  </Button>
                  <p>
                     Don't have an account? sign up{" "}
                     <Link to="/signup">here</Link>
                  </p>
               </form>
            </Grid>
         </Grid>
      </div>
   );
}

export default Login;
