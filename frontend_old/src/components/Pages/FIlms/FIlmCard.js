import React from "react"; 
import styles from "./FilmCard.module.scss";

const FilmCard = ({ result }) => { 
  return (
    <div className={styles.card}>
      <div className={styles.cardImage}>
        <img src={result.Poster} alt=""/>
      </div>
      <div className={styles.cardContent}>
        <h2>{result.Title}</h2>
        <div className={styles.cardInfo}>
          <p><span>typ:</span><span>{result.Type}</span></p>
          <p><span>premiera:</span><span>{result.Year}</span></p>
        </div>
      </div>
    </div>
  );
};

export default FilmCard;