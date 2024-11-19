import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/PressReviewPage.css';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { useAccessLevel } from '../contexts/AccessLevelContext';
import { jwtDecode } from 'jwt-decode';

const PressReviewPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userKeywords, setUserKeywords] = useState('');
  const [filteredArticles, setFilteredArticles] = useState([]);
  const { isLoggedIn } = useAccessLevel();
  const navigate = useNavigate();
  const [newKeyword, setNewKeyword] = useState('');

  useEffect(() => {
    fetchArticles();
    if (isLoggedIn) {
      fetchUserKeywords();
    }
  }, [isLoggedIn]);

  const fetchArticles = async () => {
    try {
      const response = await axios.get('http://localhost:3000/articles');
      setArticles(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching articles:', error);
      setError('Error fetching articles. Please try again later.');
      setLoading(false);
    }
  };

  const fetchUserKeywords = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const decoded = jwtDecode(token);
      const response = await axios.get(
        `http://localhost:3000/userPress/getUserKeywords/${
          decoded.user_id || decoded.user?.id
        }`
      );
      setUserKeywords(response.data.keywords);
    } catch (error) {
      console.error('Error fetching user keywords:', error);
    }
  };

  const addKeyword = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token || !newKeyword.trim()) return;
      const decoded = jwtDecode(token);
      const response = await axios.post(
        'http://localhost:3000/userPress/addKeyword',
        {
          userId: decoded.user_id || decoded.user?.id,
          keyword: newKeyword.trim(),
        }
      );
      setUserKeywords(response.data.keywords);
      setNewKeyword('');
    } catch (error) {
      console.error('Error adding keyword:', error);
    }
  };

  const removeKeyword = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const decoded = jwtDecode(token);
      const response = await axios.post(
        'http://localhost:3000/userPress/removeKeyword',
        {
          userId: decoded.user_id || decoded.user?.id,
        }
      );
      setUserKeywords(response.data.keywords);
    } catch (error) {
      console.error('Error removing keyword:', error);
    }
  };

  const filterArticlesByKeyword = () => {
    if (userKeywords) {
      const filtered = articles.filter(article =>
        article.title.toLowerCase().includes(userKeywords.toLowerCase())
      );
      setFilteredArticles(filtered);
    }
  };

  const clearFilteredArticles = () => {
    setFilteredArticles([]);
  };

  const onArticleClick = url => {
    window.open(url, '_blank');
  };

  return (
    <>
      <Header />
      <div className="press-page-container">
        {loading && <p>Loading articles...</p>}
        {error && <p className="error-message">{error}</p>}

        {isLoggedIn && (
          <div className="keyword-management">
            <h1 className="text-2xl font-semibold mb-4">Latest Articles</h1>
            <div className="keyword-actions">
              <div className="keyword-box-container">
                <input
                  type="text"
                  placeholder="Filter by keyword"
                  value={newKeyword}
                  onChange={e => setNewKeyword(e.target.value)}
                  className="keyword-box"
                />
                <button className="keyword-button" onClick={addKeyword}>
                  Search
                </button>
                {userKeywords && (
                  <div className="remove-keyword">
                    <span onClick={removeKeyword}>✖</span>
                    {userKeywords}
                  </div>
                )}
              </div>
              {userKeywords && (
                <div className="filter-links">
                  <div
                    className="filter-link"
                    onClick={filterArticlesByKeyword}
                  >
                    My Articles
                  </div>
                  <div className="filter-link" onClick={clearFilteredArticles}>
                    All Articles
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="article-list">
          {filteredArticles.length > 0
            ? filteredArticles.map(article => (
                <div
                  key={article.id}
                  className="article-card"
                  onClick={() => onArticleClick(article.url)}
                >
                  <img
                    src={article.imageUrl || 'placeholder-image-url'}
                    alt={article.title}
                    className="article-image"
                  />
                  <div className="article-details">
                    <h2 className="article-title">{article.title}</h2>
                    <p className="article-date">
                      {`${new Date(article.date).toLocaleDateString()} | ${
                        article.source
                      }`}
                    </p>
                    <p className="article-summary">{article.summary}</p>
                  </div>
                </div>
              ))
            : articles.map(article => (
                <div
                  key={article.id}
                  className="article-card"
                  onClick={() => onArticleClick(article.url)}
                >
                  <img
                    src={article.imageUrl || 'placeholder-image-url'}
                    alt={article.title}
                    className="article-image"
                  />
                  <div className="article-details">
                    <h2 className="article-title">{article.title}</h2>
                    <p className="article-date">
                      {`${new Date(article.date).toLocaleDateString()} | ${
                        article.source
                      }`}
                    </p>
                    <p className="article-summary">{article.summary}</p>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </>
  );
};

export default PressReviewPage;
