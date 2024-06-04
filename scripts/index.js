const mainBtn = document.getElementById("main-btn");
const copyBtn = document.getElementById("copy-btn");
const clearBtn = document.getElementById("clear-btn");
const themeBtn = document.getElementById("theme-btn");
const question = document.getElementById("story");
const answer = document.getElementById("answer");
const divider = document.getElementById("divider");
const mainSection = document.querySelector(".main");
const itemBlocks = Array.from(document.querySelectorAll(".item"));
const buttons = Array.from(document.querySelectorAll(".main-button"));
const itemBtns = Array.from(document.querySelectorAll(".item__title-btn"));
const listBtn = document.getElementById("list-btn");
const csvBtn = document.getElementById("csv-btn");
const plhWindows = ["вставьте текст с разделителями", "вставьте скопированную таблицу"];

let darkTheme = false;

const parser = (textBlock, dividerVal) => {
  let sep;

  dividerVal === "" ? (sep = ",") : (sep = dividerVal);

  let rawRes = textBlock.split(sep);

  const compacter = (item) => {
    return item.trim();
  };

  let res = [];

  rawRes.forEach((i) => {
    res.push(compacter(i));
  });

  return res;
};

const picker = (arr) => {
  let res = arr.join("\n");

  return res;
};

const foo = () => {
  let textInput = question.value;
  answer.value = picker(parser(textInput, divider.value));
};

const boo = () => {
  answer.select();
  navigator.clipboard
    .writeText(answer.value)
    .then(() => {
      console.log("Текст успешно скопирован");
    })
    .catch((err) => {
      console.error("Не удалось скопировать текст: ", err);
    });
  answer.setSelectionRange(0, 0);
};

const moo = () => {
  document.getElementById("story").value = "";
  answer.value = "";
};

const themeToggle = () => {
  darkTheme = !darkTheme;
  mainSection.classList.toggle("main_dark");
  divider.classList.toggle("divider_dark");
  itemBlocks.forEach((item) => {
    item.classList.toggle("item_dark");
  });
  buttons.forEach((item) => {
    item.classList.toggle("main-button_dark");
  });
  darkTheme ? (themeBtn.textContent = "🌛") : (themeBtn.textContent = "☀️");
};

const windowsToggle = (id) => {
  let index = itemBtns.indexOf(id);
  question.placeholder = plhWindows[index];

  itemBtns.forEach((item) => {
    item == id
      ? item.classList.add("item__title-btn_active")
      : item.classList.remove("item__title-btn_active");
  });
};

mainBtn.addEventListener("click", () => foo());

copyBtn.addEventListener("click", () => boo());

clearBtn.addEventListener("click", () => moo());

themeBtn.addEventListener("click", () => themeToggle());

listBtn.addEventListener("click", (e) => windowsToggle(e.target));

csvBtn.addEventListener("click", (e) => windowsToggle(e.target));
