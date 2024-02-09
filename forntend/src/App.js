import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';




// Components
import FullLayout from './layouts/FullLayout';
import Home from './users/compontes/Home';
import SubEvents from './users/compontes/Event/subEvents/subEvents'
import Login from './auth/login';
import Dashboard from './components/dashboard/dashboard';
import Events from './components/Events/Evnets';
import SubEventAdmin from './components/Events/subEvents/SubEvents'
import ParticipateUserListing from './components/Events/subEvents/ParticipateUserListing';
import ProtectedRoute from './ProtectedRoute';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home/>} />
        <Route path='subevent/:eventName/:id' element={<SubEvents/>} />
        <Route path="admin" element={<ProtectedRoute><FullLayout/></ProtectedRoute>}>
            <Route path='dashboard' element={<Dashboard/>}/>
            <Route path='events' element={<Events/>}/>
            <Route path='subEvents/:id' element={<SubEventAdmin/>}/>
            <Route path='events/subevent/participationsList/:subEventID/:isGroup' element={<ParticipateUserListing/>}/>
        </Route>
        <Route path="/admin/login" element={<Login/>}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
