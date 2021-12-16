import React, { useEffect, useState } from "react";
import SimpleReactValidator from "simple-react-validator";
import PaymentApp from "../../payment";
import { ReactSession } from 'react-client-session';
import { getCoupon, getTotal, getHdyfu, getPersonaldetails, getDeliverDetails, getPickupDetails } from "../../../data/API";


export default function Orderpreview(props) {
//   const [details, setDetails] = React.useState([]);
//   const [pickup, setPickup] = React.useState([]);
//   const [personal, setPersonal] = React.useState([]);

  const { box, packing_products, moving_products, total,orderid,setOrderid ,details,pickupdetails,personaldetails,preview} = props;
  
  // console.log(personaldetails);
//   // const id = orderid;

// console.log(orderid)
//   const getdetails = () => {
//     // console.log(props)
   

//   }

  React.useEffect((props) => {

    // getdetails();
    // getDeliverDetails(orderid)
    // .then((res) => {
    //   console.log(res?.data?.results?.[0])
    //   setDetails(res?.data?.results?.[0]);
    //   getPersonaldetails(orderid)
    //     .then((res) => {
    //       // console.log(res?.data?.results?.[0])
    //       setPersonal(res?.data?.results?.[0])
    //     })
    //   getPickupDetails(orderid)
    //     .then((res) => {
    //       // console.log(res?.data?.results?.[0]);
    //       setPickup(res?.data?.results?.[0]);
    //     })

    // })

  }, []);
// console.log(pickup);
  const datatable = () => {

    // if(details){
    
     
   
  }

  return (
    <>
    <div className="orderpreview" id="orderpreview">

<h2 className="bg-primary text-white text-center py-2">
  Order conformation
</h2>

<div className="underline"></div>
<div className="row">
  <div className="form1">
    {/* <div className="container-fluid px-5 my-4">  */}
    {/* <div className="row py-4"> */}
    <form>
      <h5>Delivery Details</h5>
     
      {/* <div className="row"> */}
      <div className="col-sm-6 ">
        <label>Delivery Date: <b> {details.delivery_date} </b> </label> 
      </div>

      <div className="col-sm-6">
        <label>Rental Period: <b>  {box?.rental_int} Week </b></label>
      </div>

      <div className="col-sm-6 ">
        <label>Delivery Window 1: <b>  {details.delivery_window_1?.start_time}-{details.delivery_window_1?.end_time}</b></label>
      </div>

      <div className="col-sm-6 ">
        <label>Delivery Window 2: <b>  {details.delivery_window_2?.start_time}-{details.delivery_window_2?.end_time}</b></label>
      </div>

      <div className="col-sm-6">
        <label>Delivery Address: <b>  {details.delivery_address}</b></label>
      </div>

      <div className="col-sm-6 ">
        <label>Apt: <b>  {details.apt_number}</b></label>
      </div>

      <div className="col-sm-6">
        <label>Do you have stairs or an elevator? <b>  {details.extrawork?.title}</b></label>
      </div>

      <div className="col-sm-6 ">
        <label>Is there anything else we should know? <b>  {details.description}</b></label>
      </div>

      {/* </div> */}

    </form>
    <form>
      <h5>Pickup Details</h5>

      <div className="col-sm-6 ">
        <label>Pickup Date: <b>  {pickupdetails.pickup_date} </b></label>
      </div>

      <div className="col-sm-6">
        <label>Pick Up Window 1: <b>    {pickupdetails.pickup_window_1?.start_time}-{pickupdetails.pickup_window_1?.end_time}</b></label>
      </div>

      <div className="col-sm-6 ">
        <label>Pick Up Window 2: <b>  {pickupdetails.pickup_window_2?.start_time}-{pickupdetails.pickup_window_2?.end_time}</b></label>
      </div>


      <div className="col-sm-6">
        <label>Pick Up Address: <b>  {pickupdetails.pickup_address}</b></label>
      </div>

      <div className="col-sm-6 ">
        <label>Apt: <b>  {pickupdetails.apt_number}</b></label>
      </div>

      <div className="col-sm-6">
        <label>Do you have stairs or an elevator? <b>  {pickupdetails.extrawork?.title}</b></label>
      </div>

      <div className="col-sm-6 ">
        <label>Is there anything else we should know? <b>  {pickupdetails.description}</b></label>
      </div>


    </form>
  </div>
</div>
<hr />
<div className="underline2"></div>

<div className="row" style={{ marginTop: "25px" }}>
  <div className="form1">

    <form>
      <h5 className="form2">Personal Details</h5>
   
      <div className="col-sm-6 ">
        <label>First Name : <b>  {personaldetails.first_name} </b></label>
      </div>

      <div className="col-sm-6">
        <label>Last Name: <b>  {personaldetails.last_name}</b></label>
      </div>

      <div className="col-sm-6 ">
        <label>Email Address: <b>  {preview?.ordered_by?.email_address}</b></label>
      </div>

      <div className="col-sm-6 ">
        <label>Phone Number: <b>  {personaldetails.phone_number}</b></label>
      </div>

      <div className="col-sm-6">
        <label>Secondary Phone Number: <b>  {personaldetails.secondary_phone_number}</b></label>
      </div>

      <div className="col-sm-6 ">
        <label>Company Name: <b>  {personaldetails.company_name}</b></label>
      </div>

      <div className="col-sm-6">
        <label>Voucher Code: <b>  {preview?.used_voucher?.code}</b></label>
      </div>

      <div className="col-sm-6 ">
        <label>How did you find us? <b>  {personaldetails.hdyfu?.title}</b></label>
      </div>
      <div className="col-sm-6 ">
        <h5>Card Details</h5>
        <label>Card Number: <b> **** **** **** {props.card} </b></label>
      </div>
      <a className="btn btn-dark step1Btn" href="/" >Done  </a>
    </form>
    <form>
      <div className="orederdata" >
      <h5 className="form2">Order Details</h5>
    
      <div className="col-sm-6 ">
        <label>Box Package: <b>   {box?.product?.title} ({box?.rental_int} Week)   ${box?.cart_price}</b></label>
      </div>

      <div className="col-sm-6">
        <label>Packing Supplies:</label><br />
        {props.packing_products?.map((item) => {
          return (
            <label className="packingdata"> <b> {item.quantity}  {item?.product?.title}  ${(item.quantity * item?.product?.price)} </b> </label> 
            // {item?.product?.title} { ${(item.quantity * item?.product?.price)}}
          );
        })}

      </div>

      <div className="col-sm-6">
        <label >Moving Supplies:</label><br />
        {props.moving_products?.map((newitem) => {
          return (
            <label className="packingdata"> <b>{newitem.quantity}  {newitem?.product?.title}    ${(newitem.quantity * newitem?.product?.price * newitem?.rental_int)} </b> </label>
            // {item?.product?.title} { ${(item.quantity * item?.product?.price)}}
          );
        })}

      </div>

      {
        props.getStairevevators > 0 ?

          <div className="col-sm-6">
            <label>Stair/Elevator: <b>  ${props.getStairevevators}</b></label>
          </div> : "  "
      }
      {
        props.getDiscountprice > 0 ?
          <div className="col-sm-6">
            <label>Discount <b>  ${props.getDiscountprice}</b> </label>
          </div> : "  "
      }
      {

        props.tax > 0 ?
          <div className="col-sm-6 ">
            <label>Sales Tax <b>  ${props.tax}</b></label>
          </div> : ""
      }

      <div className="col-sm-6 ">
        <label>Total Cost: <b>  {total}</b></label>
      </div>
   
    </div>
    </form>
  </div>
</div>
<div className="underline3" ></div>

</div>
    </>
  );
}