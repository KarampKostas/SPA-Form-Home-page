import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';

const Home = ({user,setUser}) => {
    const [data,setData] = useState(null);
    const history = useHistory();

    useEffect(() => {
        fetch('http://localhost:8000/users')
        .then(res => res.json())
        .then(data => setData(data))
    },[])

   
    const logoutHandler = () =>{
        setUser('');
        history.push('/')
    }

    return (
        user ? <div>
            <h1>Welcome {user}</h1>
            <button className="btn" onClick={logoutHandler}>Logout</button>
            <div className="user-container">
                
                {data && data.map(user => (
                    <div className="user-div" key={user.id}>
                        <div><strong>ID</strong>: {user.id}</div>
                        <div><strong>First Name</strong> : {user.firstName}</div>
                        <div><strong>Last Name</strong> : {user.lastName}</div>
                        <div><strong>Register Date</strong> : {user.createdTimestamp}</div>
                        <div><strong>Role</strong> : {user.isAdmin ? 'Admin' : 'User'}</div>
                    </div>
                ))}
            </div>
        </div> : <h1>You are not logged in</h1>
    )
}

export default Home
