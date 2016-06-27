import React, { PropTypes } from 'react'
import { Card, CardTitle, CardMedia } from 'react-toolbox'

import { getColor } from 'helpers/numeralHelper'
import { numeralTitle } from 'styles/details'

const NumeralDetails = ({ numeral }) => {
  const math = numeral.math.length > 0 ? numeral.math[0] : ''

  return (
    <Card>
      <CardMedia color={getColor(numeral.value.toString())}>
        <CardTitle
          className={numeralTitle}
          title={numeral.value.toString()}
          subtitle={math}/>
      </CardMedia>

    </Card>
  )
}

NumeralDetails.propTypes = {
  numeral: PropTypes.object.isRequired
}

NumeralDetails.defaultProps = {
  numeral: {
    value: '',
    math: []
  }
}

export default NumeralDetails
