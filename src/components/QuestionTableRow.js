import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router-dom";
import Auth from "../Auth";

export default class QuestionTableRow extends Component {
  constructor(props) {
    super(props);
    this.deleteQuestion = this.deleteQuestion.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    //this.mapDifficulty = this.mapDifficulty(this);
    this.state = {
      back: false,
    };
    this.ruta = this.props.laruta;
  }

  mapDifficulty(difficulty) {
    switch (difficulty) {
      case 1:
        return "Fácil";
      case 2:
        return "Intermedio";
      case 3:
        return "Difícil";
      default:
        return "Dificultad no encontrada";
    }
  }

  deleteQuestion() {
    axios
      .delete(
        "http://" +
          this.ruta +
          "/laspreguntas/delete-question/" +
          this.props.obj._id,
        {
          headers: { Authorization: `Bearer ${Auth.getTokenId()}` },
        }
      )
      //axios.delete('http://localhost:8000/acreditacion/laspreguntas/delete-question/' + this.props.obj._id)
      .then((res) => {
        if (res.data.results === false) {
          alert("Tiempo de sessión expirado.");
          this.props.history.push("/login/");
        } else {
          console.log("Question successfully deleted!");
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
      return <Redirect to="/list-questions"></Redirect>;
    }
    return (
      <tr>
        <td>{this.mapDifficulty(this.props.obj.difficulty)}</td>
        <td>{this.props.obj.question}</td>
        <td>{this.props.obj.correct_answer}</td>
        <td>{this.props.obj.incorrect_answers[0]}</td>
        <td>{this.props.obj.incorrect_answers[1]}</td>
        <td>{this.props.obj.incorrect_answers[2]}</td>
        <td>
          <Link
            className="edit-link"
            to={"/edit-question/" + this.props.obj._id}
          >
            Edit
          </Link>

          <Button onClick={this.deleteQuestion} size="sm" variant="danger">
            Delete
          </Button>
        </td>
      </tr>
    );
  }
}
