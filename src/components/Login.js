import React, { Component } from "react";
import GoogleLogin from "react-google-login";
import Auth from "../Auth";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.responseGoogle = this.responseGoogle.bind(this);
    this.responseGoogleError = this.responseGoogleError.bind(this);
    //this.ruta = 'localhost:8000';
    this.ruta = this.props.laruta;
  }

  responseGoogle = async (response) => {    
    const email = response.profileObj.email;
    //console.log("email "+email);
    if (email.match(".*@usc.edu.co")) {
      //console.log(response);
      const entrada = {
        correo: response.profileObj.email,
      };
      var respuesta = null;
      await axios
        .post("http://" + this.ruta + "/admin/autenticar", entrada)
        .then((res) => {
          respuesta = res.data.resultado;
          console.log("fue: " + res.data.resultado);
          console.log("fue: " + respuesta);
        })
        .catch((error) => {
          console.log(error);
        });

      console.log("fue: " + respuesta);
      if (respuesta) {
        Auth.authenticate();
        Auth.setValues(
          response.profileObj.name,
          response.profileObj.email,
          response.tokenId
        );
        //this.render(<AlertDismissibleExample />);
        this.props.history.push("/list-questions/");
      } else {
        alert("Lo sentimos, no eres administrador(a).");
      }
    } else {
      alert("Lo sentimos, solo acceso a personal autorizado.");
    }
  };

  responseGoogleError = async (response) => {    

    //this.props.history.push('/list-questions')

    console.log(response);
  };

  render() {
    return (
      <table>
        <tbody>
          <tr>
            <td className="grande">
              <br />
              <br />
              <br />
              Welcome
              <br />        
            </td>
          </tr>

          <tr>
            <td className="centered">
              <GoogleLogin
                clientId="CLIENTID" //id gotten from Google
                buttonText="Entrar con Google"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogleError}
                isSignedIn={true}
              />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default Login;
