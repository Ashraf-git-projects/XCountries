import React, { useState, useEffect } from 'react';
import './App.css';
import CountryCard from './components/CountryCard';

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://xcountries-backend.azurewebsites.net/all");
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCountries();
  }, []);

  // Filter countries based on search
  const filteredCountries = countries.filter((country) =>
    country.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Remove duplicate countries using name-abbr-flag combo
  const deduplicatedCountries = filteredCountries.filter((country, index, self) => {
    const uniqueKey = `${country.name}-${country.abbr}-${country.flag}`;
    return index === self.findIndex(c =>
      `${c.name}-${c.abbr}-${c.flag}` === uniqueKey
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
              key={`${country.name}-${country.abbr}-${country.flag}`}
              name={country.name}
              flag={country.flag}
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
