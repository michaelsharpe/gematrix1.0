import React, { PropTypes } from 'react'
import { IconButton } from 'react-toolbox'
import NumeralDetails from 'components/NumeralDetails'
import EntryDetails from 'components/EntryDetails'

import { close } from 'styles/details'

const Details = ({
  currentDetails,
  closeDetails,
  findNumeral
}) => {
  const { type, details } = currentDetails
  const isNumeral = type === 'numeral'
  const isEntry = type === 'entry'

  return (
    <div>
      <IconButton className={close} onMouseUp={closeDetails} icon="close"/>
      {isNumeral && <NumeralDetails findNumeral={findNumeral} numeral={details}/>}
      {isEntry && <EntryDetails findNumeral={findNumeral} entry={details}/>}
    </div>
  )
}

Details.propTypes = {
  currentDetails: PropTypes.object.isRequired,
  closeDetails: PropTypes.func.isRequired,
  findNumeral: PropTypes.func.isRequired
}

Details.defaultProps = {
  currentDetails: {
    type: '',
    details: ''
  }
}

export default Details
