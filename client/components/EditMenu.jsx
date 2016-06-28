import React, { PropTypes } from 'react'
import { IconMenu, MenuItem } from ''

const EditMenu = React.createClass({
  render () {
    return (
      <IconMenu icon="more_vert" position="topRight" menuRipple={true}>
        <MenuItem value="download" icon="get_app" caption="Download" />
        <MenuItem value="help" icon="favorite" caption="Favorite" />
        <MenuItem value="settings" icon="open_in_browser" caption="Open in app" />
      </IconMenu>
    )
  }
})

export default EditMenu
