import React, { useState } from "react";
import AuthProvider from "../components/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { existsUsername, updateUser } from "../firebase/firebase";

const ChooseUsernameView = () => {
  const navigate = useNavigate();
  const [state, setState] = useState(0);
  const [currentUser, setCurrentUser] = useState({});
  const [username, setUsername] = useState("");

  function handleUserLoggedIn(user) {
    navigate("/dashboard");
  }
  function handleUserNotRegistered(user) {
    setCurrentUser(user);
    setState(3);
  }
  function handleUserNotLoggedIn(user) {
    navigate("/login");
  }

  function handleInputUsername(e) {
    setUsername(e.target.value);
  }

  async function handleContinue() {
    if (username !== "") {
      const exists = await existsUsername(username);
      if (exists) {
        setState(5);
      } else {
        const tmp = { ...currentUser };
        tmp.username = username;
        tmp.processCompleted = true;
        await updateUser(tmp);
        setState(6);
      }
    }
  }

  if (state === 6) {
    return <div>
      <h1>
        Congratulations! Now you can go to the dashboard
      </h1>
      <Link to="/dashboard">Continue</Link>
    </div>
  }

  if (state === 3 || state === 5) {
    return (
      <div>
        <h1>Welcome {currentUser.displayName}</h1>
        <p>To finish the process, enter a username</p>
        {state === 5 ? <p>The username already exists, pick another one</p> : ''}
        <div>
          <input type="text" onChange={handleInputUsername} />
        </div>
        <div>
          <button onClick={handleContinue}>Continue</button>
        </div>
      </div>
    );
  }
  return (
    <AuthProvider
      onUserLoggedIn={handleUserLoggedIn}
      onUserNotRegistered={handleUserNotRegistered}
      onUserNotLoggedIn={handleUserNotLoggedIn}
    ></AuthProvider>
  );
};

export default ChooseUsernameView;
