import React, { useEffect, useState } from 'react'
import { generateId } from '../../App'

const SelectRoll = ({ data, handleChangeRoll }) => {

  const [filmRolls, setFilmRolls] = useState([])
  console.log(filmRolls)
  
  useEffect(() => {
    const fetchFilmRollNames = () => {
      if (data.film_rolls) {
        data.film_rolls.map((roll) => {
          let name = ''
          const arr = roll.film.split('_')
          arr.forEach(word => {
            const s = word.charAt(0).toUpperCase() + word.slice(1)
            name += s
            name += " "
            console.log(word)
          })
          setFilmRolls(() => [...filmRolls, {name: name, nameFromDB: roll.film}])
        })
      }
    }
    fetchFilmRollNames()
  },[data.film_rolls])

  return (
    <div className='select-film'>
      <select>
        {filmRolls !== [] ? (
          filmRolls.map(roll => {
            return (
              <option key={generateId()} onClick={handleChangeRoll(roll.nameFromDB)}>{roll.name}</option>
            )
          })
          ) : ''}
      </select>
    </div>
  )
}

export default SelectRoll