import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Select from "react-select";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Auth from "../Auth";

const options = [
  { value: "1", label: "Fácil" },
  { value: "2", label: "Intermedio" },
  { value: "3", label: "Difícil" },
];

export default class EditQuestion extends Component {
  constructor(props) {
    super(props);

    // Setting up functions
    //this.onChangeQuestionId = this.onChangeQuestionId.bind(this);
    //this.onChangeQuestionCategory = this.onChangeQuestionCategory.bind(this);
    //this.onChangeQuestionType = this.onChangeQuestionType.bind(this);
    this.onChangeQuestionDifficulty = this.onChangeQuestionDifficulty.bind(
      this
    );
    this.onChangeQuestionQuestion = this.onChangeQuestionQuestion.bind(this);
    this.onChangeQuestionCorrect = this.onChangeQuestionCorrect.bind(this);
    this.onChangeQuestionIncorrect1 = this.onChangeQuestionIncorrect1.bind(
      this
    );
    this.onChangeQuestionIncorrect2 = this.onChangeQuestionIncorrect2.bind(
      this
    );
    this.onChangeQuestionIncorrect3 = this.onChangeQuestionIncorrect3.bind(
      this
    );
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      //id: '',
      //category: '',
      //type: '',
      ya: false,
      back: false,
      difficulty: "",
      question: "",
      correct_answer: "",
      incorrect_answers1: "",
      incorrect_answers2: "",
      incorrect_answers3: "",
    };
    this.ruta = this.props.laruta;
  }

  mapDifficulty(difficulty) {
    console.log("mapeando difficultad: " + typeof difficulty);
    const tipo = Number(difficulty);
    console.log("mapeando difficultad: " + tipo);
    var salida = "";
    switch (tipo) {
      case 1:       
        salida = "Fácil";
        break;
      case 2:      
        salida = "Intermedio";
        break;
      case 3:
        salida = "Difícil";
        break;
      default:       
        salida = "Dificultad no encontrada";
        break;
    }
    return salida;
  }

  componentDidMount() {
    axios
      .get(
        "http://" +
          this.ruta +
          "/laspreguntas/edit-question/" +
          this.props.match.params.id,
          {
            headers: { Authorization: `Bearer ${Auth.getTokenId()}` },
          }
      )
      //axios.get('http://localhost:8000/acreditacion/laspreguntas/edit-question/' + this.props.match.params.id)
      /*.then((response) => {
        if (!response.ok){
          console.log("El status:??? ",response.status);
          //throw new Error(response.status);
        }
        else return response.json();
        
      })*/
      .then((res) => {
        //console.log("editing mount %j", res.data);
        if (res.data.results === false) {
          alert("Tiempo de sessión expirado.");
          this.props.history.push("/login/");          
        } else {
          this.setState({
            //id: res.data.id,
            //category: "res.data.category",
            //type: res.data.type,
            ya: true,
            difficulty: res.data.difficulty,
            question: res.data.question,
            correct_answer: res.data.correct_answer,
            incorrect_answers1: res.data.incorrect_answers[0],
            incorrect_answers2: res.data.incorrect_answers[1],
            incorrect_answers3: res.data.incorrect_answers[2],
          });
        }
      })
      .catch((error) => {
        //console.log("El status:??? ",response.status);
        console.log(error);
      });
  }

  onChangeQuestionId(e) {
    this.setState({ id: e.target.value });
  }

  onChangeQuestionCategory(e) {
    this.setState({ category: e.target.value });
  }

  onChangeQuestionType(e) {
    this.setState({ type: e.target.value });
  }

  onChangeQuestionDifficulty(e) {
    console.log("Editando difficultad: ", e.value);
    this.setState({ difficulty: e.value });
  }

  onChangeQuestionQuestion(e) {
    this.setState({ question: e.target.value });
  }

  onChangeQuestionCorrect(e) {
    this.setState({ correct_answer: e.target.value });
  }

  onChangeQuestionIncorrect1(e) {
    this.setState({ incorrect_answers1: e.target.value });
  }

  onChangeQuestionIncorrect2(e) {
    this.setState({ incorrect_answers2: e.target.value });
  }

  onChangeQuestionIncorrect3(e) {
    this.setState({ incorrect_answers3: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const question = {
      /* id: this.state.id,
       category: this.state.category,
       type: this.state.type,*/
      difficulty: this.state.difficulty,
      question: this.state.question,
      correct_answer: this.state.correct_answer,
      incorrect_answers: [
        this.state.incorrect_answers1,
        this.state.incorrect_answers2,
        this.state.incorrect_answers3,
      ],
    };

    axios
      .put(
        "http://" +
          this.ruta +
          "/laspreguntas/update-question/" +
          this.props.match.params.id,
        question, 
        {
          headers: { Authorization: `Bearer ${Auth.getTokenId()}` },
        }
      )
      //    axios.put('http://localhost:8000/acreditacion/laspreguntas/update-question/' + this.props.match.params.id, question)
      .then((res) => {
        if (res.data.results === false) {
          alert("Tiempo de sessión expirado.");          
          this.props.history.push("/login/");          
        } else {
          console.log("Question successfully updated");
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
      return <Redirect to="/list-questions"></Redirect>;
    } else if (this.state.ya) {
      //await this.state.difficulty;
      return (
        <div className="form-wrapper">
          <Form onSubmit={this.onSubmit}>
            <Form.Group controlId="type">
              <Form.Label>Dificultad</Form.Label>
              <Select
                options={options}
                onChange={this.onChangeQuestionDifficulty}
                defaultValue={{
                  value: parseInt(this.state.difficulty),
                  label: this.mapDifficulty(this.state.difficulty),
                }}
              />
            </Form.Group>

            {/*    <Form.Group controlId="type">
              <Form.Label>Dificultad</Form.Label>
              <Form.Control type="text" value={this.state.difficulty} onChange={this.onChangeQuestionDifficulty}/>
            </Form.Group> */}

            <Form.Group controlId="type">
              <Form.Label>Pregunta</Form.Label>
              <Form.Control
                type="text"
                value={this.state.question}
                onChange={this.onChangeQuestionQuestion}
              />
            </Form.Group>

            <Form.Group controlId="type">
              <Form.Label>Respuesta correcta</Form.Label>
              <Form.Control
                type="text"
                value={this.state.correct_answer}
                onChange={this.onChangeQuestionCorrect}
              />
            </Form.Group>

            <Form.Group controlId="type">
              <Form.Label>Respuesta incorrecta 1</Form.Label>
              <Form.Control
                type="text"
                value={this.state.incorrect_answers1}
                onChange={this.onChangeQuestionIncorrect1}
              />
            </Form.Group>

            <Form.Group controlId="type">
              <Form.Label>Respuesta incorrecta 2</Form.Label>
              <Form.Control
                type="text"
                value={this.state.incorrect_answers2}
                onChange={this.onChangeQuestionIncorrect2}
              />
            </Form.Group>

            <Form.Group controlId="type">
              <Form.Label>Respuesta incorrecta 3</Form.Label>
              <Form.Control
                type="text"
                value={this.state.incorrect_answers3}
                onChange={this.onChangeQuestionIncorrect3}
              />
            </Form.Group>

            <Button variant="danger" size="lg" block="block" type="submit">
              Update Question
            </Button>
          </Form>
        </div>
      );
    } else {
      return "";
    }
  }
}
