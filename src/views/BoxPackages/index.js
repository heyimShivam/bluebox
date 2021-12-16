import React, { useEffect, useState } from "react";
import MasterForm from "./components/MasterForm";
import { getBoxPackages, getTotalCart, clearCart } from "../../data/API";
import Tabs from "./components/Tabs";
import uuid from 'react-uuid'
import { ReactSession } from 'react-client-session';

ReactSession.setStoreType("localStorage");

if (ReactSession.get('session')) {
  const sessionid = ReactSession.get('session')
  ReactSession.set("session", sessionid);
} else {
  const sessionid = uuid();
  ReactSession.set("session", sessionid);
}

export default function MovingBox(props) {
  props.setShowHideHeader(false);
  props.setshowHideFooter(false);
  props.setshowHideinnerFooter(true);

  const [box, setBox] = React.useState({});
  const [packings, setPackings] = React.useState([]);
  const [movings, setMovings] = React.useState([]);
  const [total, setTotal] = React.useState([]);
  // const [total, setTotal] = React.useState([]);
  const [header, setHeader] = React.useState(true);
  const [rentalid, setRentalId] = React.useState("be7f2421-2168-45ce-ab4e-d5ed5f68ab69");
  const [getDeliverydate, setDeliverydate] = React.useState([""]);

  
  const [category, setCategory] = useState("Home");
  const [products, setProducts] = useState([]);
  const [sub_category, setSubCate] = useState("Box Packges");
  const [select_rental, setSelectedRental] = React.useState('2 Week');
  const [active, setActive] = React.useState('');
  const [delivetslot1,setDelivetslot1] = React.useState([]);
  const [delivetslot2,setDelivetslot2] = React.useState([]);
  const [pickupslot1,setPickupslot1] = React.useState([]);
  const [pickupslot2,setPickupslot2] = React.useState([]);
  const [tax, setTax] = React.useState('');
  const [card, setCard] = React.useState('');
  const [orderid, setOrderid] = React.useState('');
  // const [getNewAddress, setNewAddress] = React.useState([]);

  const [address, setAddress] = React.useState({  
    city: "", 
    country: "",
    line1: "",
    line2: "",
    state: "",
    postal: ""
  });

  const setnewcategory = (newcat) => {
    // localStorage.setItem('tab',newcat);

    if (newcat == "Office") {
      document.getElementById("homebtn").classList.remove("active");
      document.getElementById("officebtn").classList.add("active");

    } else {
      document.getElementById("officebtn").classList.remove("active");
      document.getElementById("homebtn").classList.add("active");

    }
    localStorage.setItem("tab",newcat)

    setActive(localStorage.getItem("tab"));
    setCategory(localStorage.getItem("tab"));
    
    getBoxPackages(newcat, "Box Packges", '2 Week')
    .then((res) => {
      clearCart(ReactSession.get('session'));
      setBox("");
      setProducts(res?.data);
    })
    .catch((e) => console.log(e));
    //wait
    };

  const setDefaultValue = () => {
      if(localStorage.getItem("tab") != ""){
      var tabbutton =localStorage.getItem("tab");
    }
  
    setTimeout(function() {
        if( tabbutton == 'Office') {
          
          setActive('Office');
          getBoxPackages(localStorage.getItem("tab"), "Box Packges", '2 Week')
          .then((res) => {
          setProducts(res?.data);
          })
          .catch((e) => console.log(e));
          // setnewcategory('Office');
        } 
        else {
          // alert("2")
          setActive('Home');
          getBoxPackages(localStorage.getItem("tab"), "Box Packges", '2 Week')
          .then((res) => {
           setProducts(res?.data);
          })
          .catch((e) => console.log(e));
          // setnewcategory('Home');
        }
    },1000)
    
        
  }
  React.useEffect(() => {
    setDefaultValue();
   
  }, [])

  return (
    <>
      <Tabs />
      <section className="show_btn">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2>Select Your Package</h2>
              <p>All packages include everything you need for an easy, stress-free move.</p>
            </div>
            <div className="col-md-12">
              <button className={`rounded-right ${(active=='Home')?'active':''} homebtn`} id="homebtn" value="Home" onClick={(e) => setnewcategory('Home')} >HOME</button>
              <button className={`rounded-left ${(active=='Office')?'active':''} officebtn`} id="officebtn" value="Office" onClick={(e) => setnewcategory('Office')}>OFFICE</button>
            </div>

          </div>
        </div>
      </section>
      <MasterForm
        setBox={setBox}
        setPackings={setPackings}
        packings={packings}
        moving_products={movings}
        setMovings={setMovings}
        movings={movings}
        setTotal={setTotal}
        total={total}
        packing_products={props.packings}
        box={box}
        setRentalId={setRentalId}
        rentalid={rentalid}
        category={category}
        setCategory={setCategory}
        products={products}
        setProducts={setProducts}
        sub_category={sub_category}
        setSubCate={setSubCate}
        select_rental={select_rental}
        setSelectedRental={setSelectedRental}
        address={address}
        setAddress={setAddress}
        header={header}
        setHeader={setHeader}
        tax={tax}
        setTax={setTax}
        delivetslot1={delivetslot1}
        setDelivetslot1={setDelivetslot1}
        delivetslot2={delivetslot2}
        setDelivetslot2={setDelivetslot2}
        getDeliverydate={getDeliverydate}
        setDeliverydate={setDeliverydate}
        pickupslot1={pickupslot1}
        setPickupslot1={setPickupslot1}
        pickupslot2={pickupslot2}
        setPickupslot2={setPickupslot2}
        card={card}
        setCard={setCard}
        orderid={orderid}
        setOrderid={setOrderid}
        // getNewAddress={getNewAddress}
        // setNewAddress={setNewAddress}

      />

    </>
  );
}
