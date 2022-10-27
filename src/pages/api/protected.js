import {getSession} from 'next-auth/react'

const Handler = async (req, res) => { 
    const session = await getSession({req})

    if(session) return res.send(session)
    
    return res.send('Not authenticated')
 }

export default Handler