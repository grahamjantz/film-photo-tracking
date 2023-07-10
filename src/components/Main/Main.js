import React from 'react'
import './Main.css'

import SelectPhoto from '../SelectPhoto/SelectPhoto'
import SelectRoll from '../SelectRoll/SelectRoll'
import Settings from '../SelectPhoto/Settings/Settings'

const Main = ({ data, photos, setCurrentRoll, currentPhoto, setCurrentPhoto, photo }) => {
  return (
    <div className='main'>
      <SelectRoll data={data} setCurrentRoll={setCurrentRoll}/>
      <SelectPhoto photos={photos} setCurrentPhoto={setCurrentPhoto}/>
      <Settings currentPhoto={currentPhoto} photo={photo}/>
    </div>
  )
}

export default Main