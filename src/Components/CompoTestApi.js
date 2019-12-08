import React from 'react';
import { Button, Form } from 'react-bootstrap';

//let username = "IciCParis";
let token = "";
let email = "dav@gmail.com";
let password = "david";
let address =""
let userData = ""
let user = ""
//let index = 1;

let username = ""
let name = "myFirstContract"
let description = "Les poneys sont généreux"
let endDate = "12/12/2012"
let userId = "0"


function LoginButton(props) {
  return (
    <Button onClick={props.onClick}>
      API TEST
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

function CreateContract(props) {
  return (
    <Button onClick={props.onClick}>
      Créer un contrat
    </Button>
  );
}

class CompoTestApi extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {isConnected: false};
  }

  state = {
    isConnected: false,
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }
  
  handleSubmit = (event) => {
    fetch('http://localhost:5000/auth/login', {
    method: "POST",
    body: JSON.stringify({
      "email" : email,
      "password": password
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

handleDeco = (event) => {
  
  console.log("Deconnexion.");
  fetch('http://localhost:5000/auth/logout', {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Accept-Encoding": "gzip , deflate, br",
    "sec-fetch-mode": "no-cors",
    "Authorization": "Bearer " + token,
    "Access-Control-Request-Headers": "content-type",
    "Access-Control-Request-Method": "POST",
    "Access-Control-Allow-Origin": "*"
  }
})
  this.setState({isConnected: false})
  console.log(this.state)
event.preventDefault();
}

createContract = () => {
  let proposals = [{address: address, name: "Dumdum"}, {address: address, name: "DoumDoum"}]
  fetch('http://localhost:5000/contracts/create', {
  method: "POST",
  body: JSON.stringify({
    "name": name,
    "description": description,
    "end_date": endDate,
    "user": userData,
    "proposals": proposals
  }),
  headers: {
    "Content-Type": "application/json",
    "Accept-Encoding": "gzip , deflate, br",
    "sec-fetch-mode": "no-cors",
    "Authorization": "Bearer " + token,
    "Access-Control-Request-Headers": "content-type",
    "Access-Control-Request-Method": "POST",
    "Access-Control-Allow-Origin": "*"
  }

})
  .then(response => response.json())

    address = userData.address
    email = userData.email
    username = userData.username
    console.log("mail de l'user : " + email)
    console.log("username de l'user : " + username)
    console.log("token de l'user " + token)
    console.log(name)
    console.log(description)
    console.log(endDate)
    console.log(address)
    console.table(proposals)
    console.log("Vous avez créé un contract.")
  console.log()
}

render(){
  const isConnected = this.state.isConnected;
  let button;
  let contract;

  if (isConnected) {
    button = <LogoutButton onClick={this.handleDeco} />;
    contract = <CreateContract onClick={this.createContract}/>
    
  } else {
    button = <LoginButton onClick={this.handleSubmit} />;
  }
  return (
    <div>
      {button}
      {contract}
    </div>
  );
}
  
  // return (
  //   {isConnected?
  //   (
  //     <div className="container">
  //     <Form onSubmit={this.handleSubmit}>
  //     <Form.Group>
  //     <Form.Label>Nom d'utilisateur </Form.Label>
  //     <Form.Control placeholder="Entrer votre nom d'utilisateur" />
  //     </Form.Group>
  //     <Form.Group controlId="formBasicEmail">
  //     <Form.Label>Adresse Email</Form.Label>
  //     <Form.Control type="email" placeholder="Entrer votre adresse Email" />
  //     <Form.Text className="text-muted">
  //     Ne partagez jamais votre adresse Email !
  //     </Form.Text>
  //     </Form.Group>
  //     <Form.Group controlId="formBasicPassword">
  //     <Form.Label>Mot de passe</Form.Label>
  //     <Form.Control type="password" placeholder="Entrer votre mot de passe" />
  //     </Form.Group>
  //     <Button variant="primary" type="submit">
  //     Se connecter
  //     </Button>
  //     </Form>
  //     </div> 
  //     :
  //     <div>
  //     <Form onSubmit={this.handleDeco}>
  //     <Button variant="primary" type="submit">
  //     Se déconnecter
  //     </Button>
  //     </Form>
  //     </div>
  //   )
  // }
}

export default CompoTestApi;
