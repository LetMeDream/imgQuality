import React, { useEffect, useState } from 'react'
import { RecordRTCPromisesHandler, invokeSaveAsDialog } from 'recordrtc'
import { IoMdClose } from 'react-icons/io'
import { useForm, FormProvider } from 'react-hook-form'

const InputVideoRTC = () => {
  const methods = useForm()
  const { register, setValue, handleSubmit, formState: { errors } } = methods
  const [recorder, setRecorder] = useState()
  const [stream, setStream] = useState()
  const [status, setStatus] = useState(null)
  const [savedBlob, setSavedBlob] = useState(null)
  // Getting permission on load
  /* const getPermissionInitializeRecorder = async () => {
      try {
      const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
      })
      const recorder = new RecordRTCPromisesHandler(stream, {
          type: 'video'
      })
      setRecorder(recorder)
      setMediaStream(stream)
      } catch (error) {
      console.log(error)
      }
  }

  useEffect(() => {
      getPermissionInitializeRecorder()
  }, []) */

  const elementAttribute = (element, attr, value) => {
    if (!attr && !value) {
      return document.querySelector(element)
    }
    return document.querySelector(`${element}[${attr}="${value}"]`)
  }

  function stopBothVideoAndAudio (stream) {
    stream.getTracks().forEach((track) => {
      track.stop()
    })
  }

  const startRecording = async () => {
    const vid = document.querySelector('video')
    vid.controls = false
    const previewImg = document.querySelector('[data-image="img-preview"]')
    previewImg.classList.remove('d-none')
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      })
      const recorder = new RecordRTCPromisesHandler(stream, {
        type: 'video'
      })
      setRecorder(recorder)
      previewImg.classList.add('d-none')
      vid.srcObject = stream
      console.log(vid)
      setStream(stream)
      recorder.startRecording()
      setStatus(await recorder.getState())
    } catch (error) {
      console.log(error)
    }
  }

  const stopSaveRecording = async () => {
    const vid = document.querySelector('video')
    const input = document.querySelector('input[type="file"]')
    const dataTransferer = new window.DataTransfer()
    vid.pause()
    await recorder.stopRecording()
    setStatus(await recorder.getState())
    const blob = await recorder.getBlob()
    // invokeSaveAsDialog(blob, 'new_name.webm')
    setSavedBlob(blob)
    const file = new window.File([blob], 'RTC_file.webm', {
      type: 'video/webm'
    })
    dataTransferer.items.add(file)
    setValue('RTC_file', file)
    input.files = dataTransferer.files

    stopBothVideoAndAudio(stream)
  }

  const pauseRecording = async () => {
    const vid = document.querySelector('video')
    vid.pause()
    await recorder.pauseRecording()
    setStatus(await recorder.getState())
  }

  const resumeRecording = async () => {
    const vid = document.querySelector('video')
    vid.play()
    await recorder.resumeRecording()
    setStatus(await recorder.getState())
  }

  const cancelRecording = async () => {
    if (window.confirm('Are you sure you want to cancel the recording?')) {
      const previewImg = elementAttribute('', 'data-image', 'img-preview')
      const video = elementAttribute('video')
      previewImg.classList.remove('d-none')
      console.log(video)
      await recorder.destroy()
      setStatus(null)
      setValue('RTC_file', '')
      setSavedBlob(null)
      stopBothVideoAndAudio(stream)
    }
  }

  const onSubmit = (data) => {
    console.log(data)
    window.alert(JSON.stringify(data.RTC_file.name))
  }

  useEffect(() => {
    console.log(errors)
  }, [errors])

  const handleFileChange = (e) => {
    console.log(e)
  }

  const downloadFile = () => {
    invokeSaveAsDialog(savedBlob, 'saved.mp4')
  }

  const styles = {
    btn: 'bg-gray-200'
  }
  return (
    <div className='App flex flex-col'>
      Calm down
      <FormProvider {...methods}>
        <div className='videoContainer border border-blue-400 relative'>
          <video autoPlay muted className='w-[520px] max-w-[90vw] h-[260px]' />
          <div
            data-image='img-preview'
            className='z-20 bg-white flex justify-center items-center border-red-400 h-[260px] w-[100%] absolute top-0 left-0'
          >
            Preview Image
          </div>
          <div className='absolute top-0 right-0 text-2xl cursor-pointer'>
            <IoMdClose onClick={cancelRecording} />
          </div>
        </div>
        <div className='flex gap-2'>
          {(!status || status === 'stopped' || status === 'destroyed') && <button onClick={startRecording} className='border'>Start</button>}
          {(status === 'recording' || status === 'paused') && <button onClick={stopSaveRecording} className='border'>Stop</button>}
          {status === 'recording' && <button onClick={pauseRecording} className='border'>Pause</button>}
          {status === 'paused' && <button onClick={resumeRecording} className='border'>Resume</button>}
        </div>
        {status && <div>Status: {status}</div>}
        <form className='flex flex-col md:flex-row items-center gap-1' onSubmit={handleSubmit(onSubmit)}>
          <input onChange={handleFileChange} type='file' {...register('RTC_file', { required: true })} />
          <button type='submit' className={styles.btn}>
            Submit
          </button>
          <button type='button' className={styles.btn} onClick={downloadFile}>
            Download
          </button>
        </form>
      </FormProvider>
    </div>
  )
}

export default InputVideoRTC
