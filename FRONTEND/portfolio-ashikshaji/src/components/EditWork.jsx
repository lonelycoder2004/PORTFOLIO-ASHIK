import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditWork = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    demoUrl: '#',
    githubUrl: '#',
    tags: '',
    file: null,
    currentImage: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWork = async () => {
      try {
        const response = await axios.get(`https://portfolio-ashik-backend.onrender.com/get-posts`);
        const work = response.data.projects.find(w => w._id === id);
        if (work) {
          setFormData({
            title: work.title,
            description: work.description,
            demoUrl: work.demoUrl || '#',
            githubUrl: work.githubUrl || '#',
            tags: work.tags.join(','),
            file: null,
            currentImage: work.image
          });
        }
      } catch (error) {
        console.error('Error fetching work:', error);
      }
    };

    fetchWork();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, file: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('demoUrl', formData.demoUrl);
    data.append('githubUrl', formData.githubUrl);
    data.append('tags', formData.tags);
    if (formData.file) {
      data.append('image', formData.file);
    }

    try {
      await axios.put(`https://portfolio-ashik-backend.onrender.com/update-post/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate('/');
    } catch (error) {
      console.error('Error updating work:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Project</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Project Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            rows="4"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Demo URL</label>
          <input
            type="url"
            name="demoUrl"
            value={formData.demoUrl}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">GitHub URL</label>
          <input
            type="url"
            name="githubUrl"
            value={formData.githubUrl}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Current Image</label>
          {formData.currentImage && (
            <img 
              src={`https://portfolio-ashik-backend.onrender.com/uploads/${formData.currentImage}`} 
              alt="Current" 
              className="h-32 mb-2"
            />
          )}
          <label className="block text-gray-700 mb-2">New Image (leave empty to keep current)</label>
          <input
            type="file"
            name="file"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Tags (comma separated)</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            placeholder="React, TailwindCSS, Node.js"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-400"
        >
          {loading ? 'Updating...' : 'Update Project'}
        </button>
      </form>
    </div>
  );
};

export default EditWork;