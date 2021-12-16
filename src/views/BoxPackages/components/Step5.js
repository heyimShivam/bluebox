import React from "react";
import SimpleReactValidator from "simple-react-validator";
import {
  rentalsPeriods, getDeliverWindows, getExtraWork, addPickUp, checkZipCode, addDelivery, getTotal, getTotalCart, getPickupSlots
} from "../../../data/API";
import { ReactSession } from 'react-client-session';
import { constants } from "buffer";
import moment from 'moment'
import Autocomplete from "react-google-autocomplete";

function step5Btn() {
  document.getElementById("step5").style.display = "none";
  document.getElementById("step6").style.display = "block";
  
  document.getElementById("st5li").classList.remove("current");
  document.getElementById("st5li").classList.add("complete");
  document.getElementById("st6").classList.add("active");
  document.getElementById("st6li").classList.add("current");
}

function step5BackBtn() {
  document.getElementById("step5").style.display = "none";
  document.getElementById("step4").style.display = "block";
  document.getElementById("st5").classList.remove("active");
  document.getElementById("st4").classList.add("active");
  document.getElementById("st5li").classList.remove("current");
  document.getElementById("st4li").classList.remove("complete");
}
export default function Step5(props) {
  const [, forceUpdate] = React.useState();
  const validator = React.useRef(new SimpleReactValidator());
  const [rentals, setRentalList] = React.useState([]);
  const [windows, setWindows] = React.useState([]);
  const [windows1, setWindows1] = React.useState([]);
  const [windows2, setWindows2] = React.useState([]);
  const [extra_work, setExtraWork] = React.useState([]);
  const key = "AIzaSyCXbgZmfe_pRq23TGroNN5K29oC0KSbm5Y"
  const [isError, setError] = React.useState(false);
  const [errorMsg1, setMsg1] = React.useState("");
  const [errorMsg2, setMsg2] = React.useState("");

  const [getNewAddress, setNewAddress] = React.useState([]);

  const date = props.getPickupdate;
  const { delivery, pickup, setDelivery, setPickup } = props;

  const handleChange = (event) => {
    setPickup({ ...pickup, [event.target.name]: event.target.value });


    if (event.target.name == "pickup_window1") {
      if (event.target.value) {
        const disableslot = windows.filter(obj => obj.id != event.target.value);
        setWindows2(disableslot);
        setPickup({ ...pickup, pickup_window1: event.target.value })

        let data = {
          session: ReactSession.get('session'),
          pickup_window_1: event.target.value,
        }
        // localStorage.setItem("pickupwindow1",event.target.value);

        props.setLoading(true);
        addPickUp(data)
          .then((res) => {
            getPickupSlots(ReactSession.get('session'))
              .then((res) => {
                // console.log(props)
                // console.log(res)
                props.setPickupslot1(res?.data?.results?.[0]?.pickup_window_1);
                props.setLoading(false);

              })
          })

      }
    }
    if (event.target.name == "pickup_window2") {
      if (event.target.value) {
        const disableslots = windows.filter(obj => obj.id != event.target.value);
        setWindows1(disableslots);
        setPickup({ ...pickup, pickup_window2: event.target.value })

        let data = {
          session: ReactSession.get('session'),
          pickup_window_2: event.target.value,
        }
        // localStorage.setItem("pickupwindow2",event.target.value);
        props.setLoading(true);

        addPickUp(data)
          .then((res) => {
            getPickupSlots(ReactSession.get('session'))
              .then((res) => {
                // console.log(props)
                // console.log(res)
                props.setPickupslot2(res?.data?.results?.[0]?.pickup_window_2);
                props.setLoading(false);

              })
          })

      }
    }

    if(event.target.name == "apt_number"){
      if(event.target.value){
        // localStorage.setItem("pickupapt",event.target.value);
      }
    }

    if (event.target.name == "extra_work") {
      // alert('123')
      if (event.target.value) {

        let data = {
          session: ReactSession.get('session'),
          extra_work: event.target.value,
        }
        // localStorage.setItem("extrawork2",event.target.value)

        props.setLoading(true);
        addPickUp(data)
          .then((res) => {
            // getTotal(ReactSession.get('session'))
            // .then((newtotal) => {
            //     // console.log(newtotal)
            //     props.setTotal(newtotal?.data?.session_cart_total);
            //   })
            getTotalCart(ReactSession.get('session')).then((res) => {
              // console.log(res); 
              const getboxcart = res?.data?.results.filter(obj => {
                return obj?.product?.product_sub_category === 2;
              });
              if (getboxcart) {
                props.setBox(getboxcart[0]);
              }
              const getpackingcart = res?.data?.results.filter(obj => {
                return obj?.product?.product_sub_category === 5;
              });

              if (getpackingcart) {
                props.setPackings(getpackingcart);
              }
              const getmovingcart = res?.data?.results.filter(obj => {
                return obj?.product?.product_sub_category === 3;
              });
              if (getmovingcart) {
                props.setMovings(getmovingcart);
              }

              props.setSelectedRental(getboxcart[0].rental_int + " Week");
              props.setRentalId(getboxcart[0].rental);
              getTotal(ReactSession.get('session'))
                .then((newtotal) => {
                  // console.log(newtotal);
                  props.setTotal(newtotal?.data?.session_cart_total);
                  //console.log(newtotal)
                  props.setStairevevators(newtotal?.data?.extra_cost);
                  props.setLoading(false);

                })
            })
          })
      }

    }

    if(event.target.name == "description"){
      if(event.target.value){
        // localStorage.setItem("pickupdescription",event.target.value)
      }
    }



  };

  const setaddress = (place) => {
  // const setaddress = () => {
    setNewAddress(place?.formatted_address);
    // setPickup({ ...pickup, pickup_address: place?.formatted_address })

    // setNewAddress("1555 N Chrisman Rd, Tracy, CA 95304, USA");
    // localStorage.setItem("pickupaddress",place?.formatted_address);

    for (var i = 0; i < place.address_components.length; i++) {
      for (var j = 0; j < place.address_components[i].types.length; j++) {
        if (place.address_components[i].types[j] == "postal_code") {
          var postal = place.address_components[i].long_name
        }
        if (place.address_components[i].types[j] == "country") {
          var country = place.address_components[i].short_name;
        }
        if (place.address_components[i].types[j] == "locality") {
          var city = place.address_components[i].long_name;
        }
        if (place.address_components[i].types[j] == "administrative_area_level_1") {
          var state = place.address_components[i].long_name;
        }
      }
    }
    const data = {
      deliveryzipcode: postal
      // deliveryzipcode:  "360002"

    }
    // console.log(delivery)
    checkZipCode(data)
      .then((res) => {

        if (res?.data?.success == true) {
          setError(true);
          setMsg1(res?.data?.message_2);
          setMsg2("");

        } else {
          setError(true);
          setMsg2(res?.data?.message_2);
          setMsg1("");
        }

      })
  }

  const handleDeliverySubmit = (e) => {
    e.preventDefault();
    // if (validator.current.allValid()) {  
    // console.log(pickup) 
    let data = {
      session: ReactSession.get('session'),
      pickup_date: props.getPickupdate,
      pickup_address: getNewAddress,
      latitude: pickup?.latitude,
      longitude: pickup?.longitude,
      apt_number: pickup?.apt_number,
      description: pickup?.description,
      pickup_window_1: pickup?.pickup_window1,
      pickup_window_2: pickup?.pickup_window2,
      extra_work: pickup?.extra_work,
    }
    addPickUp(data)
      .then((res) => {

        step5Btn()

      })

    step5Btn()
    // } else {
    //   validator.current.showMessages();
    //   forceUpdate(1);
    // }
  };

  const callApi = () => {
    rentalsPeriods()
      .then((res) => {
        setRentalList(res?.data);
      })
      .catch((e) => console.log(e));

    getDeliverWindows()
      .then((res) => {
        setWindows(res?.data.results);
        setWindows1(res?.data.results);
        setWindows2(res?.data.results);
      })
      .catch((e) => console.log(e));

    getDeliverWindows()
      .then((res) => {
        setWindows2(res?.data.results);
      })
      .catch((e) => console.log(e));

    getExtraWork()
      .then((res) => {
        setExtraWork(res?.data);
      })
      .catch((e) => console.log(e));


  };

  React.useEffect(() => {
    callApi();
  }, []);

  const formateddate = moment(props.getPickupdate).format('dddd');
  const monthformatdate = moment(props.getPickupdate).format('MMMM D, YYYY')
  //  console.log(monthformatdate)

  // console.log(props.address)
  return (
    <>
      <div className="step5" id="step5">
        <h2 className="bg-primary text-white text-center py-2">
          Step 5: Pickup Details
        </h2>
        <div className="row">
          <div className="container px-5 my-4">
            {/* <div className="row py-4"> */}

            <form>
              <br></br>
              <div className="pickupdiv">
                <div className="pickupdetail">
                  <h5>Pickup Details</h5>
                </div>
                <div className="pickupdate" >
                  <h5>Your pick up date is: <span style={{ color: "#007BFF" }}>{formateddate},{monthformatdate}</span></h5><br />
                  <p>After placing the order, contact us if you need to change the pickup date</p>

                </div>
              </div>
              {/* <label >Pickup Date:</label> */}
              <hr />
              <div className="row">

                <div className="col-md-6 mt-3">
                  <label>Pick Up Window 1 *</label>
                  <select
                    className="form-control"
                    name="pickup_window1"
                    value={ pickup.pickup_window1}

                    onChange={(e) => handleChange(e)}
                  >
                    <option value="" selected>
                      Select a time slot
                    </option>
                    {windows1.map((obj) => {
                      return (
                        <option
                          value={obj.id}
                        >{`${obj.start_time} - ${obj.end_time}`}</option>
                      );
                    })}
                  </select>
                  {validator.current.message(
                    "Pickup Window1",
                    pickup.pickup_window1,
                    "required",
                    { className: "text-danger" }
                  )}
                </div>
                <div className="col-md-6 mt-3">
                  <label>Delivery Window 2 *</label>
                  <select
                    className="form-control"
                    name="pickup_window2"
                    value={pickup.delivery_window2}
                    onChange={(e) => handleChange(e)}
                  >
                    <option value="" selected>
                      Select a time slot
                    </option>
                    {windows2?.map((obj) => {
                      return (
                        <option
                          value={obj.id}
                        >{`${obj.start_time} - ${obj.end_time}`}</option>
                      );
                    })}
                  </select>

                  {validator.current.message(
                    "Pickup Window2",
                    pickup.pickup_window2,
                    "required",
                    { className: "text-danger" }
                  )}
                </div>
                <div className="col-md-6 mt-3">
                  <label>Pick UP Address *</label>
                 
                  <Autocomplete

                    className="form-control"
                    name="pickup_address"
                    apiKey={key}
                    onPlaceSelected={(place) => {
                      setaddress(place)
                    }}
                    options={{
                      types: ["address"],
                      componentRestrictions: { country: "us" },
                    }}
                  />
                  {isError ? <p style={{ color: "green" }}>{errorMsg1} </p> : ""}
                  {isError ? <p style={{ color: "red" }}>{errorMsg2} </p> : ""}
                {validator.current.message(
                  "Pick Up Address",
                  pickup.pickup_address,
                  "",
                  { className: "text-danger" }
                )}
                </div>
                <div className="col-md-6 mt-3">
                  <label>Apt#</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Apt"
                    name="apt_number"
                    value={pickup.apt}
                    onChange={(e) => handleChange(e)}
                  />

                  {validator.current.message(
                    "apt",
                    pickup.apt_number,
                    "required",
                    { className: "text-danger" }
                  )}
                </div>
                <div className="col-md-12 mt-3">
                  <label>Do you have stairs or an elevator? *</label>
                  <select
                    className="form-control"
                    name="extra_work"
                    value={pickup.extra_work}
                    onChange={(e) => handleChange(e)}
                  >
                    <option value="" selected>
                      Select an option
                    </option>;
                    {extra_work.results?.map((obj) => {
                      return (
                        <option
                          value={obj.id}
                        >{`${obj.title} ($${obj.price})`}</option>
                      );
                    })}
                  </select>
                 
                  {validator.current.message(
                    "stairs or an elevator",
                    pickup.extra_work,
                    "required",
                    { className: "text-danger" }
                  )}
                </div>
                <div className="col-md-12 mt-3">
                  <label>Is there anything else we should know?</label>
                  <textarea
                    className="form-control"
                    name="description"
                    // value={localStorage.getItem("pickupdescription") ? localStorage.getItem("pickupdescription") : pickup.description}
                    value={ pickup.description}
                    onChange={(e) => handleChange(e)}
                  ></textarea>
                </div>
              </div>
            </form>
            {/* </div> */}

            <div className="row">
              <div className="col-6">
                <div className="text-left mt-4">
                  <button
                    className="btn btn-dark step5BackBtn"
                    onClick={step5BackBtn}
                  >
                    Previous Step
                  </button>
                </div>
              </div>
              <div className="col-6">
                <div className="text-right mt-4">
                  <button
                    className="btn btn-dark step5Btn"
                    onClick={step5Btn}
                    onClick={handleDeliverySubmit}
                  >
                    Step 6: Personal & Payment Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
