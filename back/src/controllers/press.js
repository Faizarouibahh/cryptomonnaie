require("dotenv").config();
const axios = require("axios");

const feedUrl = `https://rss.app/feeds/v1.1/${process.env.PRESS_KEY}.json`;

const getArticles = async (req, res) => {
  try {
    const { keywords } = req.query;

    const feedResponse = await axios.get(feedUrl);
    console.log(feedResponse.data);
    const items = feedResponse.data.items;

    const filteredArticles = keywords
      ? items.filter((article) =>
          article.title.toLowerCase().includes(keywords.toLowerCase())
        )
      : items;

    const articles = filteredArticles.map((article) => ({
      id: article.id,
      title: article.title,
      url: article.url,
      imageUrl: article.image || null,
      summary: article.content_text,
      date: article.date_published,
      source: article.authors.length > 0 ? article.authors[0].name : "unknown",
    }));

    res.json(articles);
  } catch (error) {
    console.error("Error fetching articles:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getArticleById = async (req, res) => {
  let pressId = req.params.id;
  try {
    const feedResponse = await axios.get(feedUrl);
    const { items } = feedResponse.data;
    const article = items.find((item) => item.id === pressId);

    if (!article) {
      res.status(404).json({ error: "Article not found" });
      return;
    }

    const detailedArticle = {
      id: article.id,
      title: article.title,
      summary: article.content_text,
      source: article.authors[0]?.name || "Unknown",
      date: article.date_published,
      url: article.url,
      imageUrl: article.image || null,
      summary: article.content_text,
      date: article.date_published,
      source: article.authors.length > 0 ? article.authors[0].name : "unknown",
    };

    res.json(detailedArticle);
  } catch (error) {
    console.error(`Error fetching article by ID ${pressId}:`, error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getArticles,
  getArticleById,
};
