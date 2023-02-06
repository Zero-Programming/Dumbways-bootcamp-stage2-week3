// import React, { useState } from "react";

// export default function StateFunc() {
//   const [data, setData] = useState({ email: "", username: "", password: "" });

//   const handleOnChange = (e) => {
//     setData({
//       ...data,
//       [e.target.name]: e.target.value,
//     });
//     console.log(data);
//   };

//   const handleOnSubmit = (e) => {
//     e.preventDefault();
//     console.log(data);
//   };

//   return (
//     <form onSubmit={handleOnSubmit}>
//       <div>
//         <label htmlFor="email">EMAIL</label>
//         <input type="email" id="email" name="email" onChange={handleOnChange} />
//       </div>
//       <div>
//         <label htmlFor="username">USERNAME</label>
//         <input type="text" id="username" name="username" onChange={handleOnChange} />
//       </div>
//       <div>
//         <label htmlFor="password">PASSWORD</label>
//         <input type="password" id="password" name="password" onChange={handleOnChange} />
//       </div>
//       <button type="submit">Submit</button>
//     </form>
//   );
// }

// import React, { useState, useEffect } from "react";

// export default function EffectFunc() {
//   const [user, setUser] = useState({
//     isLogin: false,
//     user: {
//       email: "",
//       password: "",
//     },
//   });

//   // did mount
//   useEffect(() => {
//     console.log("Effect Func Did Mount");
//     return console.log("Effect Func Will Unmount");
//   }, []);

//   // did update
//   useEffect(() => {
//     console.log("Effect Func Did Update");
//     console.log(user);
//   }, [user]);

//   const handleOnSubmit = (e) => {
//     e.preventDefault();
//     const email = document.getElementById("email").value;
//     const password = document.getElementById("password").value;
//     setUser({
//       isLogin: true,
//       user: {
//         email,
//         password,
//       },
//     });
//   };

//   return (
//     <form onSubmit={handleOnSubmit}>
//       {user.isLogin ? <h1>You're already logged in!</h1> : <h1>You're not logged in!</h1>}
//       <div>
//         <label htmlFor="email">EMAIL</label>
//         <input type="email" id="email" name="email" />
//       </div>
//       <div>
//         <label htmlFor="password">PASSWORD</label>
//         <input type="password" id="password" name="password" />
//       </div>
//       <button type="submit">Submit</button>
//     </form>
//   );
// }

import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

export default function DetailUser() {
  const [data, setData] = useState(null);

  const params = useParams();

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/photos/${params.id}`)
      .then((response) => response.json())
      .then((json) => setData(json));
    return console.log(data);
  }, []);

  return (
    <Container className="text-center">
      <h1>Image profile punya lu cuy!</h1>
      <h2>{data?.title}</h2>
      <h3>{params.id}</h3>
      <img src={data?.thumbnailUrl} alt={data?.title} />
    </Container>
  );
}

import React from "react";

import { Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import DetailUser from "./pages/DetailUser";



e
