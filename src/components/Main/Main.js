import React from 'react'
import './Main.css'

import SelectPhoto from '../SelectPhoto/SelectPhoto'
import SelectRoll from '../SelectRoll/SelectRoll'
import Settings from '../SelectPhoto/Settings/Settings'

const Main = ({ data, currentRollId, setCurrentRollId, currentPhotoId, setCurrentPhotoId,handleSubmitAddRoll, addRollActive, setAddRollActive,addPhotoActive, setAddPhotoActive, handleSubmitAddPhoto, currentPhotoUrl, handleNavigate }) => {
  return (
    <div className='main'>
      {/* <h3>Roll:</h3> */}
      <SelectRoll 
        data={data} 
        currentRollId={currentRollId}
        setCurrentRollId={setCurrentRollId}
        addRollActive={addRollActive}
        setAddRollActive={setAddRollActive}
        handleSubmitAddRoll={handleSubmitAddRoll}
      />
      {/* <h3>Photos:</h3> */}
      <SelectPhoto 
        data={data}
        currentRollId={currentRollId}
        currentPhotoId={currentPhotoId}
        setCurrentPhotoId={setCurrentPhotoId}
        addPhotoActive={addPhotoActive}
        setAddPhotoActive={setAddPhotoActive}
        handleSubmitAddPhoto={handleSubmitAddPhoto}
      />
      <button onClick={() => handleNavigate('/manage-data')}>Manage</button>
      <Settings 
        data={data}
        currentRollId={currentRollId}
        currentPhotoId={currentPhotoId}
        currentPhotoUrl={currentPhotoUrl}
      />
    </div>
  )
}

export default Main