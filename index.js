var quoteIndex = 0;
  showQuotes();
  
  function showQuotes() {
    var i;
    var quotes = document.getElementsByClassName("myQuotes");
    for (i = 0; i < quotes.length; i++) {
      quotes[i].style.display = "none";  
    }
    quoteIndex++;
    if (quoteIndex > quotes.length) {quoteIndex = 1}    
    quotes[quoteIndex-1].style.display = "block";  
    setTimeout(showQuotes, 6000); // Change quote every 6 seconds
  }
 