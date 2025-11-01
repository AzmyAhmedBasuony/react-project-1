
import './App.css'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'

function App() {
  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello World</h1>
      <Button label="Click" className="bg-blue-500 text-white p-2 rounded-md" />
  <InputText placeholder="Enter your name" />
    </>
  )
}

export default App
