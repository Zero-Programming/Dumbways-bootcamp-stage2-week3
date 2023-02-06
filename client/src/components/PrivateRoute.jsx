import React from "react";
import { useContext } from "react";

import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

export default function PrivateRoute(props) {
  //   const DataUser = JSON.parse(localStorage.getItem("UserSignIn"));

  // const dataUser = JSON.parse(localStorage.getItem("UserSignUp"))

  const [state, dispatch] = useContext(UserContext);
  console.log(state.user.listAsRole);

  return state.user.listAsRole == "Owner" ? <Outlet /> : <Navigate to="/" />;
}
