/**
 * Jhonatan Samuel Martinez Hernandez 
 * Ficha 2675859
 * Analisis y Desarrollo de Software
 * Año 2024
 */


// ================ Imports goes here ================
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// ================ Bootstrap CSS ================
import './assets/css/bootstrap.min.css';
import './assets/icons/font/bootstrap-icons.min.css';

// ================ components imports ================
import Home from './pages/Home';
import ClientsHome from './pages/clientModule/ClientsHome';
import ClientTable from './pages/clientModule/ClientTable';
import CreateClient from './pages/clientModule/CreateClient';
import DetailsClient from './pages/clientModule/DetailsClient'
import ModifyClient from './pages/clientModule/ModifyClient';
import NotFound from './pages/NotFound';

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} ></Route>

        <Route path='clients' element={<ClientsHome />} >
          <Route index element={<ClientTable/>}/>
          <Route path='create' element={<CreateClient />}></Route>
          <Route path=':id/modify' element={<ModifyClient />}></Route>
          <Route path=':id/details' element={<DetailsClient />}></Route>
        </Route>
        <Route path='*' element={<NotFound />} ></Route>

      </Routes>
    </BrowserRouter>

  );
};

export default App;
