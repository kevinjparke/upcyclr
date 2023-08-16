import { useContext, createContext, useEffect, useState} from "react";
import { auth } from "../firebaseAuth";
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect, signOut, onAuthStateChanged, updateCurrentUser } from "firebase/auth";

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) =>{

    const [user, setUser] = useState({})
    
     const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
    };
    
    const loggingOut = () =>{
        signOut(auth)
    }

    useEffect(()=>{

       const logOut = onAuthStateChanged(auth, (currentUser)=>{
        setUser(currentUser)
       });
       return () =>{
        logOut();
       }

    },[])
    

    return (
    <AuthContext.Provider value={{googleSignIn, loggingOut, user}}>
     {children}
    </AuthContext.Provider>
    )

}

export const UserAuth=() => {
    return useContext(AuthContext)
}