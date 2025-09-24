import React from 'react'

export default function Road({done=0, total=35}){
  const tiles = []
  for(let i=1;i<=total;i++) tiles.push(i)

  return (
    <div style={{display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:8}}>
      {tiles.map(n=> (
        <div key={n} style={{padding:10, borderRadius:6, border:'1px solid #ccc', background: n<=done? '#cfe8c2':'#f3f3f3', textAlign:'center'}}>
          {n}
        </div>
      ))}
    </div>
  )
}
