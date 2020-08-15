import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { Button } from "react-bootstrap";
 
const Dropzone = () => {
  const onDrop = useCallback(acceptedFiles => {
		debugger
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
	
		let color = isDragActive ? "success" : "warning"
 
  return (
    <Button variant={color} {...getRootProps()}>
      <input {...getInputProps()} />
			Upload Workout Data Here
     
    </Button>
  )
}

export default Dropzone

