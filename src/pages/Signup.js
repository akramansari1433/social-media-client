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
import { signupUser } from "../redux/actions/userActions";

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

export default function Signup() {
   const dispatch = useDispatch();
   const {
      UI: { errors, loading },
   } = useSelector((state) => state);
   const classes = useStyle();
   const [email, setEmail] = useState();
   const [password, setPassword] = useState();
   const [confirmPassword, setConfirmPassword] = useState();
   const [handle, setHnadle] = useState();
   const history = useHistory();

   const handleSubmit = (e) => {
      e.preventDefault();
      const newUserData = {
         email,
         password,
         confirmPassword,
         handle,
      };
      dispatch(signupUser(newUserData, history));
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
               <Typography variant="h2">Signup</Typography>
               <form onSubmit={handleSubmit} className={classes.form}>
                  <TextField
                     variant="outlined"
                     label="Email"
                     type="email"
                     helperText={errors.email}
                     error={errors.email ? true : false}
                     onChange={(e) => setEmail(e.target.value)}
                     className={classes.textField}
                     required
                  />
                  <TextField
                     variant="outlined"
                     label="Password"
                     type="password"
                     helperText={errors.password}
                     error={errors.password ? true : false}
                     onChange={(e) => setPassword(e.target.value)}
                     className={classes.textField}
                     required
                  />
                  <TextField
                     variant="outlined"
                     label="Confirm Password"
                     type="password"
                     helperText={errors.password}
                     error={errors.password ? true : false}
                     onChange={(e) => setConfirmPassword(e.target.value)}
                     className={classes.textField}
                     required
                  />
                  <TextField
                     variant="outlined"
                     label="Handle"
                     type="text"
                     helperText={errors.handle}
                     error={errors.handle ? true : false}
                     onChange={(e) => setHnadle(e.target.value)}
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
                        "Signup"
                     )}
                  </Button>
                  <p>
                     Already have an account? Login{" "}
                     <Link to="/login">here</Link>
                  </p>
               </form>
            </Grid>
         </Grid>
      </div>
   );
}
