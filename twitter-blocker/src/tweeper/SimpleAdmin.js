import React, { Component } from 'react';
import { connect } from "react-redux";
import { getUsers } from "../actions"


class SimpleAdmin extends Component {


componentDidMount() {
    // this.props.getUsers()
    console.log(this.props.users)
  
}

  render() {
    return (
      <div>
         <h2>Front End Team Member</h2> 
          {this.props.users.map(user => {
            return (<ul>
            <li>{user}</li>
            </ul>)
          })}
      </div>
    )
  }
}


const mapStateToProps = state => ({
    users: state.usersReducer.users
  });
  
  
  export default connect(
    mapStateToProps,
    { getUsers }
  )(SimpleAdmin);