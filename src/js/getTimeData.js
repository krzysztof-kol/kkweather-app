export async function getTimeData(coordinates) {
  const locationData = coordinates;
  const latitude = locationData.latitude;
  const longitude = locationData.longitude;

  const currentTimeOnLocationData = await fetch(
    `https://api-bdc.net/data/timezone-by-location?latitude=${latitude}&longitude=${longitude}&key=bdc_50aaf13f645647f1ae8c1a4eaade70f9`
  );
  const currentTimeOnLocation = await currentTimeOnLocationData.json();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const weekNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const currentDate = new Date(currentTimeOnLocation.localTime);
  const currentDay = currentDate.getDate();
  const currentYear = currentDate.getFullYear();
  const currentMonth = monthNames[currentDate.getMonth()];
  const currentWeekDay = weekNames[currentDate.getDay()];
  let currentHour = currentDate.getHours();
  let currentMinute = currentDate.getMinutes();
  let hour = currentDate.getHours();
  let dayWeek = currentDate.getDay();

  if (currentMinute < 10) currentMinute = "0" + currentMinute;
  if (currentHour < 10) currentHour = "0" + currentHour;

  const currentTime = `${currentHour}:${currentMinute}`;
  const currentDateDisplay = `${currentWeekDay} ${currentDay} ${currentMonth} ${currentYear}`;

  document.getElementById("current-time").textContent = currentTime;
  document.getElementById("current-date").textContent = currentDateDisplay;

  console.log(dayWeek);

  return { weekNames, currentWeekDay, dayWeek, hour, currentMinute };
}
