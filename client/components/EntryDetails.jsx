import React, { PropTypes, Component } from 'react'
import {
  Card,
  CardTitle,
  CardMedia,
  CardText,
  CardActions,
  IconMenu,
  MenuItem
} from 'react-toolbox'

import SeeButton from 'components/SeeButton'
import { entryTitle, entryText } from 'styles/details'

class EntryDetails extends Component {
  render() {
    const { findNumeral, entry } = this.props
    const entryCards = entry.comments.map((comment, i) => {
      const refs = comment.see.length > 0
      const actions = (<CardActions>
        {comment.see.map((see, ind) => <SeeButton key={ind} see={see} findNumeral={findNumeral}/>)}
      </CardActions>)

      return (
      <Card key={i}>
        <IconMenu icon="more_vert" position="topRight" menuRipple={true}>
          <MenuItem value="download" icon="get_app" caption="Download" />
          <MenuItem value="help" icon="favorite" caption="Favorite" />
          <MenuItem value="settings" icon="open_in_browser" caption="Open in app" />
        </IconMenu>
        <CardText>
          {comment.content}
        </CardText>
        {refs && actions}
      </Card>
    )})


    return (
      <div>
        <Card>
          <CardMedia color="rgb(255,152,0)">
            <CardTitle
              className={entryTitle}
              title={entry.word}/>
            <CardText className={entryText}>
              {entry.definition && <p>Definition: {entry.definition}</p>}
              {entry.language && <p>Language: {entry.language}</p>}
              {entry.pronunciation && <p>Pronunciation: {entry.pronunciation}</p>}
            </CardText>
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
