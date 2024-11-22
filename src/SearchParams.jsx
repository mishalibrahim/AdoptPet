import { useState, useContext } from "react";
import AdoptedPetContext from "./AdoptedPetContext";
import useBreedList from "./useBreedList";
import Results from "./Results";
import { useQuery } from "@tanstack/react-query";
import fetchSearch from "./fetchSearch";

const Animals = ["bird", "dog", "human", "rabbit", "reptile"];

const SearchParams = () => {
  const [requestParams, setRequestParams] = useState({
    location: "",
    animal: "",
    breed: "",
  });
  const [animal, setAnimal] = useState("");
  const [breeds] = useBreedList(animal);
  const [adoptedPet] = useContext(AdoptedPetContext);
  const results = useQuery(["search", requestParams], fetchSearch);

  const pets = results?.data?.pets ?? [];
  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const obj = {
            animal: formData.get("animal") ?? "",
            breed: formData.get("breed") ?? "",
            location: formData.get("location") ?? "",
          };
          setRequestParams(obj);
        }}
      >
        {adoptedPet ? (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name}></img>
          </div>
        ) : null}
        <label htmlFor="location">
          Location
          <input name="location" id="location" placeholder="location" />
        </label>
        <label htmlFor="animals">
          Animals
          <select
            onChange={(e) => {
              setAnimal(e.target.value);
            }}
            id="animal"
            placeholder="animal"
            value={animal}
            name="animal"
          >
            <option />
            {Animals.map((animal) => (
              <option key={animal}>{animal}</option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            disabled={breeds.length === 0}
            id="breed"
            placeholder="breed"
            name="breed"
          >
            <option />
            {breeds.map((breed) => (
              <option key={breed}>{breed}</option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
