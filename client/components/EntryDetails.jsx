import React, { PropTypes, Component } from 'react'
import {
  Card,
  CardTitle,
  CardMedia,
  CardText,
  CardActions
} from 'react-toolbox'

import RefButton from 'components/RefButton'
import { entryTitle } from 'styles/details'

class EntryDetails extends Component {
  render() {
    const { findNumeral, entry } = this.props
    const entryCards = entry.comments.map((comment, i) => (
      <Card key={i}>
        <CardText>
          {comment.content}
        </CardText>
        <CardActions>
          {comment.see.map((see, ind) => <RefButton key={ind} see={see} findNumeral={findNumeral}/>)}
        </CardActions>
      </Card>
    ))


    return (
      <div>
        <Card>
          <CardMedia color="rgb(255,152,0)">
            <CardTitle
              className={entryTitle}
              title={entry.word}
              subtitle={entry.definition}/>
          </CardMedia>
        </Card>
        {entryCards}
      </div>
    )
  }

}

EntryDetails.propTypes = {
  entry: PropTypes.object.isRequired,
  findNumeral: PropTypes.func.isRequired
}

EntryDetails.defaultProps = {
  entry: {
    value: ''
  }
}

export default EntryDetails
