import React, { useEffect, useState } from 'react'

import './SelectRoll.css'

import { generateId } from '../../App'

const SelectRoll = ({ data, setCurrentRollId }) => {

  const [localCurrentRoll, setLocalCurrentRoll] = useState('')

  // useEffect(() => {
  //   setCurrentRollId(localCurrentRoll)

  // },[localCurrentRoll, setCurrentRollId])

  const handleChangeCurrentRoll = (e) => {
    // setLocalCurrentRoll(e.target.value)
    // setCurrentRollId(Number(e.target.value))
      setLocalCurrentRoll(Number(e))
      setCurrentRollId(Number(e))
  }

  return (
    <div 
      className='select-film'
      // onChange={handleChangeCurrentRoll}
      // value={localCurrentRoll}
    >
      {
        data.length > 0 ? (
          data.map(roll => {
            const arr = roll.film.split("_")
            let name = ''
            arr.forEach(word => {
              const s = word.charAt(0).toUpperCase() + word.slice(1) + " "
              name += s
            })
            return(
              <div 
                key={generateId()} 
                // value={roll.id}
                onClick={() => handleChangeCurrentRoll(roll.id)}
              >
                {name}
              </div>

            )
          })
          
        ) : ''
      }
    </div>
  )
}

export default SelectRoll