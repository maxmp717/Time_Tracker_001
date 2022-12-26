// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Resetpwd from "layouts/authentication/resetpwd";
import Forgotpwd from "layouts/authentication/forgotpwd";
import UserReport from "layouts/UserReport";
import AdminReport from "layouts/AdminReport";
import BillingReport from "layouts/Billing-report";
import BillingTable from "layouts/Billing-Table";
// import CreateTeam from "layouts/create-team";
// import Edit from 'layouts/Billing-report/Edit'
// import Attendance from "layouts/Attendance";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
    role: "open",
  },

  {
    type: "collapse",
    name: "UserReport",
    key: "user-report",
    icon: <Icon fontSize="small">leaderboard</Icon>,
    route: "/user-report",
    component: <UserReport />,
    role: "analyst",
  },
  {
    type: "collapse",
    name: "Team Report",
    key: "admin-report",
    icon: <Icon fontSize="small">switch_account</Icon>,
    route: "/admin-report",
    component: <AdminReport />,
    role: "admin",
  },
  {
    type: "collapse",
    name: "Billing Entry",
    key: "billing-report",
    icon: <Icon fontSize="small">create_new_folder</Icon>,
    route: "/billing-report",
    component: <BillingReport />,
    role: "admin",
  },
  // {
  //   type: "collapse",
  //   name: "BillingReport",
  //   key: "billing-report",
  //   icon: <Icon fontSize="small">trending_up</Icon>,
  //   route: "/billing-report",
  //   component: <BillingReport />,
  //   role: "admin",
  // },
  // {
  //   key:"editReport",
  //   route: "/billing-report/edit",
  //   component: <Edit />,
  //   role: "admin",
  // },
  {
    type: "collapse",
    name: "Billing Report",
    key: "billing-Table",
    icon: <Icon fontSize="small">trending_up</Icon>,
    route: "/billing-Table",
    component: <BillingTable />,
    role: "admin",
  },
  // {
  //   type: "collapse",
  //   name: "Create Team",
  //   key: "create-team",
  //   icon: <Icon fontSize="small">groups</Icon>,
  //   route: "/create-team",
  //   component: <CreateTeam />,
  //   role: "admin",
  // },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
  {
    type: "collapse",
    name: "Resetpwd",
    key: "resetpwd",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/reset/:token",
    component: <Resetpwd />,
  },
  {
    type: "collapse",
    name: "Forgotpwd",
    key: "forgotpwd",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/forget",
    component: <Forgotpwd />,
  },
];

export default routes;
