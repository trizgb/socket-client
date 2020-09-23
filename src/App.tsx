import React, { FC, useEffect, useState } from 'react'
import './App.css'
import socketIOClient from 'socket.io-client'


const SOCKET_SERVER_URL = ''
const socket = socketIOClient(SOCKET_SERVER_URL)

export interface Message {
  user_id: string 
  account_id: string
  text: string
}

const App: FC = () => {
  const [response, setResponse] = useState('')

  useEffect(() => {
    socket.on("connect", () => {
      console.log('connected? ', socket.connected)
      // channel join
      socket.emit("join", {user_id: 'user_id', account_id: 'account_id'})
      // incoming message from channel joined
      socket.on("message", (message: Message) => {
        console.log('Incoming message: ', message)
        setResponse(message.text)
     })
    })
  }, [])

  return (
    <div className="app">
      <h1>Socket client</h1>
      <div>
        {response}
      </div>
    </div>
  )
}

export default App
