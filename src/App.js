import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import ForgotPassword from './components/ForgotPassword';

function App() {
  return (
    <Container className="d-flex align-items-center justify-content-center"
      style={{ minHeight: '100vh'}}
    >
      <div className="w-00" style={{ maxWidth: '400px'}}>
        <Router>
          <Routes>
            <Route exact path='/'element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
          </Routes>
        </Router>
      </div>
    </Container>
  );
}

export default App;
