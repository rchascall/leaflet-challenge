# USGS Earthquake Data Mapper
## Earthquakes the past 30 days of magnitude 2.5 or greater

![USGS image](https://d9-wret.s3.us-west-2.amazonaws.com/assets/palladium/production/s3fs-public/styles/side_image/public/thumbnails/image/1964_EQ_slider.jpg?itok=OnEpZTp4)

*Sources/Usage: Public Domain.*
*Damage from the 1964 Alaskan Earthquake. Credit: USGS (Public domain.)*

This project retrieves earthquake data from the USGS website and uses D3 json and leaflet to create an interactive map of earthquakes with a magnitude of 2.5 or greater. The map plots earthquakes based on longitude and latitude and represents their magnitude through the size of the circle markers and their depth through the color of the circle markers. The larger the circle, the greater the magnitude of the earthquake, and the darker the color, the greater the depth of the earthquake.

Each marker on the map includes a popup that displays the date, magnitude, depth, and URL of the earthquake's webpage on the USGS site where more details can be found. The map also includes a legend that provides depth context for the circle marker colors.

## Getting Started
To use this project, follow these steps:

1. Clone the repository to your local machine.
2. Open the project in your preferred code editor.
3. Open the index.html file in your browser.

The map should load with circle markers representing earthquakes that meet the magnitude threshold. You can click on each marker to see more information about the earthquake.

## Technologies Used
This project uses the following technologies:

1. D3.js
2. Leaflet
3. USGS Earthquake Data API
