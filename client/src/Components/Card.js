import React from 'react';
import { Link } from 'react-router-dom';

import './Card.css';

const Card = ({ item: { _id, title, status, cover } }) => {
  return (
    <Link to={`/manga/${_id}`}>
      <div className="card">
        <img className="cover" alt="" src={cover} />
        <div className="status">
          <span>{status}</span>
        </div>
        <span className="title">{title}</span>
      </div>
    </Link>
  );
};

export default Card;
