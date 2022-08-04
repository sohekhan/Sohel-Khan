import React, { Component } from "react";
import "./styles.css";

class Edit extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: this.props.edit.id,
      name: this.props.edit.name,
      role: this.props.edit.role,
      email: this.props.edit.email
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
    this.props.updateData(this.state);
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
        <form onSubmit={this.handleSubmit}>
            <input placeholder="First name" type="text" name="name" 
            value={this.state.name} onChange={this.handleChange} />
            <input placeholder="Role" type="text" name="role" 
            value={this.state.role} onChange={this.handleChange} />
            <input placeholder="Email address" type="email" name="email"
            value={this.state.email} onChange={this.handleChange} />
            <button type="submit">Update</button>
            <button onClick={this.props.cancelEdit}>Cancel</button>
        </form>
      );
  }
}

export default Edit;