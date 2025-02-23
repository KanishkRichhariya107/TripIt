const axios = require('axios');
require('dotenv').config();

const createRequestOptions = (endpoint, params = {}) => ({
	method: 'GET',
	url: `https://${process.env.RAPIDAPI_HOST}${endpoint}`,
	headers: {
		'x-rapidapi-key': process.env.RAPIDAPI_KEY,
		'x-rapidapi-host': process.env.RAPIDAPI_HOST
	},
	params
});

const fetchDestinationId = async () => {
	const options = createRequestOptions(
		'/api/v1/hotels/searchDestination',
		{ query: 'delhi' }
	);
	
	const response = await axios.request(options);
	
	if (!response.data?.data?.[0]?.dest_id) {
		throw new Error('Invalid destination API response structure');
	}
	
	return response.data.data[0].dest_id;
};

const fetchHotelsByDestination = async (destinationId) => {
	const options = createRequestOptions('/api/v1/hotels/searchHotels', {
		dest_id: destinationId,
		search_type: 'CITY',
		adults: '1',
		children_age: '0,17',
		room_qty: '1',
		page_number: '1',
		units: 'metric',
		temperature_unit: 'c',
		languagecode: 'en-us',
		currency_code: 'AED',
		arrival_date: '2025-10-10',
		departure_date: '2025-12-12'
	});

	const response = await axios.request(options);
	return response.data;
};

const fetchHotelData = async () => {
	try {
		const destinationId = await fetchDestinationId();
		console.log('Fetched Destination ID:', destinationId);
		
		const hotelData = await fetchHotelsByDestination(destinationId);
		return hotelData;
	} catch (error) {
		console.error('Hotel Fetch Error:', {
		message: error.message,
		status: error.response?.status,
		data: error.response?.data
		});
		throw new Error('Failed to fetch hotel data from external API');
	}
};

module.exports = { fetch: fetchHotelData };