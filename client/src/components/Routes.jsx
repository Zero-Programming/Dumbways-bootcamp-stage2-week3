import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import { useState } from "react";
import DetailProperty from "../pages/DetailProperty";
import Profile from "../pages/Profile.jsx";
import MyBooking from "../pages/MyBoking";
import Invoice from "../pages/Invoice";
import HomeOwner from "../pages/HomeOwner";
import AddProperty from "../pages/AddProperty";
import PrivateRoute from "./PrivateRoute";
import { API, setAuthToken } from "../config/api";
import { useEffect } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

export default function RoutesPage() {

  const navigate = useNavigate();

  const [state, dispatch] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Redirect Auth
    if (state.isLogin == false && !isLoading) {
      navigate("/");
    } else {
      if (!isLoading) {
        if (state.user.listAsRole == "Owner") {
          navigate("/home-owner");
        } else if (state.user.listAsRole == "Tenant") {
          navigate("/");
        }
      }
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      console.log(response.data.data);

      let payload = response.data.data;
      // console.log(response.data);

      // Send data to useContext
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
      console.log(state);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      checkUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  console.log(state.user);

  return (
    <>
      {isLoading ? (
        <></>
      ) : (
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detail-property/:id" element={<DetailProperty book />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/my-booking/:id" element={<MyBooking />} />
            <Route path="/history/" element={<Invoice />} />
            <Route path="/home-owner" element={<HomeOwner />} />
            <Route element={<PrivateRoute />}>
              <Route path="/add-property" element={<AddProperty />} />
            </Route>
          </Routes>
        </>
      )}
    </>
  );
}
