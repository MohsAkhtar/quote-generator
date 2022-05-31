let apiQuotes = [];

// Show new quote
function newQuote() {
    //  Pick a a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * Math.floor(apiQuotes.length))];
    console.log(quote);
}

// Get quotes from API
async function getQuotes() {
    const apiURL = "https://type.fit/api/quotes";
    try {
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        // Catch Error Here
    }
}

// On Load
getQuotes();