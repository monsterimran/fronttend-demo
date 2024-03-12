import PropTypes from "prop-types";
import { createContext } from "react";
import { useEffect, useState } from "react";
// import useAxios from '../../hooks/useAxios';
import auth from "./../firebase/firebase.config.js";
import {
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup
} from "firebase/auth";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fbpic, setFbpic] = useState(null);
  // const mainAxios = useAxios();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("user in the auth state changed", currentUser);
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      return unsubscribe();
    };
  }, [user]);

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const Register = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // implement google sign in
  const provider = new GoogleAuthProvider();
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);           
  };

  const fbProvider = new FacebookAuthProvider();
  const facebookSignIn = () => {
    return signInWithPopup(auth, fbProvider);
  };

  const authInfo = {
    user,
    loading,
    logOut,
    Register,
    login,
    googleSignIn,
    facebookSignIn,
    fbpic,
    setFbpic
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.object,
};

export default AuthProvider;
