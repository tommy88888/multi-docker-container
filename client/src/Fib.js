import React, { Component } from 'react';
import axios from 'axios';

class Fib extends Component {
  state = {
    seenIndexes: [],
    values: {},
    i: '',
    // value: '',
  };

  componentDidMount() {
    this.fetchValues();
    this.fetchIndexes();
  }

  async fetchValues() {
    const values = await axios.get('/api/values/current');
    this.setState({ values: values.data });
  }

  async fetchIndexes() {
    const seenIndexes = await axios.get('/api/values/all');
    this.setState({
      seenIndexes: seenIndexes.data,
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post('/api/values', {
      i: this.state.i,
    });

    console.log('fib file', res.data);

    this.setState({ i: '' });
  };

  renderSeenIndexes() {
    return this.state.seenIndexes.map(({ number }) => number).join(', ');
  }

  renderValues() {
    const entries = [];

    for (let key in this.state.values) {
      entries.push(
        <div key={key}>
          For i {key} I calculated {this.state.values[key]}
        </div>
      );
    }
    console.log('entries', entries);
    return entries;
  }

  // handleChange = (e) => {
  //   let { value, min, max } = e.target;
  //   value = Math.max(Number(min), Math.min(Number(max), Number(value)));

  //   this.setState({ value });
  // };

  render() {
    console.log(
      'index: ',
      this.state.i,
      'values:',
      this.state.values,
      'seen indexes:',
      this.state.seenIndexes
    );
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Enter your index:</label>
          <input
            // type='number'
            max='40'
            min='0'
            value={this.state.i}
            // value={this.state.value}
            onChange={(e) => this.setState({ i: e.target.value })}
            // onChange={this.handleChange}
          />
          <button>Submit</button>
        </form>

        <h3>Indexes I have seen:</h3>
        {this.renderSeenIndexes()}

        <h3>Calculated Values:</h3>
        {this.renderValues()}
      </div>
    );
  }
}

export default Fib;
