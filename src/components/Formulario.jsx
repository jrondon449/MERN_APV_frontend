import { useState, useEffect } from "react"
import usePacientes from "../hooks/usePacientes"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Formulario = () => {

    const [nombre, setNombre] = useState('')
    const [propietario, setPropietario] = useState('')
    const [email, setEmail] = useState('')
    const [fecha, setFecha] = useState('')
    const [sintomas, setSintomas] = useState('')
    const [id, setId] = useState(null)
    const { guardarPaciente, paciente } = usePacientes()


    useEffect(()=>{

        if(paciente?.nombre){
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setFecha(new Date(paciente.fecha).toLocaleDateString('en-CA'));
            setSintomas(paciente.sintomas)
            setId(paciente._id)
        }
        
    }, [paciente])

    const handleSubmit = ((e) => {
        e.preventDefault();

        if([nombre, propietario, email, fecha, sintomas].includes('') ){
            toast.warn('Todos los datos son obligatorios');
            return
        }

        guardarPaciente({nombre, propietario, email, fecha, sintomas, id})

        toast.success('Guardado correctamente', {hideProgressBar: false});

        setNombre('')
        setPropietario('')
        setEmail('')
        setFecha('');
        setSintomas('')
        setId('')
        

    })

  return (

    <>
    <h2 className="font-black text-3xl text-center ">Administrador de pacientes</h2>

    <p className="text-xl mt-5 mb-10 text-center">Agrega tus Pacientes y {' '}
        <span className="text-indigo-600 font-bold">administralos</span>
    </p>
    <ToastContainer
        position="top-right"
        autoClose={500}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={true}
        pauseOnHover={true}
        theme="colored"
    />   
    <form 
        action="" 
        id="formPacientes"
        className="bg-white py-10 px-5 mb-10 lg:mb-5 shadow-md rounded-md" 
        onSubmit={ handleSubmit }
    >
    
        <div className="mb-5">
            <label 
                htmlFor="nombre"
                className="text-gray-700 uppercase font-bold"
                >Nombre de la Mascota
            </label>
            
            <input 
                type="text" 
                id="nombre"
                placeholder="Nombre de la Mascota"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={nombre}
                onChange={ e => setNombre(e.target.value)}
            />
        </div>
        <div className="mb-5">
            <label 
                htmlFor="propietario"
                className="text-gray-700 uppercase font-bold"
                >Nombre del Propetario
            </label>
            
            <input 
                type="text" 
                id="propietario"
                placeholder="Nombre del Propetario de la Mascota"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={propietario}
                onChange={ e => setPropietario(e.target.value)}
            />
        </div>

        <div className="mb-5">
            <label 
                htmlFor="email"
                className="text-gray-700 uppercase font-bold"
                >Correo electr??nico
            </label>
            
            <input 
                type="email" 
                id="email"
                placeholder="Correo electr??nico del Propetario"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={email}
                onChange={ e => setEmail(e.target.value)}
            />
        </div>

        <div className="mb-5">
            <label 
                htmlFor="fecha"
                className="text-gray-700 uppercase font-bold"
                >Fecha de alta
            </label>
            
            <input 
                type="date" 
                id="fecha"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={fecha}
                onChange={ e => setFecha(e.target.value)}
            />
        </div>

        <div className="mb-5">
            <label 
                htmlFor="sintomas"
                className="text-gray-700 uppercase font-bold"
                >Sintomas de la Mascota
            </label>
            
            <textarea 
                id="sintomas"
                placeholder="Describe los s??ntomas"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={sintomas}
                onChange={ e => setSintomas(e.target.value)}
            />
        </div>

        <input 
            type="submit" 
            className="bg-indigo-600  w-full p-3 text-white uppercase font-bold hover:bg-indigo-800 cursor-pointer transition-colors rounded-full lg:rounded-xl"
            value={id ? 'Guardar cambios' : 'Agregar paciente'}


        />
    </form>

    </>
  )
}

export default Formulario