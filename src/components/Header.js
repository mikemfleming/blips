import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ url }) => (
  <Link to={url} className="link dim black"><h1 className="mb2">Blips of Life</h1></Link>
);

export default Header;
