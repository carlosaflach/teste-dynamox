import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import PageNotFound from './Pages/PageNotFound';
import Products from './Pages/Products';
import PrivateRoute from './Routes/PrivateRoute';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Navigate to="/login" />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/products" element={ <PrivateRoute />} >
          <Route exact path='/products' element={<Products/>}/>
        </Route>
        <Route path='*' element={ <PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
