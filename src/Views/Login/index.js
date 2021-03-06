import React from 'react';
import { connect } from 'react-redux';
import { fetchLogin } from '../../store/actions/auth';

// components
import Input from '../../Components/Input';
import Form from '../../Components/Form';
import Title from '../../Components/Title';
import Button from '../../Components/Button';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  };

  handleLogin = this.handleLogin.bind(this);

  // make auth component
  componentWillMount() {
    if (this.props.authorized) {
      this.props.history.push('/polls');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.authorized && nextProps.authorized) {
      this.props.history.push('/polls');
    }
  }

  onChange(text, source) {
    this.setState({ [source]: text });
  }

  handleLogin(e) {
    e.preventDefault();

    this.props.dispatch(fetchLogin(this.state));
  }

  render() {
    return (
      <div>
        <Title>Login</Title>
        <Form onSubmit={this.handleLogin}>
          <Input
            value={this.state.email}
            label="Email"
            onChange={text => this.onChange(text.target.value, 'email')}
            type="email"
            placeholder="voting@app.com..."
          />
          <Input
            value={this.state.password}
            label="Password"
            onChange={text => this.onChange(text.target.value, 'password')}
            type="password"
            placeholder="Password..."
          />
          <Button type="submit">Login</Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authorized: state.auth.authorized,
});

export default connect(mapStateToProps)(Login);
