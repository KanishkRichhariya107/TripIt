const axios = require('axios');
require('dotenv').config();

const options1 = {
    method: 'GET',
    url: `https://${process.env.RAPIDAPI_HOST}/api/v1/hotels/searchDestination`,
    params: { query: 'man' },
    headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
        'x-rapidapi-host': process.env.RAPIDAPI_HOST
    }
};

async function fetchData(id) {
    const options2 = {
        method: 'GET',
        url: `https://${process.env.RAPIDAPI_HOST}/api/v1/hotels/searchHotels`,
        params: {
          dest_id: id,
          search_type: 'CITY',
          adults: '1',
          children_age: '0,17',
          room_qty: '1',
          page_number: '1',
          units: 'metric',
          temperature_unit: 'c',
          languagecode: 'en-us',
          currency_code: 'AED'
        },
        headers: {
          'x-rapidapi-key': process.env.RAPIDAPI_KEY,
          'x-rapidapi-host': process.env.RAPIDAPI_HOST
        }
      };

      const response = await axios.request(options2);
      return response.data;
}

async function fetch() {
    try {
        const response = await axios.request(options1);
        const id=response.data.data[0].dest_id;
        return await fetchData(id);
    } catch (error) {
        console.error("API Error:", error.response ? error.response.data : error.message);
        throw error;
    }
}

module.exports = { fetch };
