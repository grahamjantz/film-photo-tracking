import React, { useEffect, useState } from 'react'
import './Settings.css'

const Settings = ({ data, currentRollId, currentPhotoId, currentPhotoUrl }) => {
  
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
              const index = localRollData.photos.indexOf(photo)
              return (
                <div className='photo-settings' key={photo.id}>
                  {/* <img src={currentPhotoUrl} alt=''/> */}
                  <div>
                    <h4>Aperture: <strong>F{photo.f_stop}</strong></h4>
                    <hr />
                    <h4>Shutter Speed: <strong>{photo.shutter_speed}s</strong></h4>
                    <hr />
                    <h4>Exposure Comp: <strong>{photo.exposure_comp} EF</strong></h4>
                    <hr />
                    <h4>Shooting Mode: <strong>{photo.shooting_mode}</strong></h4>
                  </div>
                  <h3><strong>#{index}: {photo.subject}</strong></h3>
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