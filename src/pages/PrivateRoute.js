import React from "react";
import { Route, Navigate, Outlet, Redirect } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

// ...rest - is to pass as prop
// const PrivateRoute = () => {
//   const { isAuthenticated, user } = useAuth0();
//   const isUser = isAuthenticated && user;
//   // if "isUSser" is true then render "Outlet" if false redirect us to "Login" page
//   return isUser ? <Outlet /> : <Navigate to="/login" />;
// };
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth0();
  console.log("🚀 ~ PrivateRoute ~ user", user);
  console.log("🚀 ~ PrivateRoute ~ isAuthenticated", isAuthenticated);

  const isUser = isAuthenticated && user;

  if (!isUser) {
    return <Navigate to="/login" />;
  }
  return children;
};
// const PrivateRoute = ({ children, ...rest }) => {
//   const { isAuthenticated, user } = useAuth0();
//   const isUser = isAuthenticated && user;
//   return (
//     <Route
//       {...rest}
//       render={() => {
//         return isUser ? children : <Redirect to="/login" />;
//       }}
//     >
//       sdfdf
//     </Route>
//   );
// };
export default PrivateRoute;
