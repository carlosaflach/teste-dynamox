import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import PageNotFound from './Pages/PageNotFound';
import Products from './Pages/Products';
import PrivateRoute from './Rotas/PrivateRoute';
import Register from './Pages/Register';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Navigate to="/login" />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/products" element={ <PrivateRoute><Products/></PrivateRoute>} />
        <Route exact path="/register" element={ <Register />} />
        <Route path='*' element={ <PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
