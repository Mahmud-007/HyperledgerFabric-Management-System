import React,{useState} from 'react'
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import _ from "lodash";
import { v4 } from 'uuid';
import axios from 'axios'

const item = {
    id: v4(),
    name: ""
  }
  
  const item2 = {
    id: v4(),
    name: ""
  }

export default function Todo() {

  const [channel, setChannel] = useState('');
  const [CCName, setCCName] = useState('');
  const [CCFile, setCCFile] = useState('');
  const [CCLanguage, setCCLanguage] = useState('');

    const [text, setText] = useState("")
    const [state, setState] = useState({
    "todo": {
      title: "Queue",
      items: []
    },
    "field": {
      title: "Network Field",
      items: []
    },
    // "done": {
    //   title: "Completed",
    //   items: []
    // }
  })

  const handleDragEnd = ({destination, source}) =>{
      console.log("from: ",source)
      console.log("to: ",destination)
      if (!destination){
          console.log("not dropped in the dropable")
          return;
      }
      if (destination.index === source.index && destination.droppableId === source.droppableId) {
        console.log("dropped in the same place")
        return
      }

      if(source.droppableId=="todo"){
        const channel = state[source.droppableId].items[source.index]
        console.log("channel",channel)
        axios.get(`http://localhost:4000/create/channel/${channel.name}`)
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
            .catch(error=>{
                console.log(error)
            })
      }
      const itemCopy = {...state[source.droppableId].items[source.index]}
      console.log(itemCopy)
      
      
      setState(prev => {
        prev = {...prev}
        // Remove from previous items array
        prev[source.droppableId].items.splice(source.index, 1)
  
  
        // Adding to new items array location
        prev[destination.droppableId].items.splice(destination.index, 0, itemCopy)
  
        return prev
      })  
    
    }

    const addOrg3 = (name)=>{
      console.log("add org3 on: ",name)
      axios.get(`http://localhost:4000/addorg/${name}`)
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
            .catch(error=>{
                console.log("add",error)
            })
    }
      const addItem = () => {
        setState(prev => {
          return {
            ...prev,
            todo: {
              title: "Queue",
              items: [
                {
                  id: v4(),
                  name: text
                },
                ...prev.todo.items
              ]
            }
          }
        })
    
        setText("")
      }

      const deployCC = (event) => {
        event.preventDefault();
        console.log(CCName,CCFile,CCLanguage);
        axios.get(`http://localhost:4000/deploycc?ccname=${CCName}&channelname=${channel}&ccfile=${CCFile}&cclanguage=${CCLanguage}`)
        .then(res => {
            console.log(res)
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <div >
          <div className="container">
            <input  type="text" value={text} placeholder="Channel Name" onChange={(e) => setText(e.target.value)}/>
            <button className="btn btn-primary" onClick={addItem}>Add To Queue</button>
          </div>
        <div className="container">
          
            <form onSubmit={deployCC}>
                  <input type="text" placeholder="Chaincode Name"
                      onChange={(event)=>{
                      setCCName(event.target.value)
                  }}></input>
                  <input type="text" placeholder="Channel Name" className="m-3"
                      onChange={(event)=>{
                      setChannel(event.target.value)
                  }}></input>
                  <input type="text" placeholder="Chaincode File" className="m-3"
                      onChange={(event)=>{
                      setCCFile(event.target.value)
                  }}></input>
                  <input type="text" placeholder="Chaincode Language" className="m-3"
                      onChange={(event)=>{
                      setCCLanguage(event.target.value)
                  }}></input>
                  <button type="submit" className="btn btn-primary">Deploy</button>
          </form>
      </div>
      <div>
        <div className="todo ">
            <DragDropContext 
            onDragEnd={handleDragEnd}
            >
                {_.map(state, (data, key) => {
                    return (
                        <div 
                            key={key}
                            className={"column text-center"}>
                            <h3>{data.title}</h3>
                            <Droppable droppableId={key}>
                            {
                                (provided) => {
                                    return (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            className={"droppable-col"}
                                        >
                                            {data.items.map((el,index) => {
                                                return (
                                                    <Draggable 
                                                    key={el.id} 
                                                    index={index}
                                                    draggableId={el.id}
                                                    >
                                                        {(provided) =>{
                                                            return (
                                                                <div
                                                                className="item"
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                >
                                                                    {el.name}
                                                                    <br/>
                                                                    <button 
                                                                    onClick={addOrg3.bind(this,el.name)}>
                                                                    addorg</button>
                                                                </div>
                                                            )
                                                        }}
                                                    </Draggable>
                                                )
                                            })}
                                            {provided.placeholder}
                                        </div>
                                    )
                                }
                            }
                        </Droppable>
                        </div>
                    )
                })}
            </DragDropContext>
        </div>
      </div>
    </div>
        
    )
}
