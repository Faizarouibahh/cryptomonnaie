import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import OAuthLogin from '../components/OAuthLogin';
import '../styles/LoginPage.css';
import { useAccessLevel } from '../contexts/AccessLevelContext';
import AdminPage from '../pages/AdminPage';
import { jwtDecode } from 'jwt-decode';

const LoginPage = () => {
  const [cryptoFavorites, setCryptoFavorites] = useState([]);
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    username: '',
  });
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setIsLoggedIn, setAccessLevel, accessLevel, setUserRole, setToken } =
    useAccessLevel();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      const decodedToken = jwtDecode(token);

      localStorage.setItem('token', token);

      setIsLoggedIn(true);
      setAccessLevel(decodedToken.role);
      setUserRole(decodedToken.role);
      navigate('/profile');
    } else {
      const existingToken = localStorage.getItem('token');
      if (existingToken) {
        navigate('/', { replace: true });
        setTimeout(() => window.location.reload(), 100);
      }
    }
  }, [navigate, setIsLoggedIn, setAccessLevel, setUserRole]);

  const handleLogin = async () => {
    try {
      const response = await fetch(
        'https://coin-market-api.vercel.app/users/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            mail: credentials.email,
            password: credentials.password,
          }),
        }
      );

      const data = await response.json();
      if (response.status === 200) {
        const decodedToken = jwtDecode(data.token);
        localStorage.setItem('token', data.token);
        setToken(data.token);
        setIsLoggedIn(true);
        setAccessLevel(decodedToken.role);
        setUserRole(decodedToken.role);

        navigate('/', { replace: true });
        setTimeout(() => window.location.reload(), 100);
      } else {
        setError(data.error || 'An error occurred during login.');
      }
    } catch (error) {
      setError('An error occurred during login.');
    }
  };

  const handleRegister = async () => {
    try {
      const response = await fetch(
        'https://coin-market-api.vercel.app/users/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: credentials.username,
            mail: credentials.email,
            password: credentials.password,
            role: 'user',
            cryptoFavorites: cryptoFavorites,
          }),
        }
      );

      const data = await response.json();
      if (response.status === 200) {
        const decodedToken = jwtDecode(data.token);
        localStorage.setItem('token', data.token);

        setIsLoggedIn(true);
        setAccessLevel(decodedToken.role);
        setUserRole(decodedToken.role);
        navigate('/', { replace: true });
        setTimeout(() => window.location.reload(), 100);
      } else {
        setError(data.error || 'An error occurred during registration.');
      }
    } catch (error) {
      setError('An error occurred during registration.');
    }
  };

  const handleGoogleAuthSuccess = token => {
    localStorage.setItem('token', token);

    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    localStorage.setItem('user_id', decodedToken.user_id);
    setIsLoggedIn(true);
    setAccessLevel(decodedToken.role);
    setUserRole(decodedToken.role);
    navigate('/', { replace: true });
    setTimeout(() => window.location.reload(), 100);
  };

  const handleSubmit = e => {
    e.preventDefault();
    isRegistering ? handleRegister() : handleLogin();
  };

  const toggleAuthMode = () => {
    setIsRegistering(!isRegistering);
    setError('');
  };

  return (
    <>
      <div>
        <div class="text-white bg-gray-900 min-h-screen m-0 box-border">
          <Header />
          <div className="md:flex md:items-center h-screen bg-gray-900 ">
            <div>{accessLevel === 'admin' && <AdminPage />}</div>
            <div class="w-1/2 flex items-center justify-center">
              <img src="/img/images.png" alt="Site" />
            </div>
            <div class="w-1/2">
              <div class="lg:text-left text-center">
                <div class="flex items-center justify-center ">
                  <div class="bg-black flex flex-col w-1/2 p-12 rounded-lg bg-gradient-to-br from-gray-700 via-gray-800 to-gray-700 text-white">
                    <h1 className="text-2xl">Login</h1>
                    <form class="flex flex-col mt-5" onSubmit={handleSubmit}>
                      <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        value={credentials.email}
                        onChange={e =>
                          setCredentials({
                            ...credentials,
                            email: e.target.value,
                          })
                        }
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      <input
                        type="password"
                        placeholder="Password"
                        value={credentials.password}
                        onChange={e =>
                          setCredentials({
                            ...credentials,
                            password: e.target.value,
                          })
                        }
                        class="bg-gray-50 mt-6 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      {isRegistering && (
                        <input
                          type="text"
                          placeholder="Username"
                          value={credentials.username}
                          onChange={e =>
                            setCredentials({
                              ...credentials,
                              username: e.target.value,
                            })
                          }
                          class="bg-gray-50 mt-6 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                      )}
                      <button
                        class="py-3 px-3 mt-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        type="submit"
                      >
                        {isRegistering ? 'Register' : 'Login'}
                      </button>
                    </form>
                    <OAuthLogin onGoogleAuthSuccess={handleGoogleAuthSuccess} />
                    <div className="flex items-center justify-center">
                      <a
                        href="#"
                        onClick={toggleAuthMode}
                        className="mt-8 qfont-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        {isRegistering
                          ? 'Already have an account? Login'
                          : 'Need an account ? Register'}
                      </a>
                    </div>
                    {error && <p className="error">{error}</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
