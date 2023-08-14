/* eslint-disable react/prop-types */
import { React } from "react";
import styles from "./Navbar.module.css";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const Navbar = ({onOptionClick}) => {
  const options = [
    "movie",
    "automobile",
    "travel",
    "sports",
    "Business",
    "sensex",
    "market",
    "food",
    "gadgets",
    "crypto",
    "science",
    "health",
    "lifestyle",
    "education",
    "politics",
    "recipes",
    "JEE",
    "entertainment",
  ];

  const clickHandler = (key) => {    
    onOptionClick(key);
  };
  

  function leftScroll() {
    const left = document.querySelector(".scroll-options");
    left.scrollBy(-100, 0);
  }
  function rightScroll() {
    const right = document.querySelector(".scroll-options");
    right.scrollBy(100, 0);
  }

  return (
    <div className={styles.navbar}>
      <button onClick={leftScroll} className={`${styles.arrowButton} ${styles.left}`}>
        <ChevronLeftIcon />
      </button>
      <div className={`${styles.options} scroll-options`}>
        {options.map((option) => (
          <button
            key={option}
            onClick={() => clickHandler(option)}
            className={styles.button}>
            {option}
          </button>
        ))}
      </div>
      <button onClick={rightScroll} className={`${styles.arrowButton} ${styles.right}`}>
        <ChevronRightIcon />
      </button>
    </div>
  );
};

export default Navbar;
