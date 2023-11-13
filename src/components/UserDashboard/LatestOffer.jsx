import styles from "../../../styles/ProfileCard.module.css";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
import Loder from "../Loder";
import Link from "next/link";
// import { toast } from "react-toastify";
import { toast, ToastContainer } from "react-toastify";

export default function LatestOffer() {
  const router = useRouter();
  const [latestOffer, setLatestOffer] = useState();
  const [allLatestOfferLoader, setAllLatestOfferLoader] = useState(false);
  const [loder, setLoder] = useState(false);

  const GetLastOffer = async () => {
    try {
      await axios
        .get(
          // `${baseUrl}/api/news?page=${currentPage}`
<<<<<<< HEAD
          'https://dev8.sidat.digital' + "/api/news"
=======
          "https://dev8.sidat.digital" + "/api/news"
>>>>>>> 3fba07fa54c805194e2e6506440e5014cf4c33b6
        )
        .then((response) => {
          const lastThreeElements = response?.data?.response?.data.slice(0, 3);
          setLatestOffer(lastThreeElements);
          setAllLatestOfferLoader(true);
        })
        .catch((error) => {
          // alert(error);
          toast.error(error, {
            autoClose: 5000,
          });
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    GetLastOffer();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.latest_offer_parent}>
      {allLatestOfferLoader ? (
        <>
          {!loder || <Loder />}
          <h3>Latest News</h3>

          {setAllLatestOfferLoader ? (
            <>
              {latestOffer &&
                latestOffer.map((item, index) => (
                  <React.Fragment key={index}>
                    <Link href={`/newsdetails?slugnews=${item.slug}`}>
                      <div className={styles.flex1}>
                        <Image
                          src={item.thumbURL}
                          loading="lazy"
                          alt="img"
                          width={10000}
                          height={10000}
                          onClick={() => {
                            setLoder(true);
                            router.push({
                              pathname: "/newsdetails",
                              query: { slugnews: item?.slug },
                            });
                          }}
                        />
                        <p>{item.title}</p>
                      </div>
                    </Link>
                  </React.Fragment>
                ))}
            </>
          ) : (
            ""
          )}
        </>
      ) : (
        ""
      )}
      <ToastContainer className="tost" />
    </div>
  );
}

// export default LatestOffer;
