import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import styles from "./LatestNews.module.css";
import Entertainment from "./Entertainment";

const api = import.meta.env.VITE_NEWSKEY2;

const LatestNews = () => {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("India");

  const handleOptionClick = (option) => {
    setSearch(option);
    console.log(option);
  };

  useEffect(() => {
    blogHandler();
  }, [search]);

  const blogHandler = async () => {
    try {
      const baseUrl = `https://newsapi.org/v2/everything?q=${search}&sortBy=publishedAt&pageSize=20&apiKey=${api}`;

      const response = await axios.get(baseUrl);

      const results = response.data.articles.map((items) => ({
        ...items,
        keyId: `${items.source.id} ${items.source.name}`,
      }));

      setBlogs(results);

      console.log(blogs);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div>
        <Navbar onOptionClick={handleOptionClick} />
      </div>
      <div className={styles.news}>
        <div className={styles.blogGrid}>
          {blogs.map((item) => (
            <div key={item.keyId} className={styles.blogContainer}>
              <img
                src={item.urlToImage}
                alt="blog Image"
                className={styles.blogImage}
              />
              <div className={styles.blogContent}>
                <h6 className={styles.blogTitle}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.blogLink}
                  >
                    {item.title}
                  </a>{" "}
                </h6>
              </div>
            </div>
          ))}
        </div>
        <Entertainment />
      </div>
    </>
  );
};

export default LatestNews;
