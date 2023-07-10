import React, { useEffect, useState } from 'react'
import './Settings.css'

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
    <div className='settings'>
      {
        localRollData.photos ? (
          localRollData.photos.map(photo => {
            if (photo.id === currentPhotoId) {
              return (
                <div className='photo-settings' key={photo.id}>
                  <h3><strong>{photo.subject}</strong></h3>
                  <h4>Aperture: <strong>F{photo.f_stop}</strong></h4>
                  <h4>Shutter Speed: <strong>{photo.shutter_speed}s</strong></h4>
                  <h4>Exposure Comp: <strong>{photo.exposure_comp} EF</strong></h4>
                </div>
              )
            } else {
              return ''
            }
          })
        ) : ''
      }
    </div>
  )
}

export default Settings