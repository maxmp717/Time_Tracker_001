import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
// import SignIn from "layouts/authentication/sign-in/SignIn";
import SignIn from "./layouts/authentication/sign-in";
import SignUp from "./layouts/authentication/sign-up";
import Resetpwd from "./layouts/authentication/resetpwd";
import Forgotpwd from "./layouts/authentication/forgotpwd";
import Protected from "./layouts/authentication/Producted";
import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import { setCurrentUser, logoutUser } from "./actions/authAction";
import routes from "./routes";
import { useMaterialUIController } from "./context";
import theme from "./assets/theme";
// Images
import themeDark from "./assets/theme-dark";
import brandWhite from "./assets/images/logo-ct.png";
import brandDark from "./assets/images/logo-ct-dark.png";
import Dashboard from "./layouts/dashboard";
import Tables from "./layouts/tables";
import Auth from "./Auth";
import setAuthToken from "./utils/setAuthToken";
import store from "./store";
import AdminReport from "./layouts/AdminReport";
import BillingReport from "./layouts/Billing-report";
import Edit from "./layouts/Billing-report/Edit";
import BillingTable from "./layouts/Billing-Table";
import CreateTeam from "./layouts/create-team";
import Profile from "./layouts/profile";
import UserReport from "./layouts/UserReport";


function App() {
  const [controller] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const role = useSelector(state=>state.auth.user.role);
  // console.log(role);
  useEffect(() => {
    if (localStorage.jwtToken) {
      // Set auth token header auth
      const token = localStorage.jwtToken;
      setAuthToken(token);
      // Decode token and get user info and exp
      const decoded = jwt_decode(token);
      // Set user and isAuthenticated
      store.dispatch(setCurrentUser(decoded));
      // Check for expired token
      const currentTime = Date.now() / 1000; // to get in milliseconds
      if (decoded.exp < currentTime) {
        // Logout user
        store.dispatch(logoutUser());

        // Redirect to login
        window.location.href = "./sign-in";
      }
    }
  }, []);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }
      if (route.route) {
        return (
          <Route
            key={route.route}
            exact
            path={route.route}
            element={<Protected isValid={(isLoggedIn&&role==='admin')}>{route.component}</Protected>}
          />
        );
      }

      return null;
    });

  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      {isLoggedIn ? <Auth /> : ""}
      <Routes>
        <Route exact path={"/auth"} element={<Auth/>}/>
        <Route exact path="/authentication/sign-in" element={<SignIn />} />
        <Route exact path="/authentication/sign-up" element={<SignUp />} />
        <Route exact path="/authentication/reset/:token" element={<Resetpwd />} />
        <Route exact path="/authentication/forgotpwd" element={<Forgotpwd />} />
        {/* {getRoutes(routes)} */}
        <Route element={<Protected isValid={isLoggedIn}/>}>
          <Route exact path="/dashboard" element={<Dashboard/>}/>
          <Route exact path="/profile" element={<Profile/>}/>
          {/* <Route exact path="/attendance" element={<Attendance/>}/> */}
        </Route>
        <Route element={<Protected isValid={(isLoggedIn&&role==='admin')}/>}>
          <Route exact path="/admin-report" element={<AdminReport/>} />
        </Route>
        <Route element={<Protected isValid={(isLoggedIn&&role==='analyst')}/>}>
          <Route exact path="/user-report" element={<UserReport/>} />
        </Route> <Route element={<Protected isValid={(isLoggedIn&&role==='admin')}/>}>
          <Route exact path="/billing-report" element={<BillingReport />} />
          <Route exact path="/billing-report/edit/:id" element={<Edit/>} />
          <Route exact path="/billing-Table" element={<BillingTable />} />
          <Route exact path="/create-team" element={<CreateTeam />} />
        </Route>
        {isLoggedIn ? (
          <Route exact path="*" element={<Navigate to="/dashboard" />} />
        ) : (
          <Route exact path="/" element={<Navigate to="/authentication/sign-in" />} />
        )}
        <Route exact path={"/sign"} element={<SignIn/>}/>
      </Routes>
    </ThemeProvider>
  );
}
export default App;
