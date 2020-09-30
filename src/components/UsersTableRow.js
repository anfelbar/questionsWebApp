import React, { Component } from "react";
import { Link } from "react-router-dom";
//import { Link } from 'react-router-dom';
//import axios from 'axios';
//import Button from 'react-bootstrap/Button';

export default class UsersTableRow extends Component {
  //  constructor(props) {
  //    super(props);
  //this.deleteQuestion = this.deleteQuestion.bind(this);
  //this.onSubmit = this.onSubmit.bind(this);
  // }

  onSubmit(e) {
    e.preventDefault();

    console.log("borrando y redireccionando " + this.props);
    // this.props.history.push('/list-questions')
  }

  render() {
    return (
      <tr>
        <td>{this.props.obj.email}</td>
        <td>{this.props.obj.puntaje}</td>
        <td>{this.props.obj.tiempo}</td>
        {/* <td>{this.props.obj.tiempoRespuestas}</td> */}
        {/* <td>{this.props.obj.erroresRespuestas}</td>                 */}
        <td>
          <Link
            className="edit-link"
            to={"/user-stats/" + this.props.obj.email}
          >
            Estadísticas
          </Link>
        </td>
      </tr>
    );
  }
}
