const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// Show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide loading
function complete() {
    loader.hidden = true;
    quoteContainer = false;
}

async function getQuote() {
    loading();
    const proxyURL = "https://cors-anywhere.herokuapp.com/";
    const apiURL = "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
    try {
        const response = await fetch(proxyURL + apiURL);
        const data = await response.json();
        // If author is blank, add Unknown
        if (data.quoteAuthor === "") {
            authorText.innerText = "Unknown";
        } else {
            authorText.innerText = data.quoteAuthor;
        }
        // Reduce font size for long quotes
        if (data.quoteText.length > 120) {
            quoteText.classList.add("long-quote");
        } else {
            quoteText.classList.remove("long-quote");
        }
        complete();
        quoteText.innerText = data.quoteText;
    } catch (error) {
        //getQuote();
        console.log(error);
    }
}

// Tweet quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterURL = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterURL, "_blank");
}

// Event listeners
newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote)

// On load
getQuote();