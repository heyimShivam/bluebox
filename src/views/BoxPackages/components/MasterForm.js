import React, { useEffect, useState, Component } from "react";
import { ReactSession } from 'react-client-session';
import uuid from 'react-uuid'
import Index from "../index";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";
import Orderpreview from "./Orderpreview"
import Cart from "./Cart";

ReactSession.setStoreType("localStorage");

if (ReactSession.get('session')) {
  const sessionid = ReactSession.get('session')
  ReactSession.set("session", sessionid);
} else {
  const sessionid = uuid();
  ReactSession.set("session", sessionid);
}

export default function MasterForm(props) {

  // const [box, setBox] = React.useState({});
  // const [packings, setPackings] = React.useState([]);
  // const [movings, setMovings] = React.useState([]);
  // const [total, setTotal] = React.useState([]);
  // const [rentalid, setRentalId] = React.useState("be7f2421-2168-45ce-ab4e-d5ed5f68ab69");

  const [select_rental, setSelectedRental] = React.useState('2 Week');
  const [loading, setLoading] = React.useState(false);
  const [spinner, setSpinner] = React.useState(false);
  const [mainloader, setMainloader] = React.useState(false);
  const [getDiscountprice, setDiscountprice] = React.useState([0]);
  const [getStairevevators, setStairevevators] = React.useState([0]);
  const [getPickupdate, setPickupdate] = React.useState([""]);
  const [details, setDetails] = React.useState([]);
  const [pickupdetails, setPickupdetails] = React.useState([]);
  const [personaldetails, setPersonal] = React.useState([]);
  const [preview, setPreview] = React.useState([]);
  // const [getDeliverydate, setDeliverydate] = React.useState();

  //alert(props.category);

  const [delivery, setDelivery] = React.useState({
    delivery_address: "",
    delivery_date: "",
    latitude: "",
    longitude: "",
    apt_number: "",
    description: "",
    delivery_window1: "",
    delivery_window2: "",
    extra_work: "",
    rental: "",
    rentalid: "",
  });
  const [pickup, setPickup] = React.useState({
    pickup_address: "",
    pickup_date: null,
    latitude: "",
    longitude: "",
    apt_number: "",
    description: "",
    pickup_window1: "",
    pickup_window2: "",
    extra_work: "",
    rental: "",
  });
  useEffect(() => {

  }, [])

  return (
    <>

      <section className="showTabs pb-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-9 bg-white p-0">

              <Step1
                setBox={props.setBox}
                setPackings={props.setPackings}
                packings={props.packings}
                delivery={delivery}
                setDelivery={setDelivery}
                moving_products={props.movings}
                setMovings={props.setMovings}
                setTotal={props.setTotal}
                box={props.box}
                setRentalId={props.setRentalId}
                rentalid={props.rentalid}
                loading={loading}
                setLoading={setLoading}
                mainloader={mainloader}
                setMainloader={setMainloader}
                spinner={spinner}
                setSpinner={setSpinner}
                select_rental={select_rental}
                setSelectedRental={setSelectedRental}
                setStairevevators={setStairevevators}
                getStairevevators={getStairevevators}
                category={props.category}
                setCategory={props.setCategory}
                products={props.products}
                setProducts={props.setProducts}
                sub_category={props.sub_category}
                setSubCate={props.setSubCate}
                tax={props.tax}
                setTax={props.setTax}
                delivery={delivery}
                setDelivery={setDelivery}
                header={props.header}
                setHeader={props.setHeader}
                getDeliverydate={props.getDeliverydate}
                setDeliverydate={props.setDeliverydate}
                getPickupdate={getPickupdate}
                setPickupdate={setPickupdate}

                delivetslot1={props.delivetslot1}
                setDelivetslot1={props.setDelivetslot1}
                delivetslot2={props.delivetslot2}
                setDelivetslot2={props.setDelivetslot2}

                setPickupslot1={props.setPickupslot1}
                pickupslot1={props.pickupslot1}
                setPickupslot2={props.setPickupslot2}
                pickupslot2={props.pickupslot2}
              />
              <Step2
                setPackings={props.setPackings}
                packings={props.packings}
                setTotal={props.setTotal}
                setRentalId={props.setRentalId}
                rentalid={props.rentalid}
                loading={loading}
                setLoading={setLoading}
                select_rental={select_rental}
                setSelectedRental={setSelectedRental}
                category={props.category}
                setCategory={props.setCategory}
                tax={props.tax}
                setTax={props.setTax}

              />
              <Step3
                setMovings={props.setMovings}
                movings={props.movings}
                setTotal={props.setTotal}
                setRentalId={props.setRentalId}
                rentalid={props.rentalid}
                loading={loading}
                setLoading={setLoading}
                select_rental={select_rental}
                setSelectedRental={setSelectedRental}
                category={props.category}
                setCategory={props.setCategory}

              />
              <Step4
                delivery={delivery}
                setDelivery={setDelivery}
                setMovings={props.setMovings}
                setRentalId={props.setRentalId}
                setPackings={props.setPackings}
                rentalid={props.rentalid}
                loading={loading}
                setLoading={setLoading}
                select_rental={select_rental}
                setSelectedRental={setSelectedRental}
                setBox={props.setBox}
                setTotal={props.setTotal}
                setStairevevators={setStairevevators}
                getStairevevators={getStairevevators}
                spinner={spinner}
                setSpinner={setSpinner}
                getPickupdate={getPickupdate}
                setPickupdate={setPickupdate}
                category={props.category}
                setCategory={props.setCategory}
                address={props.address}
                setAddress={props.setAddress}
                getDeliverydate={props.getDeliverydate}
                setDeliverydate={props.setDeliverydate}
                delivetslot1={props.delivetslot1}
                setDelivetslot1={props.setDelivetslot1}
                delivetslot2={props.delivetslot2}
                setDelivetslot2={props.setDelivetslot2}
                details={details}
                setDetails={setDetails}
              // getNewAddress={props.getNewAddress}
              // setNewAddress={props.setNewAddress}


              />
              <Step5
                setDelivery={setDelivery}
                setMovings={props.setMovings}
                setPackings={props.setPackings}
                setBox={props.setBox}
                pickup={pickup}
                setPickup={setPickup}
                setRentalId={props.setRentalId}
                rentalid={props.rentalid}
                loading={loading}
                setLoading={setLoading}
                select_rental={select_rental}
                setTotal={props.setTotal}
                setSelectedRental={setSelectedRental}
                setStairevevators={setStairevevators}
                getStairevevators={getStairevevators}
                spinner={spinner}
                setSpinner={setSpinner}
                getPickupdate={getPickupdate}
                setPickupdate={setPickupdate}
                category={props.category}
                setCategory={props.setCategory}
                address={props.address}
                setAddress={props.setAddress}
                getDeliverydate={props.getDeliverydate}
                setDeliverydate={props.setDeliverydate}
                pickupslot1={props.pickupslot1}
                setPickupslot1={props.setPickupslot1}
                pickupslot2={props.pickupslot2}
                setPickupslot2={props.setPickupslot2}

              />
              <Step6
                delivery_detail={delivery}
                pickup_detail={pickup}
                total={props.total}
                setTotal={props.setTotal}
                getDiscountprice={getDiscountprice}
                setDiscountprice={setDiscountprice}
                category={props.category}
                setCategory={props.setCategory}
                address={props.address}
                setAddress={props.setAddress}
                card={props.card}
                setCard={props.setCard}
                orderid={props.orderid}
                setOrderid={props.setOrderid}
                
                details={details}
                setDetails={setDetails}
                pickupdetails={pickupdetails}
                setPickupdetails={setPickupdetails}
                personaldetails={personaldetails}
                setPersonal={setPersonal}
                setPreview={setPreview}
                preview={preview}

              />
              <Orderpreview
                box={props.box}
                packing_products={props.packings}
                moving_products={props.movings}
                setPackings={props.setPackings}
                packings={props.packings}
                setMovings={props.setMovings}
                total={props.total}
                setBox={props.setBox}
                setTotal={props.setTotal}
                setRentalId={props.setRentalId}
                rentalid={props.rentalid}
                loading={loading}
                setLoading={setLoading}
                getDiscountprice={getDiscountprice}
                setDiscountprice={setDiscountprice}
                setStairevevators={setStairevevators}
                getStairevevators={getStairevevators}
                category={props.category}
                setCategory={props.setCategory}
                getPickupdate={getPickupdate}
                setPickupdate={setPickupdate}
                getDeliverydate={props.getDeliverydate}
                setDeliverydate={props.setDeliverydate}
                tax={props.tax}
                setTax={props.setTax}
                delivetslot1={props.delivetslot1}
                setDelivetslot1={props.setDelivetslot1}
                delivetslot2={props.delivetslot2}
                setDelivetslot2={props.setDelivetslot2}
                pickupslot1={props.pickupslot1}
                setPickupslot1={props.setPickupslot1}
                pickupslot2={props.pickupslot2}
                setPickupslot2={props.setPickupslot2}
                card={props.card}
                setCard={props.setCard}
                orderid={props.orderid}
                setOrderid={props.setOrderid}
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
            <Cart
              box={props.box}
              packing_products={props.packings}
              moving_products={props.movings}
              setPackings={props.setPackings}
              packings={props.packings}
              setMovings={props.setMovings}
              total={props.total}
              setBox={props.setBox}
              setTotal={props.setTotal}
              setRentalId={props.setRentalId}
              rentalid={props.rentalid}
              loading={loading}
              setLoading={setLoading}
              setSelectedRental={setSelectedRental}
              getDiscountprice={getDiscountprice}
              setDiscountprice={setDiscountprice}
              setStairevevators={setStairevevators}
              getStairevevators={getStairevevators}
              category={props.category}
              setCategory={props.setCategory}
              getPickupdate={getPickupdate}
              setPickupdate={setPickupdate}
              getDeliverydate={props.getDeliverydate}
              setDeliverydate={props.setDeliverydate}
              tax={props.tax}
              setTax={props.setTax}
              delivetslot1={props.delivetslot1}
              setDelivetslot1={props.setDelivetslot1}
              delivetslot2={props.delivetslot2}
              setDelivetslot2={props.setDelivetslot2}
              pickupslot1={props.pickupslot1}
              setPickupslot1={props.setPickupslot1}
              pickupslot2={props.pickupslot2}
              setPickupslot2={props.setPickupslot2}
              card={props.card}
              setCard={props.setCard}
            />

          </div>
        </div>
      </section>
    </>
  );
}
