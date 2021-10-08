import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import jwtDecode from "jwt-decode";
import AuthRoute from "./utils/AuthRoute";
import themeObject from "./utils/theme";
//redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";
import axios from "axios";
import { createTheme, MuiThemeProvider } from "@material-ui/core";
import User from "./pages/User";
import Chat from "./pages/Chat";

const theme = createTheme(themeObject);

axios.defaults.baseURL =
   "https://asia-south1-social-media-a38ca.cloudfunctions.net/api";

const token = localStorage.FBIdToken;
if (token) {
   const decodedToken = jwtDecode(token);
   if (decodedToken.exp * 1000 < Date.now()) {
      window.location.href = "/login";
      store.dispatch(logoutUser());
   } else {
      store.dispatch({ type: SET_AUTHENTICATED });
      axios.defaults.headers.common["Authorization"] = token;
      store.dispatch(getUserData());
   }
}

function App() {
   return (
      <MuiThemeProvider theme={theme}>
         <Provider store={store}>
            <Router>
               <Navbar />
               <div className="container">
                  <Switch>
                     <Route exact path="/" component={Home} />
                     <AuthRoute path="/login" component={Login} />
                     <AuthRoute path="/signup" component={Signup} />
                     <Route path="/chat" component={Chat} />
                     <Route exact path="/users/:handle" component={User} />
                     <Route
                        exact
                        path="/users/:handle/post/:postId"
                        component={User}
                     />
                  </Switch>
               </div>
            </Router>
         </Provider>
      </MuiThemeProvider>
   );
}

export default App;
