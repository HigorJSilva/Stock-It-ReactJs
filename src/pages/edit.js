import React, { Component } from "react";
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import api from '../services/api';
// import "./App.css";
import Form from "../Components/Form";

class App extends Component {
  state = {
    data: [],
  };

  onChange = updatedValue => {
    this.setState({
      fields: {
        ...this.state.fields,
        ...updatedValue
      }
    });
  };
  onSubmit = form => {
    const newPost = new FormData();
    newPost.append('nome', form.nome);
    newPost.append('quantidade', form.quantidade);
    newPost.append('unidade',form.unidade);
    api.post('/store', newPost);
  };


  render() {
    return (
      
      <MuiThemeProvider>
        <div className="App">
          <Form onSubmit={form => this.onSubmit(form)} />
        </div>
      </MuiThemeProvider>
    );
  }
}
export default App;