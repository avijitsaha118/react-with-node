import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch('http://localhost:4000/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, [])

  const handleAddUser = event =>{
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    // console.log(name, email);
    const user ={name, email};

    //post data to server

    fetch('http://localhost:4000/user', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    .then(res => res.json())
    .then(data => {
      const newUsers = [...users, data];
      setUsers(newUsers);
      console.log(data);
    })

  }

  return (
    <div className="App">
      <h1>My own data: {users.length}</h1>
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" placeholder='name' required></input>
        <input type="text" name="email" placeholder='email' required></input>
        <input type="submit" value='Add User'></input>
      </form>
      <ul>
        {
          users.map(user => <li key={user.id}> name: {user.name} email: {user.email} id:{user.id}</li>)
        }
      </ul>
    </div>
  );
}

export default App;
