import React from 'react'
import './ManageData.css'

import { FaTrashCan } from 'react-icons/fa6'

const ManageData = ({ data, handleNavigate, handleDeleteRoll }) => {

  return (
    <div className='manage-data'>
      <h2>Select Roll to Manage:</h2>
      <ul>
        {
          data ? (
            data.map(arrItem => {
              const arr = arrItem.film.split("_")
              let name = ''
              arr.forEach(word => {
                const s = word.charAt(0).toUpperCase() + word.slice(1) + " "
                name += s
              })
              const dateObject = new Date(arrItem.date_created.seconds * 1000)
              const dateCreated = dateObject.toLocaleString('en-US', {
                year: "numeric",
                month: "numeric",
                day: "numeric",
              }) 
              return (
                <li key={arrItem.id}>
                  <FaTrashCan size='30' onClick={() => handleDeleteRoll(arrItem)}/>
                  <div onClick={() => handleNavigate(`/manage-roll?roll_id=${arrItem.id}`, arrItem.id)}>
                    <h5>{name}</h5>
                    <h6>{dateCreated}</h6>
                  </div>
                  <div></div>
                </li>
              )
            })
          ) : ''
        }
      </ul>
    </div>
  )
}

export default ManageData