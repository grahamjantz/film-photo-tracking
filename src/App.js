import { useEffect, useState } from 'react';
import './App.css';

import { arrayUnion, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";


import db from './firebaseConfig.js'
import Header from './components/Header/Header';
import Main from './components/Main/Main'
import Footer from './components/Footer/Footer';

export const generateId = () => {
  return Math.floor(Math.random() * 100000)
}

function App() {

  const [data, setData] = useState([])
  const [currentRollId, setCurrentRollId] = useState('')
  const [currentPhotoId, setCurrentPhotoId] = useState(1)
  const [addRollActive, setAddRollActive] = useState(false)
  const [addPhotoActive, setAddPhotoActive] = useState(false)
  const [currentPhotoUrl, setCurrentPhotoUrl] = useState('')


  // const dbRef = doc(db, 'cameras', 'pentax_me_super')
  // setDoc(dbRef, {
  //   "film_rolls": [
  //     {
  //       "film": 'fujifilm_400_colour',
  //       'lens': '50mm',
  //       'id': generateId(),
  //       'photos': [
  //         {
  //           'subject': 'Maddy & Frank',
  //           'id': generateId(),
  //           'exposure_comp': '1x',
  //           'f_stop': 2,
  //           'shutter_speed': '1/2000s'
  //         },
  //         {
  //           'subject': 'Plant',
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
  //           'subject': 'Fence',
  //           'id': generateId(),
  //           'exposure_comp': '1x',
  //           'f_stop': 2,
  //           'shutter_speed': '1/2000s'
  //         },
  //         {
  //           'subject': 'Waterslides @ Henderson',
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
  //           'subject': 'Maddy & Asher',
  //           'id': generateId(),
  //           'exposure_comp': '1/4x',
  //           'f_stop': 22,
  //           'shutter_speed': '1/250'
  //         },
  //         {
  //           'subject': 'Bridge @ Henderson',
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
        
        
      })
      return unsub
    }
    fetchData()
  },[])

  useEffect(() => {

    const fetchData = async () => {
      if (currentPhotoId !== '' && currentRollId !== '') {
        const storage = getStorage();
        const path = `images/roll_${currentRollId}/photo_${currentPhotoId}.jpeg`
    
        const url = await getDownloadURL(ref(storage, path))
        setCurrentPhotoUrl(url)
      }
    }
    fetchData()
  },[currentPhotoId, currentRollId])

  console.log(currentPhotoUrl)

  useEffect(() => {
    data.forEach(arrItem => {
      if (arrItem.id === currentRollId) {
        setCurrentPhotoId(arrItem.photos[0].id)
      }
    })
  },[data, currentRollId])

  // console.log(addPhotoActive)

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
        const storage = getStorage()
        const imagesRef = ref(storage, `images/roll_${currentRollId}`)

      }
    }
    setAddRollActive(false)
  }

  const handleSubmitAddPhoto = async (e, payload) => {
    e.preventDefault()

    const docRef = doc(db, 'cameras', 'pentax_me_super')
    
    data.forEach(arrItem => {
      if (arrItem.id === currentRollId) {
        const dbPhotos = arrItem.photos
        dbPhotos.push(payload)
        arrItem.photos = dbPhotos
      }
    })
    await updateDoc(docRef, {
      'film_rolls': data
    })

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
        addPhotoActive={addPhotoActive}
        setAddPhotoActive={setAddPhotoActive}
        handleSubmitAddPhoto={handleSubmitAddPhoto}
        currentPhotoUrl={currentPhotoUrl}
      />
      <Footer />
    </div>
  );
}

export default App;
