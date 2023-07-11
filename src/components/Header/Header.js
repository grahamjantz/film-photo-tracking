import React from 'react'
import './Header.css'

import { MdCameraRoll } from 'react-icons/md'

const Header = ({ handleNavigate }) => {
  return (
    <header onClick={() => handleNavigate('/')}>
      <h1><MdCameraRoll />Film Catalogue</h1>
    </header>
  )
}

export default Header