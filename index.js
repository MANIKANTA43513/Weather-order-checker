require("dotenv").config();
const axios = require("axios");
const fs = require("fs");

const API_KEY = process.env.API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

const orders = JSON.parse(fs.readFileSync("orders.json", "utf-8"));

const DELAY_WEATHER = ["Rain", "Snow", "Extreme"];

function generateApology(customer, city, weather) {
  return `Hi ${customer}, your order to ${city} is delayed due to ${weather.toLowerCase()}. We appreciate your patience!`;
}

async function fetchWeather(order) {
  try {
    const res = await axios.get(BASE_URL, {
      params: {
        q: order.city,
        appid: API_KEY
      }
    });

    const weather = res.data.weather[0].main;

    if (DELAY_WEATHER.includes(weather)) {
      order.status = "Delayed";
      order.message = generateApology(order.customer, order.city, weather);
    }

  } catch (err) {
    console.error(`Error for city: ${order.city}`);
  }

  return order;
}

async function processOrders() {
  const updatedOrders = await Promise.all(
    orders.map(order => fetchWeather(order))
  );

  fs.writeFileSync("orders.json", JSON.stringify(updatedOrders, null, 2));
}

processOrders();
