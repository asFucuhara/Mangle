import React from 'react';
import axios from 'axios';

import Card from './Card';
import './Home.css';

class Home extends React.Component {
  state = {
    items: []
  };

  componentDidMount() {
    axios.get('/api/manga').then(resp => {
      const items = resp.data;
      this.setState({ items });
    });
  }
  render() {
    return (
      <div className="list">
        {this.state.items.map((item, index) => {
          const key = item._id || `Card${index}`;
          return <Card item={item} key={key} />;
        })}
      </div>
    );
  }
}

export default Home;
