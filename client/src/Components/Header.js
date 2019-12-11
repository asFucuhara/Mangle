import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <div className="outterHeader">
      <div className="header">
        <Link to="/">
          <div className="logo">logo</div>
        </Link>
        <div className="search">
          <span>Search:</span>
          <input type="text" alt="search" />
        </div>
      </div>
    </div>
  );
};

export default Header;
