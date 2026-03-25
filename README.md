# Weather Order Checker

This is a Node.js application that processes customer orders and checks weather conditions using the OpenWeatherMap API to identify potential delivery delays.

## Features
- Fetches weather data for multiple cities
- Uses Promise.all for parallel API calls
- Marks orders as Delayed if weather is Rain, Snow, or Extreme
- Generates personalized apology messages
- Handles invalid cities without stopping execution
- Uses .env for secure API key storage

## Setup

1. Install dependencies:
npm install

2. Add your API key in .env file:
API_KEY=your_api_key_here

## Run

node index.js

## How it works
- Reads data from orders.json
- Fetches weather for each city
- Updates status based on weather conditions
- Adds delay message if needed
- Handles errors gracefully

## Example Output

{
  "order_id": "1001",
  "customer": "Alice Smith",
  "city": "New York",
  "status": "Delayed",
  "message": "Hi Alice Smith, your order to New York is delayed due to rain. We appreciate your patience!"
}

## Notes
- API key activation may take some time
- Invalid cities are logged but do not crash the program

## Author
Manikanta
