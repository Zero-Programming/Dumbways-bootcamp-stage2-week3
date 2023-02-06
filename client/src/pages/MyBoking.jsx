import React, { useContext, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarProject from "../components/NavbarProject";
import Icon from "../components/Icon.svg";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import Elipse from "../assets/img/Ellipse 7.png";
import Elipsee from "../assets/img/Ellipse 8.png";
import Line from "../assets/img/Line 9.png";
import NoteImg from "../assets/img/note.png";
import Modal from "react-bootstrap/Modal";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/userContext";

function PayModal(props) {
  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Body>
        <p>
          Pembayaran Anda Akan di Konfirmasi dalam 1 x 24 Jam Untuk melihat pesanan{" "}
          <Button onClick={props.onHide} className="btn btn-dark bg-white text-primary fw-bold p-0 m-0 border-0">
            Disini
          </Button>
          Terimakasih
        </p>
      </Modal.Body>
    </Modal>
  );
}

export default function DetailProperty(props) {
  const Results = () => (
    <Button
      onClick={() => {
        setModalShow(true);
      }}
      style={{ width: "200px" }}
    >
      Pay
    </Button>
  );

  const [modalShow, setModalShow] = React.useState(false);
  useEffect(() => {
    document.body.style.background = "rgba(196, 196, 196, 0.25)";
  });

  const [state, dispatch] = useContext(UserContext);

  console.log(state);

  const { id } = useParams();
  return (
    <>
      <NavbarProject userSignIn={props.userSignIn} setUserSignIn={props.setUserSignIn} />
      <Container className="myc fmb" style={{ width: "60%", marginTop: "200px" }}>
        <div className="border border-3 p-4 pe-0 pb-0">
          <Row style={{}} className="d-flex jcb">
            <Col className="" md="auto" lg={4}>
              <img src={Icon} alt="" />
            </Col>
            <Col className="" md="auto" lg={4}>
              <h2 className="text-center p-0 m-0 fw-bold">Booking</h2>
              <p className="text-center p-0 m-0"></p>
            </Col>
          </Row>
          <Row style={{}} className="d-flex jcb align-items-center pb-3">
            <Col className="" md="auto" lg={4}>
              <h5 className="fw-bold">House Astina</h5>
              <p></p>
              <p className="bg-danger w-50 text-center p-1 bg-opacity-10 text-danger">Waiting Payment</p>
            </Col>
            <Col className="" md="auto" lg={4}>
              <div className="d-flex flex-column ">
                <div className="d-flex  align-items-center gap-4">
                  <div>
                    <img src={Elipse} alt="" />
                  </div>
                  <div className="d-flex flex-column">
                    <span>Check-in</span>
                    <span></span>
                  </div>
                  <div className="ms-3 d-flex flex-column">
                    <span>Amenities</span>
                    <span></span>
                  </div>
                </div>

                <div className="d-flex ">
                  <img style={{ marginLeft: "6px" }} src={Line} alt="" />
                </div>
                <div className="d-flex  align-items-center gap-4">
                  <div>
                    <img src={Elipsee} alt="" />
                  </div>

                  <div className="d-flex flex-column ">
                    <span>Check-Out</span>
                    <span></span>
                  </div>
                  <div className="ms-3 d-flex flex-column ">
                    <span>Type of Rent</span>
                    <span></span>
                  </div>
                </div>
              </div>
            </Col>
            <Col className="d-flex flex-column justify-content-center align-items-center gap-2" md="auto" lg={4}>
              <img src={NoteImg} alt="" style={{ width: 150 }} />
              <Button
                type="submit"
                //onSubmit={handleChangePhoto}
                className="position-relative p-0 m-0 bg text-dark bd"
                variant="outline-primary"
              >
                <input
                  className="d-block position-absolute h-100 w-100"
                  id="formFile"
                  type="file"
                  name="image"
                  //         onChange={handleChangePhoto}
                  style={{ cursor: "pointer", opacity: 0 }}
                />
                <span className="d-block py-2 px-3">Upload Image</span>
              </Button>
            </Col>
          </Row>
          <Row className="d-flex">
            <Row>
              <Col className="d-flex" md="auto" lg={8}>
                <Col className="d-flex align-items-center" md="auto" lg={1}>
                  <p className="m-0 py-2">No</p>
                </Col>
                <Col className="d-flex align-items-center" md="auto" lg={3}>
                  <p className="m-0">Full Name</p>
                </Col>
                <Col className="d-flex align-items-center" md="auto" lg={3}>
                  <p className="m-0">Gender</p>
                </Col>
                <Col className="d-flex align-items-center" md="auto" lg={3}>
                  <p className="m-0">Phone</p>
                </Col>
              </Col>
            </Row>
            <Row className="border border-start-0 border-end-0  ">
              <Col className="d-flex" lg={8}>
                <Col className="d-flex align-items-center" md="auto" lg={1}>
                  <p className="m-0">{id}</p>
                </Col>
                <Col className="d-flex align-items-center" md="auto" lg={3}>
                  <p className="m-0"></p>
                </Col>
                <Col className="d-flex align-items-center" md="auto" lg={3}>
                  <p className="m-0"></p>
                </Col>
                <Col className="d-flex align-items-center" md="auto" lg={3}>
                  <p className="m-0"></p>
                </Col>
              </Col>
              <Col className="d-flex align-items-center">
                <p className="ps-3 m-0">Long time rent</p>
              </Col>
              <Col className="d-flex align-items-center">
                <p className="m-0 py-2">: </p>
              </Col>
            </Row>
            <Row className="justify-content-end">
              <Col className="d-flex align-items-center" lg={2}>
                <p className=" m-0 ps-3 py-2">Total</p>
              </Col>
              <Col className="d-flex align-items-center" lg={2}>
                <p className="m-0 text-danger fw-bold">: </p>
              </Col>
            </Row>
          </Row>
        </div>
        <div className="d-flex justify-content-end">
          {!localStorage.getItem("statusPay") ? <Results /> : null}
          <PayModal
            show={modalShow}
            onHide={() => {
              setModalShow(false);
              localStorage.setItem("statusPay", "Success!");
            }}
          />
        </div>
      </Container>
    </>
  );
}
