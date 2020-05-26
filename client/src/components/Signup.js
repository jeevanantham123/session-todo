import React from 'react';
import {Button,Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import history from '../History';
class Signup extends React.Component{
 constructor(props){
     super(props);
     this.state={
         user_name:'',
         user_mail:'',
         user_pass:''
     }
     this.handleSubmit=this.handleSubmit.bind(this);

 }
 async handleSubmit(event)
 {
  
  try {
    var user_name=this.state.user_name;
    var user_mail=this.state.user_mail;
    var user_pass=this.state.user_pass;
    const body = {user_name,user_mail,user_pass};
    console.log(body)
    const response = await fetch("http://localhost:5000/signup_user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    console.log(response)
    history.push('/');
    setTimeout(function(){
        alert("you have now successfully signed up..! \nplease login to continue.." );
    },500); 

  } catch (err) {
    console.error(err.message);
  }

 this.setState(
     {
         user_name:'',
         user_mail:'',
         user_pass:''
     }
 )
 }
 
 validateForm() {
    return this.state.user_mail.length > 0 && this.state.user_name.length > 0 && this.state.user_pass.length > 0 ;
  }
    render(){
    return(
        <div className="signup">
        <header><h3>Signup page</h3></header>
        <Form >
          <Form.Group controlId="name">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              value={this.state.user_name}
              onChange={e => this.setState({user_name:e.target.value})}
            />
          </Form.Group>
          <Form.Group controlId="email" >
          <Form.Label>Email</Form.Label>
            <Form.Control
              autoFocus
              type="email"
              value={this.state.user_mail}
              onChange={e => this.setState({user_mail:e.target.value})}
            />
          </Form.Group>
          <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
            <Form.Control
              autoFocus
              type="password"
              value={this.state.user_pass}
              onChange={e => this.setState({user_pass:e.target.value})}
            />
          </Form.Group>
          <Button block variant="success"  disabled={!this.validateForm()}  onClick={this.handleSubmit} type="button">
            Sign up
          </Button>
          Already a user? Click on <a href="/" onClick={()=>history.push("/")}><b>sign in</b></a>

          </Form>            
        </div>
    )
}
}
export default Signup;