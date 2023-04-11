import React, { useState } from 'react'
import AvatarUpload from './AvatarUpload'
import Axios from 'axios'

const Cloudinary = () => {
  const [logo, setLogo] = useState('')
  const [imgUpload, setImgUpload] = useState({})
  const [, setImg] = useState({})

  const handleImg = (e) => {
    if(e.target.files[0]){
      setImg({
        src: URL.createObjectURL(e.target.files[0]),
        alt: e.target.files[0].name
      })
      setLogo(e.target.files[0])
    }
  } 

  const profileUpload = async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'let_preset')
    formData.append('quality_analysis', true)
    let data = ''
    await Axios.post('https://api.cloudinary.com/v1_1/dadlfo5yu/image/upload', formData).then(
      response => {
        console.log(response)
        data = response.data['secure_url']
      }
    ).catch(err => console.log(err.response.data.error))
    return data
  }

  const handleSubmit = async (e) => {
    setImgUpload({...imgUpload, image: logo})
    await profileUpload(logo)
  }




  return (
    <div>
      <div className='flex flex-col justify-center gap-4'>
        Cloudinary
        <AvatarUpload imageUpload={handleImg} image={imgUpload.image} />  
      </div>

      <button type='submit' onClick={ (e) => { handleSubmit(e) } }>Submit</button>
    </div>
  )
}

export default Cloudinary