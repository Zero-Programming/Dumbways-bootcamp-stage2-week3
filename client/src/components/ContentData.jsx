import React from "react";
import Col from "react-bootstrap/esm/Col";
import "../styles/style.css";
// import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { API } from "../config/api";

export default function ContentData() {
  const navigate = useNavigate();
  let { data: houses } = useQuery("housesCache", async () => {
    const response = await API.get("/houses");
    return response.data.data;
  });

  console.log(houses);
  return (
    <>
      <Col className="d-flex p-0" style={{ marginLeft: "370px" }}>
        <div className="ms-1 w100" style={{ paddingTop: "105px" }}>
          <div className="d-flex warp gap-3 w100">
            {houses?.map((value, index) => {
              return (
                <Card key={index} className="wc p-2 mb-1  d-flex selector-for-some-widget overflow-hidden gap-3">
                  {/* <Link to={"/detail-property/" + index + 1}> */}
                  {/* <span className="position-absolute px-3 py-1 bg-white rounded-2 fs10 mt-2 ms-2">{value.amenities}</span> */}
                  <div className="position-absolute mt-3 ms-1 d-flex gap-2">
                    {value.amenities.map((amenity, idk) => (
                      <span key={idk} className="px-3 py-1 bg-white rounded-2 fs10">
                        {amenity}
                      </span>
                    ))}
                  </div>

                  <Card.Img onClick={() => navigate(`/detail-property/${value.id}`)} className="pb-1 imgc" variant="top" src={value.image} />
                  {/* </Link> */}
                  <Card.Body className=" bs m-0 p-0 d-flex flex-column gap-1">
                    <Card.Title className="fs16 fw-bold m-0 p-0">
                      {value.price} / {value.type_rent}
                    </Card.Title>
                    <Card.Text className="fs10 m-0 p-0 fw-semibold">{value.bedroom + " beds, " + value.bathroom + " Baths, "}</Card.Text>
                    <Card.Text className="fs10 m-0 p-0 lh-lg text-secondary fw-semibold">{value.address}</Card.Text>
                  </Card.Body>
                </Card>
              );
            })}
          </div>
        </div>
      </Col>
    </>
  );
}
