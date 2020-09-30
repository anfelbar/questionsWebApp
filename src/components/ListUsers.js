import React, { Component } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import UsersTableRow from "./UsersTableRow";
//import { string } from "prop-types";
import Auth from "../Auth";

export default class UsersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuarios: [],
    };
    this.ruta = this.props.laruta;
  }

  componentDidMount() {
    axios
      .get("http://" + this.ruta + "/laspreguntas/listausuarios", {
        headers: { Authorization: `Bearer ${Auth.getTokenId()}` },
      })
      //axios.get('http://localhost:8000/acreditacion/laspreguntas/usuarios')
      .then((res) => {
        if (res.data.results === false) {
          alert("Tiempo de sessión expirado.");
          this.props.history.push("/login/");
        } else {
          this.setState({
            usuarios: res.data,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  DataTable() {
    return this.state.usuarios.map((res, i) => {
      return <UsersTableRow obj={res} key={i} />;
    });
  }

  render() {
    return (
      <div className="table-wrapper">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Correo</th>
              <th>Puntaje</th>
              <th>Tiempo</th>
              <th>Time Respuestas</th>
              {/* <th>Error Respuestas</th> */}
            </tr>
          </thead>
          <tbody>{this.DataTable()}</tbody>
        </Table>
      </div>
    );
  }
}
