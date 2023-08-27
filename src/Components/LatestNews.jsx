import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import styles from "./LatestNews.module.css";
import Entertainment from "./Entertainment";

const api = import.meta.env.VITE_NEWSKEY;

const LatestNews = () => {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("India");
  const [nxtPage, setNextPage] = useState();

  const handleOptionClick = (option) => {
    setSearch(option);
    console.log(option);
  };
  useEffect(() => {
    const makeRequest = async () => {
      try {
        const response = await axios.get(`https://newsdata.io/api/1/news?&q=${search}&language=en&country=in&prioritydomain=medium&size=10&image=1&apikey=${api}`);
        console.log(response);
        setNextPage(response.data.nextPage);
        const results = response.data.results.map((items) => ({
        ...items,
        keyId: `${items.source_id} ${items.title}`,
      }));

      setBlogs(results);
      } catch (error)  {
          console.error('Batch request error:', error);
        }
      
    };
    const secondPage = async () => {
      if (nxtPage) {
        try {
          const response = await axios.get(`https://newsdata.io/api/1/news?&q=${search}&language=en&country=in
          &prioritydomain=medium&size=10&image=1&apikey=${api}&page=${nxtPage}`);
          console.log(response);
          
          const nextPageResults = response.data.results.map((items) => ({
          ...items,
          keyId: `${items.source_id} ${items.title}`,
        }));
        setBlogs((prevBlogs) => [...prevBlogs, ...nextPageResults]);
        } catch (error)  {
            console.error('Batch request error:', error);
          }
      }
    };

    makeRequest();
    secondPage();
  }, [search,nxtPage]);
  
  return (
    <>
      <div>
        <Navbar onOptionClick={handleOptionClick} />
      </div>
      <div className={styles.news}>
        <div className={styles.blogGrid}>
          {blogs.map((item) => (
            <div key={`${item.keyId}${item.title}`} className={styles.blogContainer}>
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
        <div>
          <h4 style={{textAlign: "center"}}> Entertainment News</h4>
          <Entertainment />
        </div>
      </div>
      
    </>
  );
};

export default LatestNews;
