import React, { useState } from 'react'
import './AddRoll.css'

import { FaRegWindowClose } from 'react-icons/fa'

const AddRoll = ({ handleSubmitAddRoll, setAddRollActive }) => {

    const [filmType, setFilmType] = useState('')
    const [lens, setLens] = useState('')

  return (
    <form className='add-roll' onSubmit={(e) => handleSubmitAddRoll(e, filmType, lens)}>
        <FaRegWindowClose onClick={() => setAddRollActive(false)}/>
        <label htmlFor='film'>Film Type:</label>
        <input 
            type='text'
            value={filmType} 
            name='film' 
            onChange={(e) => setFilmType(e.target.value)}
        />

        <label htmlFor='lens'>Lens:</label>
        <input 
            type='text'
            value={lens}
            name='lens'
            onChange={(e) => setLens(e.target.value)}
        />

        <input 
            type='submit'
            value='Add'
        />        
    </form>
  )
}

export default AddRoll