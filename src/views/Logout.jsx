import { useNavigate } from 'react-router-dom';
import Api from '../api/Index';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await Api.post(
        '/api/logout',
        {},
        {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          },
        }
      );

      if (response.status === 200) {
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        throw new Error('Failed to logout');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div>
      <button className="btn btn-success" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
