import React, { Component } from "react";
import "./styles.css";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      role: '',
      email: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (evt) => {
    this.setState({
      [evt.target.name] : evt.target.value
    })
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    this.props.passFormData(this.state);
    this.resetForm()
  }

  resetForm() {
    this.setState({
      id: '',
      name: '',
      role: '',
      email: ''
    })
  }

  render(props) {
    return (
      // Boolean(this.props.editData.id) ? editForm() && this.editform : createForm() 
        <form onSubmit={this.handleSubmit}>
            <input placeholder="Name" type="text" name="name" 
            value={this.state.name} onChange={this.handleChange} required/>
            <input placeholder="Role" type="text" name="role" 
            value={this.state.role} onChange={this.handleChange} required/>
            <input placeholder="Email address" type="email" name="email"
            value={this.state.email} onChange={this.handleChange} required/>
            <button type="submit">Submit</button>
        </form>
      );
    
  }
};

export default Form;
