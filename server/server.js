const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json()); //req.body


//express-session
const cookieParser = require('cookie-parser');
const session = require('express-session');
app.set('trust proxy', 1)

app.use(cookieParser());
 app.sessionMiddleware = session({
      secret : 'abcd',
      resave: true,
      saveUninitialized:true,
      cookie: {
        maxAge: null,
      }
})
app.use(app.sessionMiddleware);
/*
app.use((req, res, next) => {
  if (req.cookies) {
      console.log(req.cookies);
  }
  next();
});*/

var sessionChecker = async (req, res, next) => { 
  if (req.session.user && req.cookies['connect.sid']) {
    next();
  } else {
    res.sendStatus(401);
  }    
};

//check function
app.get("/check",sessionChecker,async(req,res)=>{
  try {
    res.json("checked");
  } catch (error) {
    console.error(err.message);
  }

})
//ROUTES//

//INSERT TODO WITH USER ID
app.post("/todos_list",sessionChecker,async (req, res) => {
  try {
    const { description } = req.body;
    const {user_name}=req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo_list (description,user_id) VALUES($1,$2) RETURNING *",
      [description,user_name]
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get user id with todo

app.get("/todos_list/:user",sessionChecker,async (req, res) => {
  try {
   
    const { user } = req.params;
    if(user == "undefined"){
      var use=req.session.user[0].user_id;
      const allTodos = await pool.query("SELECT * FROM todo_list where user_id = $1",[use]);
      res.json(allTodos.rows);
    }
    else{
    const allTodos = await pool.query("SELECT * FROM todo_list where user_id = $1",[user]);
    res.json(allTodos.rows);
    }
  } catch (err) {
    console.error(err.message);
  }
});

//delete Todo

app.delete("/todos_list/:id",sessionChecker,async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo_list WHERE todo_id = $1", [
      id
    ]);
    res.json("Todo was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});

//user signup
app.post("/signup_user", async (req, res) => {
  try {
    const { user_name } = req.body;
    const { user_mail } = req.body;
    const { user_pass } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO user_details (user_name,user_email,user_password) VALUES($1,$2,$3) RETURNING *",
      [user_name,user_mail,user_pass]
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

/*
//fetching all user details
app.get("/get_user",sessionChecker,async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM user_details");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});*/

//logout
app.get("/logout",sessionChecker,async(req,res)=>{
  try{
    req.session.destroy();
    res.clearCookie('connect.sid');
    res.json({"logout":true});
  }
  catch(err){
    console.error("err"+err.message);
  }
})
//validate user details
app.get("/validate_user/:email,:password",async (req, res) => {
  try {
    const {email} =req.params;
    const {password}=req.params;
    const allTodos = await pool.query("SELECT user_id,user_name FROM user_details WHERE user_email = $1 AND user_password =$2 ",
    [email,password]);
    res.json(allTodos.rows);
    if(allTodos.rows !== [])
    {
      req.session.user=allTodos.rows;
      req.session.save();
    }
  } catch (err) {
    console.error("err"+err.message);
  }
});

app.listen(5000, () => {
  console.log("server has started on port 5000");
});
