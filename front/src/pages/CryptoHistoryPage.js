import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import '../styles/CryptoHistoryPage.css';
import * as echarts from 'echarts';

const CryptoHistoryPage = () => {
  const location = useLocation();
  const { cryptoName, cryptoHistory, description, days } = location.state || {};
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    // Données des graphes
    let market_caps = cryptoHistory.market_caps.map(([timestamp, value]) => [
      new Date(timestamp),
      value,
    ]);
    let prices = cryptoHistory.prices.map(([timestamp, value]) => [
      new Date(timestamp),
      value,
    ]);
    let total_volumes = cryptoHistory.total_volumes.map(
      ([timestamp, value]) => [new Date(timestamp), value]
    );

    // Config des graphes
    const optionMarketCaps = {
      title: {
        text: 'Market caps',
        textStyle: {
          color: 'white',
        },
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        name: 'Time',
        type: 'time',
        axisLabel: {
          color: '#fff',
        },
        axisLine: {
          lineStyle: {
            color: '#fff',
          },
        },
        boundaryGap: false,
      },
      yAxis: {
        type: 'value',
        name: 'Value (B$)',
        axisLabel: {
          color: '#fff',
          formatter: function (value) {
            return value / 100000000;
          },
        },
        axisLine: {
          lineStyle: {
            color: '#fff',
          },
        },
      },
      series: [
        {
          data: market_caps,
          type: 'line',
          lineStyle: {
            width: 5,
          },
          symbolSize: 10,
        },
      ],
    };
    const optionPrices = {
      grid: {
        backgroundColor: '#0F172A',
      },
      title: {
        text: 'Prices',
        left: '100',
        textStyle: {
          color: 'white',
        },
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        name: 'Time',
        type: 'time',
        axisLabel: {
          color: '#fff',
        },
        axisLine: {
          lineStyle: {
            color: '#fff',
          },
        },
        boundaryGap: false,
      },
      yAxis: {
        type: 'value',
        name: 'Value (B$)',
        axisLabel: {
          color: '#fff',
          formatter: function (value) {
            return value;
          },
        },
        axisLine: {
          lineStyle: {
            color: '#fff',
          },
        },
      },
      series: [
        {
          data: prices,
          type: 'line',
          lineStyle: {
            width: 5,
          },
          symbolSize: 10,
        },
      ],
    };
    const optionTotalVolumes = {
      grid: {
        backgroundColor: '#0F172A',
      },
      title: {
        text: 'Total volumes',
        textStyle: {
          color: 'white',
        },
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        name: 'Time',
        type: 'time',
        axisLabel: {
          color: '#fff',
        },
        axisLine: {
          lineStyle: {
            color: '#fff',
          },
        },
        boundaryGap: false,
      },
      yAxis: {
        type: 'value',
        name: 'Value (B$)',
        axisLabel: {
          color: '#fff',
          formatter: function (value) {
            return value / 100000000;
          },
        },
        axisLine: {
          lineStyle: {
            color: '#fff',
          },
        },
      },
      series: [
        {
          data: total_volumes,
          type: 'line',
          lineStyle: {
            width: 5,
          },
          symbolSize: 10,
        },
      ],
    };

    // Initialisation des graphiques
    const marketCapsChart = echarts.init(
      document.getElementById('cryptoMarketCaps')
    );
    marketCapsChart.setOption(optionMarketCaps);

    const pricesChart = echarts.init(document.getElementById('cryptoPrices'));
    pricesChart.setOption(optionPrices);

    const totalVolumes = echarts.init(document.getElementById('totalVolumes'));
    totalVolumes.setOption(optionTotalVolumes);

    console.log('Location State:', location.state);
  }, [location.state]);

  if (!cryptoName || !cryptoHistory) {
    return <div>No history data available.</div>;
  }

  if (!cryptoName || !cryptoHistory) {
    return <div>No history data available.</div>;
  }

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const englishDescription = (() => {
    const desc = description?.en;
    if (!desc) return 'No description available in English.';

    // Truncate the description if it's too long and not in full view
    if (!showFullDescription && desc.length > 300) {
      return desc.substring(0, 300) + '...';
    }
    return desc;
  })();

  return (
    <>
      <Header />
      <div className="text-white bg-gray-900 overflow-visible m-0 box-border">
        <div className="flex flex-col w-full h-full">
          <div className="m-5 w-full self-center text-2xl">
            <div
              id="cryptoPrices"
              style={{ width: '100%', height: '500px' }}
            ></div>
          </div>
          <div className="flex flex-row w-full self-center text-2xl">
            <div className="ml-5 w-1/2 self-center text-2xl">
              <div
                id="cryptoMarketCaps"
                style={{ width: '100%', height: '500px' }}
              ></div>
            </div>
            <div className="w-1/2 self-center text-2xl">
              <div
                id="totalVolumes"
                style={{ width: '100%', height: '500px' }}
              ></div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="p-6 mb-5 rounded-lg bg-gradient-to-br from-gray-700 via-gray-800 to-gray-700 shadow-md w-3/4 text-white">
            <h2 className="text-blue-500 text-2xl font-semibold mb-4">
              About {cryptoName}
            </h2>
            <p>{englishDescription}</p>
            <button
              onClick={toggleDescription}
              className="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {showFullDescription ? 'Read Less' : 'Read More'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CryptoHistoryPage;
