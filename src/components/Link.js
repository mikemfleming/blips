import React from 'react';
import { Link } from 'react-router-dom';

const LinkComponent = ({ url, text }) => (
  <Link className="link" to={url}><p className="f6 dim near-black">{text}</p></Link>
);

export default LinkComponent;
