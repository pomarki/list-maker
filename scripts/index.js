const mainBtn = document.getElementById("main-btn");
const copyBtn = document.getElementById("copy-btn");
const clearBtn = document.getElementById("clear-btn");
const answer = document.getElementById("answer");
const divider = document.getElementById("divider");

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
  document.getElementById("story").value = ""
  answer.value = ""
}

mainBtn.addEventListener("click", () => foo());

copyBtn.addEventListener("click", () => boo());

clearBtn.addEventListener("click", () => moo())