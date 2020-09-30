import React from "react";
//import Nav from "react-bootstrap/Nav";
//import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import { Redirect } from "react-router-dom";

import CreateQuestion from "./components/CreateQuestion";
import EditQuestion from "./components/EditQuestion";
import ListQuestions from "./components/ListQuestions";
import ListUsers from "./components/ListUsers";
import ListAdmin from "./components/ListAdmins";
import QuestionTable from "./components/QuestionTableRow";
import EditAdmin from "./components/EditAdmin";
import AddAdmin from "./components/AddAdmin";
import Login from "./components/Login";
import UserStats from "./components/UserStats";
import Header from "./Header";

// import Auth from "./Auth";

const ruta = 'localhost:8000';

//// USE THIS DEFINITION OF PRIVATE ROUTE TO REALLY DISABLE NAVIGATION WITH AUTHENTICATION
/*
var PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      Auth.getAuth() ? (
        <Component {...props} laruta={ruta} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
          }}
        />
      )
    }
  />
);
/** */


///// USE THIS DEFINITION OF PRIVATE ROUTE TO ALLOW FULL NAVIGATION WITHOUT AUTHENTICATION
var PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => <Component {...props} laruta={ruta} />} />
);
/** */

function App() {
  return (
    <Router basename="/acreditacion">
      <div className="fondo">
        <Header />

        <Container>
          <Row>
            <Col md={12}>
              <div className="wrapper">
                <Switch>
                  <Route
                    exact
                    path="/"
                    render={(routeProps) => (
                      <Login {...routeProps} laruta={ruta} />
                    )}
                  />
                  <PrivateRoute
                    path="/create-question"
                    component={CreateQuestion}
                  />
                  <PrivateRoute
                    path="/edit-question/:id"
                    component={EditQuestion}
                  />
                  <PrivateRoute
                    path="/question-table/"
                    component={QuestionTable}
                  />
                  <PrivateRoute
                    path="/list-questions/"
                    component={ListQuestions}
                  />
                  <PrivateRoute path="/list-users" component={ListUsers} />
                  <PrivateRoute path="/list-admin" component={ListAdmin} />
                  <PrivateRoute path="/edit-admin/:id" component={EditAdmin} />
                  <PrivateRoute path="/add-admin" component={AddAdmin} />
                  <PrivateRoute path="/user-stats" component={UserStats} />
                  <Route
                    path="/login"
                    render={(routeProps) => (
                      <Login {...routeProps} laruta={ruta} />
                    )}
                  />
                </Switch>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Router>
  );
}

export default App;

//<PrivateRoute path="/list-admin"
//render={(routeProps) => (<ListAdmin {...routeProps} laruta={"localhost:8000"}/>)} />
//<Route path="/login" component={Login} />
