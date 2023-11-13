import styles from "../../../styles/SignupStep2.module.css";
import Link from "next/link";
import axios from "axios";
import { useState, useEffect } from "react";
// import { baseUrl } from "@/src/config/Config";
// import { baseUrl } from "../../config/Config";
import logo from "../../../src/asset/gemlogo.png";
import Image from "next/image";

export default function SignupStep2({
  setStep1,
  setStep2,
  setStep3,
  setSignup,
  signup,
}) {
  const [selectedCountry, setSelectedCountry] = useState("Select");
  const [countryList, setCountryList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [selectedCity, setSelectedCity] = useState("Select");
  const [dob, setDob] = useState("");
  const [promo_code, setpromo_code] = useState("");
  const [kprivate, setKPrivate] = useState(0);

  useEffect(() => {
    axios
      .get(
        // `${baseUrl}/api/ajax/countries`
        'https://dev8.sidat.digital' + "/api/ajax/countries"
      )
      .then((response) => {
        // handle the response here
        setCountryList(response.data);
      })
      .catch((error) => {
        // handle any errors here
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        // `${baseUrl}/api/ajax/cities/${selectedCountry}`
        'https://dev8.sidat.digital' + "/api/ajax/cities/" + selectedCountry
      )
      .then((response) => {
        setCityList(response.data);
      })
      .catch((error) => {
        // handle any errors here
        console.error(error);
      });
  }, [selectedCountry]);

  const handleSubmit = () => {
    let margedata = {
      ...signup,
      city: selectedCity,
      country: selectedCountry,
      promo_code: promo_code,
      dob: dob,
      private: kprivate,
    };
    setSignup(margedata);

    setStep2(false);
    setStep3(true);
  };
  // console.log(signup);

  return (
    <div className={styles.signup_step1}>
      <div className={styles.signup_container}>
        <div className={styles.steper_parent}>
          <div className={styles.steps_box}>
            <div className={styles.step1_box}>1</div>
            <div className={styles.steper_dash}></div>
            <div className={styles.step2_box} style={{ background: "#fcc100" }}>
              2
            </div>
            <div className={styles.steper_dash}></div>
            <div className={styles.step3_box}>3</div>
          </div>
          <div className={styles.steper}>
            <div></div>
            <div>Personal data</div>
            <div> </div>
          </div>
        </div>
        <div className={styles.signup_sub_container}>
          {/* <Link href="ent" className={styles.link}> */}
          <Link href="/" className={styles.link}>
            <Image
              style={{ height: "130px", width: "130px" }}
              src={logo}
              loading="lazy"
              alt="logo"
            />
          </Link>
          {/* <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p> */}
        </div>

        <div className={styles.signup_form}>
          <div className={styles.signup_form_sec1}>
            <h1>Create Account</h1>
            <p>Welcome! Please enter your details.</p>
          </div>
          <div className={styles.signup_form_sec2}>
            <div>
              <p style={{ color: "#C2C2C2" }}>Countary</p>
              <select
                className={styles.select}
                value={selectedCountry}
                onChange={(e) => {
                  setSelectedCountry(e.target.value);
                }}
              >
                <option value={"Select"} className={styles.option}>
                  Select
                </option>
                {countryList.map((item) => (
                  // eslint-disable-next-line react/jsx-key
                  <option className={styles.option} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p style={{ color: "#C2C2C2" }}>City</p>

              <select
                className={styles.select}
                value={selectedCity}
                onChange={(e) => {
                  setSelectedCity(e.target.value);
                  // console.log("e", e.target.value);
                }}
              >
                <option value={"Select"} className={styles.option}>
                  Select
                </option>
                {cityList.map((item) => (
                  // eslint-disable-next-line react/jsx-key
                  <option className={styles.option} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.signup_form_sec3}>
            <div>
              <p style={{ color: "#C2C2C2" }}>Date of Birth</p>

              <input
                className={styles.date}
                name="date"
                type="date"
                value={dob}
                onChange={(e) => {
                  setDob(e.target.value);
                }}
              />
            </div>
            {/* <div >
              <label>
                <input className={styles.checkbox} type="checkbox" />
                Keep it Private
              </label>
            </div> */}
            <div className={styles.form_group}>
              <input
                type="checkbox"
                id="javascript"
                onChange={(e) =>
                  e.target.checked === true ? setKPrivate(1) : setKPrivate(0)
                }
              />
              <label className={styles.checkbox} for="javascript">
                Keep it Private
              </label>
            </div>
          </div>
          {/* <div className={styles.signup_form_sec4}>
            <div>
              <p style={{ color: "#C2C2C2" }}>Reference</p>

              <input
                className={styles.date}
                placeholder="Enter a reference"
                type="text"
                value={promo_code}
                onChange={(e) => {
                  setpromo_code(e.target.value);
                }}
              />
            </div>
          </div> */}

          <button onClick={handleSubmit} className={styles.signup_form_btn}>
            Next
          </button>
          <button
            onClick={() => {
              setStep1(true);
              setStep2(false);
            }}
            className={styles.signup_form_btn}
          >
            Back
          </button>

          <div className={styles.signup_form_sec5}>
            <p style={{ marginRight: "5px" }}>Dont Have an Account</p>
            <Link href="signup">Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
