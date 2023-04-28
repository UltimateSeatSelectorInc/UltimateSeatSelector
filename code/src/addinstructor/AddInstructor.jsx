import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkIfEmpty, checkIfEmailValid } from '../signup/inputVal';
import { setEmptyErrors, setFieldErrors } from '../signup/Signup';
import { auth, dbstore } from "../firebase/firebase";
import { doc, setDoc, collection, addDoc } from "firebase/firestore";
import Navbar from '../navbar/Navbar.jsx'
import emailjs from 'emailjs-com';
import { useAuth } from '../firebase/firebaseStore';
import { serverTimestamp } from 'firebase/firestore';
import './addinstructor.css'

function AddInstructor() {
  const [inviteSent, setInviteSent] = useState(false);
  const [email, setEmail] = useState('');
  const {isInstructor} = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isModalOpen) {
      const timer = setTimeout(() => {
        setIsModalOpen(false);
        navigate('/'); // Replace '/' with the path to your main page
      }, 4000); // Redirects after 4 seconds
  
      return () => clearTimeout(timer);
    }
  }, [isModalOpen, navigate]);  

  // function to send the a random verification code to be stored and verified
  async function sendVerificationCode(email) {
    const token = Math.floor(100000 + Math.random() * 900000);
    const docRef = await addDoc(collection(dbstore, "instructorInvites"), {
      email,
      token,
      createdAt: serverTimestamp()
    });
    const templateParams = {
      to_email: email,
      token: token,
    };
    emailjs
      .send('service_uba6vqc', 'template_h9xa77u', templateParams, 'eNahXD-m4bjxKbQ5V')
      .then(
        (response) => {
          console.log('SUCCESS!', response.status, response.text);
          setInviteSent(true);
          setIsModalOpen(true);
          var showMessage = document.getElementById("emailSentMsg");
          showMessage.innerHTML = "Success! Email sent..."
          showMessage.style.display = "block";
        },
        (error) => {
          console.error('FAILED...', error);
        }
      );
  }

  const handleSubmit = async () => {
    let hasErrors = false;

    if (checkIfEmpty(email)) {
      setEmptyErrors('email'); // set errors if empty
      hasErrors = true;
    }

    if (checkIfEmailValid(email) === false) {
      setFieldErrors('email'); // set errors if invalid
      hasErrors = true;
    }

    if (hasErrors === true) {
      return;
    }

    await sendVerificationCode(email);
    var showMessage = document.getElementById("emailSentMsg"); // provide useful sent msg
        showMessage.innerHTML = "Please wait..."
        showMessage.style.display = "block";
  };

  return (
    <div>
      <Navbar isActive={true} showAddInstructor={isInstructor} />

      <div class = "maintitle">
          <h1>Add Instructor</h1>
      </div>

      <div className="mainbody">
        <div className="mainbodytitle">
          <p>Invite a fellow instructor</p>
        </div>
        <div className="mainbodysubtitle">
          <p>
            Please enter the email of the person you'd like to invite as an instructor
          </p>
          <p>
            Note: Only add valid, trusted email addresses.
          </p>
        </div>
        <table className="inputTableSign">
          <tr>
            <td colSpan="2" className="cellSign">
              <input
                className="inputBoxSign"
                type="email"
                id="email"
                placeholder="Email"
                maxLength="100"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </td>
          </tr>
          <tr>
            <td colSpan="2">
              <button className="signupButton" onClick={() => { handleSubmit() }}>
                Send Invite
              </button>
            </td>
          </tr>
        </table>

          <div class = "mainbodysubtitle">
              <p class = "emailMessage" id = "emailSentMsg"></p>
          </div>

        {/* Error messages /}
        {/ ... */}
      </div>
    </div>
  );
}

export default AddInstructor;
