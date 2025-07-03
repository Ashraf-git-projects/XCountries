import React from "react";

function CountryCard({name , flag}){
    return(
        <div className="countryCard">
            <img src={flag} alt={`flag of ${name}`} className="flag-image"/>
            <p className="country-name">{name}</p>
        </div>
    );
};
export default CountryCard;