import './styles/App.scss';
import $ from 'jquery';
import { useState, useEffect } from 'react';

const colors = [
  '#fb6964',
  '#bdbb99',
  '#16a085',
  '#73a857',
  '#2c3e50',
  '#f39c12',
  '#472e32',
  '#9b59b6',
  '#e74c3c'
];

const generateRandomIndex = () => {
  return Math.floor(Math.random() * colors.length);
}

export default function App() {
  const [index, setIndex] = useState(generateRandomIndex());
  const [quote, setQuote] = useState('Everything exists.');
  const [author, setAuthor] = useState('Huy');

  const handleClick = () => {
    let i = generateRandomIndex();
    while (i === index) {
      i = generateRandomIndex();
    }

    setIndex(i);
  }

  const fetchData = async () =>{
    try {
      const response = await fetch('https://api.api-ninjas.com/v1/quotes', {
        method: 'GET',
        headers: { 'X-Api-Key': `uuG8lwcXmp4I/mR0J2Yk6Q==0UX3cz7EFt25Afmj` }
      });
      const data = await response.json();
      console.log(data);
      setQuote(data[0].quote);
      setAuthor(data[0].author);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    $('#text').addClass('fade');
    $('#author').addClass('fade');

    const timerFetch = setTimeout(() => {
      fetchData();
    }, 50); // ms value set based on observation

    const timerFade = setTimeout(() => {
      $('#text').removeClass('fade');
      $('#author').removeClass('fade');
    }, 1500);

    return () => {
      clearTimeout(timerFetch);
      clearTimeout(timerFade);
    };
  }, [index]);

  let color = colors[index];
  $('body').css('background-color', color);

  return (
    <div id='quote-box'>
      <div id='text' style={{ color: color }}>{quote}</div>
      <div id='author' style={{ color: color }}>{author}</div>
      <div className='btn-row'>
        <button className='btn' style={{ backgroundColor: color }}>
          <a className='btn-icon' href={`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${quote}`} target='_blank'>
            <svg viewBox='0 0 512 512'><path d='M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z' /></svg>
          </a>
        </button>
        <button className='btn btn-text' style={{ backgroundColor: color }} onClick={handleClick}>New quote</button>
      </div>
    </div>
  );
}