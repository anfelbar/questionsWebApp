import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Select from "react-select";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
//import { Redirect } from "react-router-dom";
import * as XLSX from "xlsx";
import Auth from "../Auth";

const options = [
  { value: "1", label: "Fácil" },
  { value: "2", label: "Intermedio" },
  { value: "3", label: "Difícil" },
];

export default class CreateQuestion extends Component {
  constructor(props) {
    super(props);

    // Setting up functions
    this.onChangeQuestionId = this.onChangeQuestionId.bind(this);
    this.onChangeQuestionCategory = this.onChangeQuestionCategory.bind(this);
    this.onChangeQuestionType = this.onChangeQuestionType.bind(this);
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
      id: "",
      category: "",
      type: "",
      difficulty: "",
      question: "",
      correct_answer: "",
      incorrect_answers1: "",
      incorrect_answers2: "",
      incorrect_answers3: "",
      selectedFile: null,
    };
    this.ruta = this.props.laruta;
  }

  handleChange = (selectedOption) => {
    //console.log("The selection was: "+selectedOption.label);
    this.setState({ difficulty: selectedOption.value }, () =>
      console.log(`Option selected:`, this.state.difficulty)
    );
  };

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
    this.setState({ difficulty: e.target.value });
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
    // Setting up state

    console.log(`Question successfully created!`);
    console.log(`id: ${this.state.id}`);
    console.log(`category: ${this.state.category}`);
    console.log(`type: ${this.state.type}`);
    console.log(`type: ${this.state.difficulty}`);
    console.log(`type: ${this.state.question}`);
    console.log(`type: ${this.state.correct_answer}`);
    console.log(`type: ${this.state.incorrect_answers}`);

    if (
      this.state.difficulty === "" ||
      this.state.question.replace(/\s/g, "") === "" ||
      this.state.correct_answer.replace(/\s/g, "") === "" ||
      this.state.incorrect_answers1.replace(/\s/g, "") === ""
    ) {
      alert(
        "La dificultad, pregunta, respuesta correcta y al menos la primera respuesta incorrecta son campos obligatorios."
      );
      return;
    }
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
      .post("http://" + this.ruta + "/laspreguntas/create-question", question, {
        headers: { Authorization: `Bearer ${Auth.getTokenId()}` },
      })
      //axios.post('http://localhost:8000/acreditacion/laspreguntas/create-question', question)
      .then((res) => {
        if (res.data.results === false) {
          alert("Tiempo de sessión expirado.");
          this.props.history.push("/login/");
        } else {
          console.log(res.data);
        }
      })
      .catch((error) => {
        console.log("No se pude crear pregunta en servidor: " + error);
      });
    // this.setState({id: '', category: '', type: '', difficulty: '', question: '', correct_answer: '', incorrect_answers: []})
    this.setState({
      difficulty: "",
      question: "",
      correct_answer: "",
      incorrect_answers1: "",
      incorrect_answers2: "",
      incorrect_answers3: "",
    });
  }

  /*
        <Form.Group controlId="id">
              <Form.Label>Numero</Form.Label>
              <Form.Control type="text" value={this.state.id} onChange={this.onChangeQuestionId}/>
            </Form.Group>
    
            <Form.Group controlId="Name">
              <Form.Label>Categoría</Form.Label>
              <Form.Control type="text" value={this.state.rollno} onChange={this.onChangeQuestionCategory}/>
            </Form.Group>
        
            <Form.Group controlId="type">
              <Form.Label>Tipo</Form.Label>
              <Form.Control type="text" value={this.state.type} onChange={this.onChangeQuestionType}/>
            </Form.Group>
      */

  onFileChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    //const this2 = this;
    this.setState({
      [name]: value,
    });
    //let hojas = [];
    if (name === "file") {
      let reader = new FileReader();
      reader.readAsArrayBuffer(target.files[0]);
      reader.onloadend = (e) => {
        var data = new Uint8Array(e.target.result);
        var workbook = XLSX.read(data, { type: "array" });
        var worksheet = workbook.Sheets[workbook.SheetNames[0]];
        var headers = {};
        data = [];
        for (const z in worksheet) {
          if (z[0] === "!") continue;
          //parse out the column, row, and value
          var tt = 0;
          for (var i = 0; i < z.length; i++) {
            if (!isNaN(z[i])) {
              tt = i;
              break;
            }
          }
          var col = z.substring(0, tt);
          var row = parseInt(z.substring(tt));
          var value = worksheet[z].v;

          //store header names
          if (row === 1 && value) {
            headers[col] = value;
            continue;
          }

          if (!data[row]) data[row] = {};
          data[row][headers[col]] = value;
        }
        //drop those first two rows which are empty
        data.shift();
        data.shift();        
        //console.log("la correcta es: "+data[6].correcta);
        //console.log("la incorrecta3 es: "+data[6].incorrecta3);

        // })

        //Se realizan todas las peticiones que sean posible ejecutar.
        //Cada pregunta se agrega por separado
        const size = data.length;
        for (var j = 0; j < size; j++) {
          const question = {
            difficulty: 1,
            question: data[j].pregunta,
            correct_answer: data[j].correcta,
            incorrect_answers: [
              data[j].incorrecta1,
              data[j].incorrecta2,
              data[j].incorrecta3,
            ],
          };

          axios
            .post(
              "http://" + this.ruta + "/laspreguntas/create-question",
              question,
              {
                headers: { Authorization: `Bearer ${Auth.getTokenId()}` },
              }
            )
            //axios.post('http://localhost:8000/acreditacion/laspreguntas/create-question', question)
            .then((res) => {
              if (res.data.results === false) {
                alert("Tiempo de sessión expirado.");
                this.props.history.push("/login/");
              } else {
                console.log(res.data);
              }
            })
            .catch((error) => {
              console.log("No se pude crear pregunta en servidor: " + error);
            });
        }
      };
    }
    //console.log("Hojas %j", hojas);
    // Update the state
    this.setState({ selectedFile: event.target.files[0] });
  };

  onFileUpload = () => {
    console.log(this.state.selectedFile);
  };

  render() {
    return (
      <div className="wrapper">
        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId="type">
            <Form.Label>Dificultad</Form.Label>
            <Select options={options} onChange={this.handleChange} />
          </Form.Group>

          {/*  <Form.Group controlId="type">
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
            Crear Pregunta
          </Button>

          <h2 align="center">Subir multiples preguntas</h2>

          {/*   <div align='center'> 
      <input type="file" onChange={this.onFileChange} /> 
      <button onClick={this.onFileUpload}> 
        Cargar
      </button> 
  </div>  */}

          <div align="center">
            <input
              type="file"
              name="file"
              id="file"
              onChange={this.onFileChange}
              placeholder="Archivo de excel"
            />
          </div>
        </Form>
      </div>
    );
  }
}
