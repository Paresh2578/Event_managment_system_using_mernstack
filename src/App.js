import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';




// Components
import FullLayout from './layouts/FullLayout';
import Home from './users/compontes/Home';
import SubEvents from './users/compontes/navbar/Event/subEvents/subEvents'
import Login from './auth/login';
import Dashboard from './components/dashboard/dashboard';
import Events from './components/Events/Evnets';
import SubEventAdmin from './components/Events/subEvents/SubEvents'



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home/>} />
        <Route path='event/:id' element={<SubEvents/>} />
        <Route path="admin" element={<FullLayout/>}>
            
            <Route path='dashboard' element={<Dashboard/>}/>
            <Route path='events' element={<Events/>}/>
            <Route path='events/:id' element={<SubEventAdmin/>}/>

        </Route>
        <Route path="/admin/login" element={<Login/>}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
