import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { Link, withRouter } from "react-router-dom";
import Auth from "./Auth";
import { GoogleLogout } from "react-google-login";
import "bootstrap/dist/css/bootstrap.css";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  login() {
    Auth.authenticate();
  }

  logout() {
    Auth.signout();
    this.props.history.push("/login");
  }

  render() {
    return (
      <header className="color-nav">
        <Navbar className="color-nav" variant="dark">
          <Container>
            <Navbar.Brand>Preguntas Acreditación</Navbar.Brand>

            <Nav className="justify-content-end">
              {/* <button onClick={this.login}>Ingresar</button> */}
              {/* <button onClick={this.logout}>Salir</button> */}

              <Nav>
                <Link to={"/list-users"} className="nav-link">
                  Resultados del juego
                </Link>
              </Nav>

              <Nav>
                <Link to={"/list-questions/"} className="nav-link">
                  Lista de preguntas
                </Link>
              </Nav>

              <Nav>
                <Link to={"/create-question"} className="nav-link">
                  Adicionar pregunta
                </Link>
              </Nav>

              <Nav>
                <Link to={"/list-admin"} className="nav-link">
                  Lista de Administradores
                </Link>
              </Nav>

              <Nav>
                <Link to={"/add-admin"} className="nav-link">
                  Adicionar Administrador
                </Link>
              </Nav>

              <GoogleLogout
                clientId="482298814947-2t08sutgb6inj6ltjvc3r215ci299dds.apps.googleusercontent.com"
                buttonText="Salir"
                onLogoutSuccess={this.logout}
              ></GoogleLogout>
            </Nav>
          </Container>
        </Navbar>
      </header>
    );
  }
}
export default withRouter(Header);
