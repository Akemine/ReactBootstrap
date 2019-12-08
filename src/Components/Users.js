import React, {Component} from 'react';


class Users extends Component {
  constructor(props){
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
    }
  }

  componentDidMount() {
    fetch('http://localhost:5000/users/all', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept-Encoding": "gzip , deflate, br",
        "sec-fetch-mode": "no-cors",
        "Access-Control-Request-Headers": "content-type",
        "Access-Control-Request-Method": "GET",
        "Access-Control-Allow-Origin": "*"
      }
    })
    .then(res => res.json())
    .then(json => {
      this.setState({
        isLoaded: true,
        items: json["data"]
      })
    })
  }

    render() {

      var {isLoaded, items} = this.state;

      if (!isLoaded){
        return <div>Loading...</div>
      }
      else {

        console.table(items)
      return (
        <div className="App">
        <ul> 
          {items.map(item => (
            <li key={item.email}>{item.username}</li>
          ))}
        </ul>
        </div>
      )
    }
  }
}

export default Users;

