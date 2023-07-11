import React from 'react'
import './Main.css'

import SelectPhoto from '../SelectPhoto/SelectPhoto'
import SelectRoll from '../SelectRoll/SelectRoll'
import Settings from '../SelectPhoto/Settings/Settings'

const Main = ({ data, currentRollId, setCurrentRollId, currentPhotoId, setCurrentPhotoId,handleSubmitAddRoll, addRollActive, setAddRollActive,addPhotoActive, setAddPhotoActive, handleSubmitAddPhoto, currentPhotoUrl, handleNavigate }) => {
  return (
    <div className='main'>
      <SelectRoll 
        data={data} 
        currentRollId={currentRollId}
        setCurrentRollId={setCurrentRollId}
        addRollActive={addRollActive}
        setAddRollActive={setAddRollActive}
        handleSubmitAddRoll={handleSubmitAddRoll}
      />
      <SelectPhoto 
        data={data}
        currentRollId={currentRollId}
        currentPhotoId={currentPhotoId}
        setCurrentPhotoId={setCurrentPhotoId}
        addPhotoActive={addPhotoActive}
        setAddPhotoActive={setAddPhotoActive}
        handleSubmitAddPhoto={handleSubmitAddPhoto}
      />
      <Settings 
        data={data}
        currentRollId={currentRollId}
        currentPhotoId={currentPhotoId}
        currentPhotoUrl={currentPhotoUrl}
      />
      <button onClick={() => handleNavigate('/manage-data')}>Manage Data</button>
    </div>
  )
}

export default Main