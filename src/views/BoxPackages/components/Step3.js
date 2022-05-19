import React from "react";
import { getSelectMovings,addtoCart, getCart,getTotal,getnewRental } from "../../../data/API";
import { ReactSession } from 'react-client-session';



function step3Btn() {
  document.getElementById("step3").style.display = "none";
  document.getElementById("step4").style.display = "block";


  document.getElementById("st3li").classList.remove("current");
  document.getElementById("st3li").classList.add("complete");
  document.getElementById("st4").classList.add("active");
  document.getElementById("st4li").classList.add("current");

}

function step3BackBtn() {
  document.getElementById("step3").style.display = "none";
  document.getElementById("step2").style.display = "block";
  document.getElementById("st3").classList.remove("active");
  document.getElementById("st2").classList.add("active");
  document.getElementById("st2li").classList.add("current");  

  document.getElementById("st3li").classList.remove("current");
  document.getElementById("st2li").classList.remove("complete");
}

export default function Step3(props) {
  const [category, setCategory] = React.useState("Home");
  const [sub_category, setSubCate] = React.useState("Select Moving");

  const [moving_supplies, setMovingSupplies] = React.useState("Moving Supplies");
  const [moving_products, setMovingProducts] = React.useState([]);
  const session =  ReactSession.get('session')

  function containsObject(obj, list) {
    return list?.some((elem) => elem === obj);
  }
  // handle click event of the button to add item
  const addMoreItem = (newItem, typ) => {
      // if (!containsObject(newItem, props.movings)) {
        // console.log(newItem);
        props.setLoading(true);
        let data =  {
          product: newItem.id,
          quantity: newItem.quantity,
          session: session,
          cart_main_category: 2,
          cart_sub_category: newItem.product_sub_category,
          rental: props.rentalid,

        };

        addtoCart(data)
        .then((res) =>{
          getCart( data.cart_sub_category, session)

          .then((newdata) => {
          //  console.log(newdata)
            props.setMovings(newdata.data.results);
            getTotal(session).then((res) => {
              props.setTotal(res?.data?.session_cart_total);
              props.setLoading(false);
            })
          })
        } )

        // props.setMovings((prevItems) => [...prevItems, newItem]);
      // }
  };

  

  const callAPI = () => {
   /* getSelectMovings(category, sub_category)
      .then((res) => {
        setMovingProducts(res?.data);
      })
      .catch((e) => console.log(e)); */

    getSelectMovings(category, moving_supplies)
      .then((res) => {
        setMovingProducts(res?.data);
      })
      .catch((e) => console.log(e));
  };
  React.useEffect(() => {
    callAPI();
  }, []);

//   const styleObj = {
//     margin: "30px auto",
// }

  return (
    <>
      <div className="step3" id="step3">
        <h2 className="bg-primary text-white text-center py-2">
           Step 3: Select Rented Moving Supplies
        </h2>
        <div className="row">
          <div className="container px-5 my-4">
            <div className="row py-4">
              {moving_products.results?.map((moving) => {

                // {console.log(moving_products)}
                return (
                  <>
                    <div className="col-md-4 p-0">
                      <div className="card">
                        <div className="">
                          <div className="text-center title-main">
                            <h3>{moving.title}</h3>
                            <img
                              src={moving.image}
                              alt=""
                              style={{ maxHeight: 180 }}
                            />

                             <p style={{ color: "#6AB1FF" }} ><b>{moving.subtitle}</b></p>
                          </div>
                        </div>
                        <div className="card-body">
                          <div className="">
                            <ul className="mt-3">
                              <ul className="mt-3">
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: moving.description,
                                  }}
                                ></div>
                              </ul>
                            </ul>
                            </div>
                            <div className="text-center">
                            <p  className="pkgprice" ><b>${moving.price}  {moving.unit}</b></p>
                            <button
                              className="btn btn-danger mt-3"
                              onClick={() => addMoreItem(moving, "moving")}
                            >
                              +ADD
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}

              {/* {packing_products.results?.map((packing) => {
                return (
                  <>
                    <div className="col-md-4 p-0" >
                      <div className="card">
                        <div className="">
                          <div className="text-center">
                            <h3>{packing.title}</h3>
                            <img
                              src={packing.image}
                              alt=""
                              style={{ width: 75 }}
                            />

                            <p>{packing.unit}</p>
                          </div>
                        </div>
                        <div className="card-body">
                          <div className="text-center">
                            <ul className="mt-3">
                              <ul className="mt-3">
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: packing.description,
                                  }}
                                ></div>
                              </ul>
                            </ul>
                            <button
                              className="btn btn-danger mt-3"
                              onClick={() => addMoreItem(packing, "packing")}
                            >
                              +ADD
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    
                  </>
                );
              })} */}
            </div>
            <div className="row">
              <div className="col-6">
                <div className="text-left mt-4">
                  <button
                    className="btn btn-dark step2BackBtn"
                    onClick={step3BackBtn}
                  >
                    Previous Step
                  </button>
                </div>
              </div>
              <div className="col-6">
                <div className="text-right mt-4">
                  <button
                    className="btn btn-dark step2Btn"
                    onClick={step3Btn}
                  >
                  Step 4:  Delivery Details
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
