// File: netlify/functions/fetchData.js

const axios = require('axios');

exports.handler = async function(event, context) {
  // The URL we want to fetch data from
  const TARGET_URL = 'https://www.magisterium.com/vi';

  try {
    // Make a GET request to the target URL
    const response = await axios.get(TARGET_URL, {
      headers: {
        // It's good practice to set a custom User-Agent
        'User-Agent': 'MyWebsiteBot/1.0 (contact@mywebsite.com)',
      },
    });

    // Return a success response to the frontend
    return {
      statusCode: 200,
      body: JSON.stringify({ html: response.data }), // Send the HTML back
    };

  } catch (error) {
    // Handle any errors that occur during the fetch
    console.error('Error fetching data:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch data' }),
    };
  }
};
