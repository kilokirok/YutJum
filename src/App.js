import React, { useState } from 'react';
import { yutData } from './yutData';
import './App.css'; // ★ 중요: 여기서 스타일 파일을 불러옵니다!

const YutFortuneApp = () => {
  const [throws, setThrows] = useState([]);
  const [result, setResult] = useState(null);

  const options = ["도(Do)", "개(Gae)", "걸(Geol)", "윷(Yut)", "모(Mo)"];

  const handleSelect = (val) => {
    if (throws.length < 3) {
      let selectedValue = val.split('(')[0];
      if (selectedValue === '모') {
        selectedValue = '윷';
      }

      const newThrows = [...throws, selectedValue];
      setThrows(newThrows);
      
      if (newThrows.length === 3) {
        const key = newThrows.join('');
        setResult(yutData[key] || {
          title: "Good Vibes",
          description: "Everything will go smoothly!",
          advice: "Enjoy the moment!"
        });
      }
    }
  };

  const reset = () => {
    setThrows([]);
    setResult(null);
  };

  return (
    <div className="container">
      <h1 className="title">Traditional Yut Fortune</h1>
      
      {!result ? (
        <div className="card">
          <p className="instruction">
            Throw the Yut sticks 3 times and <br/> select each result below!
          </p>
          
          <div className="throws-container">
            {[0, 1, 2].map((i) => (
              <div key={i} className="throw-box">
                {throws[i] ? throws[i] : i + 1}
              </div>
            ))}
          </div>

          <div className="buttons-grid">
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => handleSelect(opt)}
                disabled={throws.length >= 3}
                className="btn-option"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="card-result">
          <h2 className="result-title">{result.title}</h2>
          <p className="result-desc">{result.description}</p>
          <div className="advice-box">
            <p className="advice-text">" {result.advice} "</p>
          </div>
          <button onClick={reset} className="btn-reset">
            Try Again
          </button>
        </div>
      )}

      <footer className="footer">
        BYUH Korean Culture Experience
      </footer>
    </div>
  );
};

export default YutFortuneApp;