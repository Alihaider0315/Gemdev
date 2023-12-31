import TopBar from "../src/components/TopBar/EntTopBar";
import Footer from "../src/components/Footer/Footer";
import styles from "../talenthunt_styles/AboutCompetition.module.css";
import ScrollToTopButton from "../src/components/ScrollToTopButton/ScrollToTopButton";
import axios from "axios";
import { useEffect, useState } from "react";
import InnerBaner from "../src/components/Baner/innerBaner";
import Loder from "../src/components/Loder";
import moment from "moment/moment";
import localStorage from "local-storage";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";

export default function AboutCompetition() {
  const [banner, setBanner] = useState();
  const [content, setContent] = useState();
  const [loder, setLoder] = useState(true);
  const [aboutCompetitionLoader, setAboutCompetition] = useState(false);
  // USER Activity
  const router = useRouter();
  const [pageName, setPageName] = useState("");
  const [pageURL, setPageURL] = useState("");
  const [localDateTime, setLocalDateTime] = useState([]);
  useEffect(() => {
    const storedPage = localStorage.get("currentPage");
    if (storedPage) {
      setCurrentPage(parseInt(storedPage));
    }
  }, []);

  useEffect(() => {
    const currentPage = router.route;
    const formattedPageName = currentPage.startsWith("/")
      ? currentPage.substring(1)
      : currentPage;
    setPageName(formattedPageName);
    // Get the page URL
    setPageURL(window.location.href);

    // Get the formatted local date and time
    const getCurrentDateTime = () => {
      const currentDateTime = moment().format("MM/DD/YYYY hh:mm A");
      setLocalDateTime(currentDateTime);
    };
    // Update the local time every second
    const interval = setInterval(getCurrentDateTime, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [router]);
  useEffect(() => {
    const userToken = localStorage.get("loginAuth")?.data?.api_token;
    if (userToken) {
      UserActivity();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageName, pageURL, localDateTime]);

  const UserActivity = async () => {
    const userToken = localStorage.get("loginAuth")?.data?.api_token;
    try {
      if (pageName && pageURL && localDateTime) {
        const requestBody = {
          page_name: pageName,
          page_url: pageURL,
          date_time: localDateTime,
        };
        const response = await axios.post(
<<<<<<< HEAD
          'https://dev8.sidat.digital' + "/api/member/add-user-activity",
=======
          "https://dev8.sidat.digital" + "/api/member/add-user-activity",
>>>>>>> 3fba07fa54c805194e2e6506440e5014cf4c33b6
          requestBody,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );

        if (response.data.status === true) {
          setPageName("");
          setPageURL("");
          setLocalDateTime("");
        }
      }
    } catch (error) {
      console.error("Error recording user activity:", error);
    }
  };
  const GetBanner = async () => {
    try {
      await axios
        .get(
<<<<<<< HEAD
          'https://dev8.sidat.digital' +
=======
          "https://dev8.sidat.digital" +
>>>>>>> 3fba07fa54c805194e2e6506440e5014cf4c33b6
            "/api/banners?s[page]=about-competition-detail&s[type]=Landing"
        )

        .then((response) => {
          setBanner(response?.data?.response?.data[0]);
          setAboutCompetition(true);
          setLoder(false);
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
      const response = await axios.get(
<<<<<<< HEAD
        'https://dev8.sidat.digital' + "/api/page/about-competition"
=======
        "https://dev8.sidat.digital" + "/api/page/about-competition"
>>>>>>> 3fba07fa54c805194e2e6506440e5014cf4c33b6
      );
      setContent(response?.data?.response);
      setAboutCompetition(true);
      setLoder(false);
    } catch (error) {
      console.error("Error Fetching Content:", error);
      setContent(null);
      setAboutCompetition(true);
    }
  };

  const isUserLoggedIn = !!localStorage.get("loginAuth")?.data?.api_token;

  useEffect(() => {
    if (!isUserLoggedIn) {
      // If the user is not logged in, redirect to the login page
      router.push("/login"); // Replace "/login" with your actual login page URL
    } else {
      // If the user is logged in, fetch the page data
      GetBanner();
      GetContent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const backgroundImageUrl = content?.thumbnailUrl || ""; // Use empty string as default if thumbnailUrl is undefined

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <ScrollToTopButton />

      <TopBar />
      {!loder || <Loder />}
      {aboutCompetitionLoader ? (
        <>
          <InnerBaner
            source={
              banner?.file_type == "image" ? banner?.imageURL : banner?.videoURL
            }
            fileType={banner?.file_type}
            headingBanner={banner?.title}
          />

          <div className={styles.about_competition_main}>
            <div className={styles.about_competition_sec2}>
              <div className={styles.about_competition_sec2_sub1}>
                <h3 dangerouslySetInnerHTML={{ __html: content?.tagline }}></h3>
                <span
                  className={styles.content}
                  dangerouslySetInnerHTML={{ __html: content?.content }}
                ></span>
              </div>
              {content?.thumbnailUrl && (
                <div
                  style={{
                    backgroundImage: `url(${content.thumbnailUrl})`,
                  }}
                  className={styles.about_competition_sec2_sub2}
                ></div>
              )}
            </div>
          </div>
        </>
      ) : (
        ""
      )}
      <ToastContainer className="tost" />

      <Footer />
    </div>
  );
}
