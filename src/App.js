import React, { useState, useEffect } from 'react';
import './App.css';
import CountryCard from './components/CountryCard';

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://countries-search-data-prod-812920491762.asia-south1.run.app/countries");
        const data = await response.json();
        console.log("Fetched countries:", data); // Optional debug
        setCountries(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCountries();
  }, []);

  // Filter countries based on search
  const filteredCountries = countries.filter((country) =>
    country.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Deduplicate based on name and flag URL
  const deduplicatedCountries = filteredCountries.filter((country, index, self) => {
    const uniqueKey = `${country.common}-${country.png}`;
    return index === self.findIndex(c =>
      `${c.common}-${c.png}` === uniqueKey
    );
  });

  return (
    <div className="app-container">
      <h1>XCountries</h1>

      <input
        type="text"
        placeholder="Search for countries..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      {deduplicatedCountries.length > 0 ? (
        <div className="grid-container">
          {deduplicatedCountries.map((country) => (
            <CountryCard
              key={`${country.common}-${country.png}`}
              name={country.common}
              flag={country.png}
            />
          ))}
        </div>
      ) : (
        <p>No matching countries found.</p>
      )}
    </div>
  );
}

export default App;
