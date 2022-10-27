import React from 'react'
import {getSession, useSession} from 'next-auth/react'
import {Heading} from '@chakra-ui/react'
import {useRouter} from 'next/router'

const Protected = () => {
    const {push} = useRouter()
    const {data: session, status} = useSession({
        required: true, //This means this is a protected page, authentication is required. This will redirect to signing page. Clientside authentication checking.

        //If not wish it redirecting to Signin page automatically and wish to redirect to something else. And if not wish it to be refreshed.
        onUnauthenticated: () => {
            push('auth/signin')
        }
    })

    if(status == 'loading') {
        return <Heading>Loading...</Heading>
    }

    if(status == 'unauthenticated') return <Heading> You are unauthenticated. This is a protected page.</Heading>

  return (
    <Heading>
        {session.user.email}
    </Heading>
  )
}

//ServerSide authentication check

// export const getServerSideProps = async (ctx) => {
//     const session = await getSession(ctx)

//     if(!session) return {
//         redirect: {
//             destination: '/auth/signin'
//         }
//     }
 
//     return {
//         props: {session}
//     }
// }



export default Protected