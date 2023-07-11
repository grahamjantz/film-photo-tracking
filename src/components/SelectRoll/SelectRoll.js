import React, { useState } from 'react'

import './SelectRoll.css'

import { generateId } from '../../App'

import { FaPlusCircle } from 'react-icons/fa'
import AddRoll from './AddRoll/AddRoll'

const SelectRoll = ({ data, currentRollId, setCurrentRollId, handleSubmitAddRoll, addRollActive, setAddRollActive }) => {

  const [localCurrentRoll, setLocalCurrentRoll] = useState('')

  const handleChangeCurrentRoll = (e) => {
      setLocalCurrentRoll(Number(e))
      setCurrentRollId(Number(e))
  }

  return (
    <div className='select-roll-master-container'>
      <div className='select-roll-container'>
        <div className='add-roll-button' onClick={() => addRollActive ? setAddRollActive(false) : setAddRollActive(true)}>
          <FaPlusCircle />
        </div>
        <div className='select-roll'>
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
                    className={roll.id === localCurrentRoll || roll.id === currentRollId ? 'active' : ''}
                    onClick={() => handleChangeCurrentRoll(roll.id)}
                  >
                    {name}
                  </div>

                )
              })
              
              ) : ''
            }
        </div>
      </div>
      {addRollActive ? (
        <AddRoll 
          handleSubmitAddRoll={handleSubmitAddRoll}
          setAddRollActive={setAddRollActive}
        />
      ) : ''}
    </div>
  )
}

export default SelectRoll