import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Entertainment.module.css";

const api = import.meta.env.VITE_NEWSKEY;

const Entertainment = () => {
  const [blogs, setBlogs] = useState([]);



  useEffect(() => {
    blogHandler();
  }, []);

  const blogHandler = async () => {
    try {
      const baseUrl = `https://newsapi.org/v2/everything?q=bollywood&sortBy=popularity&pageSize=10&apiKey=${api}`;
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
    </>
  );
};

export default Entertainment;


