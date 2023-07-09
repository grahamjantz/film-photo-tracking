import React from 'react'
import './Main.css'

import SelectPhoto from '../SelectPhoto/SelectPhoto'
import SelectRoll from '../SelectRoll/SelectRoll'

const Main = ({ data, photos, handleChangeRoll }) => {
  return (
    <div className='main'>
      <SelectRoll data={data} handleChangeRoll={handleChangeRoll}/>
      <SelectPhoto photos={photos}/>
    </div>
  )
}

export default Main