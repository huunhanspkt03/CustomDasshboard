## Table of Contents
- [Table of Contents](#table-of-contents)
- [About the Project](#about-the-project)
- [Getting Started](#getting-started)
  - [Hardware Design](#hardware-Design)
  - [GUI Interface Design](#GUI-Interface-Design)
  - [Previewn](#Preview)
- [Contributors](#Contributors)
-[Acknowledgements & Resources](#Acknowledgements-&-Resources)
- [License](#license)

## About the Project

Design and implement a smarthome model that remotely controls lights💡, detects fire🔥 and smoke to automatically turn on the fire extinguishing system💦 , simultaneously sends notification message to user. Using module ESP32 with main core WROOM-32 ([Datasheet](https://www.espressif.com/en/products/socs/esp32)) and Combined with the E-Ra([https://e-ra.io/index.html]) IoT platform.

## Getting Started

### Hardware Design
Below is 3D views:

<p align="center">
  <img src="assets\board.png)" alt="PCB board" width="600" />
</p>

### GUI Interface Design

The CustomDashboard GUI is built with plain HTML/CSS and vanilla JavaScript, featuring a vibrant gradient theme and a clean grid layout. Key components include:

- **Light Control Widgets**  
  - Bed Light, Kitchen Lights, Living Room Lights, etc., each showing an icon and an ON/OFF toggle button.  
  - Smooth hover effects and rounded buttons with dynamic color changes.

- **Environmental Measurement Widgets**  
  - **Temperature**: a circular gauge displaying the current temperature.  
  - **Humidity**: a circular gauge plus a progress bar showing humidity level.  
  - Control buttons (play/stop) below each gauge to refresh or pause data updates.

- **Weather Widget**  
  - Shows the day of the week, temperature, and a weather icon (Openweather) fetched from a public API.  
  - Centered text and clear typography for quick readability.

#### Preview

<p align="center">
  <img src="assets\GUI.png" alt="Dashboard overview" width="800" />
</p>

## Acknowledgements & Resources

- **OpenWeatherMap API** – Free weather data → [Docs](https://openweathermap.org/api) | [Sign Up](https://home.openweathermap.org/users/sign_up)
- **Chart.js** – Circular gauges used for temperature and humidity → [Source](https://github.com/chartjs/Chart.js) | [Docs](https://www.chartjs.org/docs/)
- **E-Ra** – Combined with the E-Ra → [Sign Up](https://e-ra.io/index.html) | [Docs](https://app.e-ra.io/instruction-guide)
## Contributors

* [**HUU-NHAN**](https://github.com/huunhanspkt03)

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

**Note:** The `delta` component is licensed under the Apache-2.0 License.  
Please see `components/delta/LICENSE` for more details.
