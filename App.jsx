import React, { useState } from 'react'
import Pagemen from './component/pagemen'
import Page from './component/Page'



export default function App() {
    const [user,setuser]=useState([
		
		])
    const [down,setdown]=useState(1);

  return (
		
    <div>
        <div className='news'>
        <button onClick={() => setdown(1)}>text</button>
        <button onClick={() => setdown(2)}>Users</button>
    </div>
    {
      down === 1 ? <Page/> : <Pagemen uset={user} set={setuser}/>
    }

    </div>

  )
}
