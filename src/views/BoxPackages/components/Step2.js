import React from "react";
import { getSelectMovings, addtoCart, getCart, getTotal } from "../../../data/API";
import { ReactSession } from 'react-client-session';

function step2Btn() {
  document.getElementById("step2").style.display = "none";
  document.getElementById("step3").style.display = "block";
  
  document.getElementById("st2li").classList.remove("current");
  document.getElementById("st2li").classList.add("complete");
  document.getElementById("st3").classList.add("active");
  document.getElementById("st3li").classList.add("current");
  
}
function step2BackBtn() {
  document.getElementById("step2").style.display = "none";
  document.getElementById("step1").style.display = "block";
  document.getElementById("show_btn").style.display = "block";
  document.getElementById("tabsSection").classList.remove("newstp");

  document.getElementById("st2").classList.remove("active");
  document.getElementById("st1").classList.add("active");  
  document.getElementById("st1li").classList.add("current");  

  document.getElementById("st2li").classList.remove("current");
  document.getElementById("st1li").classList.remove("complete");
  
}


export default function Step2(props) {
  // {console.log(props.rentalid)}
  //  console.log(props.rentalid);
  const [category, setCategory] = React.useState("Home");
  const [sub_category, setSubCate] = React.useState("Select Moving");
  // const [moving_products, setMovingProducts] = React.useState([]);

  const [packing_supplies, setPackingSupplies] = React.useState("Packing Supplies");
  const [packing_products, setPackingProducts] = React.useState([]);

  const session = ReactSession.get('session')


  function containsObject(obj, list) {
    return list?.some((elem) => elem === obj);
  }
  // handle click event of the button to add item


  const addMoreItem = (newItem, typ) => {

    if (typ === "packing") {
      // if (!containsObject(newItem, props.packings)) {
      props.setLoading(true);
      let data = {
        product: newItem.id,
        quantity: newItem.quantity,
        session: session,
        cart_main_category: 2,
        cart_sub_category: newItem.product_sub_category,
        rental: props.rentalid,
      };

      // console.log(data)
      addtoCart(data)
        .then((res) => {
          getCart(data.cart_sub_category, session)
            .then((newdata) => {
              //  console.log(newdata)
              props.setPackings(newdata.data.results);
              getTotal(session).then((res) => {
                // console.log(res)
                props.setTotal(res?.data?.session_cart_total);
                props.setTax(res?.data?.tax);
                // alert(props.tax)
                props.setLoading(false);
              })
            })
        })

      // }
    } else {
      // if (!containsObject(newItem, props.movings)) {
      props.setPacking((prevItems) => [...prevItems, newItem]);
      // }
    }
  };



  const callAPI = () => {
    /* getSelectMovings(category, sub_category)
       .then((res) => {
         setMovingProducts(res?.data);
       })
       .catch((e) => console.log(e)); */

    getSelectMovings(category, packing_supplies)
      .then((res) => {
        setPackingProducts(res?.data);
      })
      .catch((e) => console.log(e));
  };
  React.useEffect(() => {
    callAPI();
  }, []);


  return (
    <>
      <div className="step2" id="step2">
        <h2 className="bg-primary text-white text-center py-2">
          Step 2: Select Packing Supplies
        </h2>
        <div className="row">
          <div className="container px-5 my-4">
            <div className="row py-4">
              {packing_products.results?.map((packing) => {
                // console.log(packing_products);
                return (
                  <>
                    <div className="col-md-4 p-0" >
                      <div className="card">
                        <div className="">
                          <div className="text-center title-main">
                            <h3 >{packing.title}</h3>
                            <img
                              src={packing.image}
                              alt=""
                              style={{ maxHeight: 180 }}
                            />
                            <p style={{ color: "#6AB1FF" }} ><b>{packing.subtitle}</b></p>
                          </div>
                        </div>
                        <div className="card-body">
                          <div >
                            <ul className="mt-3">
                              <ul className="mt-3 ">
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: packing.description,
                                  }}

                                ></div>

                              </ul>
                            </ul>
                          </div>
                          <div className="text-center">
                            <p className="pkgprice" ><b>${packing.price}  {packing.unit} </b></p>
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
              })}
            </div>
            <div className="row">
              <div className="col-6">
                <div className="text-left mt-4">
                  <button
                    className="btn btn-dark step2BackBtn"
                    onClick={step2BackBtn}
                  >
                    Previous Step
                  </button>
                </div>
              </div>
              <div className="col-6">
                <div className="text-right mt-4">
                  <button
                    className="btn btn-dark step2Btn"
                    onClick={step2Btn}
                  >
                    Step 3:  Select Moving Supplies
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
