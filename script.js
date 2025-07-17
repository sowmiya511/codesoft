const quotes = [
  { text: "The best way to get started is to quit talking and begin doing.", author: "Walt Disney" },
  { text: "Don’t let yesterday take up too much of today.", author: "Will Rogers" },
  { text: "It’s not whether you get knocked down, it’s whether you get up.", author: "Vince Lombardi" },
  { text: "If you are working on something exciting, it will keep you motivated.", author: "Steve Jobs" },
  { text: "Success is not in what you have, but who you are.", author: "Bo Bennett" }
];

function getRandomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

function loadQuote(force = false) {
  const lastDate = localStorage.getItem('quoteDate');
  const today = new Date().toDateString();

  if (!force && lastDate === today) {
    const cached = JSON.parse(localStorage.getItem('quoteOfTheDay'));
    if (cached) return displayQuote(cached);
  }

  const quote = getRandomQuote();
  localStorage.setItem('quoteOfTheDay', JSON.stringify(quote));
  localStorage.setItem('quoteDate', today);
  displayQuote(quote);
}

function displayQuote(quote) {
  document.getElementById('quote-text').textContent = `"${quote.text}"`;
  document.getElementById('quote-author').textContent = `- ${quote.author}`;
  currentQuote = quote;
}

function shareQuote() {
  if (navigator.share) {
    navigator.share({
      title: "Daily Inspiration",
      text: `"${currentQuote.text}" - ${currentQuote.author}`,
    });
  } else {
    alert("Sharing not supported on this browser.");
  }
}

function saveFavorite() {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const exists = favorites.some(fav => fav.text === currentQuote.text);
  if (!exists) {
    favorites.push(currentQuote);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    alert("Quote saved to favorites!");
  } else {
    alert("Quote already in favorites!");
  }
}

function showFavorites() {
  const list = document.getElementById('favorites');
  list.innerHTML = '';
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  if (favorites.length === 0) {
    list.innerHTML = "<li>No favorites yet.</li>";
  } else {
    favorites.forEach(q => {
      const li = document.createElement('li');
      li.textContent = `"${q.text}" - ${q.author}`;
      list.appendChild(li);
    });
  }
  document.getElementById('favorites-list').classList.toggle('hidden');
}

let currentQuote = null;

window.onload = () => {
  loadQuote();
};
