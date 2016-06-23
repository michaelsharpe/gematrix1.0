import { connect } from 'react-redux';
import React, { PropTypes, Component } from 'react';
import { ThemeProvider } from 'react-css-themr';

import { Layout, Panel } from 'react-toolbox';
import theme from 'styles/theme';
import NavBar from 'components/NavBar';

import { toggleSearch } from 'actions/numeralActions';

class App extends Component {
  render () {
    return (
      <ThemeProvider theme={theme}>
        <Layout>
          <Panel>
            <NavBar toggleSearch={this.props.toggleSearch}/>
            {this.props.children}
          </Panel>
        </Layout>
      </ThemeProvider>
    );
  }
}

App.propTypes = {
  children: PropTypes.object,
  toggleSearch: PropTypes.func
};

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  toggleSearch: () => dispatch(toggleSearch())
});

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;
