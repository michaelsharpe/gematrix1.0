import React, { PropTypes } from 'react'
import { IconButton } from 'react-toolbox'
import NumeralDetails from 'components/NumeralDetails'

import { close } from 'styles/details'

const Details = (props) => {
  const { type, details } = props.currentDetails
  const isNumeral = type === 'numeral'
  const isEntry = type === 'entry'

  return (
    <div>
      <IconButton className={close} onMouseUp={props.closeDetails} icon="close"/>
      {isNumeral && <NumeralDetails numeral={details}/>}
      {isEntry && <p>Entry</p>}
    </div>
  )
}

Details.propTypes = {
  currentDetails: PropTypes.object.isRequired,
  closeDetails: PropTypes.func.isRequired
}

Details.defaultProps = {
  currentDetails: {
    type: '',
    details: ''
  }
}

export default Details
