const mainBtn = document.getElementById("main-btn");
const copyBtn = document.getElementById("copy-btn");
const answer = document.getElementById("answer");

const parser = (textBlock) => {
  let rawRes = textBlock.split(",");

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
  answer.value = picker(parser(textInput));
}

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
}

mainBtn.addEventListener("click", () => foo());

copyBtn.addEventListener("click", () => boo());
