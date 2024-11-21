import React from "react";
import ReactDOM from "react-dom/client";
import axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const token = document.querySelector('[name=csrf-token]').content

    axios.defaults.headers.common['X-CSRF-TOKEN'] = token
    axios.post("/login", {email: e.target[0].value, password: e.target[1].value})
      .then(window.location = "/")
      .catch(error => console.log(error))
  }

  render(){
    return(
      <div className="flex h-screen items-center justify-center">
      <div className="card bg-base-100 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">EchoWork Login</h2>
          <form onSubmit={this.handleSubmit}>
            <label>Email Address:</label><br/>
            <input type="text" name="email" placeholder="email@example.com" value={this.state.email} onChange={this.handleChange}/><br/>
            <label>Password</label><br/>
            <input type="text" name="password" value={this.state.password} onChange={this.handleChange}/><br/>
            <input type="submit" className="btn btn-primary" value="Login"/><br/>
          </form>
        </div>
      </div>
      </div>
    )
  }
}

const loginContainer = document.getElementById("login-container");
if (loginContainer) {
  const loginRoot = ReactDOM.createRoot(loginContainer);
  loginRoot.render(<Login/>);
}