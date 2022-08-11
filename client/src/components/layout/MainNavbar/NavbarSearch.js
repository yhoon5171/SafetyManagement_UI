import React, {Component} from "react";
import {
  Form,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormInput,
  Button
} from "shards-react";
import { FormControl } from "react-bootstrap";
import {Link, Routes, Route, useNavigate} from 'react-router-dom';

export default class Search extends Component{ 

state = {
  searchText: ""
};

handleSearchInput = event => {
  this.setState({
    searchText: event.target.value
  });
};

  handleSearchSubmit = (event) => {
    event.preventDefault();
    window.location.replace("/search_result")
      // this.props.history.push({
      //   pathname: "/search_result"
      // });
    
    // if (sessionStorage.getItem('search')) {
    //   this.props.history.push({
    //     pathname: "/results",
    //     state: {
    //       searchText: this.state.searchText
    //     }
    //   });
    // } else {
    //   alert("Please enter some search text!");
    // }
  };

  

render(){
  return(
  <Form className="main-navbar__search w-100 d-none d-md-flex d-lg-flex" onSubmit={this.handleSearchSubmit}>
    {/* <InputGroup seamless className="ml-3"> */}
      {/* <InputGroupAddon type="prepend">
        <InputGroupText>
          <i className="material-icons">search</i>
        </InputGroupText>
      </InputGroupAddon> */}
      <FormControl
        className="navbar-search"
        placeholder="Search for something..."
        Style={{width:"20%"}}
        // onChange={this.handleSearchInput}
        // value={this.state.searchText}

        onChange = {(event) => sessionStorage.setItem('search', event.target.value)}
      />
      
      {/* <Button onClick={this.handleSearchSubmit} variant="outline-info">
              Search
            </Button> */}
    {/* </InputGroup> */}
  </Form>
  )
}
}
