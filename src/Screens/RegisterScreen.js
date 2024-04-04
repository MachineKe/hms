import axios from 'axios'
import React,{useState,useEffect} from 'react'
import Success from '../Components/Success'
import Loader from '../Components/Loader'
import Error from '../Components/Error'

const RegisterScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cpassword, setCpassword] = useState('')
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [success,setSuccess]= useState()
  async function register()  {
    if (password == cpassword) {
      const user = {
        name,
        email,
        password,
        cpassword
      }
      try {
        setLoading(true)
        const result = await axios.post('/api/users/register', user).data
        setLoading(false)
        setSuccess(true)
        setName('')
        setEmail('')
        setPassword('')
        setCpassword('')
      } catch (error) {
        console.log(error)
        setLoading(false)
        setError(true)
      }
    }
    else {
      alert('Passwords dont match')
    }
  }
  return (
    <div>
      {loading && (<Loader />)}
      {error && (<Error />)}
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5">

          <div className='bs'>
                  {success && (<Success message='Registration success'/>)}

            <h2 >Register</h2>
            <input type="text" className="form-control" placeholder='name'
              value={name}
            onChange={(e)=>{setName(e.target.value)}}
            />
            <input type="text" className="form-control" placeholder='email'
              value={email}

              onChange={(e) => { setEmail(e.target.value) }}

            />
            <input type="password" className="form-control" placeholder='password'
              value={password}

              onChange={(e) => { setPassword(e.target.value) }}

            />
            <input type="password" className="form-control" placeholder='confirm password'
              value={cpassword}
              onChange={(e) => { setCpassword(e.target.value) }}

            />
            <button className="btn btn-primary mt-3" onClick={register}>Register</button>
</div>

        </div>
        </div>
    </div>
  )
}

export default RegisterScreen