import React, { useState,useEffect } from 'react'
import { useHistory } from 'react-router-dom';

const Form = ({handleUser}) => {

    const [userName,setUserName] = useState('');
    const [password,setPassword] = useState('');
    const [data,setData] = useState('');
    const [errorU,setErrorU] = useState(null);
    const [errorP,setErrorP] = useState(null);
    const history = useHistory();

    

    
    useEffect(() => {
        fetch('http://localhost:8000/users')
        .then(res => res.json())
        .then(data => setData(data))
    },[])

    const submitHandler = (e) =>{
        e.preventDefault();

        if(userName === '' && password === ''){
            setErrorU(true);
            setErrorP(true);
            return
        }else if(userName === ''){
            setErrorU(true);
            setErrorP(false);
            return
        }else if(password === ''){
            setErrorP(true);
            setErrorU(false);
            return
        }

        // {data && data.map(user => {
        //     if(userName === user.userName && password === user.password ){
        //         handleUser(user.userName)
        //         history.push('/home')
               
        //     }
        // })}

        handleUser(userName)
        history.push('/home')

        setUserName('');
        setPassword('');
    }

    return (
        <div>
            <form className="form-control" onSubmit={submitHandler}>
                <label>Username: </label>
                {errorU && <div style={{color:'red'}}>Please fill the username input</div>}
                <input className={`${errorU ? 'border-color-red' : ''}`} type="text" placeholder="Username" value={userName} onChange={(e) => setUserName(e.target.value)}/>
                <label>Password: </label>
                {errorP && <div style={{color:'red'}}>Please fill the password input</div>}
                <input className={`${errorP ? 'border-color-red' : ''}`} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit">Login</button>
            </form>
            
        </div>
    )
}

export default Form
