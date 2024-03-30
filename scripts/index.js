const mainBtn = document.getElementById("main-btn");
const copyBtn = document.getElementById("copy-btn");
const clearBtn = document.getElementById("clear-btn");
const themeBtn = document.getElementById("theme-btn");
const answer = document.getElementById("answer");
const divider = document.getElementById("divider");
const mainSection = document.querySelector(".main");
const itemBlocks = Array.from(document.querySelectorAll(".item"));
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
  let textInput = document.getElementById("story").value;
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
  itemBlocks.forEach((item) => {
    item.classList.toggle("item_dark");
  });
  darkTheme ? (themeBtn.textContent = "🌛") : (themeBtn.textContent = "☀️");
};

mainBtn.addEventListener("click", () => foo());

copyBtn.addEventListener("click", () => boo());

clearBtn.addEventListener("click", () => moo());

themeBtn.addEventListener("click", () => themeToggle());
