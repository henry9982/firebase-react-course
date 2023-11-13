import React, { useEffect, useState } from 'react'
import Auth from './components/Auth'
import "./App.css"
import {collection, getDocs ,addDoc ,doc, deleteDoc ,updateDoc} from 'firebase/firestore'
import { auth, db, storage } from './config/firebase'
import { ref ,uploadBytes } from 'firebase/storage'

const firebase = () => {

  const movieCollectionRef = collection(db,"movies")

  // New Movie States
  const [newMovieTitle,setNewMovieTitle] = useState('')
  const [newReleaseDate,setNewReleaseDate] = useState(0)
  const [isNewMovieOscar,setIsNewMovieOscar] = useState(false)

  // updateTitle
  const [updateTitle,setUpdateTitle] = useState("")

  // upload file
  const [fileUpload,setFileUpload] = useState({})

  const [movieList,setMovieList] = useState([])

  const getData = async()=>{
    try{
      const data = await getDocs(movieCollectionRef)
      const filteredData = data.docs.map(doc=>({...doc.data(),id:doc.id}))
      setMovieList(filteredData)
      console.log(filteredData);
    }catch(err){
      console.error(err);
    }
  }

  useEffect(()=>{
    getData()
  },[])

  const onSubmit = async()=>{
    try{
      const object = {
        title: newMovieTitle,
        releaseDate:newReleaseDate,
        receivedAnOscar:isNewMovieOscar,
        userId:auth?.currentUser?.uid
      }
      const data = await addDoc(movieCollectionRef , object)
      getData()
    }catch(err){
      console.error(err);
    }

  }

  const deleteMovie = async(id)=>{
    console.log("Current user UID:", auth?.currentUser?.uid);
    try {
      const movieDoc = doc(db, 'movies', id);
      await deleteDoc(movieDoc);
      getData();
    } catch (err) {
      console.error(err);
    }
  }

  const updateMovieTitle = async(id)=>{
    const movieDoc = doc(db,'movies',id)
    const data = await updateDoc(movieDoc,{title:updateTitle})
    getData()
  }

  const uploadFile = async()=>{
    if(!fileUpload) return;
    console.log(fileUpload);
    const fileUploadRef = ref(storage,`projectFiles/${fileUpload.name}`)
    try {
      uploadBytes(fileUploadRef,fileUpload)
    } catch (error) {
      console.log(`file upload error: ${error}`);
    }
  }

  return (
    <div className='app'>
      <Auth/>
      <input value={newMovieTitle} onChange={(e)=>setNewMovieTitle(e.target.value)} type="text" placeholder='Movie title...'/>
      <input value={newReleaseDate} onChange={(e)=>setNewReleaseDate(e.target.value)} type="number" placeholder='Released date...'/>
      <input checked={isNewMovieOscar} onChange={(e)=>setIsNewMovieOscar(e.target.checked)} type="checkbox" name='check'/>
      <label htmlFor="check">Received an Oscar</label>
      <button onClick={onSubmit}>Submit Movie</button>

      <div>
        {movieList.map(movie=><div key={movie.id}>
          <h1 style={{color: movie.receivedAnOscar?"green":"red"}}>{movie.title}</h1>
          <h3>{movie.releaseDate}</h3>
          <button onClick={()=>deleteMovie(movie.id)}>Delete</button>
          <input type="text"  onChange={(e)=>setUpdateTitle(e.target.value)} placeholder='New title...'/>
          <button onClick={()=>updateMovieTitle(movie.id)}>Update Title</button>
        </div>)}
      </div>


      <div>
        <input type="file" onChange={e=>setFileUpload(e.target.files[0])}/>
        <button onClick={uploadFile}>Upload File</button>
      </div>

    </div>
  )
}

export default firebase