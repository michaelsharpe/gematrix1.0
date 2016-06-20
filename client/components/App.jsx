import React, { PropTypes } from 'react';

const App = ({ children }) => (
    <div>
      <h1>Gematrix</h1>
      <br/>
      {children}
    </div>
);

App.propTypes = {
  children: PropTypes.object
};

export default App;
