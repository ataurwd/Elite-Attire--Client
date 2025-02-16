import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
  } from "firebase/auth";
  import React, { createContext, useEffect, useState } from "react";
  import { auth } from './../firebase/firebase.init';

  export const FormContext = createContext(null);
  
const AuthContext = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
  
    const googleProvider = new GoogleAuthProvider();
    const googleLogin = () => {
      setLoading(true);
      return signInWithPopup(auth, googleProvider);
    };
  
    // register
    const handelRegisterUser = (email, password) => {
      setLoading(true);
      return createUserWithEmailAndPassword(auth, email, password);
    };
  
    // login user with email and password
    const loginUser = (email, password) => {
      setLoading(true);
      return signInWithEmailAndPassword(auth, email, password);
    };
  
    // logout user
    const logoutUser = () => {
      setLoading(true);
      return signOut(auth);
    };
  
    //   for save user
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        setUser(currentUser)
      });
  
      return () => {
        return unsubscribe();
      };
    }, []);
  
    const obj = {
      googleLogin,
      handelRegisterUser,
      loginUser,
      logoutUser,
      user,
      setUser,
      loading,
      setLoading,
    };
  
    return <FormContext.Provider value={obj}>{children}</FormContext.Provider>;
  };
  
  export default AuthContext;