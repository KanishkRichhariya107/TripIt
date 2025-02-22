const axios = require('axios');
require('dotenv').config();

const options = {
    method: 'GET',
    url: `https://${process.env.RAPIDAPI_HOST}/api/v1/hotels/searchDestination`,
    params: { query: 'man' },
    headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
        'x-rapidapi-host': process.env.RAPIDAPI_HOST
    }
};

async function fetchData() {
    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.error("API Error:", error.response ? error.response.data : error.message);
        throw error;
    }
}

module.exports = { fetchData };
