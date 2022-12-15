import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';
import useAuth from '../hooks/useAuth'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alerta, setAlerta] = useState({})
  const navigate = useNavigate()
  const { setAuth } = useAuth();
  const { msg } = alerta


  
  const handleSubmit = async (e) =>{
    e.preventDefault()
    
    
    if([email, password].includes('')){
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return
    }

    try {
      const { data } = await clienteAxios.post('/veterinarios/login', {email, password})
      localStorage.setItem('token', data.token)
      setAuth(data)
      navigate('/admin')
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error:true
      })
    }

  }


  return (
      <>
        <div className="text-indigo-600 font-black text-6xl">Inicia Sesión y Administra   {""} tus <span className="text-black">Pacientes</span>
        </div>


        <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
          { msg && <Alerta 
            alerta={alerta}
          />}

          <form onSubmit={handleSubmit}>
            <div className="my-4">
              <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="">Email</label>
              <input 
                type="email" placeholder="Email de registro" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" value={email}
                onChange = { e => setEmail(e.target.value)}
              />
            </div> 
            <div className="my-4">
              <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="">Password</label>
              <input 
                type="password" placeholder="Contraseña" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" value={password} autoComplete="off"
                onChange = { e => setPassword(e.target.value)}

              />
            </div>
            <input 
                type="submit" value="Iniciar sesión" className="bg-indigo-700 border w-full py-3 px-10 mt-5 rounded-xl text-white uppercase font-bold hover:cursor-pointer hover:bg-indigo-800 md:w-auto "
              />  
          </form>

          <nav className='mt-8 lg:flex lg:justify-between'>
            <Link className='block text-center my-5 text-gray-500' to="/registrar">¿No tienes una cuenta? <span className="font-bold">Regístrate</span></Link>
            <Link className='block text-center my-5 text-gray-500' to="/olvide-password">Olvidé mi password</Link>
          </nav>
        </div>
      </>
  )
}

export default Login
