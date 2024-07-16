import React, {useState} from 'react'
import '../../src/styles.css'
import Axios from 'axios'

export default function Add(props){
    var [movieName, setMovieName] = useState('')
    var [movieAuthor, setMovieAuthor] = useState('')
    var [movieGenre, setMovieGenre] = useState('')
    var [movieDescription, setMovieDescription] = useState('')
    var [movieImage, setMovieImage] = useState('')
    var movieSno = props.sno

    var handleSubmit = (e) => {
        e.preventDefault();
        //console.log(movieSno)
        Axios.post('http://localhost:3000/add',{
            name: movieName,
            genre: movieGenre,
            author: movieAuthor,
            description: movieDescription,
            sno: movieSno + 1,
            image: movieImage

            
        })
        window.location.reload()
    }

    const handleBase64ImgConversion = (e) => {
        console.log(e.target.files)
        const data = new FileReader()
        data.addEventListener('load', ()=>{
            setMovieImage(data.result)
        })
        data.readAsDataURL(e.target.files[0])
    }

    return(
        <div style = {{height: '350px', width: '400px', color: '#fdff78'}}>
            <form style = {{display: 'flex', flexDirection: 'column'}}>
                <label for = 'name' className = 'name'>Name</label>
                <input type = 'text' id = 'name'
                 style = {{backgroundColor: '#36454f', color: 'white', margin: '3px 0px 3px 0px'}}
                 onChange = {(e)=>{setMovieName(e.target.value)}} />
                
                <label for = 'author' className = 'author'>Author</label>
                <input type = 'text' id = 'author' 
                 style = {{backgroundColor: '#36454f', color: 'white', margin: '3px 0px 3px 0px'}}
                 onChange = {(e)=> {setMovieAuthor(e.target.value)}}/>
                
                <label for = 'genre' className = 'genre'>Genre</label>
                <input type = 'text' id = 'genre' 
                 style = {{backgroundColor: '#36454f', color: 'white',margin: '3px 0px 3px 0px'}}
                 onChange = {(e)=> {setMovieGenre(e.target.value)}} />
                
                <label for = 'description' className = 'description'>Description</label>
                <input type = 'text' id = 'description' 
                 style = {{backgroundColor: '#36454f', color: 'white',margin: '3px 0px 3px 0px'}}
                 onChange = {(e)=> {setMovieDescription(e.target.value)}} />

                 <div style={{textAlign: 'left', margin: '3px 0px 3px 0px'}}>Image</div>
                    <input type = 'file' id = 'image' onChange = {handleBase64ImgConversion} />

                <div className = 'formButtons'>
                    <button style = {{backgroundColor: '#014702', color: '#02c205', margin: '10px 2px 0px 0px'}} onClick={handleSubmit}>Submit</button>
                    <button style = {{backgroundColor: '#470201', color: '#d60602', margin: '10px 0px 0px 2px'}} onClick={props.handleToClose}>Cancel</button>
                </div>
                
            </form>
        </div>
    );

}