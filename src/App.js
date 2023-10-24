import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Form from './Form';
import Users from './Users';
import View from './View';
import Edit from './Edit';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Form/>}/>
      <Route path='users' element={<Users/>}/>
      <Route path='view/:id' element={<View/>}/>
      <Route path='edit/:id' element={<Edit/>}/>
    </Routes>
    </BrowserRouter>
  
  );
}

export default App;
