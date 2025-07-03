import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const WorkList = () => {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const response = await axios.get('http://localhost:4000/get-posts');
        setWorks(response.data.projects);
      } catch (error) {
        console.error('Error fetching works:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorks();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await axios.delete(`http://localhost:4000/delete-post/${id}`);
        setWorks(works.filter(work => work._id !== id));
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Projects</h1>
        <Link 
          to="/add" 
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add New Project
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {works.map(work => (
          <div key={work._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            {work.image && (
              <img 
                src={`http://localhost:4000/uploads/${work.image}`} 
                alt={work.title} 
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{work.title}</h2>
              <p className="text-gray-600 mb-4">{work.description}</p>
              
              <div className="mb-4">
                <h3 className="font-medium mb-1">Technologies:</h3>
                <div className="flex flex-wrap gap-1">
                  {work.tags.map((tag, i) => (
                    <span key={i} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2">
                <a 
                  href={work.demoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                >
                  Demo
                </a>
                <a 
                  href={work.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-800 text-sm"
                >
                  GitHub
                </a>
              </div>

              <div className="flex justify-between mt-4">
                <Link 
                  to={`/edit/${work._id}`} 
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm"
                >
                  Edit
                </Link>
                <button 
                  onClick={() => handleDelete(work._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkList;