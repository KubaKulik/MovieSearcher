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
      <form className={styles.filmsForm}>
      <h2>Search Movie</h2>
        <input
          type="text"
          name="search"
          placeholder="Search Movie..."
          onChange={handleInput}
          onKeyPress={handleKeyPress}
        />
        {state.searched && state.results.length === 0 && (
          <span className={styles.noResult}>No results found...</span>
        )}
      </form>
      <div className={styles.filmsResults}>
      
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
