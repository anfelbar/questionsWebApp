/* App.js */
import React, { Component } from "react";
//import { Resizable, ResizableBox } from "react-resizable";
import { Chart } from "react-google-charts";

import axios from "axios";
import Auth from "../Auth";

export default class UserStats extends Component {
  constructor(props) {
    super(props);
    this.getRandomColor = this.getRandomColor.bind(this);
    //this.getColorList = this.getColorList.bind(this);
    // Setting up state
    this.state = {
      email: "",
      puntaje: 0,
      tiempo: 0.0,
      tiempoRespuestas: 0.0,
      erroresRespuestas: null,
      questions: null,
    };
    this.labels = null;
    this.colors = null;
    this.ruta = this.props.laruta;
  }

  async componentDidMount() {
    await axios
      .get(
        "http://" +
          this.ruta +
          "/laspreguntas/usuarios/" +
          this.props.match.params.id,
        {
          headers: { Authorization: `Bearer ${Auth.getTokenId()}` },
        }
      )
      .then((res) => {
        //console.log("obtuve usuario " + res.data.email);
        if (res.data.results === false) {
          alert("Tiempo de sessión expirado.");
          this.props.history.push("/login/");
        } else {
          this.setState({
            email: res.data.email,
            puntaje: res.data.puntaje,
            tiempo: res.data.tiempo,
            tiempoRespuestas: res.data.tiempoRespuestas,
            erroresRespuestas: res.data.erroresRespuestas,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });

    await axios
      .get("http://" + this.ruta + "/laspreguntas/", {
        headers: { Authorization: `Bearer ${Auth.getTokenId()}` },
      })
      .then((res) => {
        if (res.data.results === false) {
          alert("Tiempo de sessión expirado.");
          this.props.history.push("/login/");
        } else {
          this.setState({
            questions: res.data.results,
          });
          //console.log("Tengo preguntas.", res.data.results);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /*getColorList() {    
    var color = [];
    for (var i = 0; i < this.state.questions.length; i++) {
      color.push(this.getRandomColor());
    }
    color.push(this.getRandomColor());
    return color;
  }*/

  getRandomColor() {
    var letters = "0123456789ABCDEF".split("");
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  render() {
    if (
      this.state.questions !== null &&
      this.state.erroresRespuestas !== null
    ) {
      console.log("rerror respuestas : ", this.state.erroresRespuestas);
      this.labels = this.state.questions.map((res, i) => {
        //console.log("res, i: ", res, i);
        return [
          res.question,
          this.state.erroresRespuestas[i].errno,
          this.getRandomColor(),
        ];
      });

      console.log("Tengo labels ", this.labels);
      console.log("Tengo puntaje 0 ", this.state.erroresRespuestas);
      const etiquetas = [["Prgeuntas", "Errores", { role: "style" }]];
      const datos = etiquetas.concat(this.labels);

      console.log("Tengo datos ", datos);
      return (
        <div id="chart_div" style={{ width: "100%", height: "100%" }}>
          <Chart
            width={"1200px"}
            height={"1000px"}
            chartType="BarChart"
            loader={<div>Loading Chart</div>}
            data={datos}
            /*data={[
              ["Pregunta", "Errores"],
              ["New York City, NY", 8175000],
              ["Los Angeles, CA", 3792000],
              ["Chicago, IL", 2695000],
              ["Houston, TX", 2099000],
              ["Philadelphia, PA", 1526000],
            ]}*/
            options={{
              title: "Errores por cada pregunta",
              is3D: true,
              chartArea: { width: "100%" },
              height: "100%",
              width: "100%",
              bar: { groupWidth: "95%" },
              legend: { position: "center" },
              hAxis: {
                title: "Total de errores",
                minValue: 0,
              },
              vAxis: {
                title: "Pregunta",
              },
            }}
            // For tests
            rootProps={{ "data-testid": "1" }}
          />
        </div>
      );
    }

    return <h1>Loading...</h1>;
  }
}
