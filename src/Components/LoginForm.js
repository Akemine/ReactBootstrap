import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { connect } from 'react-redux'

let username = "IciCParis";
let token = "";
let email = "dav@gmail.com";
let password = "david";
let address =""
let userData = ""
let user = ""
let index = 1
let isConnected = false
let IsConnected = isConnected



function LoginButton(props) {
  return (
    <Button onClick={props.onClick}>
      Connexion
    </Button>
  );
}

function LogoutButton(props) {
  return (
    <Button onClick={props.onClick}>
      Déconnexion
    </Button>
  );
}


class LoginForm extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state =
    {data: [{isConnected: false}, {email: ''}, {password: ''}] }
  }

  handleEmail = (event) => {
    this.setState({email: event.target.value})
  }

  handlePassword = (event) => {
    this.setState({password: event.target.value})
  }


  handleSubmit = (event) => {
    fetch('http://localhost:5000/auth/login', {
    method: "POST",
    body: JSON.stringify({
      "email" : this.state.email,
      "password": this.state.password
    }),
    headers: {
      "Content-Type": "application/json",
      "Accept-Encoding": "gzip , deflate, br",
      "sec-fetch-mode": "no-cors",
      "Access-Control-Request-Headers": "content-type",
      "Access-Control-Request-Method": "POST",
      "Access-Control-Allow-Origin": "*"
    }
  })
  .then(response => response.json())
  .then(response => {
    token = response.Authorization
    userData = JSON.parse(response.user)
    address = userData.address
    console.log(userData)
    console.log(token)
    console.log("Vous êtes connecté.")
    this.setState({isConnected: true})
    console.log(this.state)
  })
  event.preventDefault();
}

componentWillUnmount(){
  this.props.LogInOff(this.props.IsConnected.isConnected)
}


  render(){
    const {IsConnected} = this.props; // info du magasin
    isConnected = this.state.isConnected;
    let button;

    button = <LoginButton onClick={this.handleSubmit} />;
    if (isConnected) {
      this.props.history.push("/")
      
    } else {
      console.log(IsConnected)
    }
   return (

       <div className="container">
       <Form>
       <Form.Group controlId="formBasicEmail">
       <Form.Label>Adresse Email</Form.Label>
       <Form.Control type="email" placeholder="Entrer votre adresse Email" value={this.state.value} onChange={this.handleEmail}/>
       <Form.Text className="text-muted">
       Ne partagez jamais votre adresse Email !
       </Form.Text>
       </Form.Group>
       <Form.Group controlId="formBasicPassword">
       <Form.Label>Mot de passe</Form.Label>
       <Form.Control type="password" placeholder="Entrer votre mot de passe" value={this.state.password} onChange={this.handlePassword}/>
       </Form.Group>
       {button}
       </Form>
       
        </div>
     )
   }
}

const mapStateToProps = state => {
  return {
      IsConnected: isConnected
  }
}

const mapDispatchToProps = dispatch => {
  return {
    LogInOff : isConnected => {
      dispatch({
        type: "SAY_OK", IsConnected: isConnected
      })
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
