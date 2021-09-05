import { useState, VFC } from 'react';
import { Button, Form, Grid, Header, Icon, Message, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { auth, signInWithEmailAndPassword } from '../../api/auth';
import { UserCredential } from '@firebase/auth';

const initialState = {
  email: '',
  password: '',
};

const Login: VFC = () => {
  const [state, setState] = useState(initialState);
  const [errors, setErrors] = useState<String[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const isFormValid = (): boolean => state.email.length !== 0 && state.password.length !== 0;

  const displayErrors = () => {
    return errors.map((error, index) => {
      return <p key={index}>{error}</p>;
    });
  };

  const handleChange = (e: React.ChangeEvent<{ name: string; value: string }>) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.ChangeEvent<{}>) => {
    if (isFormValid() === false) return;
    e.preventDefault();
    setIsLoading(true);

    signInWithEmailAndPassword(auth, state.email, state.password)
      .then((signedInUser: UserCredential) => {
        console.log(signedInUser);
      })
      .catch((error) => {
        console.log(error);
        setErrors([error.toString(), ...errors]);
      })
      .finally(() => {
        setIsLoading(false);
      });

    setIsLoading(true);
  };

  const handleInputError = (inputName: string): string => {
    return errors.some((error) => error.toLocaleLowerCase().includes(inputName)) ? 'error' : '';
  };

  return (
    <Grid textAlign="center" verticalAlign="middle" className="app">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h1" icon color="violet" textAlign="center">
          <Icon name="puzzle piece" color="violet" />
          Login for DevChat
        </Header>
        <Form onSubmit={handleSubmit} size="large">
          <Segment stacked>
            <Form.Input
              fluid
              name="email"
              icon="mail"
              iconPosition="left"
              placeholder="Email Address"
              onChange={handleChange}
              className={handleInputError('email')}
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
              className={handleInputError('password')}
              type="password"
            />
            <Button disabled={isLoading} className={isLoading ? 'loading' : ''} color="violet" fluid size="large">
              Submit
            </Button>
          </Segment>
        </Form>
        {errors.length !== 0 && (
          <Message error>
            <h3>Error</h3>
            {displayErrors()}
          </Message>
        )}
        <Message>
          Don't have an account? <Link to="/register">Register</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Login;
