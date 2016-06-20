import React from 'react';
import { Route } from 'react-router';
import { NumeralContainer } from './pages/numerals';


export default () => {
  return <Route path="/" component={NumeralContainer}/>;
};
