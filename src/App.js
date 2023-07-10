import { useEffect, useState } from 'react';
import './App.css';

import { doc, onSnapshot, setDoc } from "firebase/firestore";

import db from './firebaseConfig.js'
import Header from './components/Header/Header';
import Main from './components/Main/Main'
import Footer from './components/Footer/Footer';

export const generateId = () => {
  return Math.floor(Math.random() * 100000)
}

function App() {

  const [data, setData] = useState({})
  const [roll, setRoll] = useState({})
  const [currentRoll, setCurrentRoll] = useState('')
  const [currentPhoto, setCurrentPhoto] = useState(1)
  const [photo, setPhoto] = useState({})

  const dbRef = doc(db, 'cameras', 'pentax_me_super')
  setDoc(dbRef, {
    "film_rolls": [
      {
        "film": 'fujifilm_400_colour',
        'lens': '50mm',
        'id': 1,
        'photos': [
          {
            'id': 1,
            'exposure_comp': '1x',
            'f_stop': 2,
            'shutter_speed': '1/2000s'
          },
          {
            'id': 1,
            'exposure_comp': '1/4x',
            'f_stop': 11,
            'shutter_speed': '1/500s'
          },
        ]
      },
      {
        "film": 'fujifilm_200_colour',
        'lens': '50mm',
        'id': 2,
        'photos': [
          {
            'id': 1,
            'exposure_comp': '1x',
            'f_stop': 2,
            'shutter_speed': '1/2000s'
          },
          {
            'id': 2,
            'exposure_comp': '2x',
            'f_stop': 2,
            'shutter_speed': '1/100s'
          },
        ]
      },

    ]
  })

  console.log(data)
  console.log(currentRoll)
  useEffect(() => {
    const fetchData = () => {
      const unsub = onSnapshot(doc(db, "cameras", "pentax_me_super"), (doc) => {
        console.log(doc.data().film_rolls)
       
        setData(doc.data().film_rolls)
        setCurrentRoll(doc.data().film_rolls[0])
        
        
      });
    }
    fetchData()
  },[])

  
  return (
    <div className="App">
      <Header />
      <Main 
        roll={roll} 
        data={data} 
        setCurrentRoll={setCurrentRoll} 
        photos={roll.photos}
        currentPhoto={currentPhoto}
        setCurrentPhoto={setCurrentPhoto}
        photo={photo}
      />
      <Footer />
    </div>
  );
}

export default App;
