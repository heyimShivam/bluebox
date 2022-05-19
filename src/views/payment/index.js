// This example shows you how to set up React Stripe.js and use Elements.
// Learn how to accept a payment using the official Stripe docs.
// https://www.stripe.com/docs/payments/integration-builder

import React, { useState } from "react";
import { placeOrder, addPersonal, addOrder, getPersonaldetails, getDeliverDetails, getPickupDetails, getPreview } from "../../data/API";

import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import { ReactSession } from 'react-client-session';
import Previewloader from "../BoxPackages/components/Previewloader";
// import { propTypes } from "react-bootstrap/esm/Image";
// import { propTypes } from "react-bootstrap/esm/Image";
// s
// import "./styles.css";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      //   color: "#fff",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      //   fontSmoothing: "antialiased",
      //   ":-webkit-autofill": {
      //     color: "#fce883",
      //   },
      "::placeholder": {
        color: "#87bbfd",
      },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

// alert(personal);
const Field = ({
  label,
  id,
  type,
  placeholder,
  required,
  autoComplete,
  value,
  onChange,
}) => (
  <div className="col-md-6 mt-3">
    <label htmlFor={id}>{label}</label>
    <input
      className="form-control"
      id={id}
      type={type}
      placeholder={placeholder}
      required={required}
      autoComplete={autoComplete}
      value={value}
      onChange={onChange}
    />
  </div>
);

const SubmitButton = ({ processing, error, children, disabled }) => (
  <button
    className={`btn btn-dark text-uppercase step4Btn SubmitButton ${error ? "SubmitButton--error" : ""
      }`}
    type="submit"
    disabled={processing || disabled}
  >
    {processing ? "Processing..." : children}
  </button>
);

const ErrorMessage = ({ children }) => (
  <div className="ErrorMessage" role="alert">
    <svg width="16" height="16" viewBox="0 0 17 17">
      <path
        fill="#FFF"
        d="M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z"
      />
      <path
        fill="#6772e5"
        d="M8.5,7.29791847 L6.12604076,4.92395924 C5.79409512,4.59201359 5.25590488,4.59201359 4.92395924,4.92395924 C4.59201359,5.25590488 4.59201359,5.79409512 4.92395924,6.12604076 L7.29791847,8.5 L4.92395924,10.8739592 C4.59201359,11.2059049 4.59201359,11.7440951 4.92395924,12.0760408 C5.25590488,12.4079864 5.79409512,12.4079864 6.12604076,12.0760408 L8.5,9.70208153 L10.8739592,12.0760408 C11.2059049,12.4079864 11.7440951,12.4079864 12.0760408,12.0760408 C12.4079864,11.7440951 12.4079864,11.2059049 12.0760408,10.8739592 L9.70208153,8.5 L12.0760408,6.12604076 C12.4079864,5.79409512 12.4079864,5.25590488 12.0760408,4.92395924 C11.7440951,4.59201359 11.2059049,4.59201359 10.8739592,4.92395924 L8.5,7.29791847 L8.5,7.29791847 Z"
      />
    </svg>
    {children}
  </div>
);

const ResetButton = ({ onClick }) => (
  <button type="button" className="ResetButton" onClick={onClick}>
    <svg width="32px" height="32px" viewBox="0 0 32 32">
      <path
        fill="#FFF"
        d="M15,7.05492878 C10.5000495,7.55237307 7,11.3674463 7,16 C7,20.9705627 11.0294373,25 16,25 C20.9705627,25 25,20.9705627 25,16 C25,15.3627484 24.4834055,14.8461538 23.8461538,14.8461538 C23.2089022,14.8461538 22.6923077,15.3627484 22.6923077,16 C22.6923077,19.6960595 19.6960595,22.6923077 16,22.6923077 C12.3039405,22.6923077 9.30769231,19.6960595 9.30769231,16 C9.30769231,12.3039405 12.3039405,9.30769231 16,9.30769231 L16,12.0841673 C16,12.1800431 16.0275652,12.2738974 16.0794108,12.354546 C16.2287368,12.5868311 16.5380938,12.6540826 16.7703788,12.5047565 L22.3457501,8.92058924 L22.3457501,8.92058924 C22.4060014,8.88185624 22.4572275,8.83063012 22.4959605,8.7703788 C22.6452866,8.53809377 22.5780351,8.22873685 22.3457501,8.07941076 L22.3457501,8.07941076 L16.7703788,4.49524351 C16.6897301,4.44339794 16.5958758,4.41583275 16.5,4.41583275 C16.2238576,4.41583275 16,4.63969037 16,4.91583275 L16,7 L15,7 L15,7.05492878 Z M16,32 C7.163444,32 0,24.836556 0,16 C0,7.163444 7.163444,0 16,0 C24.836556,0 32,7.163444 32,16 C32,24.836556 24.836556,32 16,32 Z"
      />
    </svg>
  </button>
);

const CardField = ({ onChange, error }) => (
  <div className="col-md-6 mt-3">
    <label>Card Details</label>
    <CardElement
      options={CARD_OPTIONS}
      onChange={onChange}
      className="form-control"
    />
    {error && <ErrorMessage>{error.message}</ErrorMessage>}
  </div>
);

const CheckoutForm = ({ delivery_detail, pickup_detail, personal, total, discount, address, card, setCard, setOrderid, orderid, details, setDetails, pickup, setPickupdetails, personaldetails, setPersonal, setPreview, preview,previewloader,setPreviewloader }) => {
  // console.log(address)
  // console.log(address.country)
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  // const [session, setSession] = useState(null);
  const [billingDetails, setBillingDetails] = useState({
    address: {
      city: address.city,
      country: address.country,
      line1: address.line1,
      // postal_code: address.postal,
      state: address.state,
    },
    email: "",
    phone: "",
    name: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setPreviewloader(true); 
    // console.log(billingDetails)
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    if (error) {
      elements.getElement("card").focus();
      return;
    }

    if (cardComplete) {
      setProcessing(true);
    }



    let billingDetailss = {
      address: {
        city: address.city,
        country: address.country,
        line1: address.line1,
        state: address.state
        // city: "rajkot",
        // country: "us",
        // line1: "address.line1",
        // state: "address.state"

      },

      email: personal.email_address,
      phone: personal.phone_number,
      name: billingDetails.name

    }
    const payload = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: billingDetailss,
    });

    setProcessing(false);

    const clearstorage = () => {
      // alert("demo");
      //   let hours = 24 ;
      // let saved = localStorage.getItem('zipcode');
      // let newsaved = JSON.parse(saved);
      // // console.log(newsaved.expiry)

      // if (saved && (new Date().getTime() - newsaved.expiry > hours * 60 * 60 * 1000)) {
      //   // alert("tata byy byy")
      let keysToRemove = ["zipcode", "deliverydate", "deliverywindow1", "deliverywindow2", "deliveryaddress", "apt", "extrawork1", "pickupwindow1", "pickupwindow2", "pickupapt", "extrawork2", "pickupdescription","pickupaddress", "fname", "lname", "email", "phone", "sphone", "voucher_code", "hdyfu", "company"];

      for (var key of keysToRemove) {
        localStorage.removeItem(key);
      }
      // localStorage.clear()
      // }
    }

    if (payload.error) {
      setError(payload.error);
    } else {
      console.log("paymentMethod-", payload.paymentMethod);
      // console.log()
      //  console.log("devlery", delivery_detail);
      //  console.log("pickup", pickup_detail);
      //  console.log("personal", personal);
      setCard(payload.paymentMethod?.card?.last4)

      let data = {
        // delivery: delivery_detail,
        // pickup: pickup_detail,
        first_name: personal.first_name,
        last_name: personal.last_name,
        email_address: personal.email_address,
        phone_number: personal.phone_number,
        secondary_phone_number:personal.secondary_phone_number,
        company_name:personal.company_name,
        voucher_code: personal.voucher_code,
        hdyfu: personal.hdyfu,
        session: ReactSession.get('session'),

        // payment: payload.paymentMethod,
      };
      // console.log(data)

      // console.log(order)

      let orderdetails = {
        // order_id: "",
        // status: "pend",
        session: ReactSession.get('session'),
        delivery_date: delivery_detail.delivery_date,
        voucher: personal.voucher_code,
      }
      // console.log(orderdetails);  
      // return false;
      addPersonal(data)
        .then((res) => {
          //setPreviewloader(true); 
          addOrder(orderdetails)
            .then((res) => {
              // console.log(res?.data?.order_id)
              // setOrderid(res?.data?.id);
              getDeliverDetails(res?.data?.order_id)
                .then((deliverydata) => {
                  // console.log(deliverydata)
                  setDetails(deliverydata?.data?.results?.[0]);

                  getPersonaldetails(res?.data?.order_id)
                    .then((personaldata) => {
                      // console.log(personaldata);
                      // console.log(personaldata?.data?.results?.[0]);
                      setPersonal(personaldata?.data?.results?.[0])
                    
                    })
                  getPickupDetails(res?.data?.order_id)
                    .then((pickupdata) => {
                      setPickupdetails(pickupdata?.data?.results?.[0]);
                    })
                  getPreview(res?.data?.order_id)
                    .then((nd) => {
                      // console.log(nd);
                      setPreview(nd?.data?.results?.[0]);
              
                    })

                })
              // res?.data? cart_items[] cart_price
              total = 0;
              res?.data?.cart_items.map((cartData) => {
                console.log("total "+total);
                total = Number(cartData.cart_price) + Number(total);
              })
              // total 
              let order = {
                payment: payload.paymentMethod,
                session: res?.data?.order_id,
                amount: total,
                discount: discount,

              }
              // console.log('shivam this is the key');
              // console.log( order );

              // console.log('payload');
              // console.log( payload );

              console.log('res');
              console.log( res.data );
              // let subTotal = 0;
              // res.data.cart_items.map((cartItem) => {
              //   subTotal = Number(subTotal) + Number(cartItem.cart_price)
              // })
              // res.data.total = subTotal;
              // console.log('new res')
              // console.log(res.data);
                 
              
              // return false;
              placeOrder(order)
                .then((res) => {
                  if (res?.data?.success) {
                    // console.log("back from request:-", res);

                    document.getElementById("step6").style.display = "none";
                    document.getElementById("orderpreview").style.display = "block";

                    document.getElementById("st6li").classList.remove("current");
                    document.getElementById("st6li").classList.add("complete");
                    // document.getElementById("st6").classList.add("active");
                    // document.getElementById("st6li").classList.add("current");
                    console.log('new payment log');
                    console.log(payload.paymentMethod)
                    setPaymentMethod(payload.paymentMethod);
                    // return false;
                    setPreviewloader(false);
                    clearstorage();


                  } else {
                    console.log("back from request else part:-", res);
                  }
                })
            })
        })
        .catch((e) => {
          console.log("order place error:-", e);
        });
        // return false;
      setPaymentMethod(payload.paymentMethod);
      // clearstorage();
      // console.log("card"+card);
      // return false;

    }
  };

  const reset = () => {
    setError(null);
    setProcessing(false);
    setPaymentMethod(null);

    setBillingDetails({
      email: "",
      phone: "",
      name: "",

    });
    // setSession(null);
  };

  // function  preview(){
  //   document.getElementById("orderpreview").style.display = "block";
  // }
  // console.log("orderid")
  // console.log(orderid)

  return paymentMethod ? (
    <div className="Result">
      {previewloader ? <Previewloader /> : " "}
       {/* <Previewloader />  */}
      <div className="ResultTitle" role="alert">
        Payment successful
      </div>
      <div className="ResultMessage">
        Thank you for your order! An email has been sent to you with all the details of your order including delivery and pickup details.
      </div>

      <ResetButton onClick={reset} />
    </div>
  ) : (
    <form className="" onSubmit={handleSubmit}>
      <div className="row">
        <Field
          label="Name on card"
          id="name"
          type="text"
          placeholder="Jane Doe"
          required
          autoComplete="name"
          value={billingDetails.name}
          onChange={(e) => {
            // console.log(billingDetails);
            setBillingDetails({ ...billingDetails, name: e.target.value });
          }}
        />

        <CardField
          onChange={(e) => {
            setError(e.error);
            setCardComplete(e.complete);
          }}
          error={error}
        />

        <div className="col-6">
          <div className="text-left mt-4">
            <button
              className="btn btn-dark text-uppercase step6BackBtn"
              onClick={step6BackBtn}
            >
              Previous Step
            </button>
          </div>
        </div>
        <div className="col-6">
          <div className="text-right mt-4">
            <SubmitButton
              processing={processing}
              error={error}
              disabled={!stripe}
            >
              Submit
            </SubmitButton>
          </div>
        </div>
      </div>
    </form>
  );
};

const ELEMENTS_OPTIONS = {
  fonts: [
    {
      cssSrc: "https://fonts.googleapis.com/css?family=Roboto",
    },
  ],
};

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51JdOT3JfjdazBivCH6VNEFX0H2dVhxSa4D7n4NKJtcKgoN1D9J9CUkIeorz4hvwxyLAYOTUu44RWz9VfRJtRHmNe00bMpRcdZG"
);

function step6BackBtn() {
  document.getElementById("step6").style.display = "none";
  document.getElementById("step5").style.display = "block";
  // document.getElementById("orderpreview").style.display = "none";


  document.getElementById("st6").classList.remove("active");
  document.getElementById("st5").classList.add("active");
  document.getElementById("st5li").classList.add("current");  
  document.getElementById("st6li").classList.remove("current");
  document.getElementById("st5li").classList.remove("complete");
}

const PaymentApp = ({ delivery_detail, pickup_detail, personal, total, discount, address, card, setCard, orderid, setOrderid, details, setDetails, pickupdetails, setPickupdetails, personaldetails, setPersonal, setPreview, preview,setPreviewloader,previewloader }) => {
  return (
    <>
      <div className="AppWrapper">
        <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
          <CheckoutForm
            delivery_detail={delivery_detail}
            pickup_detail={pickup_detail}
            personal={personal}
            total={total}
            discount={discount}
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
            setPreviewloader={setPreviewloader}
            previewloader={previewloader}
            setPreview={setPreview}
            preview={preview}
          />
        </Elements>
      </div>
    </>
  );
};

export default PaymentApp;
