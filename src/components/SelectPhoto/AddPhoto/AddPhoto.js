import React, { useState } from 'react'
import './AddPhoto.css'

import { FaRegWindowClose } from 'react-icons/fa'

import { generateId } from '../../../App'

const AddPhoto = ({ handleSubmitAddPhoto, setAddPhotoActive }) => {

    const [subject, setSubject] = useState('')
    const [fStop, setFStop] = useState(2)
    const [shutterSpeed, setShutterSpeed] = useState('1/2000')
    const [exposureComp, setExposureComp] = useState(1)
    const [shootingMode, setShootingMode] = useState('Manual')
    

  return (
    <form className='add-photo' onSubmit={(e) => {
        handleSubmitAddPhoto(e, {
            id: generateId(),
            subject: subject,
            f_stop: fStop,
            shutter_speed: shutterSpeed,
            exposure_comp: exposureComp,
            shooting_mode: shootingMode
        })

    }}>
        <FaRegWindowClose onClick={() => setAddPhotoActive(false)}/>
        <label htmlFor='subject'>Subject:</label>
        <input 
            type='text'
            value={subject} 
            name='f-stop' 
            onChange={(e) => setSubject(e.target.value)}
        />

        <label htmlFor='f-stop'>F-Stop:</label>
        {fStop}
        <input 
            type='range'
            value={fStop} 
            name='f-stop' 
            list='f-stop-markers'
            min='2'
            max='22'
            step='0.1'
            onChange={(e) => setFStop(e.target.value)}
        />
        <datalist id='f-stop-markers'>
            <option value='2' ></option>
            <option value='2.8'></option>
            <option value='4' ></option>
            <option value='5.6' ></option>
            <option value='8' ></option>
            <option value='11' ></option>
            <option value='16' ></option>
            <option value='22' ></option>
        </datalist>

        <label htmlFor='shutter-speed'>Shutter Speed:</label>
        <select name='shutter-speed' onChange={(e) => setShutterSpeed(e.target.value)} value={shutterSpeed}>
            <option value='1/2000' >1/2000</option>
            <option value='1/1000'>1/1000</option>
            <option value='1/500' >1/500</option>
            <option value='1/250' >1/250</option>
            <option value='1/125' >1/125</option>
            <option value='1/60' >1/60</option>
            <option value='1/30' >1/30</option>
            <option value='1/15' >1/15</option>
            <option value='1/8' >1/8</option>
            <option value='1/4' >1/4</option>
            <option value='1/2' >1/2</option>
            <option value='1/1' >1/1</option>
            <option value='2' >2</option>
            <option value='4' >4</option>

        </select>

        <label htmlFor='exposure-comp'>Exposure Comp:</label>
        {exposureComp}
        <input 
            type='range'
            value={exposureComp}
            name='exposure-comp'
            list='exposure-comp-markers'
            min='0.25'
            max='4'
            step='0.25'
            onChange={(e) => setExposureComp(e.target.value)}
        />
        <datalist id='exposure-comp-markers'>
            <option value='0.25'></option>
            <option value='0.5'></option>
            <option value='1'></option>
            <option value='2'></option>
            <option value='4'></option>
        </datalist>

        <fieldset onChange={(e) => {
            let word = e.target.value
            const s = word.charAt(0).toUpperCase() + word.slice(1)
            setShootingMode(s)
        }}>
            <legend>Shooting Mode: {shootingMode}</legend>

            <div>
                <input type="radio" name="mode" value="auto"/>
                <label htmlFor="auto">Auto</label>
            </div>

            <div>
                <input type="radio" name="mode" value="manual"/>
                <label htmlFor="manual">Manual</label>
            </div>

            <div>
                <input type="radio" name="mode" value="125X"/>
                <label htmlFor="125X">125X</label>
            </div>

            <div>
                <input type="radio" name="mode" value="B"/>
                <label htmlFor="B">B</label>
            </div>
        </fieldset>

        <input 
            type='submit'
            value='Add'
        />     
    </form>
  )
}

export default AddPhoto