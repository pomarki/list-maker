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
const mdBtn = document.getElementById("md-btn");
const plhWindows = [
  "вставьте текст с разделителями",
  "ctrl + C ctrl + V  csv",
  "ctrl + C ctrl + V  MD",
];

const windowsNaming = (arr) => {
  const res = arr.map((item) => {
    return item.id;
  });
  return res;
};

let allWindows = windowsNaming(itemBtns);
let activeWindow = allWindows[0];

let darkTheme = false;

const getDiviver = (item) => {
  let sep;
  item === "" ? (sep = ",") : (sep = item);
  return `"${sep}"`;
};

const validator = (cell, dividerVal) => {
  let sep = getDiviver(dividerVal);
  return cell.includes(sep);
};

const listParser = (textBlock, dividerVal) => {
  let sep = getDiviver(dividerVal);

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

const csvParser = (textBlock, dividerVal) => {
  let sep = getDiviver(dividerVal);
  let resultStrings = textBlock.split("\n");
  let resultColumns = resultStrings.filter((item) => item != ""); // ['1\t2\t3', '4\t5\t76', '']
  let arrResult = resultColumns.map((item) => item.split("\t"));
  //let preResult = arrResult.map((string) => string.join(sep)).join("\n"); // [["1", "2"], ["3","4"]] => ["1", "2"] => 1sep2\n3sep4
  let preResult = arrResult.map((string) => string.join(sep)); // [["1", "2"], ["3","4"]] => ["1", "2"] => 1sep2\n3sep4
  console.log(resultStrings);
  return preResult;
};

const picker = (arr) => {
  let res = arr.join("\n");

  return res;
};

const foo = () => {
  let textInput = question.value;
  if (activeWindow === "list-btn") {
    answer.value = picker(listParser(textInput, divider.value));
  }

  if (activeWindow === "csv-btn") {
    answer.value = csvParser(textInput, divider.value);
  }
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
  itemBtns.forEach((item) => {
    item.classList.toggle("item_dark");
  });
  darkTheme ? (themeBtn.textContent = "🌛") : (themeBtn.textContent = "☀️");
};

const windowsToggle = (id) => {
  let index = allWindows.indexOf(id);

  question.placeholder = plhWindows[index];

  activeWindow = allWindows[index];

  itemBtns.forEach((item) => {
    item.id === id
      ? item.classList.add("item__title-btn_active")
      : item.classList.remove("item__title-btn_active");
  });
};

mainBtn.addEventListener("click", () => foo());

copyBtn.addEventListener("click", () => boo());

clearBtn.addEventListener("click", () => moo());

themeBtn.addEventListener("click", () => themeToggle());

listBtn.addEventListener("click", (e) =>
  windowsToggle(e.target.id === "" ? e.target.parentNode.id : e.target.id)
);

csvBtn.addEventListener("click", (e) =>
  windowsToggle(e.target.id === "" ? e.target.parentNode.id : e.target.id)
);

mdBtn.addEventListener("click", (e) =>
  windowsToggle(e.target.id === "" ? e.target.parentNode.id : e.target.id)
);
