let text = "one, ert, rgrwgw,  wrg, grw,t";

const mainBtn = document.getElementById("main-btn");
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

mainBtn.addEventListener("click", () => {
  
  let textInput = document.getElementById("story").value;
  answer.textContent = picker(parser(textInput));
  console.log(answer.textContent)
});
