import React, { PropTypes } from 'react'
import { Card, CardTitle, CardMedia, CardText, CardActions } from 'react-toolbox'
import SeeButton from 'components/SeeButton'

import { getColor } from 'helpers/numeralHelper'
import { numeralTitle } from 'styles/details'

const NumeralDetails = ({ numeral, findNumeral }) => {
  const math = numeral.math.length > 0 ? numeral.math[0] : ''

  const numeralCards = numeral.comments.map((comment, i) => (
    <Card key={i}>
      <CardText>
        {comment.content}
      </CardText>
      <CardActions>
        {comment.see.map((see, ind) => <SeeButton key={ind} see={see} findNumeral={findNumeral}/>)}
      </CardActions>
    </Card>
  ))

  return (
    <Card>
      <CardMedia color={getColor(numeral.value.toString())}>
        <CardTitle
          className={numeralTitle}
          title={numeral.value.toString()}
          subtitle={math}/>
      </CardMedia>
      {numeralCards}
    </Card>
  )
}

NumeralDetails.propTypes = {
  numeral: PropTypes.object.isRequired,
  findNumeral: PropTypes.func.isRequired
}

NumeralDetails.defaultProps = {
  numeral: {
    value: '',
    math: []
  }
}

export default NumeralDetails
