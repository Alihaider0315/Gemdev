import React from 'react'
import { useState } from 'react';
import styles from "../../../styles/ProfileCard.module.css";


const Button = ({ text, onClick, link }) => {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    if (link) {
      navigator.clipboard.writeText(link);
      setCopied(true); // Set the copied state to true
      setTimeout(() => {
        setCopied(false); // Reset the copied state after 3 seconds
      }, 3000);
    }
    if (onClick) {
      onClick();
    }
  };
  
    return (
      <div>
      <button  onClick={handleClick}>
        {text}
      </button>
      {copied && <div className={styles.message} >Link copied!</div>} {/* Render the message component */}
    </div>
    );
  };
  
  export default Button;