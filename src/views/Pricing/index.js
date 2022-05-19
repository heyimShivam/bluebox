import React, { useState } from "react";
import ZipCode from "../Home/ZipModal";
// import SimpleReactValidator from "simple-react-validator";
import { getBoxPackages, getTotalCart, clearCart  } from "../../data/API";
import { ReactSession } from 'react-client-session';

export default function Index(props) {
    // props.setFooteroffice(true);
    // props.setshowHideFooter(false);
    const [openZipModal, setZipModal] = React.useState(false);
    const [product, setProduct] = useState([]);
    const [toggleModal, setToggleModal] = useState(true);
    const [category, setCategory] = useState("Home");

  const [active, setActive] = React.useState('Home');
  
    const setnewcategory = (newcat) => {
        // localStorage.setItem('tab',newcat);
    
        if (newcat == "Office") {
          document.getElementById("homebtn").classList.remove("active");
          document.getElementById("officebtn").classList.add("active");
        //   setCategory("Office")
    
        } else {
          document.getElementById("officebtn").classList.remove("active");
          document.getElementById("homebtn").classList.add("active");
        //   setCategory("Home")
    
        }
        // localStorage.setItem("tab",newcat)
    
        setActive(localStorage.getItem("tab"));
        // setCategory(localStorage.getItem("tab"));
        
        getBoxPackages(newcat, "Box Packages", '1 Week')
        .then((res) => {
        //   clearCart(ReactSession.get('session'));
       
          setProduct(res?.data);
        })
        .catch((e) => console.log(e));
        //wait
        };

    const hideZipM = () => {
        setZipModal(false);
    };

    const showZipModal = () => {
        setZipModal(true);
    };

    function getBoxProducts() {
        // props.category, props.sub_category,
        getBoxPackages("Home", "Box Packages", "1")
            .then((res) => {
                setProduct(res?.data);
                // console.log(res)

            })
            .catch((e) => console.log(e));
    };

    // console.log(products)
    React.useEffect((props) => {
        // getRentals();
        getBoxProducts();

    }, []);

    function toggleModalFunction(argu) {
        setToggleModal(argu);   
    }

    return (
        <>
            <ZipCode 
            showModal={openZipModal}
             hideModal={true}
            toggleModal={toggleModal}
            toggleModalFunction={toggleModalFunction}
             showHideHeader={props.showHideHeader} 
            setShowHideHeader={props.setShowHideHeader}
            showHideFooter={props.showHideFooter}
            setshowHideFooter={props.setshowHideFooter}
            showHideinnerFooter={props.showHideinnerFooter}
            setshowHideinnerFooter={props.setshowHideinnerFooter}
            />
            {/* hero */}
            {/* {product} */}
            <section className="hero pricing position-relative">
                <div className="container">
                    <div className="text-center">
                        <h1 className="text-white" data-aos="fade-down" data-aos-delay="0" data-aos-duration="1000">
                            <span className="font-weight-bold"> Box Rental Packages</span>
                        </h1>
                        <div className="col-md-12">
                        <button className={`rounded-right ${(active=='Home')?'active':''} homebtn`} id="homebtn" value="Home" onClick={(e) => setnewcategory('Home')} >HOME</button>
              <button className={`rounded-left ${(active=='Office')?'active':''} officebtn`} id="officebtn" value="Office" onClick={(e) => setnewcategory('Office')}>OFFICE</button>
                        </div>
                    </div>
                </div>
            </section>
            {/* hero */}
            {/* pricing  */}
            <section className="pricing py-5">
                <div className="container-fluid">
                    <div className="row">
                        {product.results?.slice(0, 5).map((obj) => {
                            // console.log(obj);
                            return (
                                <>
                                    <div className="col-lg col-md-4 col-sm-6 p-2" data-aos="fade-right" data-aos-delay="300" data-aos-duration="1000">
                                        <div className="card">
                                            <div className="card-header bg-danger">
                                                <div className="text-center">
                                                    <h3 className="text-white">{obj.title}</h3>
                                                    <p className="text-white">{obj.total_boxes} Boxes</p>
                                                </div>
                                            </div>
                                            <div class="bins">
                                                {/* <div class="bins_round">
                                            <h5>{obj.total_boxes}</h5>
                                            <span>Box</span>
                                            </div> */}
                                                <div class="round_box">
                                                    {/* <img src="img/bins.png" /> */}
                                                    <h5>{obj.total_boxes}</h5>
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <div className="text-center">
                                                    <h2>
                                                        <span className="top fs-14 crs">$</span>
                                                        {obj.price}
                                                        <span className="middle fs-14">
                                                            {/* / {obj.period} */}
                                                        </span>
                                                    </h2>
                                                    <ul className="mt-3">
                                                        <div
                                                            dangerouslySetInnerHTML={{
                                                                __html: obj.description,
                                                            }}
                                                        ></div>
                                                    </ul>
                                                    <div className="text-center mt-3 orderbtn">
                                                        <button className="btn btn-dark" style={{ margintop: "55px" }} onClick={() => {showZipModal(); setToggleModal(true)}}>Order Now</button>
                                                    </div>
                                                    {/* <div className="radio-toolbar">
                                                        <input
                                                            type="radio"
                                                            id={obj.id}
                                                            name="radio"
                                                            value="ADD PACKAGE"
                                                            //   onClick={() => handlePackageClick(obj)}
                                                            // onClick={() => handlePackageClick(obj.id,obj.quantity,session,obj.product_main_category,obj.period)}
                                                            style={{ display: "none" }}
                                                        />
                                                        <label
                                                            className="btn btn-danger mt-3"
                                                            htmlFor={obj.id}
                                                        >
                                                        </label>
                                                    </div> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>);
                        })}

                        {/* <div className="col-lg col-md-4 col-sm-6 p-2" data-aos="fade-right" data-aos-delay="1200" data-aos-duration="1000">
                            <div className="card">
                                <div className="card-header bg-primary text-center">
                                    <p className="text-white m-0">5 BEDROOM</p>
                                </div>
                                <div className="card-body-main">
                                    <div className="text-center">
                                        <h2>$309</h2>
                                        <p className="fs-14 mb-0">First week</p>
                                        <p className="fs-14">Additional Weeks: $80</p>
                                        <p className="border-top border-bottom">100 Bluebox Boxes </p>

                                    </div>
                                    <table className="table-pricing">
                                        <tr>
                                            <td className="border-0">
                                                <i className="fa fa-check"></i>
                                            </td>
                                            <td className="border-0">
                                                <p className="text-primary mb-0">
                                                    80 Large Boxes
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="border-0">
                                                <i className="fa fa-check"></i>
                                            </td>
                                            <td className="border-0">
                                                <p className="text-primary mb-0">
                                                    10 Medium Boxes
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="border-0">
                                                <i className="fa fa-check"></i>
                                            </td>
                                            <td className="border-0">
                                                <p className="text-primary mb-0">
                                                    10 Extra Large Boxes
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="border-0">
                                                <i className="fa fa-check"></i>
                                            </td>
                                            <td className="border-0">
                                                <p className="text-primary mb-0">
                                                    2 Moving Dolly
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="border-0">
                                                <i className="fa fa-check"></i>
                                            </td>
                                            <td className="border-0">
                                                <p className="text-primary mb-0">
                                                    100 Box Labels
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="border-0">
                                                <i className="fa fa-check"></i>
                                            </td>
                                            <td className="border-0">
                                                <p className="text-primary mb-0">
                                                    Free Delivery & Pickup
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="border-0">
                                                <i className="fa fa-check"></i>
                                            </td>
                                            <td className="border-0">
                                                <p className="text-primary mb-0">
                                                    Rec. for 1000-1500 sqft.
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="border-0">
                                                <i className="fa fa-check"></i>
                                            </td>
                                            <td className="border-0">
                                                <p className="text-primary mb-0 fw-700">
                                                    No Tax! We'll Cover It!
                                                </p>
                                            </td>
                                        </tr>
                                    </table>

                                    <div className="text-center mt-3">
                                        <button className="btn btn-dark" style={{ margintop: "55px" }} onClick={() => showZipModal()}>Oreder Now</button>
                                    </div>
                                </div>
                            </div>
                        </div> */}

                    </div>
                </div>
            </section>
            {/* pricing */}
            {/* free delivery */}
            <div className="free bg-primary py-3">
                <div className="container">
                    <h2 className="mb-0 text-center text-white" data-aos="fade-down" data-aos-delay="100" data-aos-duration="1000">FREE DELIVERY AND PICK UP ON ALL HOME AND OFFICE PACKAGES!</h2>
                </div>
            </div>
            {/* <!-- free delivery  */}
            {/* gallery  */}
            <section className="gallery py-4">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <img src="img/box.png" alt="" />
                        </div>
                    </div>
                </div>
            </section>
            {/* gallery Slider  */}
        </>
    );
}