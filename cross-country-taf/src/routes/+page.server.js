// link https://aviationweather.gov/api/data/taf?format=json&metar=true&bbox=22%2C-90%2C33%2C-74&time=valid

// src/routes/+page.server.js

//import fetch from 'node-fetch';

export async function load() {
    let apiUrl = 'https://aviationweather.gov/api/data/taf?format=json&metar=true&bbox=22%2C-90%2C33%2C-74&time=valid';
  
    try {
      // Fetch the METAR data from the API
      let response = await fetch(apiUrl);
  
      if (!response.ok) {
        // If the response isn't OK, return an error
        return {
          status: response.status,
          body: { message: 'Failed to fetch METAR data' },
        };
      }
  
      // Parse the response as JSON
      const taf = await response.json();
  
      console.log(taf);
      return { taf };
    } catch (error) {
      console.error('Error fetching METAR data:', error);
      return {
        status: 500,
        body: { message: 'Internal server error' },
      };
    }
  }