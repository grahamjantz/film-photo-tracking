import { useEffect, useState } from 'react';
import './App.css';

import { doc, onSnapshot } from "firebase/firestore";

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
  const [currentRoll, setCurrentRoll] = useState('fujifilm_400_colour')

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "cameras", "pentax_me_super"), (doc) => {
      setData(doc.data())
      const allData = doc.data()
      if (allData) {
        allData.film_rolls.forEach(roll => {
          if (roll.film === currentRoll) {
            console.log(roll)
            setRoll(roll)
          }
        })
      }
    });
  },[currentRoll])

  const handleChangeRoll = (roll) => {
    setCurrentRoll(roll)
  }

  
  return (
    <div className="App">
      <Header />
      <Main roll={roll} data={data} handleChangeRoll={handleChangeRoll}/>
      <Footer />
    </div>
  );
}

export default App;
