import { useEffect, useState } from 'react';

function Home() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      fetch('http://localhost:4000/api/hotel')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          console.log('Raw response:', response);
          return response.json();
        })
        .then(data => {
          // The array of hotels is in data.data
          setData(data.data || []); 
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
        <h1>Travel Data</h1>
        <ul>
          {data.map((item, index) => (
            <li key={index}>{item.name}</li>
          ))}
        </ul>
      </>
    );
}

export default Home;
