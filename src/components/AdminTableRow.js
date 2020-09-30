import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router-dom";
import Auth from "../Auth";

export default class AdminTableRow extends Component {
  constructor(props) {
    super(props);
    this.deleteAdmin = this.deleteAdmin.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      back: false,
    };
    this.ruta = this.props.laruta;
  }

  deleteAdmin() {
    axios
      .delete(
        "http://" + this.ruta + "/admin/delete-admin/" + this.props.obj._id,
        {
          headers: { Authorization: `Bearer ${Auth.getTokenId()}` },
        }
      )
      //axios.delete('http://localhost:8000/acreditacion/admin/delete-admin/' + this.props.obj._id)
      .then((res) => {
        if (res.data.results === false) {
          alert("Tiempo de sessión expirado.");
          this.props.history.push("/login/");
        } else {
          //console.log("Admin successfully deleted!");
          this.setState({ back: true });
        }
      })
      .catch((error) => {
        console.log(error);
      });

    // this.props.history.push('/list-questions')
  }

  onSubmit(e) {
    e.preventDefault();

    console.log("borrando y redireccionando " + this.props);
    // this.props.history.push('/list-questions')
  }

  render() {
    if (this.state.back) {
      return <Redirect to="/list-admin"></Redirect>;
    }
    return (
      <tr>
        <td>{this.props.obj.nombre}</td>
        <td>{this.props.obj.email}</td>
        <td>
          <Link className="edit-link" to={"/edit-admin/" + this.props.obj._id}>
            Edit
          </Link>

          <Button onClick={this.deleteAdmin} size="sm" variant="primary">
            Delete
          </Button>
        </td>
      </tr>
    );
  }
}
