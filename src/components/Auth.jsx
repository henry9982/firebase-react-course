import { useState } from 'react'
import {auth ,googleProvider } from '../config/firebase.js'
import {createUserWithEmailAndPassword ,signOut ,signInWithPopup} from 'firebase/auth'

const Auth = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    console.log(auth?.currentUser?.email);
    console.log(auth?.currentUser?.photoURL);

    const singIn = async()=>{
      try{
        const data = await createUserWithEmailAndPassword(auth,email,password)
      }catch(err){
        console.error(err);
      }
    }
    const singInWithGoogle = async()=>{
        const data = await signInWithPopup(auth,googleProvider)
      
    }
    const logOut = async()=>{
      try{
        const data = await signOut(auth)
      }catch(err){
        console.error(err);
      }
    }
  return (
    <div>
        <input value={email} onChange={(e)=>setEmail(e.target.value)} type="text" placeholder='Email...' />
        <input value={password} onChange={(e)=>setPassword(e.target.value)} type="text" placeholder='Password...' />
        <button onClick={singIn}>Sign in</button>
        <button onClick={singInWithGoogle}>Sign in with google</button>
        <button onClick={logOut}>Log out</button>
    </div>
  )
}

export default Auth