import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Homepage.css';
import { useAccessLevel } from '../contexts/AccessLevelContext';

const Header = () => {
  const { isLoggedIn, logout, userRole } = useAccessLevel();

  const navigate = useNavigate();
  console.log('User Role in Header: ', userRole);

  const handleSignOut = () => {
    logout();
    navigate('/login');
  };

  const redirectToHome = () => {
    navigate('/');
  };

  const handleSignIn = () => {
    navigate('/login');
  };

  return (
    <nav class="border-gray-200 dark:bg-gray-900">
      <div class="max-w flex flex-wrap justify-between p-4">
        <div
          class="flex ml-12 items-center space-x-3 rtl:space-x-reverse"
          onClick={redirectToHome}
        >
          <img src="img\logo.png" class="h-8" alt="Flowbite Logo" />
          <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Coin Market
          </span>
        </div>
        <div class="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul class="items-center font-medium flex flex-col p-4 md:p-0 mr-12 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a
                onClick={() => navigate('/cryptos')}
                href="#"
                class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 text-base md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                aria-current="page"
              >
                Crypto
              </a>
            </li>
            <li>
              <a
                onClick={() => navigate('/press-reviews')}
                href="#"
                class="block mr-12 py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 text-base md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Press
              </a>
            </li>
            {userRole === 'admin' && (
              <span className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 text-base md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" onClick={() => navigate('/admin')}>Admin</span>
            )}
            {isLoggedIn ? (
              <>
                <>
                  {userRole !== 'anonymous' && (
                    <li>
                      <a
                        onClick={() => navigate('/profile')}
                        href="#"
                        class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 text-base md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                      >
                        Profile
                      </a>
                    </li>
                  )}
                </>

                <button
                  onClick={handleSignOut}
                  type="button"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Sign out
                </button>
              </>
            ) : (
              <button
                onClick={handleSignIn}
                type="button"
                class="ml-12 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Sign in
              </button>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
