import { Link } from 'react-router-dom';
import { Users, FileText, CheckSquare } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex space-x-6">
          <Link to="/" className="flex items-center space-x-2 hover:text-gray-300">
            <Users size={20} />
            <span>Users</span>
          </Link>
          <Link to="/posts" className="flex items-center space-x-2 hover:text-gray-300">
            <FileText size={20} />
            <span>Posts</span>
          </Link>
          <Link to="/todos" className="flex items-center space-x-2 hover:text-gray-300">
            <CheckSquare size={20} />
            <span>Todos</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}