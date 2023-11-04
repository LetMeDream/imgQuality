import React, { useEffect, useState } from 'react'
import { RecordRTCPromisesHandler } from 'recordrtc'
import { IoMdClose } from 'react-icons/io'
import { useForm, FormProvider } from 'react-hook-form'

const InputVideoRTC = () => {
  const methods = useForm()
  const { register, setValue, handleSubmit, formState: { errors } } = methods
  const [recorder, setRecorder] = useState()
  const [stream, setStream] = useState()
  const [status, setStatus] = useState(null)
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
    vid.controls= false
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
      setStream(stream)
      recorder.startRecording()
      setStatus(await recorder.getState())
    } catch (error) {
      console.log(error)
    }
  }

  const stopSaveRecording = async () => {
    const vid = document.querySelector('video')
    vid.pause()
    await recorder.stopRecording()
    setStatus(await recorder.getState())
    const blob = await recorder.getBlob()
    // invokeSaveAsDialog(blob, 'new_name.webm')

    const file = new File([blob], 'RTC_file.webm', {
      type: 'video/mp4'
    })
    setValue('RTC_file', file)
    vid.controls = true
    vid.currentTime = 0
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
      stopBothVideoAndAudio(stream)
    }
  }

  const onSubmit = (data) => {
    console.log(data)
    console.log(errors)
  }

  useEffect(() => {
    console.log(errors)
  }, [errors])

  return (
    <div className='App flex flex-col'>
      Calm down
      <FormProvider {...methods}>
        <div className='videoContainer border min-w-[220px] border-blue-400 relative'>
          <video muted className='w-[520px] h-[260px]' />
          <div
            data-image='img-preview'
            className='cursor-pointer z-20 bg-white flex justify-center items-center border-red-400 h-[260px] w-[100%] absolute top-0 left-0'
          >
            Preview Image
          </div>
          <div className='absolute top-0 right-0 text-2xl cursor-pointer'>
            <IoMdClose onClick={cancelRecording} />
          </div>
        </div>
        <div className='flex gap-2'>
          {(!status || status === 'stopped' || status === 'destroyed') && <button onClick={startRecording} className='border'>Start</button>}
          {status && <button onClick={stopSaveRecording} className='border'>Stop</button>}
          {status === 'recording' && <button onClick={pauseRecording} className='border'>Pause</button>}
          {status === 'paused' && <button onClick={resumeRecording} className='border'>Resume</button>}
        </div>
        {status && <div>Status: {status}</div>}
        <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
          <input type='file' {...register('RTC_file', { required: true })} />
          <button type='submit' className='border'>
            Submit
          </button>
        </form>
      </FormProvider>
    </div>
  )
}

export default InputVideoRTC
