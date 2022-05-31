import React, { useContext } from 'react';
import AppContext from '../lib/AppContext';

function Results() {
  const context = useContext(AppContext);
  const data = context.data;

  console.log(data);

  return <div className="results" />;
}

export default Results;
