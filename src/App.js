import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Users from './app/Users';
import AddNewUser from './app/AddNewUser';
import AddNewRole from './app/AddNewRole';
import Roles from './app/Roles';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Users />} />
        <Route path='/addUser' element={<AddNewUser />} />
        <Route path='/editUser' element={<AddNewUser />} />
        <Route path='/roles' element={<Roles />} />
        <Route path='/addRole' element={<AddNewRole />} />
        <Route path='/editRole' element={<AddNewRole />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
