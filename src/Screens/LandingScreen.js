import React from 'react'
import Header from '../Components/Header'
import { Link } from 'react-router-dom'

const LandingScreen = () => {
  return (
    <div className='row landing justify-content-center'>

<div className="col-md-9 my-auto text-center" style={{borderRight:'8px solid white'}}>

<h2 style={{color:'white', fontSize:'130px'}}>5🌟HOTEL</h2>
<h1 style={{color:'white'}}>Guest is always right</h1>
<Link to='/home'>
    <button className="btn btn-primary landingbtn">Get Started</button>
</Link>
</div>

    </div>
  )
}

export default LandingScreen