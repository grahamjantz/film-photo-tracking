import React, { useState } from 'react'
import { generateId } from '../../../App'

const AddRoll = ({ handleSubmitAddRoll }) => {

    const [filmType, setFilmType] = useState('')
    const [lens, setLens] = useState('')

    const tempData = {
        film: '',
        lens: '',
        id: generateId(),
        photos: []
    }


  return (
    <form className='add-roll' onSubmit={(e) => handleSubmitAddRoll(e, filmType, lens)}>
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