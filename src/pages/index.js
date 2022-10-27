import React from "react";
import { Heading, Button, Grid } from "@chakra-ui/react";
import { useSession, signIn, signOut } from "next-auth/react";
import {useRouter } from 'next/router'

const Home = () => {
  const { data: session } = useSession();
  // console.log(session)

  const {push, asPath} = useRouter()

  const handleSignOut = async () => {
   const data = await signOut({redirect: false, callbackUrl:'/home'})
   push(data.url)
  }

  const handleSignIn = () =>{
    push(`/auth/signin?callbackUrl=${asPath}`)
  }

  return (
    <Grid placeItems='center' gridRowGap='1rem'>
      {session ? (
        <>
        <Heading>Signed In with {session.user.email}</Heading>
        <p>Hello {session.user.name}</p>
        <Button onClick={handleSignOut}>Sign Out</Button>
        </>
      ) : (
        <>
          <Heading>Not Signed In</Heading>
          <Button onClick={handleSignIn}>Sign In</Button>
        </>
      )}
    </Grid>
  );
};

export default Home;
