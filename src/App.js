import { useEffect, useState } from 'react';
import './App.css';

import { arrayUnion, doc, onSnapshot, updateDoc } from "firebase/firestore";
// import { getStorage, ref, getDownloadURL } from "firebase/storage";


import db from './firebaseConfig.js'
import Header from './components/Header/Header';
import Main from './components/Main/Main'
import { Route, Routes, useNavigate } from 'react-router-dom';
import ManageData from './components/ManageData/ManageData';
import ManageRoll from './components/ManageData/ManageRoll/ManageRoll';

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

  


  // ==============FETCH DATA FROM FIRESTORE DB==================== //
  useEffect(() => {
    const fetchData = () => {
      const unsub = onSnapshot(doc(db, "cameras", "pentax_me_super"), (doc) => {
        
        setData(doc.data().film_rolls)
        if (doc.data().film_rolls.length > 0) {
          setCurrentRollId(doc.data().film_rolls[0].id)
          if (doc.data().film_rolls[0].photos.length > 0) {
            setCurrentPhotoId(doc.data().film_rolls[0].photos[0].id)
          }
        }
        
        
      })
      return unsub
    }
    fetchData()
  },[])

  
  // ==============SET CURRENT PHOTO ID OF FIRST IMAGE FROM CURRENT ROLL==================== //
  useEffect(() => {
    data.forEach(arrItem => {
      if (arrItem.id === currentRollId) {
        if (arrItem.photos.length > 0) {
          setCurrentPhotoId(arrItem.photos[0].id)
        }
      }
    })
  },[data, currentRollId])
  
  
  // ==============FETCH CURRENT IMAGE FROM FIRESTORE STORAGE==================== //
  useEffect(() => {
    
    // const fetchData = async () => {
    //   if (currentPhotoId !== '' && currentRollId !== '') {
    //     const storage = getStorage();
    //     const path = `images/roll_${currentRollId}/photo_${currentPhotoId}.jpeg`
        
    //     const url = await getDownloadURL(ref(storage, path))
    //     setCurrentPhotoUrl(url)
    //   }
    // }
    // fetchData()
    setCurrentPhotoUrl('')
  },[currentPhotoId, currentRollId, setCurrentPhotoUrl])
  
  
  // ==============ADD NEW ROLL TO FIRESTORE DB==================== //
  const handleSubmitAddRoll = async (e, filmType, lens) => {
    e.preventDefault()
    
    let name = filmType.toLowerCase().replace(/ /g,"_")
    if (data) {
      if (filmType !=='' && lens !== '') {
        const payload = {
          film: name,
          lens: lens,
          id: generateId(),
          date_created: new Date(),
          photos: []
        }
        data.push(payload)
        const docRef = doc(db, 'cameras', 'pentax_me_super') 
        await updateDoc(docRef, {
          'film_rolls': data
        })
        
      }
    }
    setAddRollActive(false)
  }

  // ==============DELETE ROLL IN FIRESTORE DB==================== //

  const handleDeleteRoll = async (payload) => {
    if (data) {
      data.forEach(item => {
        if (item.id === payload.id) {

          
          payload = {...payload, "date_deleted": new Date()}
          
          const tempData = payload

          const index = data.indexOf(payload)
          data.splice(index, 1)

          const docRef = doc(db, 'cameras', 'pentax_me_super')
          updateDoc(docRef, {
            '__deleted_rolls': arrayUnion(tempData),
            'film_rolls': data
          })
        }
      })
    }
  }

  
  // ==============ADD NEW PHOTO TO CURRENT ROLL IN FIRESTORE DB==================== //
  const handleSubmitAddPhoto = async (e, payload) => {
    e.preventDefault()
    
    const docRef = doc(db, 'cameras', 'pentax_me_super')
    
    data.forEach(arrItem => {
      if (arrItem.id === currentRollId) {
        payload = {...payload, 'roll_id': arrItem.id}
        const dbPhotos = arrItem.photos
        dbPhotos.push(payload)
        arrItem.photos = dbPhotos
      }
    })
    await updateDoc(docRef, {
      'film_rolls': data
    })
    setAddPhotoActive(false)
    
    //TODO: EVERY TIME AN IMAGE IS ADDED TO DB UPLOAD STOCK IMAGE TO STORAGE. 
    //      THEN ADD FUNCTIONALITY TO UPLOAD ACTUAL IMAGE OF PHOTO
    
    // console.log('added to firestore')
    // const storage = getStorage()
    // const imagesRef = ref(storage, `images/roll_${currentRollId}`)
  }

  // ==============DELETE PHOTO IN CURRENT ROLL IN FIRESTORE DB==================== //
  const handleDeletePhoto = async (payload) => {
    setCurrentRollId(payload.roll_id)
    if (data) {
      data.forEach(roll => {
        if (roll.id === currentRollId) {
          roll.photos.forEach(photo => {
            if (photo.id === payload.id) {
              const index = roll.photos.indexOf(payload)
              roll.photos.splice(index, 1)              
            }
          })
        }
      })
      const docRef = doc(db, 'cameras', 'pentax_me_super')
      updateDoc(docRef, {
        '__deleted_photos': arrayUnion(payload),
        'film_rolls': data
      })
      }
  }
  
  // ==============NAVIGATION HANDLER==================== //
  const navigate = useNavigate()
  const handleNavigate = (page) => {
    navigate(page)
  }
    
  return (
    <div className="App">
      <Header handleNavigate={handleNavigate}/>
      <Routes>
        <Route index element={
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
            handleNavigate={handleNavigate}
          />
        }></Route>
        <Route path='/manage-data' element={
          <ManageData 
            data={data}
            handleNavigate={handleNavigate}
            handleDeleteRoll={handleDeleteRoll}
            handleDeletePhoto={handleDeletePhoto}
          />
        }></Route>
        <Route path='/manage-roll' element={
          <ManageRoll 
            data={data}
            currentRollId={currentRollId}
            setCurrentRollId={setCurrentRollId}
            currentPhotoUrl={currentPhotoUrl}
            handleDeletePhoto={handleDeletePhoto}
          />
        }></Route>
      </Routes>
    </div>
  );
}

export default App;
