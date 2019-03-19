import React, { Component } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import Interface from './Interface';
import { reroute, goToNext } from '../actions/routeActions';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';
import {
    Button,
    Container,
    ListGroup,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
  } from 'reactstrap';

class CreateProfile extends Component {
  static propTypes = {
    getItems: PropTypes.func.isRequired,
    goToNext: PropTypes.func.isRequired,
    reroute: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    whereToNext: PropTypes.string
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const name = this.state.name;
    const dept = this.state.dept;
    const position = this.state.position;
    const skills = [
        this.state.skill_1, 
        this.state.skill_2,
        this.state.skill_3,
        this.state.skill_4,
        this.state.skill_5];
    
    const learns = [
        this.state.learn_1,
        this.state.learn_2,
        this.state.learn_3,
        this.state.learn_4,
        this.state.learn_5];

    const newItem = {
        name: name,
        dept: dept,
        position: position,
        skills: skills,
        learns: learns
    };

    // call action to create user profile
    //this.props.addItem(newItem);

    //call a second action for rerouting between components
    this.props.reroute('Home');
    console.log(this.state.whereToNext);
    if(this.state.whereToNext == 'Home'){
        this.props.goToNext(this.state.whereToNext);
    }
    
  };

  render() {
    return (
      <Container>
      <Router>
        <ListGroup>
          <TransitionGroup className='shopping-list'>
            <Form onSubmit={this.onSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" onChange={this.onChange}/>
                </label>
                <br/>
                <label>
                    Dept:
                    <input type="text" name="dept" onChange={this.onChange} />
                </label>
                <br/>
                <label>
                    Position:
                    <input type="text" name="position" onChange={this.onChange}/>
                </label>
                <br/>
                <label>
                    Add up to 5 skills you are good at:
                    <br/>
                    <input type="text" name="skill_1" onChange={this.onChange}/><br/>
                    <input type="text" name="skill_2" onChange={this.onChange}/><br/>
                    <input type="text" name="skill_3" onChange={this.onChange}/><br/>
                    <input type="text" name="skill_4" onChange={this.onChange}/><br/>
                    <input type="text" name="skill_5" onChange={this.onChange}/>
                </label>
                <br/>
                <label>
                    Add up to 5 skills you want to learn:
                    <br/>
                    <input type="text" name="learn_1" onChange={this.onChange}/><br/>
                    <input type="text" name="learn_2" onChange={this.onChange}/><br/>
                    <input type="text" name="learn_3" onChange={this.onChange}/><br/>
                    <input type="text" name="learn_4" onChange={this.onChange}/><br/>
                    <input type="text" name="learn_5" onChange={this.onChange}/>
                </label>
                <br/>
                <Redirect to="/interface">Go To Interface</Redirect>
                <Route path="/interface" component={Interface} />
                <input type="submit" value="Submit" />
            </Form>
          </TransitionGroup>
        </ListGroup>
      </Router>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item,
  whereToNext: state.whereToNext
});

export default connect(
  mapStateToProps,
  { getItems, deleteItem }
)(CreateProfile);
