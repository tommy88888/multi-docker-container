import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Fibo = () => {
  const [i, setI] = useState('');
  const [values, setValues] = useState({});
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [value, setValue] = useState('');

  console.log('index:', i,'values:', values,'seenIndexes:', seenIndexes);

  useEffect(() => {
    fetchValues();
    fetchIndexes();
  }, [i]);

  const fetchValues = async () => {
    const values = await axios.get('/api/values/current');
    setValues({ values: values.data });
  };

  const fetchIndexes = async () => {
    const seenIndexes = await axios.get('/api/values/all');
    setSeenIndexes(seenIndexes.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post('/api/values', {
      i: setI(value),
    });
    console.log('fibo file', res.data);
    setI('');
  };

  const renderSeenIndexes = () => {
    return seenIndexes.map(({ number }) => number).join(', ');
  };

  let entries = [];
  const renderValues = () => {
    for (let key in values) {
      entries.push(
        <div key={key}>
          For i {key} I calculated {values[key]}
        </div>
      );
    }
    console.log('fibo', entries)
    return entries;
  };

  const handleChange = (e) => {
    let { value, min, max } = e.target;
    value = Math.max(Number(min), Math.min(Number(max), Number(value)));

    setValue({ value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter your index:</label>
        <input
          type='number'
          max='40'
          min='0'
          value={value}
          onChange={handleChange}
        />
        <button>Submit</button>
      </form>

      <h3>Indexes I have seen:</h3>
      {renderSeenIndexes()}

      <h3>Calculated Values:</h3>
      {renderValues()}
    </div>
  );
};
export default Fibo;
