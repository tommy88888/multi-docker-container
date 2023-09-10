import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Fibo = () => {
  const [i, setI] = useState('');
  const [values, setValues] = useState({});
  const [seenIndexes, setSeenIndexes] = useState([]);

  console.log(
    'index:',
    i,
    'values:',
    values.values,
    'seenIndexes:',
    seenIndexes
  );

  useEffect(() => {
    fetchValues();
    fetchIndexes();
  }, [i]);

  const fetchValues = async () => {
    const values = await axios.get('/api/values/current');
    setValues({ values: values.data });
    console.log('current values', values.data);
  };

  const fetchIndexes = async () => {
    const seenIndexes = await axios.get('/api/values/all');
    setSeenIndexes(seenIndexes.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (i.trim() === '' || i.trim() > 40) {
      alert('can not be empty or larger than 40');
      return;
    } else {
      const res = await axios.post('/api/values', {
        i: i,
      });
      console.log('fibo file', res.data);
      setI('');
    }
  };

  const renderSeenIndexes = () => {
    return seenIndexes.map(({ number }) => number).join(', ');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter your index:</label>
        <input
          type='number'
          max='50'
          min='0'
          value={i}
          onChange={(e) => setI(e.target.value)}
        />
        <button>Submit</button>
      </form>
      <h3>Indexes I have seen:</h3>
      {renderSeenIndexes()}
      <h3>Calculated Values:</h3>
      {/* {console.log(Object.entries(values))} */}
      {values.values &&
        Object.entries(values.values).map(([key, value], i) => (
          <div key={i}>
            For index {key} I calculated {value}
          </div>
        ))}
    </div>
  );
};
export default Fibo;
