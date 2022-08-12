import React from "react";
import { Dashboard, Login, PrivateRoute, AuthWrapper, Error } from "./pages";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <AuthWrapper>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Error />} />
        <Route
          path="/"
          // private route should be inside "element" and the thing we want to be privat must be inside component "Private route"
          element={
            <PrivateRoute>
              <Dashboard />{" "}
            </PrivateRoute>
          }
        ></Route>
        {/* <PrivateRoute> */}
        {/* </PrivateRoute> */}
      </Routes>
    </AuthWrapper>
  );
}

export default App;
