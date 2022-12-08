import { useState } from "react"
import { Link } from "react-router-dom"
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const Registrar = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmarPassword, setConfirmarPassword] = useState('');
  const [alerta, setAlerta] = useState('');

  const handleSubmit = async e =>{

    e.preventDefault();

    if([nombre, email, password, confirmarPassword].includes('')){
      setAlerta({msg:'Todos los campos son obligatorios', error: true});
      return;
    }

    if(password !== confirmarPassword){
      setAlerta({msg:'Las contraseñas no coinciden', error: true});
      return
    }

    if(password.length < 6){
      setAlerta({msg:'La contraseña debe tener al menos seis (6) dígitos', error: true});
      return
    }

    
    setAlerta({});
    // creamos el usuario en la API

    try {
      const url = `/veterinarios`
      await clienteAxios.post(url, {nombre, email, password});
      setAlerta({
        msg: 'Veterinario creado correctamente, revisa tú correo electrónico', 
        error: false
      })

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error:true
      })
    }
  }

  const {msg} = alerta;

  return (
    <>
      <div className="text-indigo-600 font-black text-6xl">Crea tu Cuenta y Administra {""} tus <span className="text-black">Pacientes</span>
      </div>
      
      <div className='mt-20 md:mt-3 shadow-lg px-5 py-8 rounded-xl bg-white'>
        

        { msg && <Alerta
          alerta = {alerta}
        /> }
        <form onSubmit={handleSubmit}>
          <div className="my-2">
            <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="">nombre</label>
            <input 
              type="text" placeholder="Tú nombre" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={ nombre }
              onChange={ e => setNombre(e.target.value)}
            />
          </div>
          <div className="my-2">
            <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="">email</label>
            <input 
              type="email" placeholder="Email de registro" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={ email }
              onChange={ e => setEmail(e.target.value)}
            />
          </div>  

          <div className="my-2">
            <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="">password</label>
            <input 
              type="password" 
              placeholder="Contraseña" 
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={ password }
              onChange={ e => setPassword(e.target.value)}
            />
          </div>
          <div className="my-2">
            <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="">confirmar password</label>
            <input 
              type="password" 
              placeholder="Confirma tú contraseña" 
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={ confirmarPassword }
              onChange={ e => setConfirmarPassword(e.target.value)}
            />
          </div>
          <input 
            type="submit" value="Registrate" className="bg-indigo-700 border w-full py-3 px-10 mt-5 rounded-xl text-white uppercase font-bold hover:cursor-pointer hover:bg-indigo-800 md:w-auto "
          /> 
        </form>
        <nav className='mt-4 lg:flex lg:justify-between'>
          <Link className='block text-center my-5 text-gray-500' to="/">¿Ya tienes una cuenta? <span className="font-bold">Inicia Sesión</span></Link>
          <Link className='block text-center my-5 text-gray-500' to="/olvide-password">Olvidé mi password</Link>
        </nav>
      </div>
    </>
  )
}

export default Registrar