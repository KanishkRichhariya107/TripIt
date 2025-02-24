import { useEffect, useState } from 'react';
import SearchForm from './SearchForm';
import './Home.css';

const HotelCard = ({ hotel }) => {
	const { property, accessibilityLabel } = hotel;
	return (
		<article className="hotel-card">
		{property.photoUrls?.[0] && (
			<img 
			src={property.photoUrls[0]} 
			alt={property.name} 
			className="hotel-image" 
			/>
		)}
		<div className="hotel-details">
			<h3 className="hotel-name">{property.name}</h3>
			<div className="rating-container">
			{property.accuratePropertyClass > 0 && (
				<span className="stars">
				{'★'.repeat(property.accuratePropertyClass)}
				</span>
			)}
			{property.reviewScore > 0 && (
				<span className="review-score">
				{property.reviewScore} {property.reviewScoreWord}
				</span>
			)}
			</div>
			<p className="hotel-location">
			{accessibilityLabel ? accessibilityLabel.split('•')[0]?.trim() : ''}
			</p>
			<div className="price-container">
			{property.priceBreakdown?.strikethroughPrice && (
				<span className="original-price">
				{property.priceBreakdown.strikethroughPrice.value} {property.priceBreakdown.strikethroughPrice.currency}
				</span>
			)}
			<span className="current-price">
				{property.priceBreakdown?.grossPrice.value} {property.priceBreakdown?.grossPrice.currency}
			</span>
			</div>
			{property.isPreferred && <span className="badge">Preferred</span>}
		</div>
		</article>
	);
};

const HotelList = ({ hotels, meta, appear }) => (
	<section className="hotel-list">
		{meta?.[0]?.title && (
		<div className="results-count">{meta[0].title}</div>
		)}
		{hotels.length === 0 ? (
		<p className="no-results">No hotels found matching your criteria.</p>
		) : (
		hotels.map((hotel) => (
			<HotelCard key={hotel.property.id} hotel={hotel} />
		))
		)}
		{appear && appear.map((component) => (
		<div key={component.id} className="disclaimer">
			{component.component?.props?.text || component.component?.props?.title}
		</div>
		))}
	</section>
);

const Home = () => {
	const [hotelData, setHotelData] = useState({ hotels: [], meta: [], appear: [] });
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchHotels = async () => {
		try {
			const response = await fetch('http://localhost:4000/api/hotels');
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const result = await response.json();
			const { data } = result;
			setHotelData({
				hotels: data?.hotels || [],
				meta: data?.meta || [],
				appear: data?.appear || []
			});
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
		};
		fetchHotels();
	}, []);

	if (loading) return <div className="loading-spinner">Loading hotels...</div>;
	if (error) return <div className="error-banner">Error: {error}</div>;

	return (
		<main className="hotel-search-container">
		<SearchForm />
		<h1 className="main-title">Available Hotels in Mumbai</h1>
		<HotelList 
			hotels={hotelData.hotels} 
			meta={hotelData.meta} 
			appear={hotelData.appear}
		/>
		</main>
	);
};

export default Home;
