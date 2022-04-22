import React, { useState } from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import AuthProvider from "../components/AuthProvider";
import { auth, userExists } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

const LoginView = () => {
  const navigate = useNavigate();
  // const [currentUser, setCurrentUser] = useState(null);
  /*
  State
  0: initialized
  1: loading
  2: login completed
  3: login without register
  4: nobody logged in
  5: user already exists
  6: new username, click to continue
  */
  const [state, setCurrentState] = useState(0);

  // useEffect(() => {
  //   setCurrentState(1);
  //   onAuthStateChanged(auth, async (user) => {
  //     if (user) {
  //       const isRegistered = await userExists(user.uid);
  //       if (isRegistered) {
  //         navigate("/dashboard");
  //         setCurrentState(2);
  //       } else {
  //         navigate("/choose-username");
  //         setCurrentState(3);
  //       }
  //       console.log(user.displayName);
  //     } else {
  //       setCurrentState(4);
  //       console.log("No hay nadie autenticado");
  //     }
  //   });
  // }, [navigate]);

  async function handleOnClick() {
    const googleProvider = new GoogleAuthProvider();
    await signInWithGoogle(googleProvider);

    async function signInWithGoogle(googleProvider) {
      try {
        const res = await signInWithPopup(auth, googleProvider);
        console.log(res);
      } catch (error) {
        console.error(error);
      }
    }
  }

  function handleUserLoggedIn(user) {
    navigate('/dashboard');
  }
  function handleUserNotRegistered(user) {
    navigate('/choose-username');
  }
  function handleUserNotLoggedIn(user) {
    setCurrentState(4);
  }

  if (state === 4) {
    return (
      <div>
        <button onClick={handleOnClick}>Login with Google</button>
      </div>
    );
  }
  return (
    <AuthProvider
      onUserLoggedIn={handleUserLoggedIn}
      onUserNotRegistered={handleUserNotRegistered}
      onUserNotLoggedIn={handleUserNotLoggedIn}
    >
      <div>Loading...</div>
    </AuthProvider>
  );
};

export default LoginView;
