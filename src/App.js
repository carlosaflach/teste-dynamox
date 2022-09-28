import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import PageNotFound from './Pages/PageNotFound';
import Products from './Pages/Products';
import PrivateRoute from './Routes/PrivateRoute';
import Register from './Pages/Register';
import CreateProducts from './Pages/CreateProducts';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Navigate to="/login" />} />
        <Route exact path="/login" element={<Login />} />
        <Route element={<PrivateRoute />} >
          <Route exact path="/products" element={<Products />} />
          <Route exact path="/products/create" element={ <CreateProducts />} />
        </Route>
        <Route exact path="/register" element={ <Register />} />
        <Route path='*' element={ <PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
