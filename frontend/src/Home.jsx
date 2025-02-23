import { useEffect, useState } from 'react';
import SearchForm from './searchform';

function Home() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
	fetch('http://localhost:4000/api/hotel')
		.then(response => {
		if (!response.ok) {
			if (response.status === 204) {
				// No Content
				return [];
			  }
			throw new Error('Network response was not ok');
		}
		console.log('Raw response:', response);
		return response.json();
		})
		.then(data => {
            console.log('Fetched Data:', data); // Debugging line
			console.log('Hotel Data:', data.data?.hotels); // Check hotel structure
			setData(data.data?.hotels || []);
            setLoading(false);
        })
		.catch(error => {
		console.error('Error fetching data:', error);
		setError(error.message);
		setLoading(false);
		});
	}, []);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;
	return (
	<>
	<SearchForm/>
		<h1>Travel Data</h1>
		<ul>
  {data.map((hotel) => (
    <li key={hotel.hotel_id}>
      {hotel.accessibilityLabel}
    </li>
  ))}
</ul>


	</>
	);
}

export default Home;
