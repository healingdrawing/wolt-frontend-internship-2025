import React from 'react'
import { createRoot } from 'react-dom/client'
import { DOPCalc } from '../c/DOPCalc'

const box = document.getElementById('react-content')

if (box) {
  const root = createRoot(box)
  root.render(
      // <React.StrictMode> //todo hide. render duplicator for debug
          <DOPCalc />
      // </React.StrictMode>
  )
}