import React from 'react';
import { Container} from 'react-grid-system';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Button} from 'react-bootstrap';
import ListTodos from './components/Listtodo';
import history from "./History";

class Home extends React.Component{
    constructor(props){
      super(props);
      if(props.location.state !== undefined){
        this.user_id=props.location.state.jsonData[0].user_id;
        this.user_name=props.location.state.jsonData[0].user_name;
      }
      this.state={task:'',tasks:[],isclicked:false};
      this.handlechange=this.handlechange.bind(this);
      this.handlesubmit=this.handlesubmit.bind(this);
      this.redirect=this.redirect.bind(this);
      this.handleclick=this.handleclick.bind(this);
      this.check=this.check.bind(this);
      }
      handlechange(e){
        this.setState({task:e.target.value});
      }
      handleclick(e)
      { e.preventDefault();
        if(this.state.isclicked===false){
          this.setState({
            isclicked:true
          })
        }
        else{
          this.setState({
            isclicked:false
          })
        }
      }
      async redirect(e){
        setTimeout(async a =>{
          try {
            const response = await fetch("http://localhost:5000/logout",
            {
              method:"GET",
              credentials:'include'
            });
            const jsonData = await response.json();
            if(jsonData.logout===true){
              setTimeout(function a(){
                history.push("/");
              },500) 
            }
          } catch (error) {
            console.log(error);
          }
        }

        ,500);}
        
      async check(e){
        try {
          const response = await fetch("http://localhost:5000/check",
          {
            method:"GET",
            credentials:'include'
          });
          if(response.status === 401) history.push("/");
        } 
        catch (error) {
          console.log("err");
          history.push("/");
        }
      }
        handlesubmit = async e =>{
          e.preventDefault();
          try {
            var description= this.state.task;
            var user_name=this.user_id;
            const body = {description,user_name};
            const response = await fetch("http://localhost:5000/todos_list", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(body),
              credentials: 'include'
            });
            console.log(response);
          } catch (err) {
            console.error(err.message);
          }
          const after_list=this.state.tasks;
          after_list.push(this.state.task);
          this.setState({
              tasks: after_list,
              task: ''
          });
          console.log(this.state.tasks.curr_user);
      }
    
    render(){
      const isclicked=this.state.isclicked;
      this.check();
      return(
        <div>
      <Container className="App">
            <h1>
            TODO
            <div className="exit">
            <Button variant="danger" className="logout" type="button" 
            onClick={this.redirect}>
            logout </Button>
            </div>            
            </h1>
          <form>
          <h4>Got any Todo?
          </h4>
          <h5><input type="text" value={this.state.task} onChange={this.handlechange} style={{"height": "35px"}}/>
          &nbsp;
          <Button variant="dark" type="button"  onClick={this.handlesubmit}><b>#Add to TODO</b></Button></h5>   
          <h4>Todo-List:</h4>
          <Button  variant="warning" type="button" onClick={this.handleclick}>show</Button>
          {isclicked ?
          <ListTodos user={this.user_id}/>
          :
          <div></div>
          }
          </form>
       </Container>
      </div>
      )
    }
  }
  

  export default Home;