/**
 * Service pour obtenir les détails d'une crypto-monnaie à partir de l'API CoinGecko.
 * @module CryptoService
 */

const axios = require("axios");
const NodeCache = require("node-cache");

const cache = new NodeCache({ stdTTL: 300 }); // Cache for 5 minutes

const handleApiResponse = (response) => {
  if (response.status === 429) {
    // Check for rate limit error
    throw new Error("API rate limit exceeded");
  }
  return response.data;
};

/**
 * Récupère les détails d'une crypto-monnaie spécifiée par son identifiant depuis l'API CoinGecko.
 * @function
 * @name getCoinDetails
 * @memberof module:CryptoService
 * @inner
 * @param {string} cryptoId - Identifiant de la crypto-monnaie.
 * @returns {Promise<Object>} - Promesse résolue avec les détails de la crypto-monnaie au format JSON.
 * @throws {Error} - Lance une erreur en cas d'échec de la requête vers l'API.
 */
const getCoinDetails = async (cryptoId) => {
  const cacheKey = `details-${cryptoId}`;
  const cachedData = cache.get(cacheKey);
  if (cachedData) return cachedData;

  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${cryptoId}`
    );
    const data = handleApiResponse(response);
    cache.set(cacheKey, data);
    return data;
  } catch (error) {
    console.error(
      `Error fetching crypto details for ${cryptoId}:`,
      error.message
    );
    throw error;
  }
};

/**
 * Récupère la liste des crypto-monnaies depuis l'API CoinGecko.
 * @function
 * @name getCoinList
 * @memberof module:CryptoService
 * @inner
 * @returns {Promise<Array>} - Promesse résolue avec la liste des crypto-monnaies au format JSON.
 * @throws {Error} - Lance une erreur en cas d'échec de la requête vers l'API.
 */
const getCoinList = async () => {
  const cacheKey = "coin-list";
  const cachedData = cache.get(cacheKey);
  if (cachedData) return cachedData;

  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/list"
    );
    const data = handleApiResponse(response);
    cache.set(cacheKey, data);
    return data;
  } catch (error) {
    console.error("Error fetching coin list:", error.message);
    throw error;
  }
};

const getCryptoHistory = async (cryptoId, days = "max") => {
  const cacheKey = `history-${cryptoId}-${days}`;
  const cachedData = cache.get(cacheKey);
  if (cachedData) return cachedData;

  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${cryptoId}/market_chart`,
      {
        params: {
          vs_currency: "usd",
          days: days,
          interval: "daily",
        },
      }
    );
    const data = handleApiResponse(response);
    cache.set(cacheKey, data);
    return data;
  } catch (error) {
    console.error(`Error fetching history for ${cryptoId}:`, error.message);
    throw error;
  }
};

module.exports = {
  getCryptoHistory,
  getCoinDetails,
  getCoinList,
};
