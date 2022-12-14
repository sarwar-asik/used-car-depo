import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../loader/Loader";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  const [loading, setlodaing] = useState(false);

  useEffect(() => {
    axios.get(`https://sh-server-site.vercel.app/categories`).then((data) => {
      //   console.log(data.data);
      setCategories(data.data);
      setlodaing(true);
    });
  }, []);

  return (
    <div className="my-5">
      <h1 className="text-3xl text-center py-5 font-bold">Total Categories</h1>
      {loading || <Loader />}
      <div
        className="grid sm:grid-cols-1
    md:grid-cols-2  lg:grid-cols-3 gap-3"
      >
        {categories.map((category) => {
          return (
            <Link to={`/products/${category._id}`}>
              <div className="card  w-[400px] mx-auto">
                <figure>
                <img className="mask mask-square max-w-[80%] max-h-60 " src={category.img} alt="" />
                
                </figure>
                <div className="card-body">
                  <h2 className="text-2xl font-semibold text-center">{category.name}</h2>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
