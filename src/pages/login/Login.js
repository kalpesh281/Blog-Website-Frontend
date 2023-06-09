import React, { useRef, useContext } from 'react'
import { Link } from 'react-router-dom'
import './login.css'
import { Context } from '../../context/Context';
import axios from 'axios';

function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { user, dispatch, isFetching } = useContext(Context)

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" })
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        // const res=await axios.post("https://blog-app-backend-vuwf.onrender.com/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      })
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data })
      // console.log(res)
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" })
    }
  };
  console.log(user)
  return (
    <div className='login'>
      <span className='loginTitle'>Login</span>
      <form className='loginForm' onSubmit={handleSubmit}>
        <label>Username</label>
        <input type='text' placeholder='username' className='loginInput' ref={userRef} />
        <label>Password</label>
        <input type='password' placeholder='Password' className='loginInput' ref={passwordRef} />
        <button className='loginButton' type='submit' disabled={isFetching}>Login</button>
      </form>
      <button className='loginRegisterButton'><Link className='link' to='/register'>Register</Link></button>
    </div>
  )
}

export default Login
