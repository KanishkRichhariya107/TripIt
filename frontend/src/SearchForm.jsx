import { useState } from "react";

const SearchForm = () => {
    const [destination, setDestination] = useState("");
    const [arrivalDate, setArrivalDate] = useState("");
    const [departureDate, setDepartureDate] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Destination" value={destination} onChange={(e) => setDestination(e.target.value)} required />
            <input type="date" value={arrivalDate} onChange={(e) => setArrivalDate(e.target.value)} required />
            <input type="date" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} required />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchForm;
