import React, { useEffect } from "react";

import Filter from "../components/Filter";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import ContentData from "../components/ContentData";
import NavbarProject from "../components/NavbarProject";

export default function Home(props) {
  return (
    <>
      <NavbarProject/>
      <Row className="po">
        <Filter />
        <ContentData />
      </Row>
    </>
  );
}
