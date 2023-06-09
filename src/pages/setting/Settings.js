import React, { useContext, useState } from 'react'
import './settings.css'
import SideBar from '../../Compo/sidebar/SideBar'
import { Context } from '../../context/Context'
import axios from 'axios'
function Settings() {
  const PF = "http://localhost:5000/images/"
  const { user, dispatch } = useContext(Context)
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [success, setSuccess] = useState(false)

  const handlesubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" })
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password

    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post("http://localhost:5000/api/upload", data);
      } catch (error) {

      }
    }; try {
      const res = await axios.put("http://localhost:5000/api/users/" + user._id, updatedUser)
      setSuccess(true)
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data })
    } catch (error) {
      dispatch({ type: "UPDATE_FAILURE" })
    }

  }


  return (
    <div className='settings'>
      <div className='settingsWrapper'>
        <div className='settingsTitle'>
          <span className='settingsUpdateTitle'>Update Your Account</span>

        </div>
        <form className='settingsForm' onSubmit={handlesubmit}>
          <label >Profile Picture</label>
          <div className='settingsPP'><img src={file ? URL.createObjectURL(file) : PF + user.profilePic} alt='error' />
            <label htmlFor='fileInput'>
              <i className="settingsPPIcon fa-solid fa-user-plus"></i>
            </label>
            <input type='file' id='fileInput' style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])} /></div>
          <label>UserName</label>
          <input type='text' placeholder={user.username} onChange={(e) => setUsername(e.target.value)} />
          <label>Email</label>
          <input type='email' placeholder={user.email} onChange={(e) => setEmail(e.target.value)} />
          <label>Password</label>
          <input type='password' onChange={(e) => setPassword(e.target.value)} />
          <button className='settingssubmit' type='submit'>Update</button>
          {success && <span style={{ color: "green", textAlign: "center", marginTop: "20px" }}>Profile has been Updated....</span>}
        </form>
      </div>
      <SideBar />
    </div>
  )
}

export default Settings
