import { cpSync } from "fs";
import { isEmptyObject } from "jquery";
import React, { useEffect, useState } from "react";
import { ReactSession } from 'react-client-session';
import { getSelectMovings, addtoCart, getCart, getTotal, delete_cart, getTotalCart } from "../../../data/API";
import LoadingSpinner from "./LoadingSpinner";
import moment from 'moment'

const session = ReactSession.get('session')

let total = '0.00';

function inc1(item, props) {

  props.setLoading(true);

  const fldid = `inpNum${item.id}`;
  const spanid = `span${item.id}`;

  const session = ReactSession.get('session');

  document.getElementById(fldid).stepUp();

  let data = {
    product: item.product.id,
    quantity: '1',
    session: session,
    cart_main_category: '1',
    cart_sub_category: item.product.product_sub_category,
    rental: props.rentalid,

  };
  // console.log(session);

  addtoCart(data)
    .then((res) => {
      getCart(data.cart_sub_category, session)
        .then((newdata) => {
          props.setPackings(newdata.data.results);
          getTotal(session)
            .then((sestotal) => {
              // console.log(sestotal?.data?.results[0]?.session_cart_total);
              props.setTotal(sestotal?.data?.session_cart_total);
              props.setTax(sestotal?.data?.tax);
              props.setLoading(false);

            })
        })
    })

  const productquantity = document.getElementById(fldid).value;
  // console.log(item.quantity);

  if (productquantity == 1) {
    document.getElementById(spanid).innerHTML = `<i class="fa fa-trash" aria-hidden="true"></i>`;

  } else {
    document.getElementById(spanid).innerHTML = `-`;
  }

}
export function dec1(item, props, session) {

  const fldid = `inpNum${item.id}`;
  const spanid = `span${item.id}`;
  const productquantity = document.getElementById(fldid).value;

  if (productquantity > 1) {

    props.setLoading(true);
    document.getElementById(fldid).stepDown();

    let data = {
      product: item.product.id,
      quantity: '-1',
      session: ReactSession.get('session'),
      cart_main_category: '1',
      cart_sub_category: item.product.product_sub_category,
      rental: props.rentalid,
    };
    // console.log(session);
    addtoCart(data)
      .then((res) => {
        // getCart(data.cart_sub_category, ReactSession.get('session'))
        //   .then((newdata) => {

        //     props.setPackings(newdata.data.results);
        //     getTotal(session)
        //       .then((sestotal) => {
        //         props.setTotal(sestotal?.data?.session_cart_total);
        //         props.setLoading(false);
        //       })
        //   })
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

          props.setSelectedRental(getboxcart[0].rental_int + " Week");
          props.setRentalId(getboxcart[0].rental);
          getTotal(ReactSession.get('session')).then((newtotal) => {
            // console.log(newtotal);
            props.setTotal(newtotal?.data?.session_cart_total);
            props.setTax(newtotal?.data?.tax);
            props.setLoading(false);

          })
        })
      })
  }
  else {
    delpacking(item, props);
  }

}

function delpacking(item, props) {
  props.setLoading(true);
  let data = {
    cart_sub_category: item.product.product_sub_category,
  };

  delete_cart(item.id)
    .then((res) => {

      getCart(data.cart_sub_category, ReactSession.get('session'))
        .then((newpacking) => {

          props.setPackings(newpacking.data.results);
          getTotal(ReactSession.get('session'))
            .then((sestotal) => {
              // console.log(sestotal?.data?.results[0]?.session_cart_total);
              props.setTotal(sestotal?.data?.session_cart_total);
              props.setTax("");
              props.setLoading(false);
            })

        })
    })
}

function inc2() {
  document.getElementById("inpNum2").stepUp();
}
function dec2() {
  document.getElementById("inpNum2").stepDown();
}

function inc3(item, props) {

  // getTotal(session).then((res) => {
  //   props.setTotal(res?.data?.results[0]?.session_cart_total);
  // })
  props.setLoading(true);

  const fldid = `inpNum${item.id}`;
  const spanid = `span${item.id}`;
  const session = ReactSession.get('session');

  document.getElementById(fldid).stepUp();

  let data = {
    product: item.product.id,
    quantity: '1',
    session: session,
    cart_main_category: '1',
    cart_sub_category: item.product.product_sub_category,
    rental: props.rentalid,
  };
  addtoCart(data)
    .then((res) => {
      getCart(data.cart_sub_category, session)
        .then((newdata) => {
          props.setMovings(newdata.data.results);
          getTotal(session)
            .then((sestotal) => {
              // console.log(sestotal?.data?.results[0]?.session_cart_total);
              props.setTotal(sestotal?.data?.session_cart_total);
              props.setLoading(false);

            })
        })
    })

  const productquantity = document.getElementById(fldid).value;

  if (productquantity == 1) {

    document.getElementById(spanid).innerHTML = `<i class="fa fa-trash" aria-hidden="true"  ></i>`;
  } else {
    document.getElementById(spanid).innerHTML = `-`;
  }

}

function dec3(item, props) {


  const fldid = `inpNum${item.id}`;
  const spanid = `span${item.id}`;

  const productquantity = document.getElementById(fldid).value;

  const session = ReactSession.get('session');
  console.log(productquantity);
  if (productquantity > 1) {

    props.setLoading(true);

    document.getElementById(fldid).stepDown();

    let data = {
      product: item.product.id,
      quantity: '-1',
      session: ReactSession.get('session'),
      cart_main_category: '1',
      cart_sub_category: item.product.product_sub_category,
      rental: props.rentalid,
    };
    addtoCart(data)
      .then((res) => {
        getCart(data.cart_sub_category, session)
          .then((newdata) => {
            props.setMovings(newdata.data.results);
            getTotal(ReactSession.get('session'))
              .then((sestotal) => {
                // console.log(sestotal?.data?.results[0]?.session_cart_total);
                props.setTotal(sestotal?.data?.session_cart_total);
                props.setLoading(false);
              })

          })
      })
  } else {
    delmoving(item, props);
  }
}


function delmoving(item, props) {

  props.setLoading(true);
  let data = {
    cart_sub_category: item.product.product_sub_category,
  };

  delete_cart(item.id)
    .then((res) => {
      getCart(data.cart_sub_category, ReactSession.get('session'))
        .then((newdata) => {
          props.setMovings(newdata.data.results);
          getTotal(session)
            .then((sestotal) => {
              // console.log(sestotal?.data?.results[0]?.session_cart_total);
              // props.setTotal(sestotal?.data?.session_cart_total);
              // props.setLoading(false);
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

                // props.setSelectedRental(getboxcart[0].rental_int + " Week");
                // props.setRentalId(getboxcart[0].rental);
                getTotal(ReactSession.get('session')).then((newtotal) => {
                  // console.log(newtotal);
                  props.setTotal(newtotal?.data?.session_cart_total);
                  props.setTax(newtotal?.data?.tax);
                  props.setLoading(false);
                })
              })
            })
        })
    })
}

function inc4() {
  document.getElementById("inpNum4").stepUp();
}
function dec4() {
  document.getElementById("inpNum4").stepDown();
}


const changePackge = () => {
  document.getElementById("step2").style.display = "none";
  document.getElementById("step3").style.display = "none";
  document.getElementById("step4").style.display = "none";
  document.getElementById("step5").style.display = "none";
  document.getElementById("step6").style.display = "none";
  document.getElementById("step1").style.display = "block";

  document.getElementById("st2").classList.remove("active");
  document.getElementById("st3").classList.remove("active");
  document.getElementById("st4").classList.remove("active");
  document.getElementById("st4").classList.remove("active");
  document.getElementById("st4").classList.remove("active");

  document.getElementById("st1").classList.add("active");
};
export default function Cart(props) {

  const formatedday = moment(props.getPickupdate).format('dddd');
  const monthformatdate = moment(props.getPickupdate).format('MMM D, YYYY')

  const deliveryday = moment(props.getDeliverydate).format('dddd');
  const deliverydate = moment(props.getDeliverydate).format('MMM D, YYYY')
  const { box, packing_products, moving_products, total } = props;
  const quantity = 1;
  const boxprice = 0;

  const table = () => {


    if (!box) {
      return <div
        className="col-lg-3"
        data-aos="fade-left"
        data-aos-delay="100"
        data-aos-duration="1000"
      >
        <div className="card noCard maincart">
          <div className="card-header bg-primary">
            <h5 className="text-white text-center">order summary</h5>
          </div>
          <div className="card-body p-0 py-1">
            <ul className="list-group list-group-flush p-0">
              <li className="list-group-item p-0">
                <table className="table m-0">

                  <tbody>
                    <tr>
                      <td>
                        <p className="fs-12 font-weight-bold m-0">Package</p>
                      </td>
                      <td>
                        <p
                          className="fs-12 font-weight-bold m-0 text-right text-primary change-package-p"
                          onClick={changePackge}
                        >
                          Change
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p className="fs-12 m-0">
                          {'No Item In Your Cart.'}
                        </p>
                      </td>
                      <td>
                        <p className="fs-12 m-0 text-right boxprice">$</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </li>
              <li className="list-group-item p-0">
                <table className="table m-0">
                  <tbody>
                    <tr>
                      <td colSpan="3">
                        <p className="fs-12 font-weight-bold m-0">
                          PACKING SUPPLIES
                        </p>
                      </td>
                    </tr>
                    <tr>

                      <td className="v-middle m-auto">
                        <p className="fs-12 m-0"> {'No Item In Your Cart.'}</p>
                      </td>
                      <td>
                        <p className="fs-12 m-0 text-right price" id="" >
                          $
                        </p>
                        <input
                          type="hidden"
                          className="numberInput text-center text-12"
                          value=""
                          name=""
                          readOnly
                          id=""
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </li>
              <li className="list-group-item p-0">
                <table className="table m-0">
                  <tbody>
                    <tr>
                      <td colSpan="3">
                        <p className="fs-12 font-weight-bold m-0">
                          MOVING SUPPLIES (RENTED)
                        </p>
                      </td>
                    </tr>
                    <tr>

                      <td className="v-middle m-auto">
                        <p className="fs-12 m-0">{'No Item In Your Cart.'}</p>
                      </td>
                      <td>
                        <p className="fs-12 m-0 text-right" id="">
                          $
                        </p>
                        <input
                          type="hidden"
                          className="numberInput text-center text-12"
                          value=""
                          name=""
                          id=""
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </li>
            </ul>
          </div>
          <div className="card-footer bg-primary">
            <table className="table m-0">
              <tbody className="pricetable">
                <tr>
                  <td className="p-0 border-0 ">
                    <p className="fs-12 font-weight-bold m-0 text-white">
                      Total Cost
                    </p>
                  </td>
                  <td className="p-0 border-0 ">
                    <p className="fs-12 font-weight-bold m-0 text-right text-white" on id="total">
                      $
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div >

    } else {
      // console.log(box);
      return <div
        className="col-lg-3"
        data-aos="fade-left"
        data-aos-delay="100"
        data-aos-duration="1000"
      >
        <div className="card noCard maincart " >
          <div className="card-header bg-primary">
            <h5 className="text-white text-center">order summary</h5>
          </div>

          {props.loading ? <LoadingSpinner /> : " "}
          <div className="card-body p-0 py-1">
            <ul className="list-group list-group-flush p-0">
              <li className="list-group-item p-0">
                <table className="table m-0">

                  <tbody>
                    <tr>
                      <td>
                        <p className="fs-12 font-weight-bold m-0">Package</p>
                      </td>
                      <td>
                        <p
                          className="fs-12 font-weight-bold m-0 text-right text-primary change-package-p"
                          onClick={changePackge}
                        >
                          Change
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p className="fs-12 m-0">
                          {box?.product?.title} ({box?.rental_int} Week)
                        </p>
                      </td>
                      <td>
                        <p className="fs-12 m-0 text-right boxprice">${box?.cart_price}</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </li>

              <li className="list-group-item p-0">
                <table className="table m-0">
                  <tbody>
                    <tr>
                      <td colSpan="3">
                        <p className="fs-12 font-weight-bold m-0">
                          PACKING SUPPLIES
                        </p>
                      </td>
                    </tr>

                    {props.packing_products &&
                      props.packing_products?.map((item) => {
                        const value = 1;
                        // console.log(item);

                        return (
                          // onClick={() => delpacking(item, props)}
                          <tr>
                            <td className="fs-12">
                              <button className="btn p-0" onClick={() => dec1(item, props, session)}>
                                <span className="v-middle text-primary" id={`span${item.id}`} >
                                  {
                                    item.quantity <= 1
                                      ?
                                      <i class="fa fa-trash" aria-hidden="true"  ></i>
                                      :
                                      <i class="fa fa-minus" aria-hidden="true"  ></i>

                                  }
                                </span>
                              </button>
                              <input
                                type="number"
                                className="numberInput text-center text-12"
                                value={item.quantity}
                                name=""
                                readOnly
                                id={`inpNum${item.id}`}

                              />
                              <button className="btn p-0" onClick={() => inc1(item, props)}>
                                <span className="v-middle text-primary text-12" >
                                  +
                                </span>
                              </button>
                            </td>
                            <td className="v-middle m-auto">
                              <p className="fs-12 m-0">{item?.product?.title}</p>
                            </td>
                            <td>
                              <p className="fs-12 m-0 text-right price" id={`itemPrice${item.id}`} >
                                ${(item.quantity * item?.product?.price)}
                              </p>
                              <input
                                type="hidden"
                                className="numberInput text-center text-12"
                                value={item.price}
                                name=""
                                readOnly
                                id={`old${item.id}`}

                              />
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </li>
              <li className="list-group-item p-0">
                <table className="table m-0">
                  <tbody>
                    <tr>
                      <td colSpan="3">
                        <p className="fs-12 font-weight-bold m-0">
                          MOVING SUPPLIES (RENTED)
                        </p>
                      </td>
                    </tr>
                    {moving_products &&
                      moving_products?.map((newitem) => {
                        const value = 1;
                        const price = newitem.price;
                        // console.log(newitem);
                        // console.log(newitem.quantity * newitem?.product?.price * newitem?.rental_int)
                        return (
                          <tr>
                            <td className="fs-12">
                              <button className="btn p-0" onClick={() => dec3(newitem, props)}>
                                <span className="v-middle text-primary" id={`span${newitem.id}`} >
                                  {
                                    newitem.quantity == 1
                                      ?
                                      <i class="fa fa-trash" aria-hidden="true"  ></i>
                                      :
                                      <i class="fa fa-minus" aria-hidden="true"  ></i>

                                  }
                                </span>
                              </button>
                              <input
                                type="number"
                                className="numberInput text-center text-12"
                                value={newitem.quantity}
                                name=""
                                id={`inpNum${newitem.id}`}

                              />

                              <button className="btn p-0" onClick={() => inc3(newitem, props)}>
                                <span className="v-middle text-primary text-12">
                                  +
                                </span>
                              </button>
                            </td>
                            <td className="v-middle m-auto">
                              <p className="fs-12 m-0">{newitem?.product?.title}</p>
                            </td>
                            <td>
                              <p className="fs-12 m-0 text-right" id={`movingitemPrice${newitem.id}`}>
                                ${(newitem.quantity * newitem?.product?.price * newitem?.rental_int)}

                              </p>
                              <input
                                type="hidden"
                                className="numberInput text-center text-12"
                                value={newitem.price}
                                name=""
                                id={`movingoldid${newitem.id}`}

                              />
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </li>
              {
                // console.log(props.getPickupdate)
                props.getDeliverydate != "" ?
                  <li className="list-group-item p-0" style={{ backgroundColor: "#E6F1FF" }}>
                    <table className="table m-0"  >
                      <tbody>
                        <tr> 
                          <td>
                            <p className="fs-12 font-weight-bold m-0">DELIVERY DATE & TIME</p>
                            <p>{deliverydate} ({deliveryday})
                              <br />
                              {props.delivetslot1?.start_time}-{props.delivetslot1?.end_time}<br />
                              {props.delivetslot2?.start_time}-{props.delivetslot2?.end_time}<br />
                            </p>
                          </td>
                        </tr>

                      </tbody>
                    </table>
                  </li>
                  :
                  ""
              }
              {
                props.getPickupdate != "" ?
                  <li className="list-group-item p-0" style={{ backgroundColor: "#E6F1FF" }}>
                    <table className="table m-0">

                      <tbody>
                        <tr>
                          <td>
                            <p className="fs-12 font-weight-bold m-0">PICK UP DATE & TIME</p>
                            <p>{monthformatdate} ({formatedday})
                              <br />
                              {props.pickupslot1?.start_time}-{props.pickupslot1?.end_time}<br />
                              {props.pickupslot2?.start_time}-{props.pickupslot2?.end_time}<br />

                            </p>
                          </td>

                        </tr>

                      </tbody>
                    </table>
                  </li>
                  :
                  ""
              }
              {

                props.getStairevevators > 0 ?
                  <li className="list-group-item p-0">
                    <table className="table m-0">

                      <tbody>
                        <tr>
                          <td>
                            <p className="fs-12 font-weight-bold m-0">Stair/Elevator</p>
                          </td>
                          <td>
                            <p
                              className="fs-12 m-0 text-right"

                            >
                              ${props.getStairevevators}
                            </p>
                          </td>
                        </tr>

                      </tbody>
                    </table>
                  </li>
                  :
                  "  "

              }
              {

                props.getDiscountprice > 0 ?
                  <li className="list-group-item p-0">
                    <table className="table m-0">

                      <tbody>
                        <tr>
                          <td>
                            <p className="fs-12 font-weight-bold m-0">Discount</p>
                          </td>
                          <td>
                            <p
                              className="fs-12 m-0 text-right"

                            >
                              ${props.getDiscountprice}
                            </p>
                          </td>
                        </tr>

                      </tbody>
                    </table>
                  </li>
                  :
                  "  "

              }

              {

                props.tax > 0 ?
                  <li className="list-group-item p-0">
                    <table className="table m-0">

                      <tbody>
                        <tr>
                          <td>
                            <p className="fs-12 font-weight-bold m-0">Sales Tax</p>
                          </td>
                          <td>
                            <p
                              className="fs-12 m-0 text-right"

                            >
                              ${props.tax}
                            </p>
                          </td>
                        </tr>

                      </tbody>
                    </table>
                  </li> :
                  ""

              }


            </ul>
          </div>
          <div className="card-footer bg-primary">
            <table className="table m-0">
              <tbody className="pricetable">
                <tr>
                  <td className="p-0 border-0 ">
                    <p className="fs-12 font-weight-bold m-0 text-white">
                      Total Cost
                    </p>
                  </td>
                  <td className="p-0 border-0 ">
                    <p className="fs-12 font-weight-bold m-0 text-right text-white" on id="total">
                      $  {total}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

    }
  }

  return (
    <>
      {table()}
    </>
  );
}
