import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

class RegisterModal extends Component {
  state = {
    modal: false,
    name: '',
    email: '',
    password: '',
    skills: [],
    learns: [],
    msg: null
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === 'REGISTER_FAIL') {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    // If authenticated, close modal
    if (this.state.modal) {
      if (isAuthenticated) {
        this.toggle();
      }
    }
  }

  toggle = () => {
    // Clear errors
    this.props.clearErrors();
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const { name, email, password } = this.state;

    

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

    // Create user object
    const newUser = {
      name,
      email,
      password,
      skills: skills,
      learns: learns
    };

    // Attempt to register
    this.props.register(newUser);
  };

  render() {
    return (
      <div>
        <NavLink onClick={this.toggle} href='#'>
          Register
        </NavLink>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Register</ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color='danger'>{this.state.msg}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for='name'>Name</Label>
                <Input
                  type='text'
                  name='name'
                  id='name'
                  placeholder='Name'
                  className='mb-3'
                  onChange={this.onChange}
                />

                <Label for='email'>Email</Label>
                <Input
                  type='email'
                  name='email'
                  id='email'
                  placeholder='Email'
                  className='mb-3'
                  onChange={this.onChange}
                />

                <Label for='department'>Department</Label>
                <Input 
                type='department'
                name='department'
                id='department'
                placeholder='department'
                className='mb-3'
                onChange={this.onChange}
                />

                <Label for='position'>Position</Label>
                <Input
                  type='position'
                  name='position'
                  id='position'
                  placeholder='Position'
                  className='mb-3'
                  onChange={this.onChange}
                />

                <Label for='skills'>Skills you are you good at</Label>
                <Input type="text" name="skill_1" onChange={this.onChange}/><br/>
                <Input type="text" name="skill_2" onChange={this.onChange}/><br/>
                <Input type="text" name="skill_3" onChange={this.onChange}/><br/>
                <Input type="text" name="skill_4" onChange={this.onChange}/><br/>
                <Input type="text" name="skill_5" onChange={this.onChange}/>

                <Label for='learn'>Skills you want to learn</Label>
                <Input type="text" name="learn_1" onChange={this.onChange}/><br/>
                <Input type="text" name="learn_2" onChange={this.onChange}/><br/>
                <Input type="text" name="learn_3" onChange={this.onChange}/><br/>
                <Input type="text" name="learn_4" onChange={this.onChange}/><br/>
                <Input type="text" name="learn_5" onChange={this.onChange}/>

                <Label for='password'>Password</Label>
                <Input
                  type='password'
                  name='password'
                  id='password'
                  placeholder='Password'
                  className='mb-3'
                  onChange={this.onChange}
                />
                <Button color='dark' style={{ marginTop: '2rem' }} block>
                  Register
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(
  mapStateToProps,
  { register, clearErrors }
)(RegisterModal);
