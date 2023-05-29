import React, { useEffect, useState } from 'react'
import './sidebar.css'
import axios from 'axios';
import { Link } from 'react-router-dom'

function SideBar() {
  const[cats,setCats]=useState([]);

  useEffect(()=>{
    const getCats=async ()=>{
      const res=await axios.get(("http://localhost:5000/api/categories"))
      setCats(res.data)
    }
    getCats()
  },[])
  return (
    <div className='sideBar'>
      <div className='sidebarItem'>
        <span className='sidebarTitle'>About Me</span>
        <img style={{width:"450px",height:"320px"}} src='https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80' alt='error'/>
        <p>Hello, my name is Kalp, and I am an engineering student. I have a deep love for watching movies, and I consider myself a joyful person. My dream is to explore the world and constantly learn new things.</p>
      </div>
      <div className='sidebarItem'>
      <span className='sidebarTitle'>Categories</span>
      <ul className='sidebarList'>
      {cats.map((c)=>(
        <Link className='link' to={`?/cat=${c.name}`}>
        <li className='sidebarListItem'>{c.name}</li>
        </Link>
      ))}
     
      </ul>
      </div>
      <div className='sidebarItem'>
      <span className='sidebarTitle'>Follow</span>
      <div className='sidebarSocial'>
      <i className="sidebarIcon fa-brands fa-square-facebook"></i>
      <i className="sidebarIcon fa-brands fa-square-twitter"></i>
      <i className="sidebarIcon fa-brands fa-square-pinterest"></i>
      <i className="sidebarIcon fa-brands fa-square-instagram"></i>
      </div>
      </div>
    </div>
  )
}

export default SideBar
