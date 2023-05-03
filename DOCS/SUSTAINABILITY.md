## Ultimate Seat Selector Documentation

### What is Ultimate Seat Selector?

As you probably already know, Ultimate Seat Selector is a React web app that uses interactive elements to allow students and instructors to claim seats in a particular classroom. The app is hosted on Azure (Azure acts like the backend, so there is no running backend code) and Firebase using their Realtime Database, Authentication, and Firestore Database.

The Realtime database keeps track of the seats by updating their occupancy in real time. The authentication handles... well, authentication. The firestore database contains users. It contains first name, last name and email. We use them to display user information on the website, whereas the authentication just handles logging in/out and persistence. The UID of the user in authentication is the exact same as the UID of each user in the firestore, so they can easily be cross referenced. Our firebase project can be found [here](https://console.firebase.google.com/u/1/project/ultimate-seat-selector-15f36/overview).

### How can I get started?

Make a clone of this repository and cd into the `code` folder. You will have to first install a few
dependencies. They are listed at the bottom of this document. Once you have all of them installed,
you should be able to run the app locally. Type `npm start` and it will open in your browser.

If you are going to host the website on Azure, see [here](https://github.com/UltimateSeatSelectorInc/UltimateSeatSelector/blob/f994936e787dfff1ce2da13db116f45eab328a81/DOCS/HOSTING.md) for a walkthrough.

You will also need the owner of the Firebase database (the professor) to give you edit permissions if you are going to be adjusting the databases at all.

### What else did we want to do?

- Implement a proper backend that hosts the index.js file that builds the seat database (it was
  already ran once, and doesn't really need to be again, but should be)
- Implement environment variables to hide API keys for our database and other services (easy to do on Azure)
- Implement a classroom builder that allows instructors to build other classroom layouts via 
  draggable svg elements.
- Modularize the code a little better

### DEPENDENCIES 
- @testing-library/jest-dom@5.16.5
- @testing-library/react@13.4.0
- @testing-library/user-event@13.5.0
- email-js@2.0.2
- emailjs-com@2.6.4
- emailjs@4.0.1
- firebase-admin@11.5.0
- firebase-auth@0.1.2
- firebase@9.18.0
- framer-motion@10.9.1
- react-dom@18.2.0
- react-modal@3.16.1
- react-router-dom@6.10.0
- react-router@6.10.0
- react-scripts@5.0.1
- react@18.2.0
- sheetjs-style@0.15.8
- sheetjs@2.0.0
- svgson@5.2.1
- web-vitals@2.1.4
- xlsx@0.18.5
