import React, { useState } from 'react'
import ImgUploader from './ImgUploader'
import Axios from 'axios'

const Cloudinary = () => {
  const [imgFile, setImgFile] = useState('')
  const [focusScore, setFocusScore] = useState(null)
  const [fileName, setFileName] = useState('')

  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImgFile(e.target.files[0])
    }
  }

  const profileUpload = async (file) => {
    const formData = new FormData()
    formData.set('file', file)
    formData.set('upload_preset', 'let_preset')
    // let data = ''
    await Axios.post('https://api.cloudinary.com/v1_1/dadlfo5yu/image/upload', formData).then(
      response => {
        console.log(response.data)
        setFocusScore(response.data.quality_analysis.focus)
        setFileName(response.data.public_id.substring(0, response.data.public_id.lastIndexOf('_')))
        // data = response.data.secure_url
      }
    ).catch(err => console.log(err.response.data.error))
    // return data
  }

  const handleSubmit = async () => {
    await profileUpload(imgFile)
  }

  return (
    <div>
      <div className='flex flex-col justify-center gap-4'>
        Custom Cloudinary
        <ImgUploader imageUpload={handleImg} />
      </div>
      <div>
        <h2>
          File name: {fileName}
        </h2>
        <h2>
          Focus score: <strong>{focusScore?.toFixed(3) ?? 'n/a'}</strong>
        </h2>
      </div>
      <button type='submit' onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default Cloudinary
