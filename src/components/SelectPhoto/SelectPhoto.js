import React from 'react'

const SelectPhoto = ({ photos, setCurrentPhoto }) => {
  return (
    <select>
      {
        !photos ? '' : (
          photos.map(photo => {
            // console.log(photo)
            return (
              <option key={photo.id} onClick={() => setCurrentPhoto(photo.id)}>
                    Frame: {photo.id} |
                    Exp: {photo.exposure_comp} |
                    Shutter: {photo.shutter_speed} |
                    Aperture: {photo.f_stop}
              </option>
            )
          })
        )
      }
    </select>
  )
}

export default SelectPhoto