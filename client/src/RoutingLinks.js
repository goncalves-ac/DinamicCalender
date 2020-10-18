import React from 'react';
import { Link } from 'react-router-dom';

const RoutingLinks = () => {
  return (
    <div className="container d-flex flex-column pt-3">
      <h2 className="text-white">ENDPOINTS</h2>
      <Link className="mt-2" to="/login">/login</Link>
      <Link className="mt-2" to="/cadastro">/cadastro</Link>
    </div>
  );
};

export default RoutingLinks;