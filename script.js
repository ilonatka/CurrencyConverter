// Kурсы и подписи
const ratesToUSD = {
  USD: 1,
  EUR: 1.09,
  GBP: 1.27,
  PLN: 0.25,
  NOK: 0.095,
};

const currencyInfo = {
  USD: { name: "US Dollar", symbol: "$", flag: "🇺🇸" },
  EUR: { name: "Euro", symbol: "€", flag: "🇪🇺" },
  GBP: { name: "British Pound", symbol: "£", flag: "🇬🇧" },
  PLN: { name: "Polish Zloty", symbol: "zł", flag: "🇵🇱" },
  NOK: { name: "Norwegian Krone", symbol: "kr", flag: "🇳🇴" },
};

// Берём элементы со страницы
const amountEl = document.getElementById("amount");
const fromEl = document.getElementById("from");
const toEl = document.getElementById("to");
const swapEl = document.getElementById("swap");

const equalsLine = document.getElementById("equalsLine");
const bigResult = document.getElementById("bigResult");
const rateLine = document.getElementById("rateLine");

// Не разрешает минус
amountEl.addEventListener("input", () => {
  if (Number(amountEl.value) < 0) {
    amountEl.value = 0;
  }
});

// Выбирает все ключи из ratesToUSD получили массив codes = ["USD", "EUR", "GBP", "PLN", "NOK"];
const codes = Object.keys(ratesToUSD);

// Объявляем функцию с двумя параметрами 
function fillSelect(select, selected) {
  select.innerHTML = ""; // очистили HTML
  codes.forEach((code) => { // пройди по массиву 
    const opt = document.createElement("option"); // создаем пустой элемент <option></option>
    opt.value = code; // подставляем значение например USD
    opt.textContent =`${currencyInfo[code].flag}  ${code} - ${currencyInfo[code].name}`; //создает текст 🇺🇸  USD - US Dollar
    if (code === selected) opt.selected = true;
    select.appendChild(opt);// Добавляем созданный <option> внутрь <select>
  });
}
fillSelect(fromEl, "USD"); // Заполни выпадающий список fromEl валютами и сразу выбери USD
fillSelect(toEl, "EUR"); // Заполни выпадающий список fromEl валютами и сразу выбери EUR

// Формат денег + 2 знака после запятой
function formatMoney(value, code) {
  const symbol = currencyInfo[code].symbol;
  return symbol + value.toFixed(2);
}

// Главная функция: обновляем результат
function updateResult() {
  const amount = Number(amountEl.value);
  const from = fromEl.value;
  const to = toEl.value;

  // Проверка условий 
  if (isNaN(amount) || amount < 0) {
    equalsLine.textContent = "Enter amount";
    bigResult.textContent = "—";
    rateLine.textContent = "";
    return;
  }

  // Конвертация: amount * (USD_per_from / USD_per_to)
  const result = amount * (ratesToUSD[from] / ratesToUSD[to]);
  const rate = 1 * (ratesToUSD[from] / ratesToUSD[to]);

  equalsLine.textContent = `${amount} ${from} equals`;
  bigResult.textContent = formatMoney(result, to);
  rateLine.textContent = `1 ${from} = ${formatMoney(rate, to)}`;
}

// Swap валют
function swapCurrencies() {
  const temp = fromEl.value;
  fromEl.value = toEl.value;
  toEl.value = temp;

  updateResult();
}

// Слушатели событий
amountEl.addEventListener("input", updateResult);
fromEl.addEventListener("change", updateResult);
toEl.addEventListener("change", updateResult);
swapEl.addEventListener("click", swapCurrencies);

//Первый запуск
updateResult();