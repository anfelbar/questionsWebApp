import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Auth from "../Auth";

export default class EditAdmin extends Component {
  constructor(props) {
    super(props);
    this.onChangeNombre = this.onChangeNombre.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      back: false,
      nombre: "",
      email: "",
    };
    this.ruta = this.props.laruta;
  }

  componentDidMount() {
    //console.log("editing admin mount "+this.props.match.params.id);
    axios
      .get(
        "http://" +
          this.ruta +
          "/admin/edit-admin/" +
          this.props.match.params.id,
        {
          headers: { Authorization: `Bearer ${Auth.getTokenId()}` },
        }
      )
      //axios.get('http://localhost:8000/acreditacion/admin/edit-admin/' + this.props.match.params.id)
      .then((res) => {
        if (res.data.results === false) {
          alert("Tiempo de sessión expirado.");
          this.props.history.push("/login/");
        } else {
          //console.log("editing admin mount %j ",res.data);
          this.setState({
            nombre: res.data.nombre,
            email: res.data.email,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChangeNombre(e) {
    this.setState({ nombre: e.target.value });
  }

  onChangeEmail(e) {
    this.setState({ email: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const adminNuevo = {
      nombre: this.state.nombre,
      email: this.state.email,
    };

    axios
      .put(
        "http://" +
          this.ruta +
          "/admin/update-admin/" +
          this.props.match.params.id,
        adminNuevo,
        {
          headers: { Authorization: `Bearer ${Auth.getTokenId()}` },
        }
      )
      //axios.put('http://localhost:8000/acreditacion/admin/update-admin/' + this.props.match.params.id, adminNuevo)
      .then((res) => {
        if (res.data.results === false) {
          alert("Tiempo de sessión expirado.");
          this.props.history.push("/login/");
        } else {
          //console.log(res.data)
          console.log("Admin successfully updated");
          this.setState({ back: true });
        }
      })
      .catch((error) => {
        console.log(error);
      });

    // Redirect to Student List
    //this.props.history.push('/list-questions')
  }

  render() {
    if (this.state.back) {
      return <Redirect to="/list-admin"></Redirect>;
    }
    //await this.state.difficulty;
    return (
      <div className="form-wrapper">
        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId="type">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              value={this.state.nombre}
              onChange={this.onChangeNombre}
            />
          </Form.Group>

          <Form.Group controlId="type">
            <Form.Label>Correo</Form.Label>
            <Form.Control
              type="text"
              value={this.state.email}
              onChange={this.onChangeEmail}
            />
          </Form.Group>

          <Button variant="danger" size="lg" block="block" type="submit">
            Actualizar Admin
          </Button>
        </Form>
      </div>
    );
  }
}
