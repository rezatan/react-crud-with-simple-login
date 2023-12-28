import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Api from '../api/Index';
import '../css/Login.css'

const Login = () => {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
  //useNavigate
 const navigate = useNavigate();
 const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Api.post('/api/login', {
        email,
        password,
      });

      // Ambil token dari response dan simpan ke localStorage
      const token = response.data.authorization.token;
      localStorage.setItem('token', token);
      // Refresh halaman
      navigate('/posts');
    } catch (error) {
      console.log('Gagal login:', error);
    }
 };

 return (
  <>
  <div className="login-box">
    <p>Login</p>
    <form onSubmit={handleSubmit}>
      <div className="user-box">
        <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
        <label>Email</label>
      </div>
      <div className="user-box">
        <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
        <label>Password</label>
      </div>
      <div className='d-grid gap-2 col-6 mx-auto'>
        <button type='submit' className="text-white" style={{ border: 'none', background: 'none' }}>
      <a>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
          Submit
      </a>
        </button> 
        </div> 
    </form>
  </div>
</>
 );
};

export default Login;