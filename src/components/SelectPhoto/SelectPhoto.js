import React, { useEffect, useState } from 'react'

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
    <select value={currentPhotoId} onChange={(e) => setCurrentPhotoId(Number(e.target.value))}>
      {
        localRollData.photos ? (
          localRollData.photos.map(photo => {
              return (
                <option 
                  key={photo.id}
                  value={photo.id}
                >
                  Photo #{localRollData.photos.indexOf(photo) + 1} {photo.id}
                </option>
              )
            })
        ) : ''
      }
    </select>
  )
}

export default SelectPhoto