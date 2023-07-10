import React, { useEffect, useState } from 'react'
import { generateId } from '../../App'

const SelectRoll = ({ data, setCurrentRoll }) => {

  const [filmRolls, setFilmRolls] = useState([])
  
  useEffect(() => {
    const fetchFilmRollNames = () => {
      
      
      // if (data) {
      //   data.map((roll) => {
      //     let name = ''
      //     const arr = roll.film.split('_')
      //     arr.forEach(word => {
      //       const s = word.charAt(0).toUpperCase() + word.slice(1)
      //       name += s
      //       name += " "
      //     })
      //     setFilmRolls(() => [...filmRolls, {name: name, nameFromDB: roll.film}])
      //   })
      // }
    }
    fetchFilmRollNames()
  },[data])

  return (
    <div className='select-film'>
      <select>
        {filmRolls !== [] ? (
          filmRolls.map(roll => {
            return (
              <option key={generateId()} onClick={() => setCurrentRoll(roll.nameFromDB)}>{roll.name}</option>
            )
          })
          ) : ''}
      </select>
    </div>
  )
}

export default SelectRoll