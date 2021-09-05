import { useState, VFC } from 'react';
import { Button, Form, Grid, Header, Icon, Message, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import md5 from 'md5';

import { auth, createUserWithEmailAndPassword, updateProfile } from '../../api/auth';
import { database, ref, child, set } from '../../api/database';
import { UserCredential } from 'firebase/auth';

const initialState = {
  username: '',
  email: '',
  password: '',
  passwordConfirmation: '',
};

const Register: VFC = () => {
  const [state, setState] = useState(initialState);
  const [errors, setErrors] = useState<String[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [usersRef, _] = useState(ref(database, 'users'));

  const isFormValid = (): boolean => {
    if (!isFormEmptyValid()) {
      setErrors(['全てのフィールドを入力してください', ...errors]);
      return false;
    } else if (!isPasswordValid()) {
      setErrors(['パスワードが不正の値です', ...errors]);
      return false;
    }
    return true;
  };

  const displayErrors = () => {
    return errors.map((error, index) => {
      return <p key={index}>{error}</p>;
    });
  };

  const isFormEmptyValid = (): boolean => {
    const { username, email, password, passwordConfirmation } = state;

    return username.length !== 0 || email.length !== 0 || password.length !== 0 || passwordConfirmation.length !== 0;
  };

  const isPasswordValid = () => {
    const { password, passwordConfirmation } = state;
    const isValidLength = password.length > 6 && passwordConfirmation.length > 6;
    const isSameValid = password === passwordConfirmation;

    return isValidLength && isSameValid;
  };

  const handleChange = (e: React.ChangeEvent<{ name: string; value: string }>) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.ChangeEvent<{}>) => {
    if (isFormValid() === false) return;
    e.preventDefault();
    setIsLoading(true);

    createUserWithEmailAndPassword(auth, state.email, state.password)
      .then((createdUser) => {
        console.log(createdUser);
        updateProfile(createdUser.user, {
          displayName: state.username,
          photoURL: `https://gravatar.com/${md5(createdUser.user.email as string)}?d=identicon`,
        })
          .then(() => {
            saveUser(createdUser).then(() => {
              console.log('user saved');
            });
          })
          .catch((error) => {
            console.log(error);
            setErrors([error.toString(), ...errors]);
          });
      })
      .catch((error) => {
        console.log(error);
        setErrors([error.toString(), ...errors]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const saveUser = (createdUser: UserCredential) => {
    const childRef = child(usersRef, createdUser.user.uid);
    return set(childRef, { name: createdUser.user.displayName, avatar: createdUser.user.photoURL });
  };

  const handleInputError = (inputName: string): string => {
    return errors.some((error) => error.toLocaleLowerCase().includes(inputName)) ? 'error' : '';
  };

  return (
    <Grid textAlign="center" verticalAlign="middle" className="app">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h1" icon color="orange" textAlign="center">
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
              className={handleInputError('username')}
              type="text"
            />
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
            <Form.Input
              fluid
              name="passwordConfirmation"
              icon="repeat"
              iconPosition="left"
              placeholder="Password Confirmation"
              onChange={handleChange}
              value={state.passwordConfirmation}
              className={handleInputError('password')}
              type="password"
            />
            <Button disabled={isLoading} className={isLoading ? 'loading' : ''} color="orange" fluid size="large">
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
          Already a user? <Link to="/login">Login</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Register;
