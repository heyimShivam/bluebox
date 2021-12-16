import React, { useEffect, useState } from "react";
import SimpleReactValidator from "simple-react-validator";
import PaymentApp from "../../payment";
import { ReactSession } from 'react-client-session';
import { getCoupon, getTotal, getHdyfu } from "../../../data/API";

export default function Step6(props) {
  // console.log(props);
  const [, forceUpdate] = React.useState();
  const [hdyfu, sethdyfu] = useState([]);

  const validator = React.useRef(new SimpleReactValidator());

  const { delivery_detail, pickup_detail, total, getDiscountprice, address, card, setCard, orderid, setOrderid, details, setDetails, pickupdetails, setPickupdetails, personaldetails, setPersonal, setPreview, preview } = props;
  const [personal, setPersonalDetails] = React.useState({
    first_name: "",
    last_name: "",
    email_address: "",
    phone_number: "",
    secondary_phone_number: "",
    company_name: "",
    voucher_code: "",
    hdyfu: "",
    session: ReactSession.get('session'),
  });
  const [isError, setError] = React.useState(false);
  const [errorMsg1, setMsg1] = React.useState("");
  const [errorMsg2, setMsg2] = React.useState("");

  const handleChange = (event) => {
    setPersonalDetails({
      ...personal, [event.target.name]: event.target.value,
    });

    if (event.target.name == "first_name") {
      if (event.target.value) {
        // localStorage.setItem("fname",event.target.value);
      }
    }
    if (event.target.name == "last_name") {
      if (event.target.value) {
        // localStorage.setItem("lname",event.target.value);
      }
    }
    if (event.target.name == "email_address") {
      if (event.target.value) {
        // localStorage.setItem("email",event.target.value);
      }
    }
    if (event.target.name == "phone_number") {
      if (event.target.value) {
        // localStorage.setItem("phone",event.target.value);
      }
    }
    if (event.target.name == "secondary_phone_number") {
      if (event.target.value) {
        // localStorage.setItem("sphone",event.target.value);
      }
    }
    if (event.target.name == "company_name") {
      if (event.target.value) {
        // localStorage.setItem("company",event.target.value);
      }
    }
    if (event.target.name == "voucher_code") {
      if (event.target.value) {
        // localStorage.setItem("voucher_code",event.target.value);
      }
    }

    if (event.target.name == "hdyfu") {
      if (event.target.value) {
        // localStorage.setItem("hdyfu",event.target.value);


      }
    }



    if (document.getElementById('first_name').value || document.getElementById('last_name').value || document.getElementById('email_address').value || document.getElementById('phone_number').value) {
      // setError(false);
      if (event.target.name == "voucher_code") {

        if (event.target.value) {
          // console.log(event.target.value.length)
          // if (event.target.value.length < 6) {
          //   setError(true);
          //   setMsg2("invalid length of coupon");
          //   setMsg1("")
          // }
          // else {
          // setError(false);
          const coupon = event.target.value;
          const email = personal.email_address

          getCoupon(ReactSession.get('session'), coupon, email)
            .then((res) => {
              console.log(res);
              if (res?.data?.success == "true") {
                setError(false)
                setError(true);
                setMsg2("")
                props.setTotal(res?.data?.discounted_session_total);
                props.setDiscountprice(res?.data?.discount);
                // console.log(props.getDiscountprice)
                setMsg1(res?.data?.msg);
                setMsg2("");
              } else {
                setError(true);
                setMsg2(res?.data?.msg);
                setMsg1("");
                props.setDiscountprice(0);
              }
            })
          // }
        }

      }

    }
    else {
      setError(true)
      setMsg2("Please enter all details then you applie coupon")
    }


  };

  const callApi = () => {
    getHdyfu()
      .then((res) => {
        sethdyfu(res.data);
      })
      .catch((e) => console.log(e));

  };
  useEffect(() => {
    callApi();
  }, []);


  return (
    <>
      {/* {ReactSession.get('session')} */}
      {/* { localStorage.getItem('session') } */}
      <div className="step6" id="step6">
        <h2 className="bg-primary text-white text-center py-2">
          Step 6: Personal Detail And Payment
        </h2>
        <div className="row">
          <div className="container px-5 my-4">
            <div className="row py-4">
              <h5>Add Personal Details</h5>
              <hr />
              <div className="row">
                <div className="col-md-6 mt-3">
                  <label>First Name *</label>

                  <input
                    type="text"
                    id="first_name"
                    className="form-control"
                    placeholder="John"
                    name="first_name"
                    value={personal.first_name}
                    onChange={(e) => handleChange(e)}
                  />
                  {validator.current.message(
                    "First Name",
                    personal.first_name,
                    "required",
                    { className: "text-danger" }
                  )}
                </div>
                <div className="col-md-6 mt-3">
                  <label>Last Name *</label>
                  <input
                    type="text"
                    id="last_name"
                    className="form-control"
                    placeholder="Deo"
                    name="last_name"
                    value={personal.last_name}
                    onChange={(e) => handleChange(e)}
                  />
                  {validator.current.message(
                    "Last Name",
                    personal.last_name,
                    "required",
                    { className: "text-danger" }
                  )}
                </div>
                <div className="col-md-6 mt-3">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    id="email_address"
                    className="form-control"
                    placeholder="john@gmail.com"
                    name="email_address"
                    value={personal.email_address}
                    onChange={(e) => handleChange(e)}
                  />
                  {validator.current.message(
                    "Email",
                    personal.email_address,
                    "required",
                    { className: "text-danger" }
                  )}
                </div>
                <div className="col-md-6 mt-3">
                  <label>Phone Number *</label>
                  <input
                    type="text"
                    id="phone_number"
                    className="form-control"
                    placeholder="+1 121 121 1212"
                    name="phone_number"
                    value={personal.phone_number}
                    onChange={(e) => handleChange(e)}
                  />
                  {validator.current.message(
                    "Email",
                    personal.phone_number,
                    "required",
                    { className: "text-danger" }
                  )}
                </div>
                <div className="col-md-6 mt-3">
                  <label>Secondary Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="+1 121 121 1212"
                    name="secondary_phone_number"
                    value={personal.secondary_phone_number}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="col-md-6 mt-3">
                  <label>Company Name (Office Orders Only)</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="doe.pvt.lmt"
                    name="company_name"
                    value={personal.company_name}
                    onChange={(e) => handleChange(e)}
                  />

                  {validator.current.message(
                    "company_name",
                    personal.company_name,
                    "required",
                    { className: "text-danger" }
                  )}
                </div>
                <div className="col-md-6 mt-3">
                  <div className="buttonIn">

                    <label>Got a voucher code?</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Coupon Code"
                      name="voucher_code"
                      autoComplete="off"
                      // maxLength="6"
                      value={personal.voucher_code}
                    onChange={(e) => handleChange(e, props)}
                    />
                    {/* <button id="clear"  onClick={(e) => codeApply(e)}  >Apply</button> */}
                    {/* <button className="btn btn-dark couponbtn" onClick={(e) => handleChange(e, props)} >
                      Apply Coupon
                    </button> */}
                  </div>
                  {isError ? <p style={{ color: "green" }}>{errorMsg1} </p> : ""}
                  {isError ? <p style={{ color: "red" }}>{errorMsg2} </p> : ""}
                </div>

                <div className="col-md-6 mt-3">
                  <label>How did you find us? *</label>
                  {/* <input
                    className="form-control"
                    name="hdyfu"
                    value={personal.hdyfu}
                    onChange={(e) => handleChange(e)}
                  ></input> */}
                  <select
                    className="form-control"
                    name="hdyfu"
                    value={personal.hdyfu}
                    onChange={(e) => handleChange(e)}
                  >
                    <option value="" selected>
                      Select Type
                    </option>
                    {hdyfu.results?.map((obj) => {
                      return <option value={obj.id} >{obj.title}</option>;
                    })}
                  </select>

                  {validator.current.message(
                    "How did you find us",
                    personal.hdyfu,
                    "required",
                    { className: "text-danger" }
                  )}
                </div>
              </div>
              <br></br>

              <h5 style={{ marginTop: "20px" }}>Enter Payment Details</h5>
              <hr />
              <PaymentApp
                delivery_detail={delivery_detail}
                pickup_detail={pickup_detail}
                personal={personal}
                total={total}
                discount={getDiscountprice}
                address={address}
                card={card}
                setCard={setCard}
                orderid={orderid}
                setOrderid={setOrderid}
                details={details}
                setDetails={setDetails}
                pickupdetails={pickupdetails}
                setPickupdetails={setPickupdetails}
                personaldetails={personaldetails}
                setPersonal={setPersonal}
                setPreview={setPreview}
                preview={preview}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
