import React from 'react'
import { Link } from 'react-router-dom'

export default function App(){
  return (
    <div style={{maxWidth:800, margin:'2rem auto', fontFamily:'Arial'}}>
      <h1>Celoroční hra — Děkanství</h1>
      <p>Vítejte. Děti si přijdou pro odpověď ke knězi. Doma zadají odpověď přes stránku.</p>
      <ul>
        <li><Link to="/player">Jít na zadávání odpovědí (hráč)</Link></li>
        <li><Link to="/admin">Admin (správa otázek/odpovědí)</Link></li>
      </ul>
    </div>
  )
}
