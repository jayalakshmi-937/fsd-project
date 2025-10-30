npx create-react-app character-counter
cd character-counter
npm start
import React, { useState } from 'react';
import './App.css';

function App() {
  const [text, setText] = useState('');

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div className="App">
      <h2>Character Counter</h2>
      <textarea
        placeholder="Type something here..."
        value={text}
        onChange={handleChange}
        rows={6}
        cols={50}
      />
      <p>Characters typed: {text.length}</p>
    </div>
  );
}

export default App;
.App {
  text-align: center;
  margin-top: 50px;
  font-family: Arial, sans-serif;
}

textarea {
  margin-top: 20px;
  padding: 10px;
  font-size: 16px;
}