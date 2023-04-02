import React from 'react'
import { Navigate } from 'react-router-dom'

function Protected({ isSignedIn, children, isInstructor }) {
  if (isSignedIn === false) {
    return <Navigate to="/Login" replace />
  } else if (isInstructor === false) {
    return <Navigate to="/" replace />
  }
  return children
}

function Protected2({ isSignedIn, children }) {
    if (isSignedIn === true) {
      return <Navigate to="/" replace />
    } else
    return children
  }

export {Protected, Protected2}