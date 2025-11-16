import React from 'react';
import './Quote.css';
import twitterIcon from '../Randomquote/twitter.png';
import reloadIcon from '../Randomquote/reload.png';

const RandomQuote = () => {

  const [quotes, setQuotes] = React.useState([]);
  const [quote, setQuote] = React.useState({
    text: "It is better to be hated for what you are than to be loved for what you are not.",
    author: "Andre Gide",
  });

  React.useEffect(() => {
    async function loadQuotes() {
      const response = await fetch("https://dummyjson.com/quotes");
      const data = await response.json();
      setQuotes(data.quotes);  
    }
    loadQuotes();
  }, []);


  const random = () => {
    if (quotes.length === 0) return;

    const select = quotes[Math.floor(Math.random() * quotes.length)];

    setQuote({
      text: select.quote,
      author: select.author,
    });
  };

  const tweetQuote = () => {
   window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(
      `"${quote.text}" - ${quote.author}`)}`);
   
  }

  return (
   <div className="container min-h-screen flex flex-col justify-center items-center bg-gradient-from-gray-200 to-gray-400">
  <h1 className="text-4xl pb-10 font-semibold">Random Quote Generator</h1>

  <div className="w-[450px] bg-[#ff96d3] shadow-2xl rounded-2xl p-8 flex flex-col items-center gap-6">
    <div className="text-xl font-medium text-gray-800 text-center">{quote.text}</div>

    <div className="w-full border-b border-[#271539]"></div>

    <div className="text-right w-full text-gray-700 italic">{quote.author}</div>

    <div className="flex gap-4 mt-2">
      <img src={twitterIcon} onClick={tweetQuote} className="h-8 w-8 cursor-pointer" alt="" />
      <img src={reloadIcon} onClick={random} className="h-8 w-8 cursor-pointer" alt="" />
    </div>
  </div>
</div>

  );
};

export default RandomQuote;
