import React from "react";
import { Button,Form} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import history from "./History";
class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      email:"",
      password:""
    }
    this.validateForm=this.validateForm.bind(this);
    this.redirect=this.redirect.bind(this);
  }
  

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  
  async redirect(event){
    try {
        var email=this.state.email;
        var pass=this.state.password;
        const response = await fetch(`http://localhost:5000/validate_user/${email},${pass}`,{
        method:"GET",
        credentials: 'include'
      });
      const jsonData = await response.json();
      console.log(jsonData);
      if(jsonData.length !== 0)  {
        
          this.props.history.push({
            pathname: '/home',
            state: {jsonData}
          })
         
        
    }
      else{
        alert("Email and password do not match");
      }
    } catch (err) {
      console.error(err.message);
    }
    this.setState(
      {
        email:'',
        password:''
      }
    )
    
  }
  render(){
    return (
      
      <div className="Login">
        <header><h3>Login page</h3></header>
        <Form >
          <Form.Group controlId="email" >
            Email
            <Form.Control
              autoFocus
              type="email"
              value={this.state.email}
              onChange={e => this.setState({email:e.target.value})}
            />
          </Form.Group>
          <Form.Group controlId="password">
            password
            <Form.Control
              value={this.state.password}
              onChange={e => this.setState({password:e.target.value})}
              type="password"
            />
          </Form.Group>
          <Button block variant="success" disabled={!this.validateForm()} onClick={this.redirect} type="button">
            Login
          </Button>
          New user? Click on <a href="/Signup" onClick={()=>history.push("/Signup")}><b>sign up</b></a>
        </Form>
      </div>
    );
  }
}
export default App;
