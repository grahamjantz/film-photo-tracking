import React, { useEffect, useState } from 'react'
import './SelectPhoto.css'

const SelectPhoto = ({ data, currentRollId, currentPhotoId, setCurrentPhotoId }) => {

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
                  #{localRollData.photos.indexOf(photo) + 1} (F{photo.f_stop} {photo.shutter_speed} {photo.exposure_comp}EF)
                </div>
              )
            })
        ) : ''
      }
    </div>
  )
}

export default SelectPhoto