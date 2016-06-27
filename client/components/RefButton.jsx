import React, { PropTypes, Component } from 'react'

import { Button } from 'react-toolbox'

class RefButton extends Component {
  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }

  onClick() {
    this.props.findNumeral(this.props.see)
  }

  render() {
    return (
      <Button label={this.props.see.toString()} onMouseUp={this.onClick}/>
    )
  }
}

RefButton.propTypes = {
  see: PropTypes.number.isRequired,
  findNumeral: PropTypes.func.isRequired
}

export default RefButton
