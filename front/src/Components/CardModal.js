import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

export const CardModal=(props)=>{
    const [value,setValue]=useState("")
    const [desc,setDesc] = useState("")
    const save=()=>{

    }
    return(
        <>
        <Modal show={props.show}>
            <div style={{margin:'10px'}}>
            <label style={{display:'block'}}>title</label>
            <input style={{display:'block'}} onChange={(event)=>setValue(event.target.value)} value={value}></input>
            <label style={{display:'block'}}>description</label>
            <textarea style={{display:'block',width:"100%"}}type="textarea" onChange={(event)=>setDesc(event.target.value)} value={value}></textarea>
            <div style={{display:"flex",marginTop:"10px"}}>
            <Button size="sm" style={{width:"100px"}} variant="primary" onClick={()=>save()}> Save</Button>
            <Button size="sm" style={{width:"100px"}} variant="danger"  onClick={()=>{props.onCancel()}}> cancel</Button>
            </div>
            </div>
        </Modal>
        </>)
}