const axios = require('axios');
require('dotenv').config();

const options1 = {
    method: 'GET',
    url: `https://${process.env.RAPIDAPI_HOST}/api/v1/hotels/searchDestination`,
    params: { query: 'delhi' },
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
          currency_code: 'AED',
          arrival_date: '2025-10-10', // <-- Add this
          departure_date: '2025-12-12' // <-- And this
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
        if (!response.data || !response.data.data || response.data.data.length === 0) {
            throw new Error("No destination data found");
        }
        console.log("Destination API Response:", response.data);

        const id = response.data.data[0].dest_id;
        
        console.log(id);
        const data1= await fetchData(id);
        
        return data1;
    } catch (error) {
        console.error("API Error:", error.response ? error.response.data : error.message);
        throw error;
    }
}

module.exports = { fetch };
