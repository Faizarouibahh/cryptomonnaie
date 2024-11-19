import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import '../styles/Homepage.css';

export const Homepage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = () => {
    setIsLoggedIn(true);
    navigate('/login');
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
  };
  const navigateToCrypto = () => {
    navigate('/cryptos');
  };
  const navigateToPressReview = () => {
    navigate('/press-reviews');
  };

  return (
    <div className="homepage-container text-white min-h-screen m-0 box-border">
      <Header
        isLoggedIn={isLoggedIn}
        handleSignIn={handleSignIn}
        handleSignOut={handleSignOut}
      />
      <div className="hero-section flex justify-around items-center p-20 rounded-lg shadow-md">
        <div className="hero-content max-w-1/2 p-12 text-white">
          <h1 className="pb-5 text-4xl">
            <span className="block text-4xl m-1">Endless</span>
            <span className="block text-4xl m-1">possibilities with</span>
            <span className="block text-blue-500 text-4xl m-1">
              Coin Market
            </span>
          </h1>
          <p className="text-lg">
            Unlock the World of Crypto with Count of Money. Your One-Stop Crypto
            Hub
            <br />
            Dive into the Crypto World Access Top Cryptocurrencies and Latest
            News.
            <br />
            Elevate Your Crypto Journey Personalize Your Experience with
            Tailored Content.
          </p>
        </div>
        <div className="hero-image w-1/2">
          <img src="/img/crypto.png" alt="Site" />
        </div>
      </div>
      <div className="sections-container flex justify-around">
        <div className="section p-6 rounded-lg shadow-md text-white">
          <h2 className="section-title text-blue-500 text-2xl font-semibold mb-4 text-center">
            Unlock Crypto Wealth
          </h2>
          <p>
            Dive into the world of Crypto-Currencies and unlock the potential
            for financial growth. Stay updated with real-time trends and
            valuable insights. Your journey to financial freedom starts here!
          </p>
        </div>

        <div className="section p-6 rounded-lg shadow-md text-white">
          <h2 className="section-title text-blue-500 text-2xl font-semibold mb-4 text-center">
            Informed Decision-Making
          </h2>
          <p>
            Explore curated press reviews and stay ahead with the latest
            articles. Our platform empowers you with the knowledge to make
            informed decisions. Elevate your understanding of the crypto market.
          </p>
        </div>

        <div className="section p-6 rounded-lg shadow-md text-white">
          <h2 className="section-title text-blue-500 text-2xl font-semibold mb-4 text-center">
            Join the Revolution
          </h2>
          <p>
            Sign up now to become part of the Crypto Revolution! Personalize
            your experience, explore new opportunities, and grow your wealth.
            Your journey towards financial empowerment starts with a single
            click!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
