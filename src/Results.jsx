import React from "react";
import Pet from "./Pet";

const Results = ({ pets }) => {
  return (
    <div className="search">
      {!pets.length ? (
        <div className="loading-pane">
          <h2 className="loader">🌀</h2>
        </div>
      ) : (
        pets.map((pet) => (
          <Pet
            id={pet.id}
            animal={pet.animal}
            name={pet.animal}
            breed={pet.breed}
            images={pet.images}
            location={`${pet.city} ${pet.state}`}
            key={pet.id}
          />
        ))
      )}
      <div className=""></div>
    </div>
  );
};

export default Results;
