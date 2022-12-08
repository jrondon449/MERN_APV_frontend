import { Link } from "react-router-dom"
import { useState } from "react"
import Alerta from '../components/Alerta'
import clienteAxios from '../config/axios'

const OlvidePassword = () => {

  const [email, setEmail] = useState('');
  const [alerta, setAlerta] = useState({});
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if(email ==='' || email.length < 6){
      setAlerta({
        msg: 'El correo es obligatorio',
        error: true
      })
      return;
    }

    try {
      const { data } = await clienteAxios.post('/veterinarios/olvide-password', { email });

      setAlerta({msg: data.msg})

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const {msg} = alerta;
    return (
      <>
        <div className="text-indigo-600 font-black text-6xl">Recupera tú cuenta y no pierdas tus <span className="text-black">Pacientes</span>
        </div>
      
        <div className='mt-20 md:mt-3 shadow-lg px-5 py-8 rounded-xl bg-white'>
         
          { msg && <Alerta
            alerta = {alerta}
            /> 
          }

          <form 
            onSubmit={ handleSubmit }
          >
            <div className="my-2">
              <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="">email</label>
              <input 
                type="email" 
                placeholder="Email de registro" 
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                value={email} 
                onChange={e => setEmail(e.target.value)}
              />
            </div>  

            <input 
              type="submit" value="Enviar instrucciones" className="bg-indigo-700 border w-full py-3 px-10 mt-5 rounded-xl text-white uppercase font-bold hover:cursor-pointer hover:bg-indigo-800 md:w-auto "
            /> 
          </form>
          
          <nav className='mt-4 lg:flex lg:justify-between'>
            <Link className='block text-center my-5 text-gray-500' to="/">¿Ya tienes una cuenta? <span className="font-bold">Inicia Sesión</span></Link>
            <Link className='block text-center my-5 text-gray-500' to="/registrar">¿No tienes una cuenta? <span className="font-bold">Regístrate</span></Link>
          </nav>
        
        </div>        
      </>
    )
  }
  
export default OlvidePassword