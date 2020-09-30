import React, { Component } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import QuestionTableRow from "./QuestionTableRow";
//import { string } from "prop-types";
import Auth from "../Auth";

export default class QuestionList extends Component {
  constructor(props) {
    super(props);
    //const { match: { params } } = this.props;
    //console.log("props1: ",params.ruta);
    //this.ruta = params.ruta;
    this.ruta = this.props.laruta;
    this.state = {
      question: [],
      //selectedFile: null,
    };
  }

  componentDidMount() {
    //console.log("props question list: "+this.ruta);

    axios
      .get("http://" + this.ruta + "/laspreguntas", {
        headers: { Authorization: `Bearer ${Auth.getTokenId()}` },
      })
      //axios.get('http://localhost:8000/acreditacion/laspreguntas')
      .then((res) => {
        if (res.data.results === false) {
          alert("Tiempo de sessión expirado.");
          this.props.history.push("/login/");
        } else {
          this.setState({
            question: res.data.results,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  DataTable() {
    return this.state.question.map((res, i) => {
      //console.log("datatabke "+ res+" y ademas "+i);
      return <QuestionTableRow obj={res} key={i} laruta={this.ruta} />;
    });
  }

  /* onFileChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    //const this2 = this;
    this.setState(
      {
        [name]: value
      }
    );
    //let hojas = [];
    if (name === 'file') {
      let reader = new FileReader();
      reader.readAsArrayBuffer(target.files[0]);
      reader.onloadend = (e) => {
        var data = new Uint8Array(e.target.result);
        var workbook = XLSX.read(data, { type: 'array' });
        var worksheet = workbook.Sheets[workbook.SheetNames[0]];
        var headers = {};
        data = [];
        for (const z in worksheet) {
          if (z[0] === '!') continue;
          //parse out the column, row, and value
          var tt = 0;
          for (var i = 0; i < z.length; i++) {
            if (!isNaN(z[i])) {
              tt = i;
              break;
            }
          };
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
              data[j].incorrecta3
            ]
          };

          axios.post('http://' + this.ruta + '/laspreguntas/create-question', question)
            //axios.post('http://localhost:8000/acreditacion/laspreguntas/create-question', question)
            .then(res => console.log(res.data))
            .catch((error) => {
              console.log("No se pude crear pregunta en servidor: " + error)
            });

        }

      }
    }
    //console.log("Hojas %j", hojas);
    // Update the state 
    this.setState({ selectedFile: event.target.files[0] });

  };

  onFileUpload = () => {
    console.log(this.state.selectedFile);
  };*/

  render() {
    return (
      <div className="table-wrapper">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Dificultad</th>
              <th>Pregunta</th>
              <th>Correcta</th>
              <th>Incorrecta 1</th>
              <th>Incorrecta 2</th>
              <th>Incorrecta 3</th>
            </tr>
          </thead>
          <tbody>{this.DataTable()}</tbody>
        </Table>

        {/* <h2 align="center">Subir multiples preguntas</h2> */}

        {/*   <div align='center'> 
                <input type="file" onChange={this.onFileChange} /> 
                <button onClick={this.onFileUpload}> 
                  Cargar
                </button> 
            </div>  */}

        {/*  <div align="center">
          <input
            required
            type="file"
            name="file"
            id="file"
            onChange={this.onFileChange}
            placeholder="Archivo de excel"
          />
        </div> */}
      </div>
    );
  }
}
