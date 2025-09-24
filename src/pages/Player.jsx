import React, {useEffect, useState} from 'react'
import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
import Road from '../components/Road'

export default function Player(){
  const [name, setName] = useState('')
  const [family, setFamily] = useState('')
  const [playerDoc, setPlayerDoc] = useState(null)
  const [answer, setAnswer] = useState('')
  const [answersMap, setAnswersMap] = useState({})

  useEffect(()=>{
    const load = async ()=>{
      const q = await getDocs(collection(db, 'answers'))
      const map = {}
      q.forEach(d=> map[d.id]=d.data().text)
      setAnswersMap(map)
    }
    load()
  },[])

  const startOrLoad = async ()=>{
    if(!name) return alert('Zadej jméno')
    const id = `${family}::${name}`.trim()
    const ref = doc(db, 'players', id)
    const s = await getDoc(ref)
    if(!s.exists()){
      await setDoc(ref, {name, family, progress: []})
      setPlayerDoc({id, data: {name, family, progress: []}})
    } else {
      setPlayerDoc({id, data: s.data()})
    }
  }

  const submitAnswer = async ()=>{
    if(!playerDoc) return alert('Nejdřív se přihlas')
    const progress = playerDoc.data.progress || []
    const nextIndex = progress.length + 1
    const correct = answersMap[String(nextIndex)]
    if(!correct) return alert('Správné odpovědi zatím nejsou nahrané.')
    if(answer.trim().toLowerCase() === correct.trim().toLowerCase()){
      const ref = doc(db, 'players', playerDoc.id)
      const newProgress = [...progress, {q: nextIndex, at: new Date().toISOString()}]
      await updateDoc(ref, {progress: newProgress})
      setPlayerDoc({id: playerDoc.id, data: {...playerDoc.data, progress: newProgress}})
      setAnswer('')
      alert('Správně! Postoupili jste o jeden dílek dál.')
    } else {
      alert('Špatně — zkuste znovu.')
    }
  }

  return (
    <div style={{maxWidth:800, margin:'2rem auto', fontFamily:'Arial'}}>
      <h2>Hráč</h2>
      {!playerDoc && (
        <div>
          <label>Jméno dítěte<br/>
            <input value={name} onChange={e=>setName(e.target.value)} />
          </label>
          <br/>
          <label>Rodinný kód (volitelné)<br/>
            <input value={family} onChange={e=>setFamily(e.target.value)} />
          </label>
          <br/>
          <button onClick={startOrLoad}>Začít / Načíst</button>
        </div>
      )}

      {playerDoc && (
        <div>
          <p>Přihlášeno: <b>{playerDoc.data.name}</b> (rodina: {playerDoc.data.family||'-'})</p>
          <Road done={playerDoc.data.progress?.length || 0} total={35} />

          <div style={{marginTop:20}}>
            <label>Zadej odpověď<br/>
              <input value={answer} onChange={e=>setAnswer(e.target.value)} />
            </label>
            <button onClick={submitAnswer}>Odeslat</button>
          </div>
        </div>
      )}
    </div>
  )
}
