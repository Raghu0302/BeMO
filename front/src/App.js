import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Container, Navbar,Modal } from 'react-bootstrap';
import { Coloum } from './Components/Coloum';
import { useEffect, useState } from 'react';

function App() {

  const [colums,setColums]=useState([])
  const [cards,setCards]=useState({})
  const [colName,setColName]= useState("")
  useEffect(()=>{
    getCols();
  },[])
const getCols =()=>{
  fetch("http://localhost:8001/api/getAllColumns")
  .then((res)=>res.json())
  .then(res=>{setColums(res.data)})
}
  useEffect(()=>{
    const cards={}
    colums.forEach((col)=>{
      fetch("http://localhost:8001/api/getCardById",{method: 'POST',body:JSON.stringify({coloum_id:col._id})})
      .then((res)=>res.json())
      .then((res=>{cards[col._id]=res.data;}))
    })
    setCards(cards)
},[colums])

const addColoum=()=>{
setColName("")
let form= new FormData()
form.append("title",colName)
fetch("http://localhost:8001/api/createColumn",{method: 'POST',body:form})
.then((res)=>res.json())
.then((res=>{getCols()}))
}

  return (<>
      <Container>
  <Navbar   variant="dark" bg="dark">
    <Container>
      <Navbar.Brand>JIRA</Navbar.Brand>
    </Container>
  </Navbar>
  <Button  variant="primary" onClick={addColoum}>Add coloum</Button>
      <input value={colName} onChange={event=>setColName(event.target.value)}></input>
</Container>
<Container style={{margin:"5px",display:"flex"}}>
{cards!=={} && colums.map((colum,index)=>
{
  return <Coloum reset={getCols}col={colum} cards={cards[colum._id]}  key={index}/>
})}
</Container>
</>
  );
}

export default App;
