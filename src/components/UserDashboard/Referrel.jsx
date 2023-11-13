import React, { useEffect, useState } from "react";
import styles from "../../../styles/ProfileCard.module.css";
import Button from "./Button";
import { reactLocalStorage } from "reactjs-localstorage";
// import { baseUrl } from "../../config/Config";
import localStorage from "local-storage";
import axios from "axios";
// import { toast } from "react-toastify";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Referrel = () => {
  const userToken = localStorage.get("loginAuth")?.data?.api_token;

  const handleCopy = async () => {
<<<<<<< HEAD
    if (!isCopying && !isButtonDisabled) {
      try {
        setIsCopying(true);
        const response = await axios.post(
          // `${baseUrl}/api/member/copy-refer`,
          'https://dev8.sidat.digital' + "/api/member/copy-refer",
=======
    try {
      const response = await axios.post(
        // `${baseUrl}/api/member/copy-refer`,
        "https://dev8.sidat.digital" + "/api/member/copy-refer",
>>>>>>> 3fba07fa54c805194e2e6506440e5014cf4c33b6

        {},
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      // alert(response.data.message);
      setCopyLink(response?.data?.link);
      // console.log(response.data, "checking response");
    } catch (error) {
      console.error(error);
      // alert(error.message);
      toast.error(error.message, {
        autoClose: 5000,
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        // `${baseUrl}/api/member/refer`
<<<<<<< HEAD
        'https://dev8.sidat.digital' + "/api/member/refer",
=======
        "https://dev8.sidat.digital" + "/api/member/refer",
>>>>>>> 3fba07fa54c805194e2e6506440e5014cf4c33b6
        { email: email },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      if (response?.data?.status === true) {
        // alert(response?.data?.mail_message);
        toast.success(response?.data?.mail_message);
        setEmail(""); // Clear the email input field
      } else if (
        response?.data?.status === false &&
        response?.data?.message === "The user with this email is already exist"
      ) {
        // alert("The user with this email is already exist");
        toast.warn("The user with this email is already exist");
      }
    } catch (error) {
      // alert.error(error?.response?.data?.message);
      toast.error(error?.response?.data?.message, {
        autoClose: 5000,
      });
    }
  };
  const [user, setUser] = useState(null);
  const [copylink, setCopyLink] = useState(null);
  const [email, setEmail] = useState("");
  useEffect(() => {
    setUser(reactLocalStorage.getObject("loginAuth").data);
  }, []);

  return (
    <div className={styles.referrel_parent}>
      <form className={styles.referrel_parent2} onSubmit={handleSubmit}>
        <h3>Refer Friend</h3>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Email"
          required
        />
        <button>Submit</button>
      </form>
      <Button text="Copy Link" onClick={handleCopy} link={copylink} />
      {/* <ToastContainer className="tost" /> */}
    </div>
  );
};

export default Referrel;
