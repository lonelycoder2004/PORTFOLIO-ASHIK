import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WorkList from './components/WorkList';
import AddWork from './components/AddWork';
import EditWork from './components/EditWork';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<WorkList />} />
            <Route path="/add" element={<AddWork />} />
            <Route path="/edit/:id" element={<EditWork />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;