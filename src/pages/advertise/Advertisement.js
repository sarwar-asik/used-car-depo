import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../firebase/AuthProvider";
import BookModal from "../bookModal/BookModal";

const Advertisement = () => {
  const { user } = useContext(AuthContext);
  console.log(user?.email);

  const [advertises, setAdvertise] = useState([]);
  useEffect(() => {
    axios
      .get(`https://sh-server-site.vercel.app/advertise?email=${user?.email}`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((data) => {
        //   console.log(data.data);
        setAdvertise(data.data);
      });
  }, [user?.email]);

  const [paids, setPaid] = useState([]);

  useEffect(() => {
    axios.get(`https://sh-server-site.vercel.app/payment`).then((data) => {
      //   console.log(data.data);
      setPaid(data.data);
    });
  }, []);

  // console.log(paids);

  const [productInfo, setproducts] = useState({});
  const [isModal, setModal] = useState(true);

  const productData = (data) => {
    setproducts(data);
    // console.log(data);
  };

  return (
    <div className="max-w-[98%] mx-auto ">
      {/* <h1 className="text-center text-5xl my-5 "> Advertise Items </h1> */}
      <div
        className=" grid sm:grid-cols-1
    md:grid-cols-2  lg:grid-cols-3 gap-5"
      >
        {advertises?.map((advertise) => {
          const { name, price, img, descriptions } = advertise;
          // console.log(paids);
          const alreadyPaid = paids.find(
            (pay) => pay?.name === advertise?.name
          );
          // console.log(alreadyPaid);
          if (!alreadyPaid) {
            return (
              <div className="card w-96 bg-base-100 mx-auto shadow-xl image-full">
                <figure className=" h-[250px]">
                  <img className="w-[100%]" src={img} alt="Shoes" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-white">{name}</h2>
                  <p>{descriptions}</p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary">${price}</button>

                    <label
                      onClick={() => productData(advertise)}
                      htmlFor="my-modal-6"
                      className="btn btn-outline btn-accent"
                    >
                      Book Now
                    </label>
                  </div>
                </div>
                {isModal && (
                  <BookModal productInfo={productInfo} setModal={setModal} />
                )}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default Advertisement;
