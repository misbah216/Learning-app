
const facts = [
  "Honey never spoils. Archaeologists found 3000-year-old honey in Egyptian tombs! 🍯",
  "Bananas are berries, but strawberries are not. 🍌🍓",
  "Octopuses have three hearts. ❤❤❤",
  "A day on Venus is longer than its year. 🪐⏳",
  "Water can boil and freeze at the same time in a vacuum. ❄🔥",
  "Humans share 60% of their DNA with bananas. 🧬🍌",
  "The Eiffel Tower can grow more than 6 inches in summer heat. 🗼☀",
  "Sharks existed before trees. 🦈🌳"
];

function showFact() {
  const randomIndex = Math.floor(Math.random() * facts.length);
  document.getElementById('fact').innerText = facts[randomIndex];
}