import React, { useEffect, useState } from 'react'
import './ManageRoll.css'

import { FaTrashCan } from 'react-icons/fa6'
import { FaEdit } from 'react-icons/fa'

const ManageRoll = ({ data, currentRollId, currentPhotoUrl, handleDeletePhoto }) => {

    const [localData, setLocalData] = useState(null)
    const [nameState, setNameState] = useState('')
    const [dateState, setDateState] = useState('')

    useEffect(() => {
        if (data) {
            data.forEach(item=> {
                if (item.id === currentRollId) {
                    setLocalData(item)
                }
            })
            if (localData !== null) {
                const arr = localData.film.split("_")
                let name =''
                arr.forEach(word => {
                    const s = word.charAt(0).toUpperCase() + word.slice(1) + " "
                    name += s
                })
                setNameState(name)
                const dateObject = new Date(localData.date_created.seconds * 1000)
                const dateCreated = dateObject.toLocaleString('en-US', {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                }) 
                setDateState(dateCreated)
            }
        }
    },[data, currentRollId, localData])

  return (
    <div className='manage-roll'>
        <div className='roll'>
            <h2>{nameState}</h2>
            <h6>{dateState}</h6>
            <ul>
                {
                    localData ? (
                        localData.photos.map(photo => {
                            return (
                                <li key={photo.id} className='roll-photo-settings'>
                                    <div>
                                        <FaEdit size ='30'/>
                                        <FaTrashCan size='30' onClick={() => handleDeletePhoto(photo)}/>
                                    </div>
                                    <div>
                                        <img src={currentPhotoUrl} alt=''/>
                                        <h3><strong>{photo.subject}</strong></h3>
                                        <h4>Aperture: <strong>F{photo.f_stop}</strong></h4>
                                        <h4>Shutter Speed: <strong>{photo.shutter_speed}s</strong></h4>
                                        <h4>Exposure Comp: <strong>{photo.exposure_comp} EF</strong></h4>
                                    </div>
                                </li>
                            )
                        })
                    ) : ''
                }
            </ul>
        </div>
    </div>
  )
}

export default ManageRoll