import React, { useState } from 'react'
import "./styles.css"
import Display from "./Display.js"
import Table from "./Table.js"
import Edit from "./components/Edit.js"
import Add from "./components/Add.js"

export default function App() {
  var [info, setInfo] = useState([])
  var [sno, setSno] = useState(0)
  var [editDetails, setEditDetails] = useState([])
  var [openToEdit, setOpenToEdit] = useState(false);
  function handleClick(i){
    setInfo(i)
  }

  /* For form */
  var [open, setOpen] = useState(false);
 
  var handleClickToOpen = () => {
      console.log(open)
      setOpen(true);
      //setSno(i+1)
  };

  var handleToClose = () => {
      setOpen(false);
  };

  var lastSno = (i) => {  //To assign a unique sno while adding a record
    setSno(i)
    console.log(sno)
  }
  /* ----- */

  var handleClickToEdit = (i) => {
    setEditDetails(i);
    setOpenToEdit(true)
  }

  return (
    <div className="App">
      
      <div style={{display:"flex"}}>
        <div style={{color:"#e6d415", fontSize: 40, padding: "0px 0px 0px 10px", fontFamily: "fantasy"}}>Books</div>
        <div style={{color:"#e0e0eb", fontFamily: "Baskerville", fontStyle: "italic", padding: "15px 0px 0px 40px"}}>"Good friends, good books and a sleepy conscience: this is the ideal life"  - Mark Twain</div>
      </div>
      <div style ={{padding:"10px 0px 0px 50px"}}>
          <dialog open = {open} style = {{ backgroundColor: '#0a0a0f', color: 'white', zIndex: 99999}}><Add  sno = {sno}/></dialog>
          {/* <dialog open = {openToEdit} style = {{ backgroundColor: '#0a0a0f', color: 'white'}}><Edit  table = {editDetails} handleToClose = {handleToClose}/></dialog> */}
          {openToEdit? <dialog open = {openToEdit} style = {{ backgroundColor: '#0a0a0f', color: 'white', zIndex: 99999}}><Edit  table = {editDetails} handleToClose = {handleToClose}/></dialog>:""}
          <Display table = {info} />
          
          <Table handleClick = {handleClick}
                 handleClickToOpen = {handleClickToOpen}
                 lastSno = {lastSno}
                 handleClickToEdit = {handleClickToEdit}/>
      </div>
    </div>
  );
}