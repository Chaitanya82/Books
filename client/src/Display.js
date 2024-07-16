import React from "react";
import './styles.css'
import BookCollage1 from './images/BookCollage1.jpg'
import Add from './components/Add.js'
import {books} from './components'


export default function Display(props){
    const imageName = (x) => {
        if (!x) {
            return BookCollage1
        }else{
            return x
        }
    }
    return(
        <div style={{height: "250px", width: "1100px"}}>
            <div style={{height: "240px", width: "1100px", backgroundColor: "#282828", borderRadius: "15px", display: "flex"}}>
                <div><img src={imageName(props.table.image)} style={{height: "210px", width: "140px", margin: "10px 0px 0px 10px"}}  /></div>
                <div style={{height: "230px", width: "1100px", textAlign: "justify", padding: "10px 30px 10px 20px", color: "#e0e0eb"}}>
                    <div style={{margin: "0px 0px 20px 0px", fontSize: "2.5em", fontFamily: 'Times New Roman', color: '#faa005', fontWeight: 1000}}>{!(props.table.name)?<div>Welcome</div>:<div>{props.table.name}</div>}</div>
                    <div>{!(props.table.description)?<div>Surf through our vivid catalogue of books that will help you discover solace.
                        Tales from souls brimming with innocent desire of weaving words and taking us places beyond our mundane lives. </div>:<div>{props.table.description}</div>}</div>
                </div>
            </div>
        </div>

    );
}