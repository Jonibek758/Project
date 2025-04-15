import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Users from './pages/Users';
import Posts from './pages/Posts';
import Todos from './pages/Todos';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Users />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/todos" element={<Todos />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
