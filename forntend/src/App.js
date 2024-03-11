import React from 'react';
import { BrowserRouter, Route, Routes , Outlet } from 'react-router-dom';




// Components
import AdminLayout from './layouts/AdminLayout/AdminLayout';
import Home from './components/users/compontes/Home/Home';
import SubEvents from './components/users/compontes/Event/subEvents/subEvents'
import Login from './auth/login';
import Dashboard from './components/admin/dashboard/dashboard';
import Events from './components/admin/Events/Evnets';
import SubEventAdmin from './components/admin/Events/subEvents/SubEvents'
import ParticipateUserListing from './components/admin/Events/subEvents/ParticipateUserListing';
import ProtectedRoute from './ProtectedRoute';
import NotFound from './components/Not Found/Not_Found'
import UserLayout from './layouts/UserLayout/UserLayout';
import AddAdmin from './components/admin/AddAdmin/AddAdmin';
import AdminProfile from './components/admin/adminProfile/adminProfile';
import Top_scorl from './Top_scorl';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path='/' element={<Home/>} /> */}
        <Route path=''  element={<UserLayout/>}>
            <Route index element={<Home/>}/>
            <Route path='subevent/:eventName/:university/:id' element={<SubEvents/>} />
        </Route>
        
        <Route path="admin" element={<ProtectedRoute><AdminLayout/></ProtectedRoute>}>
            <Route path='dashboard' element={<Dashboard/>}/>
            <Route path='events' element={<Events/>}/>
            <Route path='subEvents/:id/:competed' element={<SubEventAdmin/>}/>
            <Route path='events/subevent/participationsList/:subEventID/:isGroup/:competed/:subEventname' element={<ParticipateUserListing/>}/>
            <Route path='addAdmin' element={<AddAdmin/>}/>
            <Route path='Profile' element={<AdminProfile/>}/>
        </Route>
        <Route path="/admin/login" element={<Login/>}/>
        <Route path="*" element={<NotFound/>}/>
        
      </Routes>
      <Top_scorl/>
    </BrowserRouter>
  );
}

export default App;
