import React, { useState } from 'react';
import { yutData } from './yutData';

const YutFortuneApp = () => {
  const [throws, setThrows] = useState([]); // 사용자가 선택한 도, 개, 걸, 윷, 모 저장
  const [result, setResult] = useState(null);

  const options = ["도(Do)", "개(Gae)", "걸(Geol)", "윷(Yut)", "모(Mo)"];

  const handleSelect = (val) => {
    if (throws.length < 3) {
      const newThrows = [...throws, val];
      setThrows(newThrows);
      
      // 3번 다 선택하면 결과 도출
      if (newThrows.length === 3) {
        const key = newThrows.map(t => t.split('(')[0]).join('');
        setResult(yutData[key] || {
          title: "Good Vibes",
          description: "A wonderful day is ahead of you!",
          advice: "Enjoy the festival and share your smile!"
        });
      }
    }
  };

  const reset = () => {
    setThrows([]);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-orange-50 p-6 flex flex-col items-center font-sans">
      <h1 className="text-3xl font-bold text-orange-800 mb-8 mt-10">Traditional Yut Fortune</h1>
      
      {!result ? (
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border-t-8 border-orange-400">
          <p className="text-center text-gray-600 mb-6 font-medium">
            Throw the Yut sticks 3 times and <br/> select each result below!
          </p>
          
          <div className="flex justify-center gap-2 mb-8">
            {[0, 1, 2].map((i) => (
              <div key={i} className="w-12 h-12 border-2 border-dashed border-orange-300 rounded-lg flex items-center justify-center text-orange-600 font-bold">
                {throws[i] ? throws[i].split('(')[0] : i + 1}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-3">
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => handleSelect(opt)}
                disabled={throws.length >= 3}
                className="bg-orange-100 hover:bg-orange-200 text-orange-800 py-3 rounded-xl transition-all active:scale-95 font-semibold"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border-t-8 border-green-400 animate-fade-in">
          <h2 className="text-2xl font-bold text-green-700 mb-2">{result.title}</h2>
          <p className="text-gray-700 text-lg mb-4 leading-relaxed">{result.description}</p>
          <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-300">
            <p className="text-sm text-green-800 italic">" {result.advice} "</p>
          </div>
          <button
            onClick={reset}
            className="w-full mt-8 bg-gray-800 text-white py-3 rounded-xl font-bold hover:bg-gray-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      <footer className="mt-auto py-6 text-gray-400 text-sm">
        BYUH Korean Culture Experience
      </footer>
    </div>
  );
};

export default YutFortuneApp;