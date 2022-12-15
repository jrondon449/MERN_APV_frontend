import { useState, useEffect } from "react"
import { useParams, Link } from 'react-router-dom'
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const NuevoPassword = () => {

  const [password, setPassword] = useState('');
  const [confirmarPassword, setConfirmarPassword] = useState('');
  const [alerta, setAlerta] = useState({})
  const [tokenValido, setTokenValido] = useState(false)
  const [passwordModificado, setPasswordModificado] = useState(false)
  const params = useParams();
  const { token } = params;

  useEffect(()=>{
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/veterinarios/olvide-password/${token}`)
        setAlerta({
          msg: 'Coloca tu nueva contraseña',
          error: false
        })
        setTokenValido(true);
      } catch (error) {
        setAlerta({
          msg: 'Hubo un error con el enlace',
          error: true
        })
      }
    }

    comprobarToken();
  }, [])
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if(password.length < 6){
      setAlerta({
        msg: 'La contraseña debe tener mínimo 6 caracteres',
        error:true
      })
      return
    }

    try {
      const url= `/veterinarios/olvide-password/${token}`

      const { data } = await clienteAxios.post(url, {password})


      setAlerta({
        msg: data.msg
      })

      setPasswordModificado(true) 
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }


  }

  const { msg } = alerta

  return (
    <>
      <div className="text-indigo-600 font-black text-6xl">Restablece tu password y no pierdas acceso a tus <span className="text-black">Pacientes</span>
      </div>
      
      <div className='mt-20 md:mt-3 shadow-lg px-5 py-8 rounded-xl bg-white'>
          { msg && <Alerta
              alerta = {alerta}
            />
          } 

          { tokenValido && (
          <>
            <form onSubmit={handleSubmit}>
            
              <div className="my-2">
                <label className="uppercase text-gray-600 block text-xl font-bold">Nuevo password
                </label>
                <input 
                  type="password" 
                  placeholder="Ingresa una nueva contraseña" 
                  className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                  value={ password }
                  autoComplete="off"
                  onChange={ e => setPassword(e.target.value)}
                  />
              </div>
              <input 
                  type="submit" 
                  value="Guardar" className="bg-indigo-700 border w-full py-3 px-10 mt-5 rounded-xl text-white uppercase font-bold hover:cursor-pointer hover:bg-indigo-800 md:w-auto "
                /> 
            </form>
          </>
          
        )}
        
        
        {passwordModificado &&  <Link className='block text-center my-5 text-gray-500' to="/">Cuenta recuperada! <span className="font-bold">Inicia Sesión</span></Link>
        }
      </div>
    </>
  

  )
}

export default NuevoPassword