import {React,useState,useEffect, use} from 'react';
import './App.css';
import CountryCard from './components/CountryCard';

function App() {
  const[countries , setCountries]=useState([]);
  useEffect(()=>{
    const fetchCountries = async ()=>{
      try{
           const response = await fetch("https://xcountries-backend.azurewebsites.net/all");
           const data = await response.json();
           setCountries(data);
      }
      catch(error){
           console.error("Error fetching data:" , error);
      }
      
    };fetchCountries();
  },[]);
  return (
    <div className="app-container">
       <h1>XCountries</h1>
    <div className="grid-container">
      {countries.map((country)=>(
        <CountryCard key={country.name} name={country.name} flag={country.flag} />
      ))}
    </div>
     </div>
  );
}

export default App;
