// --- ДАННЫЕ Genshin Impact ---
// Полный список на 2024–2025
const genshinBirthdays = [
  { name: "Xiangling", day: 2, month: 11 },
  { name: "Skirk", day: 5, month: 11 },
  { name: "Kinich", day: 11, month: 11 },
  { name: "Varesa", day: 15, month: 11 },
  { name: "Keqing", day: 20, month: 11 },
  { name: "Wriothesley", day: 23, month: 11 },
  { name: "Sucrose", day: 26, month: 11 },
  { name: "Kaeya", day: 30, month: 11 },
  // ...сюда добавишь весь массив из предыдущего виджета
];

const monthNamesTitle = [
  "Январь","Февраль","Март","Апрель","Май","Июнь",
  "Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"
];

const monthNamesGen = [
  "января","февраля","марта","апреля","мая","июня",
  "июля","августа","сентября","октября","ноября","декабря"
];

function pad2(n) { return n.toString().padStart(2, "0"); }

function initWidget() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  document.getElementById("todayInfo").textContent =
    `Сегодня: ${pad2(day)} ${monthNamesGen[month-1]}`;

  document.getElementById("monthTitle").textContent =
    `Текущий месяц: ${monthNamesTitle[month-1]}`;

  document.getElementById("giMonthName").textContent =
    monthNamesTitle[month-1];

  const listEl = document.getElementById("giList");
  listEl.innerHTML = "";

  const thisMonth = genshinBirthdays
    .filter(c => c.month === month)
    .sort((a,b)=>a.day-b.day);

  if (!thisMonth.length) {
    const li = document.createElement("li");
    li.className = "bday-item";
    li.innerHTML = `<span class="bday-date">—</span>
                    <span class="bday-name">Нет дней рождения.</span>`;
    listEl.appendChild(li);
  } else {
    thisMonth.forEach(char => {
      const li = document.createElement("li");
      li.className = "bday-item";
      li.innerHTML =
        `<span class="bday-date">${pad2(char.day)} ${monthNamesGen[month-1]}</span>
         <span class="bday-name">${char.name}</span>
         <span class="bday-tag">Genshin Impact</span>`;
      listEl.appendChild(li);
    });
  }

  // --- Инфоповод ---
  const infoEl = document.getElementById("infopovodLine");

  let text = "";
  const todayChars = thisMonth.filter(c => c.day === day);

  if (todayChars.length) {
    const names = todayChars.map(c=>c.name).join(", ");
    text = `Сегодня день рождения: ${names}. Отличный повод для косплей-поста.`;
  } else if (thisMonth.length) {
    const future = thisMonth.filter(c => c.day > day);
    if (future.length) {
      const next = future[0];
      const names = future.filter(c=>c.day===next.day).map(c=>c.name).join(", ");
      text = `Скоро, ${next.day} ${monthNamesGen[month-1]} — день рождения: ${names}.`;
    } else {
      const last = thisMonth[thisMonth.length-1];
      text = `Последний в этом месяце был ${last.day} ${monthNamesGen[month-1]} — ${last.name}.`;
    }
  } else {
    text = "В этом месяце нет дней рождения.";
  }

  infoEl.innerHTML = `<span class="label">Инфоповод</span>${text}`;
}

initWidget();
