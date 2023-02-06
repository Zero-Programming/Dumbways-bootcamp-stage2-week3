import Container from "react-bootstrap/esm/Container";
import Table from "react-bootstrap/Table";
import NavbarProject from "../components/NavbarProject";
import magnifiyIc from "../assets/img/magnifiyIc.svg";
import { useEffect } from "react";

function HomeOwner(props) {
  useEffect(() => {
    document.body.style.background = "rgba(196, 196, 196, 0.25)";
  });

  return (
    <>
      <NavbarProject />
      <Container style={{ marginTop: "200px" }}>
        
        <h1>Incoming Transaction</h1>
        <Table className="" striped hover>
          <thead>
            <tr>
              <th>No</th>
              <th>Users</th>
              <th>Type of Rent</th>
              <th>Bukti Transfer</th>
              <th>Status Payment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {((e, i) => {
              return (
                <tr>
                  <td className="py-3">{e.no}</td>
                  <td className="py-3">{e.user}</td>
                  <td className="py-3">{e.period}</td>
                  <td className="py-3">{e.tfProf}</td>
                  <td className={e.status === "Approve" ? "text-success" : e.status === "Pending" ? "text-warning" : "text-danger"}>{e.status}</td>
                  <td className="py-3">
                    <img src={magnifiyIc} alt="magnify" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default HomeOwner;
