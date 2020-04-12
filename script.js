const $container = document.querySelector(".container");
const $quoteBox = document.querySelector(".quote-box");
const $title = document.getElementById("title");
const $text = document.getElementById("text");
const $author = document.getElementById("author");
const $button = document.getElementById("button");

$button.addEventListener("click", (e) => {
  updateBackground();
  updateQuote();
});

const updateQuote = () => {
  // FETCH QUOTE API
  async function fetchUrl() {
    let response = await fetch("https://type.fit/api/quotes");
    let data = await response.json();
    return data;
  }

  fetchUrl()
    .then((data) => allQuotes(data))
    .catch((reason) => console.log(reason.message));

  //  STORE ALL QUOTES LOCALLY
  const allQuotes = (arr) => {
    const fetchedQuotes = [...arr];
    selectOne(fetchedQuotes[Math.floor(Math.random() * fetchedQuotes.length)]);
  };

  // PULL ONE QUOTE RANDOMLY AND UPDATE DOM
  const selectOne = (quote) => {
    const { text, author } = quote;
    if (author === null) {
      console.log(`"${text}" ~Unknown`);
      $text.innerText = `"${text}"`;
      $author.innerText = `~Unknown`;
    } else {
      console.log(`"${text}" ~${author}`);
      $text.innerText = `"${text}"`;
      $author.innerText = `~${author}`;
    }
  };
};

// UPDATE BACKGROUND COLOR ON BUTTON CLICK
const updateBackground = () => {
  const color = selectRandomColor();
  if (color === "#FFFFFF") {
    $title.style.color = "#000000";
    $quoteBox.style.backgroundColor = "#CCCCCC";
  }
  $container.style.backgroundColor = color;
  resetBackground();
};

// RESET BACKGROUND
const resetBackground = () => {
  $title.style.color = "#FFFFFF";
};

const selectRandomColor = () => {
  const colorPossibilities = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
  ];

  let colorString = "#";

  for (let i = 0; i < 6; i++) {
    colorString +=
      colorPossibilities[Math.floor(Math.random() * colorPossibilities.length)];
  }

  return colorString;
};
