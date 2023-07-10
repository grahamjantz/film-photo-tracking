import React, { useState } from 'react'
import './AddPhoto.css'

const AddPhoto = () => {

    const [subject, setSubject] = useState('')
    const [fStop, setFStop] = useState(2)
    const [shutterSpeed, setShutterSpeed] = useState('')
    const [exposureComp, setExposureComp] = useState('')
    const [shootingMode, setShootingMode] = useState('')

  return (
    <form className='add-photo'>
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
            <option value='8' ></option>
            <option value='11' ></option>
            <option value='22' ></option>
        </datalist>

        <label htmlFor='shutter-speed'>Shutter Speed:</label>
        <select name='shutter-speed' onChange={(e) => setShutterSpeed(e.target.value)}>
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

        <fieldset onChange={(e) => setShootingMode(e.target.value)}>
            {shootingMode}
            <legend>Shooting Mode:</legend>

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