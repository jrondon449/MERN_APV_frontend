import { Outlet, Navigate } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import useAuth from "../hooks/useAuth"
import { Spinner } from "../components/Spinner"

const RutaProtegida = () => {

  const { auth, loading } = useAuth()

  

  if(loading) return <Spinner />

  return (
    <>
      <Header   />
    
      { auth?._id ? ( 
        <main className="container mx-auto mt-10"> 
          <Outlet />
        </main> 
      
      ) : <Navigate to="/" />}

      <Footer />
    </>
  )
}

export default RutaProtegida