import React, { useEffect, useState } from "react";
import TopBar from "../src/components/TopBar/EntTopBar";
import Footer from "../src/components/Footer/Footer";
import styles from "../styles/TermsAndConditions.module.css";
import ScrollToTopButton from "../src/components/ScrollToTopButton/ScrollToTopButton";
import axios from "axios";
import Loder from "../src/components/Loder";
import InnerBaner from "../src/components/Baner/innerBaner";
// import { toast } from "react-toastify";
import { toast, ToastContainer } from "react-toastify";

const PrivacyPolicy = () => {
  const [content, setContent] = useState();
  const [banner, setBanner] = useState(null);

  const [contentLoader, setContentLoader] = useState(false);
  const [loder, setLoder] = useState(true);

  const GetBanner = async () => {
    try {
      await axios
        .get(
          // `${baseUrl}/api/banners?s[page]=Partners&s[type]=Landing`

<<<<<<< HEAD
          'https://dev8.sidat.digital' +
=======
          "https://dev8.sidat.digital" +
>>>>>>> 3fba07fa54c805194e2e6506440e5014cf4c33b6
            "/api/banners?s[page]=Privacy Policy&s[type]=Landing"
        )
        .then((response) => {
          setBanner(response?.data?.response?.data[0]);
          setLoder(false);
          setContentLoader(true);
        })
        .catch((error) => {
          toast.error(error, { autoClose: 5000 });
        });
    } catch (error) {
      console.log(error);
    }
  };

  const GetContent = async () => {
    try {
      await axios
        .get(
          // `${baseUrl}/api/page/mission-she`
<<<<<<< HEAD
          'https://dev8.sidat.digital' + "/api/page/privacy-policy"
=======
          "https://dev8.sidat.digital" + "/api/page/privacy-policy"
>>>>>>> 3fba07fa54c805194e2e6506440e5014cf4c33b6
        )
        .then((response) => {
          setContent(response?.data?.response);
          setLoder(false);
          // console.log("check", response.data.response);

          setContentLoader(true);
        })
        .catch((error) => {
          toast.error(error, { autoClose: 5000 });
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetContent();
    GetBanner();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // backgroundColor: "black",
      }}
    >
      <ScrollToTopButton />
      <TopBar />
      {!loder || <Loder />}

      <InnerBaner
        source={
          banner?.file_type == "image" ? banner?.imageURL : banner?.videoURL
        }
        fileType={banner?.file_type}
        headingBanner={banner?.title}
      />

      <div className={styles.privacy_policy_baner_sec1}>
        {contentLoader ? (
          <div className={styles.about_competition_sec2_sub1}>
            <h3 dangerouslySetInnerHTML={{ __html: content?.tagline }}></h3>
            <span dangerouslySetInnerHTML={{ __html: content?.content }}></span>
          </div>
        ) : (
          ""
        )}
        <ToastContainer className="tost" />
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
