
// Hàm thiết lập điều khiển đèn cho từng phòng
function setupLightControl(room) {
    const widget = document.querySelector(`.${room}-widget`);
    if (!widget){ 
        console.error(`Không tìm thấy widget cho phòng: ${room}`);
        return;} 
    const icon = widget.querySelector(".light-icon");
    const status = widget.querySelector(".status");
    let isOn = false;

    function toggleLight() {
        isOn = !isOn;
        console.log(`🔆 Đèn ${room}: ${isOn ? "Bật" : "Tắt"}`);
        if (isOn) {
            icon.classList.add("active");
            status.textContent = "ON";
            eraWidget.triggerAction(window[`on${room}Light`].action, null);
        } else {
            icon.classList.remove("active");
            status.textContent = "OFF";
            eraWidget.triggerAction(window[`off${room}Light`].action, null);
        }
    }

    widget.addEventListener("click", toggleLight);
}

// Gọi hàm để thiết lập điều khiển đèn cho từng phòng
setupLightControl("bedLight");
setupLightControl("kitchenLight");
setupLightControl("livingRoomLight");

// Lấy phần tử của nhiệt độ và độ ẩm
function handlePowerOff(type) {
    if (type === "temp" || type === "both") {
      isTempActive = false;
      const gaugeTemp = document.querySelector(".temp-widget .gauge.temp.neon");
      gaugeTemp.style.setProperty("--value", 0);
      gaugeTemp.querySelector(".value").textContent = "OFF";
      //updateChart(0, NaN);
    }
  
    if (type === "humidifier" || type === "both") {
      isHumidActive = false;
      const gaugeHumid = document.querySelector(".humidifier-widget .gauge.humidifier.neon");
      gaugeHumid.style.setProperty("--value", 0);
      gaugeHumid.querySelector(".value").textContent = "OFF";
      //updateChart(NaN, 0);
    }
  }
  
//   // Gán sự kiện cho nút tắt
//   document.querySelectorAll(".controls button").forEach(button => {
//     button.addEventListener("click", function () {
//         let type = this.dataset.type; // Lấy loại nút từ data-type
//         handlePowerOff(type);
//         console.log(`Nút ${type} được nhấn!`);
//     });
// });


  // ============ Active Buttons ==============
  function handleActive(type) {
    if (type === "temp" || type === "both") {
      isTempActive = true;
      if (lastTempValue !== null) {
        updateTempGauge(lastTempValue);
        //updateChart(lastTempValue, NaN);
      }
    }
  
    if (type === "humidifier" || type === "both") {
      isHumidActive = true;
      if (lastHumidValue !== null) {
        updateGauge(lastHumidValue);
        //updateChart(NaN, lastHumidValue);
      }
    }
  }
//   document.querySelectorAll(".controls .active").forEach((btn) => {
//     btn.addEventListener("click", function () {
//     const type = this.classList.contains("fa-play") ? "humidifier" : "temp";
//       handleActive(type);
//       console.log(`Nút ${type} được nhấn!`);
//     });
//   });
  document.querySelectorAll(".controls button").forEach(button => {
    button.addEventListener("click", function () {
        // Lấy loại thiết bị (temp/humidifier)
        let type = this.dataset.type; 
        
        // Kiểm tra icon <i> để biết đang nhấn Play (fa-play) hay PowerOff (fa-power-off)
        let icon = this.querySelector("i");
        let isStartButton = icon.classList.contains("fa-play");
        let isPowerOffButton = icon.classList.contains("fa-power-off");
        
        if (isStartButton) {
            // Đây là nút bật (Start) cho temp/humidifier
            handleActive(type);
            console.log(`Nút Play của ${type} được nhấn!`);
        } else if (isPowerOffButton) {
            // Đây là nút tắt (Power Off) cho temp/humidifier
            handlePowerOff(type);
            console.log(`Nút Power Off của ${type} được nhấn!`);
        }
    });
});
  
  function updateTempGauge(newVal) {
    const gauge = document.querySelector(".temp-widget .gauge.temp.neon");
    gauge.style.setProperty("--value", newVal);
    gauge.querySelector(".value").textContent = newVal + "°C";
  }
  
  function updateGauge(newVal) {
    const gauge = document.querySelector(
      ".humidifier-widget .gauge.humidifier.neon"
    );
    gauge.style.setProperty("--value", newVal);
    gauge.querySelector(".value").textContent = newVal + "%";
  } 

// Hàm cập nhật thời tiết
async function fetchWeather() {
    const apiKey = '3a9dc7bfab0014c931de17434dda777a';
    const city = 'Ho Chi Minh City';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const temp = data.main.temp;
        const icon = data.weather[0].icon;
        const day = new Date().toLocaleString('en-VN', { weekday: 'long' });

        document.getElementById('weather-temp').innerText = `${temp}°C`;
        document.getElementById('weather-icon').src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        document.getElementById('weather-day').innerText = day;
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// Gọi hàm fetchWeather khi DOM đã tải xong
window.addEventListener("DOMContentLoaded", fetchWeather);
  //==============Add E-Ra Services============
  const eraWidget = new EraWidget();
  const temp = document.getElementById("temp-widget");
  const humidifier = document.getElementById("humidifier-widget");
  let isTempActive = true;
  let isHumidActive = true;
  let lastTempValue = null;
  let lastHumidValue = null;
  let configTemp = null,
    configHumi = null,
    onBedLight = null,
    offBedLight = null,
    onKitchenLight = null,
    offKitchenLight = null,
    onLivingLight = null,
    offLivingLight = null;
  
  eraWidget.init({
    onConfiguration: (configuration) => {
      configTemp = configuration.realtime_configs[0];
      configHumi = configuration.realtime_configs[1];
      onBedLight = configuration.actions[0];
      offBedLight = configuration.actions[1];
      onLivingLight = configuration.actions[2];
      offLivingLight = configuration.actions[3];
      onKitchenLight = configuration.actions[4];
      offKitchenLight = configuration.actions[5];
        },
        onValues: (values) => {
            if (configTemp && values[configTemp.id]) {
                const tempValue = values[configTemp.id].value;
                lastTempValue = tempValue;
                if (isTempActive) {
                    updateTempGauge(tempValue); // Cập nhật nhiệt độ
                    //updateChart(tempValue, NaN);
                }
            }
    
            if (configHumi && values[configHumi.id]) {
                const humidValue = values[configHumi.id].value; // Lấy giá trị độ ẩm từ API
                lastHumidValue = humidValue; // Khởi tạo biến này
                if (isHumidActive) {
                    updateGauge(humidValue); // Cập nhật độ ẩm
                    //updateChart(NaN, humidValue);
                }
            }
        },
    });
  //===========Full Screen Feature==========
  // Add fullscreen button HTML to your document first
  const fullscreenButton = document.createElement("button");
  fullscreenButton.innerHTML = '<i class="fas fa-expand"></i>';
  fullscreenButton.className = "fullscreen-button";
  document.body.appendChild(fullscreenButton);
  
  // Add fullscreen functionality
  let isFullscreen = false;
  
  function toggleFullscreen() {
    if (!isFullscreen) {
      // Enter fullscreen
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      }
      fullscreenButton.innerHTML = '<i class="fas fa-compress"></i>';
    } else {
      // Exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      fullscreenButton.innerHTML = '<i class="fas fa-expand"></i>';
    }
    isFullscreen = !isFullscreen;
  }
  
  // Event listener for fullscreen button
  fullscreenButton.addEventListener("click", toggleFullscreen);
  
  // Update button icon when fullscreen changes through other means (like Esc key)
  document.addEventListener("fullscreenchange", function () {
    isFullscreen = !!document.fullscreenElement;
    fullscreenButton.innerHTML = isFullscreen
      ? '<i class="fas fa-compress"></i>'
      : '<i class="fas fa-expand"></i>';
  });
  
  // Handle fullscreen change for different browsers
  document.addEventListener("webkitfullscreenchange", function () {
    isFullscreen = !!document.webkitFullscreenElement;
    fullscreenButton.innerHTML = isFullscreen
      ? '<i class="fas fa-compress"></i>'
      : '<i class="fas fa-expand"></i>';
  });
  
  document.addEventListener("mozfullscreenchange", function () {
    isFullscreen = !!document.mozFullScreenElement;
    fullscreenButton.innerHTML = isFullscreen
      ? '<i class="fas fa-compress"></i>'
      : '<i class="fas fa-expand"></i>';
  });
  
  document.addEventListener("MSFullscreenChange", function () {
    isFullscreen = !!document.msFullscreenElement;
    fullscreenButton.innerHTML = isFullscreen
      ? '<i class="fas fa-compress"></i>'
      : '<i class="fas fa-expand"></i>';
  });
  