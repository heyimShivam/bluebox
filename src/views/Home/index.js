import React, { useEffect, useState, useRef } from "react";
import SimpleReactValidator from "simple-react-validator";
import { useHistory } from "react-router-dom";
import ZipCode from "./ZipModal";
import $ from 'jquery';
// import { useRef } from "react"; 

import {
  getHomeData,
  getTestimonials,
  getContactInfo,
  getWhyUs,
  getLocations,
  saveQuote,
} from "../../data/API";

import { useToasts } from "react-toast-notifications";

import SimpleSlider from "./slider";

export default function Home() {
  const [, forceUpdate] = useState();
  const validator = useRef(new SimpleReactValidator());

  const [home, setHomeData] = useState();
  const [testimonials, setTestimonials] = useState([]);
  const [why_us, setWhyUs] = useState([]);
  const [contact_info, setContactInfo] = useState([]);
  const [locations, setLocation] = useState([]);
  // const history = useHistory();
  const [zipcode, setZipcode] = useState([]);
  const { addToast } = useToasts();
  // Free Quote Request states

  const [values, setValues] = React.useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
    delivery_date: "",
  });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const loadiframe = () => {
    window.$('#myModal').modal('show');
    document.getElementById('iframediv').innerHTML = " <button type='button' class='close' onClick= window.$('#myModal').modal('hide') > <span aria-hidden='true'>&times;</span> </button>  <iframe src='https://www.google.com/maps/d/embed?mid=12kcjTorPJsZapSyYTn6pryBGaOazmiPn' width='640' height='480'></iframe>";
  }


  const handleQuoteSubmit = (e) => {
    e.preventDefault();
    if (validator.current.allValid()) {
      saveQuote(values)
        .then((res) => {
          addToast("Message sent successfully", {
            appearance: "success",
            autoDismiss: true,
          });
        })
        .catch((e) => {
          addToast("Some error occure,please try again", {
            appearance: "error",
            autoDismiss: true,
          });
        });
    } else {
      validator.current.showMessages();
      forceUpdate(1);
    }
  };

  const callApi = () => {
    getHomeData()
      .then((res) => {
        setHomeData(res.data);
      })
      .catch((e) => console.log(e));

    getContactInfo()
      .then((res) => {
        setContactInfo(res.data);
      })
      .catch((e) => console.log(e));

    getWhyUs()
      .then((res) => {
        setWhyUs(res.data);
      })
      .catch((e) => console.log(e));

    getTestimonials()
      .then((res) => {
        setTestimonials(res.data);
      })
      .catch((e) => console.log(e));

    getLocations()
      .then((res) => {
        setLocation(res.data);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    callApi();
    if (zipcode == "") {
      setZipcode(false);
      // console.log(setZipcode)
    }

  }, []);
  const [showM, setModal] = React.useState(false);
  const [toggleModal, setToggleModal] = React.useState(false);
  const hideZModal = () => {
    setModal(false);
  };

  const showZModal = () => {
    setModal(true);
  };
  function toggleModalFunction(argu) {
    setToggleModal(argu);   
}

  const ref = useRef();
  return (
    <>
      <ZipCode
      showModal={toggleModal}
      hideModal={true}
        zipcode={zipcode}
        setZipcode={setZipcode}
        toggleModal={toggleModal}
        toggleModalFunction={toggleModalFunction}
      />
      {/* <!-- hero --> */}
      <section className="hero position-relative">
        <div className="container">
          <div className="row">
            <div className="col-md-6 position-relative home-banner">
              <h1
                className="mb-0 font-weight-bold banner-text"
                data-aos="fade-right"
                data-aos-delay="500"
                data-aos-duration="1000"
              >
                     We Rent Eco-Friendly<br />Moving Boxes Delivered to <br /> Your Home or Office
              </h1>
              <div className="btns mt-4">
                <div className="row d-flex justify-content-center" style={{width: '100%', padding: 0, margin: 0}}>
                  <div className="">
                    <button
                      className="btn btn-primary w-100 d-block"
                      // data-toggle="modal"
                      // data-target="#zipModal"
                      data-aos="fade-up"
                      data-aos-delay="800"
                      data-aos-duration="1000"
                      onClick={() => {showZModal(); setToggleModal(true);}}
                    >
                      Start Your Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="col-md-6">
              <img
                src="img/help.png"
                className="img-fluid position-absolute"
                data-aos="zoom-in"
                data-aos-duration="1500"
                alt="somethinghelping Men"
              />
            </div> */}
          </div>
        </div>
      </section>
      {/* <!-- hero --> */}s
      {/* <!-- Modal --> */}
      <ZipCode showModal={showM} hideModal={hideZModal} />
      {/* <div
        className="modal fade"
        id="zipModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                <img src="img/icon-truck.png" className="img-fluid" alt="" />
                Where are you moving?
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-6 p-2">
                  Zipcode of your current address?
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Zipcode"
                    name="pickup_zipcode"
                    value={values.pickup_zipcode}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="col-md-6 p-2">
                  Zipcode of your new address?
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Zipcode"
                    name="delivery_zipcode"
                    value={values.delivery_zipcode}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="col-12 text-right">
                  <a
                    href="box-package.html"
                    className="mt-4 btn btn-primary"
                    onClick={(e) => zipCode(e)}
                  >
                    Continue
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {/* <!-- modal --> */}

      {/* <!-- we provide banner --> */}

      <div className="top_section bg-primary text-center">
        <div className="row">
          <div className="col-12">
            <h4>We provide FREE delivery and pickup to &nbsp;
              <a class="list-group-item" onClick={() => loadiframe()}> these cities and surrounding areas</a> </h4>
            <div id="myModal" class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-lg">
                <div class="modal-content" id="iframediv">

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- we provide banner --> */}



      {/* <!-- We deliver  --> */}
      <section className="columns py-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <h1>How it Works</h1>
            </div>
            <div className="col-md-3 p-0 py-2 howitwork" data-aos="fade-right" data-aos-delay="0" data-aos-duration="1000">
              <img src="img/order-online.gif" className="oneImg img-fluid" alt="something" />
              <h3>Order boxes</h3>
              <p className="text">Select from any of our moving box packages and order moving supplies, if needed.</p>
            </div>
            <div className="col-md-3 p-0 py-2 howitwork" data-aos="fade-right" data-aos-delay="300" data-aos-duration="1000">
              <img src="img/we-deliver.gif" className="twoImg img-fluid" alt="something" />
              <h3>We deliver</h3>
              <p className="text">We'll provide free delivery of our clean, sanitized plastic moving boxes</p>
            </div>
            <div className="col-md-3 p-0 py-2 howitwork" data-aos="fade-right" data-aos-delay="600" data-aos-duration="1000">
              <img src="img/you-pack-and-move.gif" className="threeImg img-fluid" alt="something" />
              <h3>You pack and move</h3>
              <p className="text">Pack the boxes, hire movers and move into your new home or office</p>
            </div>
            <div className="col-md-3 p-0 py-2 howitwork" data-aos="fade-right" data-aos-delay="900" data-aos-duration="1000">
              <img src="img/we-pickup.gif" className="fourImg img-fluid" alt="something" />
              <h3>We pick up</h3>
              <p className="text">Once you're done unpacking and settled in, we'll visit to pickup the boxes</p>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- We deliver  --> */}


      {/* <!-- why choos us --> */}

      <section className="whyChooseUs">
        <div className="container">
            <div className="row">
                <div className="col-md-12 text-center">
                    <h1>Why Choose BlueBox</h1>
                </div>
                <div className="whyChooseUs_banner">
                    <div className="row">
                        <div className="col-md-4">
                            <img src="img/homepageicons-01.png"/>
                            <h4>Free Delivery & Pick Up</h4>
                            <p>We provide free delivery and pick up of our moving boxes throughout the San Francisco Bay Area and beyond</p>
                        </div>
                        <div className="col-md-4">
                            <img src="img/homepageicons-02.png"/>
                            <h4>Timed Deliveries</h4>
                            <p>We offer timed deliveries to ensure boxes arrive when you need them</p>
                        </div>
                        <div className="col-md-4">
                            <img src="img/homepageicons-03.png"/>
                            <h4>Next-Day Delivery</h4>
                            <p>Need boxes in a hurry? We offer next-day delivery. Just order by 3 PM the day before</p>
                        </div>
                        <div className="col-md-4">
                            <img src="img/homepageicons-04.png"/>
                            <h4>Moving Supplies</h4>
                            <p> We sell moving supplies to help you get packing as soon as boxes arrive</p>
                        </div>
                        <div className="col-md-4">
                            <img src="img/homepageicons-05.png"/>
                            <h4>Earth Friendly</h4>
                            <p>Using reusable boxes saves trees and keeps cardboard out of landfills. No dumps, no dumpsters, no waste</p>
                        </div>
                        <div className="col-md-4">
                            <img src="img/homepageicons-06.png"/>
                            <h4>Stress Free</h4>
                            <p>Moving can be stressful. Packing doesn’t have to be. Pack happy!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

      {/* <!-- why choos us --> */}

      {/* <!-- beats cardboard box --> */}
      <section className="cardboardBox">
        <div className="container-fluid">
            <div className="cardbox">
                <div className="row">
                    <div className="col-md-12">
                        <img src="img/newproduct_img.jpeg"/>
                    </div>
                    <div id="mydiv">
                          {/* <img src="img/newproduct_img.jpeg" class="image_full"/> */}
                          <img src="img/productmobile1.png"  class="image_mobile"/>
                          <img src="img/productmobile2.png"  class="image_mobile"/>
                      </div>
                </div>
            </div>
        </div>
    </section>
      {/* <!-- beats cardboard box --> */}

      {/* <!-- slider Section --> */}
      <section className="sliderSection py-3 position-relative">
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-md-6">
              <div className="card bg-primary pl-5">
                <div className="card-body">
                  <h5 className="mb-0 text-white" data-aos="fade-right" data-aos-delay="0" data-aos-duration="1000">Don't take it from us...</h5>
                  <div className="line bg-white" data-aos="fade-right" data-aos-delay="0" data-aos-duration="1000"></div>
                  <h2 className="mt-3 font-weight-bold pb-5 text-white" data-aos="fade-right" data-aos-delay="300" data-aos-duration="1000">
                    Here's what our<br /> customers are<br /> saying
                  </h2>
                </div>

              </div>
            </div>
            <div className="col-md-7">
              <div className="slider">
                <SimpleSlider testimonials={testimonials} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- slider Section --> */}

      {/* <!-- we deliver to this area --> */}
      <section className="we-deliver">
        <div className="container">
          <h2 className="font-weight-bold">We deliver to cities in the San Francisco Bay Area and beyond</h2>
          <div className="line bg-primary"></div>
          <div className="row">
            <div className="col-md-8">
              <div className="row mt-2">
                {locations.results?.map((obj) => {
                  return (
                    <div
                      className="col-md-3 p-1 cityname"
                      data-aos="fade-right"
                      data-aos-delay="0"
                      data-aos-duration="1000"
                    >
                      {obj.title}
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Quote form */}
            <div
              className="col-md-4 m-auto"
              data-aos="fade-left"
              data-aos-delay="1200"
              data-aos-duration="1000"
            >
              <div className="card bg-dark br-0">
                <div className="card-body">
                  <p className="fs-13 text-primary text-uppercase font-weight-bold mb-0">
                    Request a
                  </p>
                  <h3 className="text-white">Free Quote</h3>
                  <form className="mt-4">
                    <div className="row">
                      <div className="col-12 p-1">
                        <input
                          type="text"
                          className="form-control fs-12 my-1"
                          placeholder="Full Name"
                          name="full_name"
                          value={values.full_name}
                          onChange={(e) => handleChange(e)}
                        />
                        {validator.current.message(
                          "full_name",
                          values.full_name,
                          "required",
                          { className: "text-danger" }
                        )}
                      </div>
                      <div className="col-12 p-1">
                        <input
                          type="email"
                          className="form-control fs-12 my-1"
                          placeholder="Email Address"
                          name="email"
                          value={values.email}
                          onChange={(e) => handleChange(e)}
                        />
                        {validator.current.message(
                          "email",
                          values.email,
                          "required|email",
                          { className: "text-danger" }
                        )}
                      </div>
                      <div className="col-12 p-1">
                        <input
                          type="text"
                          className="form-control fs-12 my-1"
                          placeholder="Phone Number"
                          name="phone"
                          value={values.phone}
                          onChange={(e) => handleChange(e)}
                        />
                        {validator.current.message(
                          "phone",
                          values.phone,
                          "required|numeric",
                          { className: "text-danger" }
                        )}
                      </div>
                      <div className="col-lg-6 p-1">
                        <input
                          type="text"
                          className="form-control fs-12 my-1"
                          placeholder="City/Zip code"
                          name="zipcode"
                          value={values.zipcode}
                          onChange={(e) => handleChange(e)}
                        />
                        {validator.current.message(
                          "zipcode",
                          values.zipcode,
                          "required",
                          { className: "text-danger" }
                        )}
                      </div>
                      <div className="col-lg-6 p-1">
                        <input
                          type="text"
                          ref={ref}
                          onFocus={() => (ref.current.type = "date")}
                          onBlur={() => (ref.current.type = "text")}
                          className="form-control fs-12 my-1"
                          placeholder="Delivery Date"
                          name="delivery_date"
                          value={values.delivery_date}
                          onChange={(e) => handleChange(e)}
                        />
                        {validator.current.message(
                          "delivery_date",
                          values.delivery_date,
                          "required",
                          { className: "text-danger" }
                        )}
                      </div>
                      <div className="col-12 p-1">
                        <button
                          className="btn btn-primary br-0 d-block w-100 text-dark mt-3 font-weight-bold"
                          type="submit"
                          onClick={(e) => handleQuoteSubmit(e)}
                        >
                          GET QUOTE
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- we deliver to this area --> */}
    </>
  );
}
