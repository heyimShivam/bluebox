import React, { useEffect, useState } from "react";
import SimpleReactValidator from "simple-react-validator";
import { rentalsPeriods, getDeliverWindows, getExtraWork, addDelivery, getnewRental, getCart, getTotal, getDays, checkZipCode, getTotalCart, getPickUp, getBoxPackages, getDeliverSlots } from "../../../data/API";
import { ReactSession } from 'react-client-session';
// import DayPicker from 'react-day-picker';
// import 'react-day-picker/lib/style.css';

import DatePicker from 'react-datetime';
import moment from 'moment'
import 'react-datetime/css/react-datetime.css';
import Autocomplete from "react-google-autocomplete";
// import { Spinner } from "./spinner";
import Spinner from "./Spinner"


// import { copyFileSync } from "fs";

function step4Btn() {
  document.getElementById("step4").style.display = "none";
  document.getElementById("step5").style.display = "block";

 document.getElementById("st4li").classList.remove("current");
  document.getElementById("st4li").classList.add("complete");
  document.getElementById("st5").classList.add("active");
  document.getElementById("st5li").classList.add("current");
}

function step4BackBtn() {
  document.getElementById("step4").style.display = "none";
  document.getElementById("step3").style.display = "block";
  document.getElementById("st4").classList.remove("active");
  document.getElementById("st3").classList.add("active");
  document.getElementById("st3li").classList.add("current");  

  document.getElementById("st4li").classList.remove("current");
  document.getElementById("st3li").classList.remove("complete");
}
export default function Step4(props) {
  const [, forceUpdate] = React.useState();
  const validator = React.useRef(new SimpleReactValidator());
  const [rentals, setRentalList] = React.useState([]);
  const [windows, setWindows] = React.useState([]);
  const [windows1, setWindows1] = React.useState([]);
  const [windows2, setWindows2] = React.useState([]);
  const [extra_work, setExtraWork] = React.useState([]);
  const [getrental, setnewrental] = React.useState([]);
  const [get_days, setDays] = React.useState();
  const [Day, selectedDay] = React.useState();
  const [aptvaL, setAptval] = React.useState();
  const [getDisableDate, setDisableDate] = React.useState([]);
  const [getDisableWeekends, setDisableWeekends] = React.useState([]);
  const { delivery, pickup, setDelivery, setPickup } = props;
  const [startDate, setStartDate] = useState(new Date());
  // const today = moment();
  const key = "AIzaSyCXbgZmfe_pRq23TGroNN5K29oC0KSbm5Y"
  const [isError, setError] = React.useState(false);
  const [errorMsg1, setMsg1] = React.useState("");
  const [errorMsg2, setMsg2] = React.useState("");
  const { details } = props;
  const [slot1, setSlot1] = React.useState("");
 
  const [getNewAddress, setNewAddress] = React.useState([]);

  const setrental = () => { setDelivery({ ...delivery, rental: props.rentalid }) };

  const handleChange123 = (date) => {
    const newdate = moment(date).format("YYYY-MM-DD");
    setDelivery({ ...delivery, delivery_date: newdate });
    let data = {
      session: ReactSession.get('session'),
      delivery_date: newdate,
    }
    // localStorage.setItem('deliverydate', newdate)
    props.setLoading(true);

    addDelivery(data)
      .then((res) => {
        getDeliverSlots(ReactSession.get('session'))
          .then((res) => {
            props.setDeliverydate(res?.data?.results?.[0]?.delivery_date);
            props.setLoading(false);
          })
      })
  };
  const handleChange = (event) => {

    setDelivery({ ...delivery, [event.target.name]: event.target.value });
    
    if (event.target.name == "rental") {

      props.setLoading(true);
      let data = {
        session: ReactSession.get('session'),
        rental: event.target.value,
      }
      // console.log(data.rental)
      // return false;
      getnewRental(data)
        .then((res) => {
            console.log(res);
          getCart('1', ReactSession.get('session'))
            .then((newcartdata) => {
              // console.log(newcartdata);
              // return false;
              props.setBox(newcartdata.data?.results[0]);
              getTotal(ReactSession.get('session'))
                .then((newtotal) => {

                  getTotalCart(ReactSession.get('session')).then((res) => {
// console.log(res);
//               return false;
                    let rental1 = "";
                    let rentalid1 = "";

                    if (res.data.results.length > 0) {
                      // alert("here")
                      // console.log(res.data.results[0].rental_int)
                      rental1 = res.data.results[0].rental_int + " Weeks";
                      rentalid1 = res.data.results[0].rental;
                    } else {
                      rental1 = "2 Weeks";
                      rentalid1 = '781ce70c-ba18-46b1-b585-57dda9f3c778';
                    }
                    // console.log("rentalid1");
                    // console.log(rentalid1);
                    // console.log(rental1);

                    getBoxProducts(rental1);
                    props.setSelectedRental(rental1);
                    props.setRentalId(rentalid1);
                    // props.setDelivery({ ...props.delivery, rental: rentalid1 });

                    const getboxcart = res?.data?.results.filter(obj => {
                      return obj?.product?.product_sub_category === 1;
                    });
                    if (getboxcart) {
                      props.setBox(getboxcart[0]);

                    }
                    const getpackingcart = res?.data?.results.filter(obj => {
                      return obj?.product?.product_sub_category === 2;
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

                    getTotal(ReactSession.get('session')).then((newtotal) => {
                      props.setTotal(newtotal?.data?.session_cart_total);
                      props.setLoading(false);

                    });
                  });
                })
            })
        })
    }

    if(event.target.name == "apt"){
      if(event.target.value){
        // localStorage.setItem("apt",event.target.value);
      }
    }

    if (event.target.name == "delivery_window1") {
      if (event.target.value) {
        // console.log(event.target.value);
        const disableslot = windows.filter(obj => obj.id != event.target.value);
        setWindows2(disableslot);
        setDelivery({ ...delivery, delivery_window1: event.target.value })
        setSlot1(event.target.value);
        let data = {
          session: ReactSession.get('session'),
          delivery_window_1: event.target.value,
        }
        // localStorage.setItem("deliverywindow1", event.target.value)
        props.setLoading(true);

        addDelivery(data)
          .then((res) => {
            getDeliverSlots(ReactSession.get('session'))
              .then((res) => {
                props.setDelivetslot1(res?.data?.results?.[0]?.delivery_window_1);
                props.setLoading(false);
              })
          })
      }
    }
    if (event.target.name == "delivery_window2") {
      if (event.target.value) {

        const disableslots = windows.filter(obj => obj.id != event.target.value);
        setWindows1(disableslots);
        setDelivery({ ...delivery, delivery_window2: event.target.value });

        let data = {
          session: ReactSession.get('session'),
          delivery_window_2: event.target.value,
        }
        // localStorage.setItem("deliverywindow2", event.target.value)
        props.setLoading(true);
        addDelivery(data)
          .then((res) => {
            getDeliverSlots(ReactSession.get('session'))
              .then((res) => {
                props.setDelivetslot2(res?.data?.results?.[0]?.delivery_window_2);
                props.setLoading(false);

              })
          })
      }
    }
    if(event.target.name == "description"){
      if(event.target.value){
        // localStorage.setItem("deliverd",event.target.value)
        setDelivery({ ...delivery, description: event.target.value })
      }
    }
    if (event.target.name == "extra_work") {
      if (event.target.value) {

        let data = {
          session: ReactSession.get('session'),
          extra_work: event.target.value,
        }
        // localStorage.setItem("extrawork1",event.target.value)
        props.setLoading(true);
        addDelivery(data)
          .then((res) => {

            getTotalCart(ReactSession.get('session')).then((res) => {
              // console.log(res); 
              const getboxcart = res?.data?.results.filter(obj => {
                return obj?.product?.product_sub_category === 1;
              });
              if (getboxcart) {
                props.setBox(getboxcart[0]);

              }
              const getpackingcart = res?.data?.results.filter(obj => {
                return obj?.product?.product_sub_category === 2;
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
              // console.log(getboxcart[0]);
              props.setSelectedRental(getboxcart[0].rental_int + " Weeks");
              props.setRentalId(getboxcart[0].rental);
              getTotal(ReactSession.get('session')).then((newtotal) => {
                // console.log(newtotal);
                props.setTotal(newtotal?.data?.session_cart_total);
                // console.log(newtotal?.data?.extra_cost);
                props.setStairevevators(newtotal?.data?.extra_cost);
                props.setLoading(false);

              })
            })
          })
      }

    }
    // console.log(delivery)

    const getBoxProducts = async (rental = props.select_rental) => {

      getBoxPackages(props.category, props.sub_category, rental)
        .then((res) => {
          props.setProducts(res?.data);
        })
        .catch((e) => console.log(e));
    };

  };

  const setaddress = (place) => {
  // const setaddress = () => {
    // props.setSpinner(true);
    
    setNewAddress(place?.formatted_address);
    // setDelivery({ ...delivery, delivery_address: place?.formatted_address })
    // localStorage.setItem("deliveryaddress",place?.formatted_address)

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

    const address = {
      city: city,
      country: country,
      line1: place?.formatted_address,
      state: state,
      postal: postal
      // city: "city",
      // country: "country",
      // line1: "place?.formatted_address",
      // state: "state",
      // postal: "360002"

    }
    // console.log(address)
    props.setAddress(address);

    // console.log(city)
    const data = {
      deliveryzipcode: postal
      // deliveryzipcode: "360002"

    }
    // console.log(delivery)
    checkZipCode(data)
      .then((res) => {
        if (res?.data?.success == true) {
          setError(true);
          setMsg1(res?.data?.message_2);
          setMsg2("");
          props.setSpinner(false)
        } else {
          setError(true);
          setMsg2(res?.data?.message_2);
          setMsg1("");
          props.setSpinner(false)
        }

      })
  }

  const yesterday = moment().subtract(1, 'day');

  const weekend = current => {
    return current.day() !== 0 && current.day() !== 6 && current.isAfter(yesterday) && !getDisableDate.includes(current.format('YYYY-MM-DD'));
  }

  const handleDeliverySubmit = (e) => {
    e.preventDefault();
    if (validator.current.allValid()) {

    let data = {
      session: ReactSession.get('session'),
      delivery_date: delivery?.delivery_date,
      rental: delivery?.rental,
      delivery_address: getNewAddress,
      latitude: delivery?.latitude,
      longitude: delivery?.longitude,
      apt_number: delivery?.apt,
      description: delivery?.description,
      delivery_window_1: delivery?.delivery_window1,
      delivery_window_2: delivery?.delivery_window2,
      extra_work: delivery?.extra_work,
    }
    // console.log(data?.delivery_window_1)
     console.log(data)
    addDelivery(data)
      .then((res) => {
        getTotal(ReactSession.get('session'))
          .then((newtotal) => {
            // console.log(newtotal);
            props.setTotal(newtotal?.data?.session_cart_total);

            getPickUp(ReactSession.get('session'))
              .then((res) => {
                props.setPickupdate(res?.data?.results[0]?.pickup_date)
                // getDeliverSlots(ReactSession.get('session'))
                // .then((res) => {
                //  props.setDelivetslot1(res?.data?.results?.[0]?.delivery_window_1);
                //  props.setDelivetslot2(res?.data?.results?.[0]?.delivery_window_2);
                // })
              })
            step4Btn()

          })
      })
    step4Btn()

    } else {
      validator.current.showMessages();
      forceUpdate(1);
    }
  };

  const callApi = () => {

    setDelivery({ ...delivery, 'rental': props.select_rental });
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

    getDays()
      .then((res) => {
        setDays(res?.data);

        res?.data?.results?.map((obj, i) => {
          setDisableDate(obj.date);

        })
      })
    setDelivery({ ...delivery, rental: props.rentalid });
  };
  if(localStorage.getItem("apt")){
    // setAptval (localStorage.getItem("apt"));
    var aptval = localStorage.getItem("apt");
  }

  React.useEffect(() => {
    // console.log(delivery)
    // setnewdelivery();
    callApi();
  }, []);

  return (
    <>

      <div className="step4" id="step4">
        <h2 className="bg-primary text-white text-center py-2">
          Step 4: Delivery Details

        </h2>
        <div className="row">
          <div className="container px-5 my-4">
            {/* <div className="row py-4"> */}

            <form >
              <h5>Delivery Details</h5>
              <hr />
              <div className="row">
                <div className="col-md-6 mt-3">
                  <label>Delivery Date *</label>

                  <DatePicker
                    timeFormat={false}
                    isValidDate={weekend}
                    name="delivery_date"
                    dateFormat="YYYY-MM-DD"
                    placeholder="Choose a date"
                    closeOnSelect
                    value={ delivery.delivery_date}
                    // defaultDate={localStorage.getItem("deliverydate")}
                    onChange={(date) => handleChange123(date)}
                  />

                  {validator.current.message(
                    "Delivery Date",
                    delivery.delivery_date,
                    "required",
                    { className: "text-danger" }
                  )}
                </div>
                <div className="col-md-6 mt-3">
                  <label>Rental Period *</label>
                  <select
                    className="form-control"
                    name="rental"
                    value={delivery.rental}
                    onChange={(e) => handleChange(e)}
                  >
                    {rentals.results?.map((obj) => {
                      return <option value={obj.id} selected={(obj.id == props.rentalid) ? "selected" : ""} >{obj.period}</option>;
                    })}
                  </select>

                  {validator.current.message(
                    "Rental",
                    delivery.rental,
                    "required",
                    { className: "text-danger" }
                  )}
                </div>
                <div className="col-md-6 mt-3">
                  <label>Delivery Window 1 *</label>
                  <select
                    className="form-control"
                    name="delivery_window1"
                    selected={delivery.delivery_window1}
                    value={delivery.delivery_window1}
                    onChange={(e) => handleChange(e)}
                  >

                    <option value="" selected>
                      Select a time slot
                    </option>
                    {windows1.map((obj) => {
                      // console.log(obj)
                      return <option value={obj.id}>{`${obj.start_time} - ${obj.end_time}`}</option>

                    })}
                  </select>
                  {validator.current.message(
                    "Delivery Window1",
                    delivery.delivery_window1,
                    "required",
                    { className: "text-danger" }
                  )}
                </div>
                <div className="col-md-6 mt-3">
                  <label>Delivery Window 2 *</label>
                  <select
                    className="form-control"
                    name="delivery_window2"
                    value={delivery.delivery_window2}
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
                    "Delivery Window2",
                    delivery.delivery_window2,
                    "required",
                    { className: "text-danger" }
                  )}
                </div>
                <div className="col-md-6 mt-3">
                  <label>Delivery Address *</label>

                  <Autocomplete
                    className="form-control"
                    name="delivery_address"
                    apiKey={key}
                    
                    onPlaceSelected={(place) => {
                      
                      setaddress(place);
                    }}
                    options={{
                      types: ["address"],
                      componentRestrictions: { country: "us" },
                    }}
                  />
                  {/* {props.spinner ? <Spinner /> : " "} */}
                  {isError ? <p className="messagegreen" style={{ color: "green" }}>{errorMsg1} </p> : ""}
                  {isError ? <p className="messagered" style={{ color: "red" }}>{errorMsg2} </p> : ""}

                  {validator.current.message(
                    "Delivery Address",
                    delivery.delivery_address,
                    "",
                    { className: "text-danger" }
                  )}
                </div>
                <div className="col-md-6 mt-3">
                  <label>Apt# *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Apt"
                    name="apt"
                    autoComplete="off"
                    value={delivery.apt}
                    onChange={(e) => handleChange(e)}
                  />

                  {validator.current.message(
                    "apt",
                    delivery.apt,
                    "required",
                    { className: "text-danger" }
                  )}
                </div>
                <div className="col-md-12 mt-3">
                  <label>Do you have stairs or an elevator? *</label>

                  <select
                    className="form-control"
                    name="extra_work"
                    value={delivery.extra_work}
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
                    delivery.extra_work,
                    "required",
                    { className: "text-danger" }
                  )}
                </div>
                <div className="col-md-12 mt-3">
                  <label>Is there anything else we should know?</label>
                  <textarea
                    className="form-control"
                    name="description"
                    value={ delivery.description}
                    onChange={(e) => handleChange(e)}
                  ></textarea>

                  {/* {validator.current.message(
                    "description",
                    delivery.description,
                    "",
                    { className: "text-danger" }
                  )} */}
                </div>
              </div>
            </form>


            {/* </div> */}

            <div className="row">
              <div className="col-6">
                <div className="text-left mt-4">
                  <button
                    className="btn btn-dark step4BackBtn"
                    onClick={step4BackBtn}
                  >
                    Previous Step
                  </button>
                </div>
              </div>
              <div className="col-6">
                <div className="text-right mt-4">
                  <button
                    className="btn btn-dark step4Btn"
                    // onClick={step4Btn}
                    onClick={ (e) => {
                      step4Btn();
                      handleDeliverySubmit(e);
                    }}
                  >
                    Step 5:  Pickup Details
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
