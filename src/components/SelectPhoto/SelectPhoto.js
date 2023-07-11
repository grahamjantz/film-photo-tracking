import React, { useEffect, useState } from 'react'
import './SelectPhoto.css'

import { FaPlusCircle } from 'react-icons/fa'
import AddPhoto from './AddPhoto/AddPhoto'

const SelectPhoto = ({ data, currentRollId, currentPhotoId, setCurrentPhotoId, addPhotoActive, setAddPhotoActive, handleSubmitAddPhoto }) => {

  const [localRollData, setLocalRollData] = useState({})

  useEffect(() => {
    if (data) {
      data.forEach(arrItem => {
        if (arrItem.id === currentRollId) {
          setLocalRollData(arrItem)
        }
      })
    }
  },[data, currentRollId])

  return (
    <div className='select-photo-master-container'>
      <div className='select-photo-container'>
        <div className='add-photo-button' onClick={() => addPhotoActive === false? setAddPhotoActive(true) : setAddPhotoActive(false)}>
          <FaPlusCircle />
        </div>
        <div className='select-photo'>
          {
            localRollData.photos ? (
              localRollData.photos.map(photo => {
                  return (
                    <div 
                      key={photo.id}
                      className={photo.id === currentPhotoId ? 'active': ''}
                      onClick={() => setCurrentPhotoId(Number(photo.id))}
                    >
                      #{localRollData.photos.indexOf(photo)} (F{photo.f_stop} {photo.shutter_speed} {photo.exposure_comp}EF)
                    </div>
                  )
                })
            ) : ''
          }
        </div>
      </div>
      {addPhotoActive === true ? (
        <AddPhoto 
          handleSubmitAddPhoto={handleSubmitAddPhoto} 
          setAddPhotoActive={setAddPhotoActive}
        /> 
      )
      : ''}
    </div>
  )
}

export default SelectPhoto