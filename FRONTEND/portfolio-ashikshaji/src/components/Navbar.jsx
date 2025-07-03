import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Portfolio Admin</Link>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">Works</Link>
          <Link to="/add" className="hover:underline">Add Work</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;