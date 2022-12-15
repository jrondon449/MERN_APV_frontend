import { useState, useEffect } from "react"
import AdminNav from "../components/AdminNav"
import Alerta from "../components/Alerta"
import { AuthProvider } from "../context/AuthProvider"
import useAuth from "../hooks/useAuth"

const CambiarPassword = () => {

  const [alerta, setAlerta] = useState({})
  const [password, setPassword] = useState({ 
    currentPwd: '',
    newPwd: '',
    newPwdC: ''
  })

  const { guardarPassword } = useAuth()


  const handleSubmit = async e => {
    e.preventDefault()

    if(Object.values(password).some(campo => campo === '')){

      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return
    }

    if(password.newPwd !== password.newPwdC){
      
      setAlerta({
        msg: 'Las contraseñas no coinciden',
        error: true
      })
      return

    }

    if(password.newPwd.length <6){
      setAlerta({
        msg: 'La contraseña debe tener al menos 6 digitos',
        error: true
      })
      return
    }

    const respuesta = await guardarPassword(password)

    setAlerta(respuesta)
    
  }

  const {msg} = alerta 

  return (
    <>
      <AdminNav />
      <h2 className="font-black text-3xl text-center mt-10">Cambiar contraseña</h2>
      <p className="text-xl mt-5 mb-10 text-center">Modifica tú {''} 
      <span className="text-indigo-600 font-bold">contraseña aquí</span></p>

      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">

          {msg && <Alerta alerta={alerta}/>}
          <form onSubmit={handleSubmit}>
            <div className="my-3">
              <label htmlFor="email" className="uppercase font-bold text-gray-600">Contraseña actual</label>
              <input 
                type="password" 
                id="currentPwd"
                name="currentPwd"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                placeholder="Escribe tu contraseña actual"
                autoComplete="off"
                onChange={ e => setPassword({
                  ...password, [e.target.name] : e.target.value
                })}
                
              />
            </div>
            <div className="my-3">
              <label htmlFor="email" className="uppercase font-bold text-gray-600">Nueva contraseña</label>
              <input 
                type="password" 
                id="newPwd"
                name="newPwd"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                placeholder="Escribe una nueva contraseña"
                autoComplete="off"
                onChange={ e => setPassword({
                  ...password, [e.target.name] : e.target.value
                })}
                
              />
            </div>

            <div className="my-3">
              <label htmlFor="email" className="uppercase font-bold text-gray-600">Nueva contraseña</label>
              <input 
                type="password" 
                id="newPwdC"
                name="newPwdC"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                placeholder="Repite la nueva contraseña"
                autoComplete="off"
                onChange={ e => setPassword({
                  ...password, [e.target.name] : e.target.value
                })}
                
              />
            </div>

            

            <input 
                type="submit" 
                value="Actualizar contraseña"
                className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5 cursor-pointer"
                
            />
          </form>
        </div>
      </div>
    </>
    
  )
}

export default CambiarPassword