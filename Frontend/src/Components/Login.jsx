import React, { useState } from 'react'
import axios from "axios"
import { useAuth } from '../Context/AuthContext'

function Login() {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const {setAuthUser,setFirstName,FirstName} = useAuth()
    const handleSubmit = async (e)=>{
        e.preventDefault()
        const user = {
            email:email,
            password:password
        }
       try {
         const lomg = await axios.post("http://localhost:5000/user/login",user)
        //  console.log(lomg.data.token); // JWT token
         console.log(lomg);
        //  console.log(FirstName);
         //  setAuthUser(true)
         
         
         if(lomg){
             setFirstName(lomg.data.name)   //setting the user's firstname
             setAuthUser(true)
            alert("Login successfull")
         }else{
            alert("Error in login")
         }
       } catch (error) {
        console.log(error);
        
       }
        
    }
  return (
    <div>
     <label htmlFor="">Enter your email</label>
     <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
     <label htmlFor="">Enter your password</label>
     <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
     <button onClick={handleSubmit}>Login</button>
    </div>
  )
}

export default Login
