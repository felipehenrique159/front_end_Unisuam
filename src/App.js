import Routes from './routes'
import './global.css'
import 'react-toastify/dist/ReactToastify.css'
import {ToastContainer} from 'react-toastify'

function App() {
  return (
      <>
        <Routes/>
        <ToastContainer autoClose={3000}/>
      </>
  );
}

export default App;
