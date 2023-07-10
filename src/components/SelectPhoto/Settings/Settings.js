import React, { useEffect, useState } from 'react'

const Settings = ({ data, currentRollId, currentPhotoId }) => {
  
  const [localRollData, setLocalRollData ] = useState({})

  useEffect(() => {
    if(data) {
      data.forEach(arrItem => {
        if (arrItem.id === currentRollId) {
          setLocalRollData(arrItem)
        }
      })
    }
  },[data, currentRollId])

  // console.log(localRollData)

  return (
    <div>
      {
        localRollData.photos ? (
          localRollData.photos.map(photo => {
            if (photo.id === currentPhotoId) {
              return (
                <div className='photo-settings' key={photo.id}>
                  <h4>{photo.exposure_comp}</h4>
                  <h4>{photo.f_stop}</h4>
                  <h4>{photo.shutter_speed}</h4>
                </div>
              )
            }
          })
        ) : ''
      }
    </div>
  )
}

export default Settings