import React, { Component } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import AdminTableRow from "./AdminTableRow";
//import { string } from "prop-types";
import Auth from "../Auth";

export default class AdminList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      admins: [],
    };

    //const { match: { router } } = this.props;
    console.log("router" + this.props.laruta);
    this.ruta = this.props.laruta;
  }

  componentDidMount() {
    axios
      .get("http://" + this.ruta + "/admin", {
        headers: { Authorization: `Bearer ${Auth.getTokenId()}` },
      })
      //axios.get('http://localhost:8000/acreditacion/admin/')
      .then((res) => {
        if (res.data.results === false) {
          alert("Tiempo de sessión expirado.");
          this.props.history.push("/login/");
        } else {
          this.setState({
            admins: res.data.admins,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  DataTable() {
    return this.state.admins.map((res, i) => {
      return <AdminTableRow obj={res} key={i} laruta={this.ruta} />;
    });
  }

  render() {
    return (
      <div className="table-wrapper">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
            </tr>
          </thead>
          <tbody>{this.DataTable()}</tbody>
        </Table>
      </div>
    );
  }
}
