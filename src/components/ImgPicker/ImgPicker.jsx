import React from 'react'
import ReactImagePickerEditor from 'react-image-picker-editor'
import 'react-image-picker-editor/dist/index.css'
import './ImgPicker.css'

const config2 = {
  borderRadius: '8px',
  language: 'es',
  width: '250px',
  height: '250px',
  objectFit: 'contain',
  compressInitial: null
}
const initialImage = ''

const ImgPicker = () => {
  const [, setImageSrc] = React.useState('')

  const onImgChange = (newDataUri) => {
    setImageSrc(newDataUri)
  }

  return (
    <div>
      React-image-picker-editor
      <ReactImagePickerEditor
        config={config2}
        imageSrcProp={initialImage}
        imageChanged={onImgChange}
      />
    </div>
  )
}

export default ImgPicker
