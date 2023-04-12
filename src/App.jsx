import './App.css'
import ImgPicker from './components/ImgPicker/ImgPicker'
import Cloudinary from './components/cloudinary/Cloudinary'

function App () {
  return (
    <div className='App flex items-stretch'>
      {/* <ImgPicker /> */}
      <Cloudinary />
    </div>
  )
}

export default App
