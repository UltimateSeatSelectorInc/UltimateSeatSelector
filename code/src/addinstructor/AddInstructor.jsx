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
import Modal from "react-modal";
import './addinstructor.css'

function AddInstructor() {
  const [inviteSent, setInviteSent] = useState(false);
  const [email, setEmail] = useState('');
  const { isInstructor } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isModalOpen) {
      const timer = setTimeout(() => {
        setIsModalOpen(false);
        navigate('/'); // Replace '/' with the path to your main page
      }, 5000); // Redirects after 5 seconds
  
      return () => clearTimeout(timer);
    }
  }, [isModalOpen, navigate]);  

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
        },
        (error) => {
          console.error('FAILED...', error);
        }
      );
  }

  const handleSubmit = async () => {
    let hasErrors = false;

    if (checkIfEmpty(email)) {
      setEmptyErrors('email');
      hasErrors = true;
    }

    if (checkIfEmailValid(email) === false) {
      setFieldErrors('email');
      hasErrors = true;
    }

    if (hasErrors === true) {
      return;
    }

    await sendVerificationCode(email);
  };

  return (
    <div>
      <Navbar isActive={true} showAddInstructor={isInstructor} />
      <br></br><br></br><br></br>
      <Modal // Regular Modal - popup
              isOpen={isModalOpen}
              onRequestClose={() => setIsModalOpen(false)}
              contentLabel="Example Modal"
              className = "lecternModal"
              style={{
                overlay: {
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  zIndex: 999,
                },
                content: {
                  position: "fixed",
                  top: "35%",
                  left: "50%",
                  backgroundColor: "#1a1d29",
                  transform: "translate(-50%, -50%)",
                  color: "white",
                  backgroundColor: "#1a1d29",
                  border: "black",
                  borderRadius: "10px",
                  outline: "none",
                  padding: "10px"
                },
              }}
            >
            <div className = "popupStyle2">
              <h3>Invite Sent!</h3>
              <p className = "infoMsg">Please click the button below. The page will refresh automatically in 5 seconds</p>
              <button className = "submitButton" onClick={()=>{navigate('/');}}>Close</button>
            </div>
        </Modal>
      <div className="mainbody">
        <div className="mainbodytitle">
          <p>Invite a fellow instructor</p>
        </div>
        <div className="mainbodysubtitle">
          <p>
            Please enter the email of the person you'd like to invite as an instructor
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

        {/* Error messages /}
        {/ ... */}
      </div>
    </div>
  );
}

export default AddInstructor;
