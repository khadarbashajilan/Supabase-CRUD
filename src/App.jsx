import Dashboard from './components/Dashboard'
import { useAuth } from './context/AuthContext'

const App = () => {
  const {session} = useAuth() 
  console.log(session)

  return (
    <div className='m-10'>
    <Dashboard/>
    </div>
  )
}

export default App
