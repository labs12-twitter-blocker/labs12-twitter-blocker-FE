import React, { Component } from 'react';
import { connect } from "react-redux";
import { getHello } from "../actions"


class HelloWorld extends Component {


componentDidMount() {
    this.props.getHello()
  
}

  render() {
    return (
      <div>
        <h1>{this.props.greeting}</h1>
      </div>
    )
  }
}


const mapStateToProps = state => ({
    greeting: state.usersReducer.greeting
  });
  
  
  export default connect(
    mapStateToProps,
    { getHello }
  )(HelloWorld);
  