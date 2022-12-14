import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../firebase/AuthProvider";
import useRoleCheck from "../../hooks/useRoleCheck";

const Dashbord = () => {
  const { user } = useContext(AuthContext);
  const [roleCheck] = useRoleCheck(user?.email);
  console.log(roleCheck);
  const ItemDash = <React.Fragment>
    {
      roleCheck ==='seller'&& <>
      <Link to="/addproducts"> Add Products</Link>
     <Link to="/selllerproducts"> My Products </Link>
      </>
    }
    {
      roleCheck ==='buyer'  && <>
      <Link to="/myorders"> My Orders </Link>
      </>
    }
    {
      roleCheck === 'Admin'&&
      <>
             <Link to="/categories">Add Categories </Link>
              <Link to="/allseller"> All Sellers </Link>
              <Link to="/allbuyer"> All Buyers </Link>
              <Link to="/report"> Reported Item </Link>
      </>
    }
  </React.Fragment>

  return (
    <div>
      <div className="drawer drawer-mobile">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content"></div>
        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-base-100 text-base-content">
            <li>
              
              {
                ItemDash
              }
                <Link to="/myorders"> My Orders </Link>
              
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashbord;
