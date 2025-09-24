import React, {useEffect, useState} from 'react'
import { collection, doc, setDoc, getDocs } from 'firebase/firestore'
import { db } from '../firebase'

export default function Admin(){
  const [pass, setPass] = useState('')
  const [ok, setOk] = useState(false)
  const [answers, setAnswers] = useState(Array.from({length:35}, (_,i) => ''))

  useEffect(()=>{
    const load = async ()=>{
      const q = await getDocs(collection(db,'answers'))
      const arr = [...answers]
      q.forEach(d=>{ const idx = Number(d.id); if(!Number.isNaN(idx)) arr[idx-1] = d.data().text })
      setAnswers(arr)
    }
    if(ok) load()
  },[ok])

  const tryLogin = ()=>{
    if(pass === 'tajneheslo') setOk(true)
    else alert('Špatné heslo')
  }

  const saveAll = async ()=>{
    for(let i=0;i<answers.length;i++){
      const id = String(i+1)
      const ref = doc(db,'answers',id)
      await setDoc(ref, {text: answers[i]})
    }
    alert('Uloženo')
  }

  return (
    <div style={{maxWidth:800, margin:'2rem auto', fontFamily:'Arial'}}>
      <h2>Admin — správa odpovědí</h2>
      {!ok && (
        <div>
          <label>Heslo admin: <input type="password" value={pass} onChange={e=>setPass(e.target.value)} /></label>
          <button onClick={tryLogin}>Přihlásit</button>
        </div>
      )}

      {ok && (
        <div>
          <p>Zde vložte 35 odpovědí.</p>
          {answers.map((a,i)=>(
            <div key={i} style={{marginBottom:8}}>
              <label>Otázka {i+1}: <input style={{width:'70%'}} value={a} onChange={e=>{ const copy=[...answers]; copy[i]=e.target.value; setAnswers(copy) }} /></label>
            </div>
          ))}
          <button onClick={saveAll}>Uložit vše</button>
        </div>
      )}
    </div>
  )
}
