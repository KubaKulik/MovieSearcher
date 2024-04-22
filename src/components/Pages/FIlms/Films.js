import styles from "./Films.module.scss";
import axios from "axios";
import { useState } from "react";

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
        .get(`http://www.omdbapi.com/?s=${state.search}&apikey=618cb116`)
        .then((res) => {
          console.log(res.data);
          setState((prevState) => {
            return { ...prevState, results: res.data.Search };
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
    </div>
  );
};

export default Films;
