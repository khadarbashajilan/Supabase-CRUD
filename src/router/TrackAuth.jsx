import Signin from "../components/Signin"
import App from "../App"
import { useAuth } from "../context/AuthContext"

const TrackAuth = () => {
    const {session} = useAuth()

  return (
    session ? <App></App> : <Signin></Signin>
  )
}

export default TrackAuth
