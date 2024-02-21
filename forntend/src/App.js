import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';




// Components
import AdminLayout from './layouts/AdminLayout';
import Home from './components/users/compontes/Home';
import SubEvents from './components/users/compontes/Event/subEvents/subEvents'
import Login from './auth/login';
import Dashboard from './components/admin/dashboard/dashboard';
import Events from './components/admin/Events/Evnets';
import SubEventAdmin from './components/admin/Events/subEvents/SubEvents'
import ParticipateUserListing from './components/admin/Events/subEvents/ParticipateUserListing';
import ProtectedRoute from './ProtectedRoute';
import NotFound from './components/Not Found/Not_Found'



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='subevent/:eventName/:id' element={<SubEvents/>} />
        <Route path="admin" element={<ProtectedRoute><AdminLayout/></ProtectedRoute>}>
            <Route path='dashboard' element={<Dashboard/>}/>
            <Route path='events' element={<Events/>}/>
            <Route path='subEvents/:id' element={<SubEventAdmin/>}/>
            <Route path='events/subevent/participationsList/:subEventID/:isGroup' element={<ParticipateUserListing/>}/>
        </Route>
        <Route path="/admin/login" element={<Login/>}/>
        <Route path="*" element={<NotFound/>}/>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
