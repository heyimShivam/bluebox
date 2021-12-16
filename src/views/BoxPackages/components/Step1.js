import React, { useEffect, useState } from "react";
import { rentalsPeriods, getBoxPackages, addtoCart, getCart, getTotal, getnewRental, getTotalCart, getDeliverSlots, getPickupSlots } from "../../../data/API";
import { ReactSession } from 'react-client-session';
import $ from 'jquery';
import LoadingSpinner from './LoadingSpinner';
import Mainloader from "./Mainloader";


function step1Btn() {
  document.getElementById("step1").style.display = "none";
  document.getElementById("step2").style.display = "block";
  //  document.getElementById("orderpreview").style.display = "none";

  document.getElementById("st1li").classList.remove("current");
  document.getElementById("st1li").classList.add("complete");
  document.getElementById("st2").classList.add("active");
  document.getElementById("st2li").classList.add("current");
}


export default function Step1(props) {
  console.log(props)
  const [rentals, setRentalList] = useState([]);
  const [is_selected, setSelect] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [selected, setSelected] = useState();

  const session = ReactSession.get('session')

  const gotcart = async (session) => {
    // props.setTotal = 0;

    getTotal(session)
      .then((res) => {

        props.setMainloader(true);
        setHidden(false);
        props.setTotal(res?.data?.session_cart_total);
        props.setTax(res?.data?.tax);
        props.setStairevevators(res?.data?.extra_cost);

        getDeliverSlots(ReactSession.get('session'))
        .then((res) => {
          // console.log(res)
          if (res?.data?.count > 0 || res?.data?.results?.length >0 ) {
            props.setDelivetslot1(res?.data?.results?.[0]?.delivery_window_1);
            props.setDelivetslot2(res?.data?.results?.[0]?.delivery_window_2);
            props.setDeliverydate(res?.data?.results?.[0]?.delivery_date);
          }
        })
      getPickupSlots(ReactSession.get('session'))
        .then((res) => {
          if (res?.data?.count > 0) {
            props.setPickupslot1(res?.data?.results?.[0]?.pickup_window_1);
            props.setPickupslot2(res?.data?.results?.[0]?.pickup_window_2);
            props.setPickupdate(res?.data?.results[0]?.pickup_date)
          }
        })

      })
      .catch((e) => console.log(e));

    // if( props.setTotal > 0) {
    getTotalCart(session).then((res) => {
      let rental1 = "";
      let rentalid1 = "";

      if (res.data.results.length > 0) {
        rental1 = res.data.results[0].rental_int + " Week";
        rentalid1 = res.data.results[0].rental;
      } else {
        rental1 = "2 Week";
        rentalid1 = 'be7f2421-2168-45ce-ab4e-d5ed5f68ab69';
      }

      getBoxProducts(rental1);
      props.setSelectedRental(rental1);
      props.setRentalId(rentalid1);
      props.setDelivery({ ...props.delivery, rental: rentalid1 });

      const getboxcart = res?.data?.results.filter(obj => {
        return obj?.product?.product_sub_category === 1;
      });

      if (getboxcart) {
        props.setBox(getboxcart[0]);
        // console.log("demodeomajsdklfj")
        // console.log(getboxcart[0].rental);
        props.setRentalId(getboxcart[0].rental);
        setSelected(getboxcart[0].product.id);
        setSelect(true);
        // props.setMainloader(false);
        // setHidden(true);

      }
      const getpackingcart = res?.data?.results.filter(obj => {
        return obj?.product?.product_sub_category === 2;
      });

      if (getpackingcart) {
        props.setPackings(getpackingcart);
        // props.setMainloader(false);
        // setHidden(true);
      }
      const getmovingcart = res?.data?.results.filter(obj => {
        return obj?.product?.product_sub_category === 3;
      });
      if (getmovingcart) {
        props.setMovings(getmovingcart);
        props.setMainloader(false);
        setHidden(true);
      }
      

    })
      .catch((e) => console.log(e));
    // }

  }
  const getRentals = () => {
    props.setMainloader(true);
    setHidden(false);
    rentalsPeriods()
      .then((res) => {
        setRentalList(res?.data);
        props.setMainloader(false);
        // setHidden(false);
      })
      .catch((e) => console.log(e));
  };
  const getBoxProducts = async (rental = props.select_rental) => {
    props.setMainloader(true);
    setHidden(false);
    getBoxPackages(props.category, props.sub_category, rental)
      .then((res) => {
        props.setProducts(res?.data);
        props.setMainloader(false);
        setHidden(true);
      })
      .catch((e) => console.log(e));
  };

  function selectRentals(e, obj, rental) {
    // console.log(obj);
    // console.log("obj");
    let data = {
      session: ReactSession.get('session'),
      rental: obj.id
    };
    // props.setMainloader(true);

    props.setSelectedRental(rental);
    props.setRentalId(obj.id);
    getBoxProducts(rental);
    props.setDelivery({ ...props.delivery, rental: obj.id });

    getnewRental(data)
      .then((res) => {

        getTotalCart(ReactSession.get('session')).then((res) => {

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

          getTotal(session).then((newtotal) => {
            props.setTotal(newtotal?.data?.session_cart_total);
            // props.setMainloader(false);

          });
        });
      });
    getBoxProducts(rental);
  }

  const handlePackageClick = (obj) => {
    // console.log(new_rental)
    let data = {
      product: obj.id,
      quantity: obj.quantity,
      session: session,
      cart_main_category: '1',
      cart_sub_category: obj.product_sub_category,
      rental: obj.period_id,
    };
    // props.setLoading(true);
    setSelect(true);
    addtoCart(data)
      .then((res) => {
        // console.log(res)
        getCart(data.cart_sub_category, session)
          .then((newdata) => {
            props.setBox(newdata.data?.results[0]);
            setSelected(obj?.id);
            getTotal(ReactSession.get('session')).then((res) => {
            props.setTotal(res?.data?.session_cart_total);

            })
          })
      })
      .catch((e) => {
        console.log(e);
      });
  };

  React.useEffect((props) => {
    getRentals();
    // console.log(props.getDeliverydate);
    // getBoxProducts();
    gotcart(session);
    // document.getElementById("orderpreview").style.display = "none";

    // props.setShowHideHeader(false);
    // props.setshowHideFooter(false);
    // props.setshowHideinnerFooter(true);
   
  


  }, []);
  return (
    <>
      {props.mainloader ? <Mainloader /> : " "}
      <div className="step1" id="step1">
        <h2 className="bg-primary text-white text-center py-2">
          Step 1: Rental Period and Box Package
        </h2>
        <div className="row">
          <div className="col-2">
            <p className="fs-14 text-center">Select rental period</p>
          </div>
          <div className="col-10 m-auto">
            <div className="pagination">
              {rentals.results?.map((obj) => {
                // console.log(obj)
                return (
                  <button
                    className={
                      obj.period === props.select_rental
                        ? "btn btn-outline-primary fs-14 p-1 active"
                        : "btn btn-outline-primary fs-14 p-1"
                    }
                    onClick={(e) => selectRentals(e, obj, obj.period)}
                  >
                    {obj.period}

                  </button>
                );
              })}
            </div>
          </div>
          <div className="container px-5 my-4">
            <div className="row py-4">

              {props.products.results?.map((obj) => {
                // console.log(obj);
                return (
                  <><div className="col-md-4 p-0 pkg">
                    <div className="card">
                      <div className="card-header bg-danger">
                        <div className="text-center">
                          <h3 className="text-white">{obj.title}</h3>
                          <p className="text-white">{obj.total_boxes} Boxes</p>
                        </div>
                      </div>
                      <div class="bins">
                        <div class="bins_round">
                          <h5>{obj.total_boxes}</h5>
                          <span>Box</span>
                        </div>
                        <div class="round_box">
                          <img src="img/round-box.png" />
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="text-center">
                          <h2>
                            <span className="top fs-14 crs">$</span>
                            {obj.price}
                            <span className="middle fs-14">
                              / {obj.period}
                            </span>
                          </h2>
                          <ul className="mt-3">
                            <div
                              dangerouslySetInnerHTML={{
                                __html: obj.description,
                              }}
                            ></div>
                          </ul>

                          <div className="radio-toolbar">
                            <input
                              type="radio"
                              id={obj.id}
                              name="radio"
                              value="ADD PACKAGE"
                              onClick={() => handlePackageClick(obj)}
                              // onClick={() => handlePackageClick(obj.id,obj.quantity,session,obj.product_main_category,obj.period)}
                              style={{ display: "none" }}
                            />
                            <label
                              className="btn btn-danger mt-3"
                              htmlFor={obj.id}
                            >
                              {selected === obj.id ? "Selected" : "Add Package"}
                            </label>
                          </div>
                          {/* <button  type="radio" className="btn btn-success mt-3">
                        ADD PACKAGE
                      </button> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  </>
                );
              })}
            </div>
            <div className="text-right mt-4">
              <button
                className="btn btn-dark step1Btn"
                onClick={step1Btn}
                disabled={is_selected ? false : true}
                hidden={hidden ? false : true}
              >
                Step 2:  Select Packing Supplies
              </button>
            
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
