import React, { PropTypes } from 'react';

// UI components
import { AppBar, FontIcon, IconButton } from 'react-toolbox';

// Styles
import { wordLogo, logo, brand } from 'styles/appBar';

const NavBar = props => (
  <AppBar>
    <IconButton icon="menu" inverse={true} onClick={props.toggleSearch}/>
    <div className={brand}>
      <p className={wordLogo}><FontIcon value="brightness_5" className={logo}/>Gematrix</p>
    </div>
  </AppBar>
);

NavBar.propTypes = {
  toggleSearch: PropTypes.func
};

export default NavBar;
