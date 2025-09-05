async function fetchLiveStockData(ticker) {
  const url = `http://127.0.0.1:8000/stocks/live/${ticker}/`; 

  try {
    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch stock data');
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error fetching live stock data:', error.message);
    throw error;
  }
}

(async () => {
  try {
    const data = await fetchLiveStockData('AAPL');
    console.log('Live stock data:', data);
  } catch (error) {
    console.error('Error:', error.message);
  }
})();
