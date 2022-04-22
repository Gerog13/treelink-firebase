import React, { useState, useEffect } from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import {
  auth,
  userExists,
  registerNewUser,
  getUserInfo,
} from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

const AuthProvider = ({
  children,
  onUserLoggedIn,
  onUserNotRegistered,
  onUserNotLoggedIn,
}) => {
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const isRegistered = await userExists(user.uid);
        if (isRegistered) {
          const userInfo = await getUserInfo(user.uid);
          if (userInfo.processCompleted) {
            onUserLoggedIn(userInfo);
          } else {
            onUserNotRegistered(userInfo);
          }
        } else {
          await registerNewUser({
            uid: user.uid,
            displayName: user.displayName,
            profilePicture: "",
            username: "",
            processCompleted: false,
          });
          onUserNotRegistered(user);
        }
      } else {
        onUserNotLoggedIn(user);
      }
    });
  }, [navigate, onUserLoggedIn, onUserNotRegistered, onUserNotLoggedIn]);
  return <div>{children}</div>;
};

export default AuthProvider;
