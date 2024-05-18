import styles from "./Films.module.scss";
import axios from "axios";
import { useState } from "react";
import FilmCard from "./FIlmCard";

const Films = () => {
  const [state, setState] = useState({
    search: "",
    results: [],
  });

  const handleInput = (event) => {
    let search = event.target.value;
    setState((prevState) => {
      return { ...prevState, search: search };
    });
  };

  const SearchResult = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      axios
        .get(`http://www.omdbapi.com/?i=tt3896198&apikey=618cb116&s=${state.search}`)
        .then((res) => {
          console.log(res.data.Search);
          setState((prevState) => {
            return { ...prevState, results: res.data.Search || [] }; // Dodane sprawdzenie czy istnieją wyniki
          });
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className={styles.films}>
      <h2>Wyszukaj film</h2>
      <form className={styles.filmsForm}>
        <input
          type="text"
          name="search"
          placeholder="Search Movie..."
          onChange={handleInput}
          onKeyDown={SearchResult}
        />
      </form>
      <div className={styles.filmsResults}>
        {state.results.length > 0 ? (
          state.results.map((result, i) => (
            <FilmCard key={i} result={result} />
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default Films;
