import Edit from './../images/edit.png';
import Delete from './../images/delete.png';
import React, { Component } from "react";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    }

    this.editItem = this.editItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.selectAll = this.selectAll.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  editItem = (id) => {
    this.props.handleEdit(id);
  }

  deleteItem = (id) => {
    this.props.handleDelete(id);
  }

  handleSearch(e) {
    this.setState({
      search: e.target.value
    });
    console.log(this.state.search)
  }

  selectAll(e) {
    this.props.selectAll(e.target.checked);
  }

  handleSelect(e,dataId){
    this.props.handleSelect(dataId, e.target.checked);
  }

  render(props) {
    return (
      <>
      <input type='search' placeholder='Search by Name, Role or Email' onChange={(e) => this.handleSearch(e)} />
      
      <table>
        <thead>
          <tr>
            <th><input type='checkbox' onChange={(e) => this.selectAll(e) } /></th>
            <th>Name</th>
            <th>Role</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody id='listbody'>
          {
            this.props.members.filter(
              (member)=> member.name.toLowerCase().includes(this.state.search.toLowerCase())
              || member.role.toLowerCase().includes(this.state.search.toLowerCase()) ||
              member.email.toLowerCase().includes(this.state.search.toLowerCase()))
              .map((data) => {

              return(
                <tr key={data.id}>
                  <td><input type='checkbox' checked={data.isChecked} onChange={(e) => this.handleSelect(e, data.id)} /></td>
                  <td>{data.name}</td>
                  <td>{data.role}</td>
                  <td>{data.email}</td>
                  <td>
                    <img src={Edit} alt='Edit' onClick={e => this.editItem(data.id)} />
                    <img src={Delete} alt='Delete' onClick={e => this.deleteItem(data.id)} />
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      </>
    );
  }
};

export default Table;
