import {  Card, Container,Button} from "react-bootstrap";
import React, { useState } from 'react';
import { Task } from "./Card";
import { CardModal } from "./CardModal";
export const Coloum=(props)=>{
const [addCard,setAddCard]=useState(false)

const onClose =()=>{
    setAddCard(false)
}

const delCol=()=>{
    fetch(`http://localhost:8001/api/createCard/${props.col._id}`,{method: 'POST'})
    .then((res)=>res.json())
    .then((res=>{props.reset()}))
}
    return(
        <>
        <CardModal show={addCard} onCancel={onClose}/>
        <Container style={{width:"1000px"}}>
  <h3 style={{ textAlign:"center"}}>{props.col.title}
  </h3>
  <Button size="sm" onClick={()=>setAddCard(true)} variant="primary">Add Card</Button>
  <Button size="sm"onClick={()=>delCol(props.col._id)} variant="danger" style={{marginLeft:"5px"}}>Delete</Button> 
  <Card style={{height:"520px",border:"2px solid black",width:"250px"}}>
           {props.cards && props.cards.length>1 && props.cards.map(card=>{
                <Task card={card}>

                </Task>
           })}
           <Task/>
            </Card>
</Container>
        </>
    )
}