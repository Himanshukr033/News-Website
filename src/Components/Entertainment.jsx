import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Entertainment.module.css";

const api = import.meta.env.VITE_NEWSKEY;

const Entertainment = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const response = await axios.get(`https://newsdata.io/api/1/news?category=entertainment&q=Bollywood OR Netflix OR Movies&language=en&country=in&prioritydomain=medium&image=1&apikey=${api}`);
        console.log(response.data.results);
        const results = response.data.results.map((items) => ({
        ...items,
        keyId: `${items.source_id} ${items.title}`,
      }));

      setBlogs(results);
      } catch (error)  {
          console.error('Batch request error:', error);
        }
      
    };

    makeRequest();
  }, []);
  
  return (
    <>
      <div className={styles.blogGrid}>
        
        {blogs.map((item) => (
          <div key={item.keyId} className={styles.blogContainer}> 
            <img
              src={item?.image_url || 'https://i.ytimg.com/vi/gtYeZud4EHI/maxresdefault.jpg'}
              alt="blog Image"
              className={styles.blogImage}
            />
            <div className={styles.blogContent}>
              <h6 className={styles.blogTitle}>
                <a
                  href={item.link}
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


