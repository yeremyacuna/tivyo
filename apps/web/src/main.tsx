import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { App } from './App'
import './styles.css'

// Find the HTML element where React will mount the complete Tivyo application.
const rootElement = document.getElementById('root')

// Stop the application early if the expected root element does not exist.
if (!rootElement) {
  throw new Error('Tivyo root element was not found')
}

// Create the React root and render the main application component.
// StrictMode helps detect potential problems during development.
createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
