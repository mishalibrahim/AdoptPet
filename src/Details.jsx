import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AdoptedPetContext from "./AdoptedPetContext";
import { useState } from "react";
import Modal from "./Modal";
import { useParams } from "react-router-dom";
import fetchPet from "./fetchPet";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
const Details = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [_, setAdoptedPet] = useContext(AdoptedPetContext);
  const { id } = useParams();
  const results = useQuery(["details", id], fetchPet);

  if (results.isError) {
    return <h2>OHNO........</h2>;
  }

  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    );
  }

  const pet = results.data.pets[0];

  return (
    <div className="details">
      <Carousel images={pet.images} />
      <div>
        <h1>{pet.name}</h1>
        <h2>
          {pet.animal} - {pet.breed} - {pet.city}, {pet.state}
        </h2>
        <button onClick={() => setShowModal(true)}> Adopt {pet.name}</button>
        <p>{pet.description}</p>
        {showModal ? (
          <Modal>
            <div>
              <h1>would you like to adopt {pet.name}</h1>
              <div className="buttons">
                <button
                  onClick={() => {
                    setAdoptedPet(pet);
                    navigate("/");
                  }}
                >
                  yes
                </button>
                <button onClick={() => setShowModal(false)}>No</button>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    </div>
  );
};

function DetailsErrorBoundary() {
  return (
    <ErrorBoundary>
      <Details />
    </ErrorBoundary>
  );
}

export default DetailsErrorBoundary;
