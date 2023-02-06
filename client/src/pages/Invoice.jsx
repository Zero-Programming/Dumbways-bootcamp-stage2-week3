import React, { useEffect } from "react";
import NavbarProject from "../components/NavbarProject";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Icon from "../components/Icon.svg";
import Elipse from "../assets/img/Ellipse 7.png";
import Elipsee from "../assets/img/Ellipse 8.png";
import Line from "../assets/img/Line 9.png";
import Button from "react-bootstrap/esm/Button";
import CodeQr from "../assets/img/qr-code.png";
import { useParams } from "react-router-dom";

export default function Invoice(props) {
  useEffect(() => {
    document.body.style.background = "rgba(196, 196, 196, 0.25)";
  });

  const Data = JSON.parse(localStorage.getItem("Data"));
  const getData = JSON.parse(localStorage.getItem("Date"));
  const Profile = JSON.parse(localStorage.getItem("UserSignUp"));
  console.log(Data.amenities);
  return (
    <>
      <NavbarProject userSignIn={props.userSignIn} setUserSignIn={props.setUserSignIn} />;
      <Container className="myc fmb" style={{ width: "60%", marginTop: "200px" }}>
        <div className="border border-3 p-4 pe-0 pb-0">
          <Row style={{}} className="d-flex jcb">
            <Col className="" md="auto" lg={4}>
              <img src={Icon} alt="" />
            </Col>
            <Col className="" md="auto" lg={4}>
              <h2 className="text-center p-0 m-0 fw-bold">Booking</h2>
              <p className="text-center p-0 m-0">{getData.check_in}</p>
            </Col>
          </Row>
          <Row style={{}} className="d-flex jcb align-items-center pb-3">
            <Col className="" md="auto" lg={4}>
              <h5 className="fw-bold">House Astina</h5>
              <p>{Data.address}</p>
              <p className="bg-success w-50 text-center p-1 bg-opacity-10 text-success">Approve</p>
            </Col>
            <Col className="" md="auto" lg={4}>
              <div className="d-flex flex-column ">
                <div className="d-flex  align-items-center gap-4">
                  <div>
                    <img src={Elipse} alt="" />
                  </div>
                  <div className="d-flex flex-column">
                    <span>Check-in</span>
                    <span>{getData.check_in}</span>
                  </div>
                  <div className="ms-3 d-flex flex-column">
                    <span>Amenities</span>
                    <span>{Data.amenities}</span>
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
                    <span>{getData.check_out}</span>
                  </div>
                  <div className="ms-3 d-flex flex-column ">
                    <span>Type of Rent</span>
                    <span>{Data.rent}</span>
                  </div>
                </div>
              </div>
            </Col>
            <Col className="d-flex flex-column justify-content-center align-items-center gap-2" md="auto" lg={4}>
              <img src={CodeQr} alt="" style={{ width: 150 }} />
              <Button
                type="submit"
                //onSubmit={handleChangePhoto}
                className="position-relative p-0 m-0 bg text-dark bd"
                variant="outline-primary"
              ></Button>
              {/* <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>upload proof of payment</Form.Label>
              <Form.Control type="file" />
            </Form.Group> */}
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
                  <p className="m-0">1</p>
                </Col>
                <Col className="d-flex align-items-center" md="auto" lg={3}>
                  <p className="m-0">{Profile.fullName}</p>
                </Col>
                <Col className="d-flex align-items-center" md="auto" lg={3}>
                  <p className="m-0">{Profile.gendre}</p>
                </Col>
                <Col className="d-flex align-items-center" md="auto" lg={3}>
                  <p className="m-0">{Profile.phone}</p>
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
                <p className="m-0 text-success fw-bold">: {Data.price}</p>
              </Col>
            </Row>
          </Row>
        </div>
      </Container>
    </>
  );
}
