import React from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";
import { Alert } from "bootstrap";
import { useMutation } from "react-query";
import { useState } from "react";
import { API } from "../config/api";
import { useContext } from "react";
import { UserContext } from "../context/userContext";

export default function SignIn(props) {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  const [userSignIn, setUserSignIn] = useState({
    userName: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setUserSignIn({
      ...userSignIn,
      [e.target.name]: e.target.value,
    });
  };

  // Create function for handle insert data process with useMutation here ...
  const handleOnSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const response = await API.post("/sign-in", userSignIn);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: response.data.data,
      });
      alert("login succses!");
      props.onHide();
    } catch (error) {
      alert("email or password wrong!");
      console.log(error);
    }
  });

  const redirectSignup = () => {
    props.onHide();
    props.openSignup();
  };

  return (
    <Modal {...props} size="sm" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Body>
        <h3 className="fw-bold text-center my-5">Sign In</h3>
        <Form onSubmit={(e) => handleOnSubmit.mutate(e)}>
          <Form.Group className="mb-3" controlId="userName">
            <Form.Label className="fw-bold">Username</Form.Label>
            <Form.Control type="text" placeholder="Enter Username" name="userName" value={userSignIn.userName} onChange={handleOnChange} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label className="fw-bold">Password</Form.Label>
            <Form.Control type="password" placeholder="Password" name="password" value={userSignIn.password} onChange={handleOnChange} />
          </Form.Group>

          <Button className="w-100" variant="primary" type="submit">
            Submit
          </Button>
          <Form.Text className="text-muted">
            Dont have an account? click{" "}
            <span
              onClick={(e) => {
                redirectSignup(e);
              }}
              className="btn btn-link px-1 py-0"
            >
              Here
            </span>
          </Form.Text>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
