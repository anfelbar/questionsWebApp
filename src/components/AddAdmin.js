import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Auth from '../Auth';



export default class AddAdmin extends Component {

  constructor(props) {
    super(props)
    this.onChangeNombre = this.onChangeNombre.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      nombre: '',
      email: ''
      
    }
    this.ruta = this.props.laruta;
  }

  onChangeNombre(e) {
    this.setState({nombre: e.target.value})
  }

  onChangeEmail(e) {
    this.setState({email: e.target.value})
  }

  async onSubmit(e) {
    e.preventDefault()
    

    const adminNuevo = {
      nombre: this.state.nombre,
      email: this.state.email    
    };

  axios.post('http://'+this.ruta+'/admin/add-admin', adminNuevo, {
    headers: { Authorization: `Bearer ${Auth.getTokenId()}` },
  })
  //await axios.post('http://localhost:8000/acreditacion/admin/add-admin', adminNuevo)
    .then(res => {
      if (res.data.results === false) {
        alert("Tiempo de sessión expirado.");          
        this.props.history.push("/login/");          
      } else {
        //console.log("Question successfully updated");
        this.setState({ back: true });
      }
      
    });

    
   // this.setState({id: '', category: '', type: '', difficulty: '', question: '', correct_answer: '', incorrect_answers: []})
   this.setState({nombre: '', email: ''})


  }


  render()  {
    
    
    return (
     
    <div className="form-wrapper">
      <Form onSubmit={this.onSubmit}>
      
      
            <Form.Group controlId="type">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" value={this.state.nombre} onChange={this.onChangeNombre}/>
            </Form.Group>

            <Form.Group controlId="type">
              <Form.Label>Correo</Form.Label>
              <Form.Control type="text" value={this.state.email} onChange={this.onChangeEmail}/>
            </Form.Group>

            

        <Button variant="danger" size="lg" block="block" type="submit">
          Adicionar Admin
        </Button>
      </Form>
    </div>);
    
    } 
}
