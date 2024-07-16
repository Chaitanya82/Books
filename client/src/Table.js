import React, {useState, useEffect} from "react";
import './styles.css'
import Add from './components/Add.js'
import Axios from 'axios'
//import { books } from './components'

export default function Table(props){
    
    var [ contents, setContents] = useState([]);
    var [ sample, setSample ] = useState([]);
    var [ checked, setChecked ] = useState(false)
    var [ deleteId, setDeleteId ] = useState();
    var [ page, setPage ] = useState(0);
    var [ searchValue, setSearchValue ] = useState();
    var [ backup, setBackup ] = useState([]);
    var [ count, setCount ] = useState(0)
    function twoClick(){
       Add.style.display = 'block'
    }

    function oneClick(x, y){
        var tbl = document.getElementById("tbl");
        var chks = tbl.getElementsByTagName("input");
        for(var i = 0; i<contents.length; i++){
            chks[i].checked = false;
            if (x == contents[i]._id){
                chks[i].checked = true
            }
        }
        setDeleteId(y)
        console.log(x)
    }
    function ans(event){
        console.log(sample)
    }

    const fetchData = () => {
        Axios.get("http://localhost:3000/get",{
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then((response) =>{                
            setContents(response.data);
            setBackup(response.data);
            {props.lastSno(response.data[response.data.length - 1].sno)}
            console.log('Fetch Data completed ' + response.data[response.data.length - 1].name)
            console.log('Latest Sno: '+ response.data[response.data.length - 1].sno)
            
        })
        .catch((error)=>{
            console.log(error)
        });
        return 'The function is called'
    }

    useEffect(()=>{
        
        
        fetchData();        
    }, []);

    /*useEffect(()=>{
        //{props.collectionSize(backup[backup.length - 1].sno)}
        console.log('Backup: ')
        console.log(backup)
    })*/

    var deleteRecord = (movie) => {
        
         Axios.delete('http://localhost:3000/delete',{
            data:{
                sno: movie.sno
            }
        }).then(response=>{window.location.reload()}).catch((err)=>{console.log(err)})
    }

    var searchRecord = () => {
        //contents = []
        setContents(backup)
        //window.location.reload()
        //{fetchData};
        
        console.log(contents)
        var result = []
        for(var i in backup){
            if((backup[i].name.includes(searchValue)) || (backup[i].author.includes(searchValue)) || (backup[i].genre.includes(searchValue))){
                result.push(backup[i])
            }
        }
        setContents(result)
        console.log('Search Record Completed')
    }
   
    return(
        
        <div style={{height: "250px", width: "1100px", borderRadius:"15px", backgroundColor: '#252525', color:"white"}}>
            <div style={{display:"flex", padding:"10px"}}>
                <button className = 'View' onClick={(event)=>{props.handleClick(sample)}}>View</button>
                <button className='Add' onClick={props.handleClickToOpen} >Add</button>
                <button className = 'Edit' onClick={(event)=>{props.handleClickToEdit(sample)}}>Edit</button>
                <button className = 'Delete' onClick={(e)=>{deleteRecord(sample)}}>Delete</button>
                <input type = 'text' className = 'Search' placeholder = 'Search ...' 
                    style = {{marginLeft: "250px", heigth: "21px", width: "400px", backgroundColor: "#181818", color: "white", paddingLeft: "1em"}}
                    onChange = { (e) => {setSearchValue(e.target.value)}} />
                <button className = 'Search' onClick={searchRecord}>Search</button>
            </div>
            
            <table style={{padding:"10px", width: "1100px"}} id='tbl'>
            <div style={{overflowY: 'scroll', height: '180px'}}>
                <thead style={{position:'sticky', top:'0px', backgroundColor: '#252525'}}>
                    <tr>
                        <th></th>
                        <th style={{width:'400px', color: '#f0d50c', fontWeight: 1000}}>Name</th>
                        <th style={{width:'400px', color: '#f0d50c', fontWeight: 1000}}>Author</th>
                        <th style={{width:'400px', color: '#f0d50c', fontWeight: 1000}}>Genre</th>
                    </tr>
                </thead>
                
                <tbody>
                
                    {
                        contents.map( (content, key) =>
                        <tr key={key}>
                            <td><input type="checkbox" name='check' style={{backgroundColor:'black'}}
                                onChange={(event) => {setSample(content)}} 
                                onClick={(e) => {oneClick(content._id, content.sno)}} /></td>
                            <td>{content.name}</td>
                            <td>{content.author}</td>
                            <td>{content.genre}</td>
                        </tr>)
                    }
                    
                </tbody>
                </div>
                
            </table>            
        </div>
    );
                
}