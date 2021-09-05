import { useState, VFC } from 'react';
import { Button, Form, Grid, Header, Icon, Message, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { auth, createUserWithEmailAndPassword } from '../../api/auth';

const initialState = {
  username: '',
  email: '',
  password: '',
  passwordConfirmation: '',
};

const Register: VFC = () => {
  const [state, setState] = useState(initialState);

  const handleChange = (e: React.ChangeEvent<{ name: string; value: string }>) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.ChangeEvent<{}>) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, state.email, state.password)
      .then((createUser) => {
        console.log(createUser);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Grid textAlign="center" verticalAlign="middle" className="app">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" icon color="orange" textAlign="center">
          <Icon name="puzzle piece" color="orange" />
          Register for DevChat
        </Header>
        <Form onSubmit={handleSubmit} size="large">
          <Segment stacked>
            <Form.Input
              fluid
              name="username"
              icon="user"
              iconPosition="left"
              placeholder="Username"
              onChange={handleChange}
              value={state.username}
              type="text"
            />
            <Form.Input
              fluid
              name="email"
              icon="mail"
              iconPosition="left"
              placeholder="Email Address"
              onChange={handleChange}
              value={state.email}
              type="email"
            />
            <Form.Input
              fluid
              name="password"
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              onChange={handleChange}
              value={state.password}
              type="password"
            />
            <Form.Input
              fluid
              name="passwordConfirmation"
              icon="repeat"
              iconPosition="left"
              placeholder="Password Confirmation"
              onChange={handleChange}
              value={state.passwordConfirmation}
              type="password"
            />
            <Button color="orange" fluid size="large">
              Submit
            </Button>
          </Segment>
        </Form>
        <Message>
          Already a user? <Link to="/login">Login</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Register;
