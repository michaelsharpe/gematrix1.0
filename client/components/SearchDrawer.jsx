import React, { PropTypes } from 'react';

import { NavDrawer } from 'react-toolbox';

const SearchDrawer = props => (
  <NavDrawer permanentAt="md" width="normal" active={props.searchOpen} >
    {props.children}
  </NavDrawer>
);

SearchDrawer.propTypes = {
  searchOpen: PropTypes.bool,
  children: PropTypes.object
};

export default SearchDrawer;
