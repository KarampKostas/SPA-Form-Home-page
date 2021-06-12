import Form from "./components/Form";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { useEffect, useState } from "react";

function App() {

	const [user,setUser] = useState('');

	const handleUser = (username) =>{
		setUser(username);
	}

	//get users
	useEffect(() =>{
		getLocalTodos();
	}, []);

	//save users
	useEffect(() => {
		saveLocalUser()
	},[user])

	const saveLocalUser = () =>{
		if(localStorage.getItem('user') === null){
			localStorage.setItem('user',JSON.stringify([]));
		}else{
			localStorage.setItem('user',JSON.stringify(user))
		}
	}

	const getLocalTodos =() => {
		if(localStorage.getItem('user') === null){
			localStorage.setItem('user',JSON.stringify([]));
		}else{
			let localUser = JSON.parse(localStorage.getItem('user'));
			setUser(localUser);
		}
	}

  return (
    <Router>
		<div className="container">
		<Switch>
			<Route exact path="/">
				<Form handleUser={handleUser} />
			</Route>
			<Route exact path="/home">
				<Home user={user} setUser={setUser}/>
			</Route>
		</Switch>
		</div>
    </Router>
  );
}

export default App;
