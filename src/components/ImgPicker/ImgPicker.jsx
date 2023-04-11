import React from 'react'
import ReactImagePickerEditor from 'react-image-picker-editor';
import 'react-image-picker-editor/dist/index.css'
import './ImgPicker.css'

const config2 = {
  borderRadius: '8px',
  language: 'es',
  width: '250px',
  height: '250px',
  objectFit: 'contain',
  compressInitial: null,
};
// const initialImage: string = '/assets/images/8ptAya.webp';
const initialImage = '';

const ImgPicker = () => {
  const [imageSrc, setImageSrc] = React.useState('')

  const onImgChange = (newDataUri) => {
    /* console.log(newDataUri); */
    setImageSrc(newDataUri)
  }

  return <div>
          < ReactImagePickerEditor
              config={config2}
              imageSrcProp={initialImage}
              imageChanged={onImgChange} />
          </div>
}

export default ImgPicker