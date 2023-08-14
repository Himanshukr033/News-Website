import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import styles from "./header.module.css"

const key = import.meta.env.VITE_Weather_key2;
const url = `http://api.weatherapi.com/v1/current.json?key=${key}&q=Patna&aqi=yes`;

const Header = () => {
  const [temp, setTemp] = useState({});
  const [time, setTime] = useState("");

  setInterval(() => {
    getTime();
  }, 600000);

  const getTime = () => {
    const currentTime =
      new Date().toLocaleString([], {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }) +
      ", Updated at" +
      " " +
      new Date().toLocaleString([], {
        hour12: true,
        hour: "2-digit",
        minute: "2-digit",
      });

    console.log(currentTime);
    setTime(currentTime);
  };

  useEffect(() => {
    getTime();
    weather();
  }, [time]);

  const weather = async () => {
    try {
      const response = await axios.get(url);
      const results = {
        humidity: response.data.humidity,
        temp: response.data.current.temp_c,
        place: response.data.location.name,
        disc: response.data.current.condition.text,
        icon: response.data.current.condition.icon,
      };
      console.log(results);
      setTemp(results);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <div className={styles.header}>
      <h6> {time}  </h6>
      <div className={styles.weather}>
        <LocationOnIcon style={{ fontSize: "17px" }}/>
        <h6> {temp.place}</h6>
        <h6> {temp.disc}</h6>
        <img src={temp.icon} alt="weather type" />
        <h6> {temp.temp} ℃</h6>
      </div>
    </div>
    <div className={styles.heading}>
      <h1>NEWS INDIA</h1>
    </div>
    </>
  );
};

export default Header;
