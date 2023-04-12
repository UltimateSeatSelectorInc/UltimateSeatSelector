import React from 'react'
import { Navigate } from 'react-router-dom'

// function that handles reroutes if a user is signed in, or verified or an instructor
function Protected({ isSignedIn, isVerified, children, isInstructor }) {
  if (isSignedIn === false) {
    return <Navigate to="/login" replace />
  } else if (isInstructor === false) {
    return <Navigate to="/" replace />
  } else if (isVerified === false) {
    return <Navigate to = "/verify" replace />
  }
  return children
}

// function that simply navigates users to the main page if they are logged in
function Protected2({ isSignedIn, children }) {
    if (isSignedIn === true) {
      return <Navigate to="/" replace />
    } else
    return children
}


export { Protected, Protected2, }