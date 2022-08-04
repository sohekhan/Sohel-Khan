import React, { Component } from "react";
import Edit from "./Edit"
import Form from "./Form";
import Paginate from "./Paginate";
import Table from "./Table";

class Parent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      members: [],
      edit:{},
      currentPage: 1
    }

    this.handleEdit = this.handleEdit.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.selectAll = this.selectAll.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.deleteAll = this.deleteAll.bind(this);
    this.setPage = this.setPage.bind(this);
  }

  async componentDidMount() {
    const url = 'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json';
    const response = await fetch(url);
    const data = await response.json();
    data.forEach((data) => data.isChecked = false)
    this.setState({
      members: data
    })
  }

  handleEdit(dataId){
    let editdata = this.state.members.filter(member => member.id === dataId)[0];
    this.setState({
      edit: editdata
    })
  }

  cancelEdit(){
    this.setState({
        edit: {}
    })
  }

  handleUpdate(data) {
    const newState = this.state.members.map((member) => {
      if(member.id === data.id) {
        return {
          ...member,  name: data.name, role: data.role, email:data.email
        }
      }
      return member;
    })
    this.setState({
      members: newState
    })
    this.setState({
      edit: {}
    })
  }

  handleDelete(dataId){
    this.setState({
      members: this.state.members.filter(member => member.id !== dataId)
    })
  }

  passFormData = (data) => { 
    let member = data;
    member.id = parseInt(this.state.members.slice(-1)[0].id, 10) + 1;
    this.setState({
      members: this.state.members.concat(member)
    });
  }

  handleSearch(e) {
    let searchResults = this.state.members.filter((member) => member.name.toLowerCase().includes(e.target.value.toLowerCase()));
    this.setState({
      members: searchResults
    })

  }

  selectAll(data) {
    const newState = this.state.members;
    newState.forEach(member => {
      member.isChecked = data
    })
    this.setState({
      members: newState
    })
  }

  handleSelect(dataId, data) {
    let newState = this.state.members.map(member => {
        if(member.id === dataId) {
            return{
                ...member, isChecked:data
            }
        }
        return member;
    })

    this.setState({
        members: newState
    })
  }

  deleteAll() {
    this.setState({
        members: this.state.members.filter(member => member.isChecked !== true)
    })
  }

  setPage(num) {
    this.setState({
        currentPage: num
    })
  }

  render() {
    const initialize = this.state.members
    const indexOfLastPost = this.state.currentPage*10;
    const indexOfFirstPost = indexOfLastPost - 10;
    const currentPosts = initialize.slice(indexOfFirstPost, indexOfLastPost);
    const totalPosts = initialize.length
    return (
      <>
        {(Boolean(this.state.edit.id)) 
          ? 
        (<Edit 
            edit={this.state.edit} updateData={(data) => this.handleUpdate(data)}
            cancelEdit={this.cancelEdit} /> )
          :  
        (<Form passFormData={(formData) => this.passFormData(formData)}/>)}
        <Table members={currentPosts} 
            handleDelete={(dataId) => this.handleDelete(dataId)}
            handleEdit={(dataId) => this.handleEdit(dataId)} 
            selectAll={(data) => this.selectAll(data)} 
            handleSelect={(dataId, data) => this.handleSelect(dataId, data)} />
        <Paginate totalPosts={totalPosts} setPage={(num) => this.setPage(num)} 
            deleteAll={this.deleteAll} />
      </>
    );
  }
};

export default Parent;
