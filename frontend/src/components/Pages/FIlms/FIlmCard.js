import React from "react";
import styles from "./FilmCard.module.scss";
import { CiCircleList } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

const FilmCard = ({ result }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardImage}>
        <img src={result.Poster} alt="" />
      </div>
      <div className={styles.cardContent}>
        <h2>{result.Title}</h2>
        <p>
          <span>{result.Type}</span> &nbsp;
          <span>{result.Year}</span>
        </p>
        <p className={styles.lists}>
          <span className={styles.yourList}>
            <CiCircleList /> Add to watch{" "}
          </span>
          &nbsp;&nbsp;
          <span className={styles.favorite}>
            <FaHeart /> Add to favorite
          </span>
        </p>
      </div>
    </div>
  );
};

export default FilmCard;
