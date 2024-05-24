import { Grid } from '@mui/material'
import React from 'react'
import MessageList from "../components/MessageList"
import Messages from "../components/Messages"
function Chats() {
  return (
    <Grid container gap={3}>
      <Grid item>
        <MessageList/>
      </Grid>
      <Grid item>
        <Messages/>
      </Grid>
    </Grid>
  )
}

export default Chats