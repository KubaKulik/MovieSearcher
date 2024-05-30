import styles from "./Films.module.scss";
import axios from "axios";
import { useState } from "react";
import FilmCard from "./FIlmCard";

const Films = () => {
  const [state, setState] = useState({
    search: "",
    results: [],
    searched: false, 
  });

  const handleInput = (event) => {
    let search = event.target.value;
    setState((prevState) => {
      return { ...prevState, search: search };
    });
  };
  const searchForFilms = () => {
    axios
      .get(`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${state.search}`)
      .then((res) => {
        console.log(res.data.Search);
        setState((prevState) => {
          return { ...prevState, results: res.data.Search || [], searched: true };
        });
      })
      .catch((err) => console.log(err));
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (state.search.trim() !== "") {
        searchForFilms();
      }
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
          onKeyPress={handleKeyPress}
        />
      </form>
      <div className={styles.filmsResults}>
        {state.searched && state.results.length === 0 && (
          <p>No results found.</p>
        )}
        {state.results.length > 0 && ( 
          state.results.map((result, i) => (
            <FilmCard key={i} result={result} />
          ))
        )}
      </div>
    </div>
  );
};

export default Films;
