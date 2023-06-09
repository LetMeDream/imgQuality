import React, { useState, useRef } from 'react'
import { AiFillDelete, AiFillFileAdd } from 'react-icons/ai'

const ImgUploader = (props) => {
  const [img, setImg] = useState('')
  const inputFileRef = useRef(null)
  const cleanUp = () => {
    URL.revokeObjectURL(img)
    /* inputFileRef.current.value = null; */
  }
  const setImage = (newImage) => {
    if (img) cleanUp()
    setImg(newImage)
  }
  const handleOnChange = (e) => {
    // console.log(img)
    const newImage = e.target.files[0]
    // console.log(newImage)
    if (newImage) {
      setImage(URL.createObjectURL(newImage))
    }
    props.imageUpload(e)
  }

  return (
    <div className=''>
      <img className='w-[300px] m-auto mb-5' src={img} alt='No image yet' />
      <input
        type='file'
        accept='image/*'
        style={{ display: 'none' }}
        id='imgUpload'
        name='imgUpload'
        ref={inputFileRef}
        onChange={handleOnChange}
      />

      <label
        className='flex cursor-pointer px-4 py-2 caret-transparent items-center gap-2 h-full w-full    transition-all border-transparent outline-none rounded-md bg-gray-400 hover:bg-gray-300 hover:outline-none hover:border-transparent focus:outline-none'
        htmlFor='imgUpload'

      >
        {img ? <AiFillDelete /> : <AiFillFileAdd />}
        {img ? 'Uploaded' : 'Upload'}
      </label>

    </div>
  )
}

export default ImgUploader
