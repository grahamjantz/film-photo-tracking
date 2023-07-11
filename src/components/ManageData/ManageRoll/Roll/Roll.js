import React from 'react'
import './Roll.css'

const Roll = ({ roll, currentPhotoUrl }) => {
    if (roll) {
        const arr = roll.film.split("_")
        let name = ''
        arr.forEach(word => {
        const s = word.charAt(0).toUpperCase() + word.slice(1) + " "
        name += s
        })
        const dateObject = new Date(roll.date_created.seconds * 1000)
        const dateCreated = dateObject.toLocaleString('en-US', {
            year: "numeric",
            month: "numeric",
            day: "numeric",
        }) 
        return (
            <div className='roll'>
                <h2>{name}</h2>
                <h6>{dateCreated}</h6>
                <ul>
                    {
                        roll.photos.map(photo => {
                            return (
                                <li key={photo.id} className='roll-photo-settings'>
                                    <img src={currentPhotoUrl} alt=''/>
                                    <h3><strong>{photo.subject}</strong></h3>
                                    <h4>Aperture: <strong>F{photo.f_stop}</strong></h4>
                                    <h4>Shutter Speed: <strong>{photo.shutter_speed}s</strong></h4>
                                    <h4>Exposure Comp: <strong>{photo.exposure_comp} EF</strong></h4>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default Roll