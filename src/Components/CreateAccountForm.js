import React from 'react';
import { Button, Form } from 'react-bootstrap';

let username = "IciCParis";
let token = "";
let email = "dav@gmail.com";
let password = "david";
let address =""
let userData = ""
let user = ""
let index = 1;



function LoginButton(props) {
    return (
        <Button onClick={props.onClick}>
        Créer mon compte
        </Button>
        );
    }
    
        
        class CreateAccountForm extends React.Component {
            
            constructor(props) {
                super(props);
                this.state = {value: ''};
                this.handleEmail = this.handleEmail.bind(this);
                this.handlePassword = this.handlePassword.bind(this);
                this.handleUsername = this.handleUsername.bind(this);
                this.handleSubmit = this.handleSubmit.bind(this);
                this.state =
                {data: [{isConnected: false}, {email: ''}, {password: ''}, {username: ''}] }
            }
            
            handleEmail = (event) => {
                this.setState({email: event.target.value})
            }
            
            handlePassword = (event) => {
                this.setState({password: event.target.value})
            }
            
            handleUsername = (event) => {
                this.setState({username: event.target.value})
            }
            
            handleSubmit = (event) => {
                let index = 2;
                fetch('http://localhost:5000/users/create', {
                method: "POST",
                body: JSON.stringify({
                    "index": index,
                    "email" : this.state.email,
                    "username": this.state.username,
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
            this.setState({isConnected: true})
            console.log(this.state)
        }
        
        
        
        render(){
            const isConnected = this.state.isConnected;
            let button;
        
            button = <LoginButton onClick={this.handleSubmit} />;
            if (isConnected) {
              this.props.history.push("/")
              
            } else {
              
            }
            return (
                <div className="container">
                <Form>
                <Form.Group>
                <Form.Label>Nom d'utilisateur </Form.Label>
                <Form.Control placeholder="Entrer votre nom d'utilisateur" value={this.state.username} onChange={this.handleUsername}/>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                <Form.Label>Adresse Email</Form.Label>
                <Form.Control type="email" placeholder="Entrer votre adresse Email" value={this.state.value} onChange={this.handleEmail} />
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
        
        export default CreateAccountForm;
        