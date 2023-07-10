import { useEffect, useState } from 'react';
import './App.css';

import { arrayUnion, doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";

import db from './firebaseConfig.js'
import Header from './components/Header/Header';
import Main from './components/Main/Main'
import Footer from './components/Footer/Footer';

export const generateId = () => {
  return Math.floor(Math.random() * 100000)
}

function App() {

  const [data, setData] = useState([])
  const [roll, setRoll] = useState({})
  const [currentRollId, setCurrentRollId] = useState('')
  const [currentPhotoId, setCurrentPhotoId] = useState(1)
  const [photo, setPhoto] = useState({})
  const [addRollActive, setAddRollActive] = useState(false)


  const dbRef = doc(db, 'cameras', 'pentax_me_super')
  // setDoc(dbRef, {
  //   "film_rolls": [
  //     {
  //       "film": 'fujifilm_400_colour',
  //       'lens': '50mm',
  //       'id': generateId(),
  //       'photos': [
  //         {
  //           'id': generateId(),
  //           'exposure_comp': '1x',
  //           'f_stop': 2,
  //           'shutter_speed': '1/2000s'
  //         },
  //         {
  //           'id': generateId(),
  //           'exposure_comp': '1/4x',
  //           'f_stop': 11,
  //           'shutter_speed': '1/500s'
  //         },
  //       ]
  //     },
  //     {
  //       "film": 'fujifilm_200_colour',
  //       'lens': '50mm',
  //       'id': generateId(),
  //       'photos': [
  //         {
  //           'id': generateId(),
  //           'exposure_comp': '1x',
  //           'f_stop': 2,
  //           'shutter_speed': '1/2000s'
  //         },
  //         {
  //           'id': generateId(),
  //           'exposure_comp': '2x',
  //           'f_stop': 2,
  //           'shutter_speed': '1/100s'
  //         },
  //       ]
  //     },
  //     {
  //       "film": 'ilford_hp5_400',
  //       'lens': '50mm',
  //       'id': generateId(),
  //       'photos': [
  //         {
  //           'id': generateId(),
  //           'exposure_comp': '1/4x',
  //           'f_stop': 22,
  //           'shutter_speed': '1/250'
  //         },
  //         {
  //           'id': generateId(),
  //           'exposure_comp': '1x',
  //           'f_stop': 11,
  //           'shutter_speed': '1/100s'
  //         },
  //       ]
  //     },

  //   ]
  // })

  useEffect(() => {
    const fetchData = () => {
      const unsub = onSnapshot(doc(db, "cameras", "pentax_me_super"), (doc) => {
       
        setData(doc.data().film_rolls)
        setCurrentRollId(doc.data().film_rolls[0].id)
        setCurrentPhotoId(doc.data().film_rolls[0].photos[0].id)
        
        
      });
    }
    fetchData()
  },[])

  useEffect(() => {
    data.forEach(arrItem => {
      if (arrItem.id === currentRollId) {
        setCurrentPhotoId(arrItem.photos[0].id)
      }
    })
  },[data, currentRollId])

  // console.log(currentPhotoId)

  const handleSubmitAddRoll = async (e, filmType, lens) => {
    e.preventDefault()

    let name = filmType.toLowerCase().replace(/ /g,"_")
    console.log(name)
    
    if (data) {
      if (filmType !=='' && lens !== '') {
        const payload = {
          film: name,
          lens: lens,
          id: generateId(),
          photos: []
        }
        const docRef = doc(db, 'cameras', 'pentax_me_super') 
        await updateDoc(docRef, {
          'film_rolls': arrayUnion(payload)
        })
        console.log('added to firestore')
      }
    }
    setAddRollActive(false)
  }

  
  return (
    <div className="App">
      <Header />
      <Main 
        data={data}
        currentRollId={currentRollId}
        setCurrentRollId={setCurrentRollId}
        currentPhotoId={currentPhotoId}
        setCurrentPhotoId={setCurrentPhotoId}
        addRollActive={addRollActive}
        setAddRollActive={setAddRollActive}
        handleSubmitAddRoll={handleSubmitAddRoll}
      />
      <Footer />
    </div>
  );
}

export default App;
