
import './App.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { Toaster } from './core/components/toaster'
import { SpinnerOverlay } from './core/components/spinner-overlay'

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
      <SpinnerOverlay />
    </>
  )
}

export default App
