import React, { useState } from "react";
import "./App.css";
import LetSuspense from "./LetSuspense";

import { fakeData } from "./fakeData";

// mock api calls simulates a delayed api call for each query
const fakeApi = (query) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let data = fakeData;
      if (query.trim() === "") return resolve(data);
      data = data.filter((d) =>
        d.title.toLowerCase().includes(query.toLowerCase())
      );
      return resolve(data);
    }, 1500);
  });
};
// search bar component queries the available data by title
const SearchBar = (props) => {
  return (
    <form className="search-form">
      <input
        type="search"
        placeholder="Search titles"
        value={props.query}
        onChange={(e) => props.handleSearch(e.target.value)}
      />
    </form>
  );
};
// data card component displays the data from the api
const DataCard = (props) => {
  return (
    <div className="data-card">
      <figure className="img-container">
        <img src={props.img} alt={props.title} />
      </figure>
      <h2>{props.title}</h2>
      <p>{props.desc}</p>
    </div>
  );
};
// placeholder component shows a skeleton UI that resembles the DataCard
const Placeholder = (props) => {
  return (
    <div className="data-card">
      <figure className="img-container loading"> </figure>
      <p className="loading" style={{ width: "60%", height: 30 }}></p>
      <p
        className="loading"
        style={{ width: "100%", height: 12, margin: "8px 0" }}
      ></p>
      <p
        className="loading"
        style={{ width: "80%", height: 12, margin: "8px 0" }}
      ></p>
      <p
        className="loading"
        style={{ width: "100%", height: 12, margin: "8px 0" }}
      ></p>
    </div>
  );
};

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");

  const handleSearch = (query) => {
    setMovies([]);
    setQuery(query);
  };
  const fetchData = async () => {
    const result = await fakeApi(query);
    setMovies(result);
  };

  fetchData();

  return (
    <div className="App">
      <div className="container">
        <h2 style={{ textAlign: "center", color: "#fff" }}>Vuetube</h2>
        <SearchBar query={query} handleSearch={handleSearch} />
        <div className="card-container">
          <LetSuspense
            condition={movies.length > 0}
            placeholder={Placeholder}
            multiplier={3}
            initialDelay={200}
          >
            {movies.map(({ id, title, img, desc }) => (
              <DataCard key={id} title={title} img={img} desc={desc} /> //render card
            ))}
          </LetSuspense>
        </div>
      </div>
    </div>
  );
}

export default App;
