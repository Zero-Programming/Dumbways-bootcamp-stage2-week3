import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export default function ChangePassword(props) {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Body className="m-4 mt-0">
        <h3 className="fw-bold text-center my-5">Change Password</h3>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label className="fw-bold">Old Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name="password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label className="fw-bold">Confirm Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name="password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label className="fw-bold">New Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name="password" />
        </Form.Group>
        <Button className="w-100">Save</Button>
      </Modal.Body>
    </Modal>
  );
}
