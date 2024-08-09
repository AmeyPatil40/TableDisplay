import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './componets/Navbar';
import TableDisplay from './pages/TableDisplay';
import ColumnAddedPage from './pages/ColumnAddedPage';

function App() {
  return (
    <div className="App">
        <Navbar></Navbar>
        <Routes>
           <Route path='/' element={<TableDisplay></TableDisplay>}></Route>
           <Route path='/addcolumn' element={<ColumnAddedPage></ColumnAddedPage>}></Route>
        </Routes>
    </div>
  );
}

export default App;
