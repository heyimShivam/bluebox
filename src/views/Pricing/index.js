import React, { useEffect, useState, useRef } from "react";
import ZipCode from "../Home/ZipModal";
import SimpleReactValidator from "simple-react-validator";
import { rentalsPeriods, getBoxPackages, getPackage } from "../../data/API";

export default function Index() {
    const [openZipModal, setZipModal] = React.useState(false);
    const [product, setProduct] = useState([]);


    const hideZipM = () => {
        setZipModal(false);
    };

    const showZipModal = () => {
        setZipModal(true);
    };

    function getBoxProducts() {

        getBoxPackages("Home", "Box Packges", "1")
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


    return (
        <>
            <ZipCode showModal={openZipModal} hideModal={hideZipM} />
            {/* hero */}
            {/* {product} */}
            <section className="hero pricing position-relative">
                <div className="container">
                    <div className="text-center">
                        <h1 className="text-white" data-aos="fade-down" data-aos-delay="0" data-aos-duration="1000">
                            Box <span className="font-weight-bold">Rental <span className="text-primary">Packages</span></span>
                        </h1>
                        <div className="col-md-12">
                            <button className="rounded-right active " onclick="redirect()">HOME</button>
                            <button className="rounded-left officebtn" id="officebtn" value="Office">OFFICE</button>
                        </div>
                    </div>
                </div>
            </section>
            {/* hero */}
            {/* pricing  */}
            <section className="pricing py-5">
                <div className="container-fluid">
                    <div className="row">

                        <div className="col-lg col-md-4 col-sm-6 p-2" data-aos="fade-right" data-aos-delay="300" data-aos-duration="1000">
                            <div className="card">
                                <div className="card-header bg-primary text-center">
                                    <p className="text-white m-0">1 BEDROOM</p>
                                </div>
                                <div className="card-body-main">
                                    <div className="text-center">
                                        <h2>$109</h2>
                                        <p className="fs-14 mb-0">First week</p>
                                        <p className="fs-14">Additional Weeks: $40</p>
                                        <p className="border-top border-bottom">40 Bluebox Boxes </p>

                                    </div>
                                    <table className="table-pricing">
                                        <tr>
                                            <td className="border-0">
                                                <i className="fa fa-check"></i>
                                            </td>
                                            <td className="border-0">
                                                <p className="text-primary mb-0">
                                                    25 Large Boxes
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="border-0">
                                                <i className="fa fa-check"></i>
                                            </td>
                                            <td className="border-0">
                                                <p className="text-primary mb-0">
                                                    1 Moving Dolly
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="border-0">
                                                <i className="fa fa-check"></i>
                                            </td>
                                            <td className="border-0">
                                                <p className="text-primary mb-0">
                                                    25 Box Labels
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
                                                    Rec. for 250-500 sqft.
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
                                        <button className="btn btn-dark" onClick={() => showZipModal()}>Oreder Now</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg col-md-4 col-sm-6 p-2" data-aos="fade-right" data-aos-delay="300" data-aos-duration="1000">
                            <div className="card">
                                <div className="card-header bg-primary text-center">
                                    <p className="text-white m-0">2 BEDROOM</p>
                                </div>
                                <div className="card-body-main">
                                    <div className="text-center">
                                        <h2>$159</h2>
                                        <p className="fs-14 mb-0">First week</p>
                                        <p className="fs-14">Additional Weeks: $50</p>
                                        <p className="border-top border-bottom">40 Bluebox Boxes </p>

                                    </div>
                                    <table className="table-pricing">
                                        <tr>
                                            <td className="border-0">
                                                <i className="fa fa-check"></i>
                                            </td>
                                            <td className="border-0">
                                                <p className="text-primary mb-0">
                                                    35 Large Boxes
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="border-0">
                                                <i className="fa fa-check"></i>
                                            </td>
                                            <td className="border-0">
                                                <p className="text-primary mb-0">
                                                    5 Medium Boxes
                                                </p>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td className="border-0">
                                                <i className="fa fa-check"></i>
                                            </td>
                                            <td className="border-0">
                                                <p className="text-primary mb-0">
                                                    1 Moving Dolly
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="border-0">
                                                <i className="fa fa-check"></i>
                                            </td>
                                            <td className="border-0">
                                                <p className="text-primary mb-0">
                                                    40 Box Labels
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
                                        <button className="btn btn-dark" style={{ margintop: "29px" }} onClick={() => showZipModal()}>Oreder Now</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg col-md-4 col-sm-6 p-2" data-aos="fade-right" data-aos-delay="600" data-aos-duration="1000">
                            <div className="card">
                                <div className="card-header bg-primary text-center">
                                    <p className="text-white m-0">3 BEDROOM</p>
                                </div>
                                <div className="card-body-main">
                                    <div className="text-center">
                                        <h2>$209</h2>
                                        <p className="fs-14 mb-0">First week</p>
                                        <p className="fs-14">Additional Weeks: $60</p>
                                        <p className="border-top border-bottom">60 Bluebox Boxes </p>
                                    </div>
                                    <table className="table-pricing">
                                        <tr>
                                            <td className="border-0">
                                                <i className="fa fa-check"></i>
                                            </td>
                                            <td className="border-0">
                                                <p className="text-primary mb-0">
                                                    50 Large Boxes
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="border-0">
                                                <i className="fa fa-check"></i>
                                            </td>
                                            <td className="border-0">
                                                <p className="text-primary mb-0">
                                                    5 Medium Boxes
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="border-0">
                                                <i className="fa fa-check"></i>
                                            </td>
                                            <td className="border-0">
                                                <p className="text-primary mb-0">
                                                    5 Extra Large Boxes
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="border-0">
                                                <i className="fa fa-check"></i>
                                            </td>
                                            <td className="border-0">
                                                <p className="text-primary mb-0">
                                                    1 Moving Dolly
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="border-0">
                                                <i className="fa fa-check"></i>
                                            </td>
                                            <td className="border-0">
                                                <p className="text-primary mb-0">
                                                    60 Box Labels
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
                                        <button className="btn btn-dark" style={{ margintop: "56px" }} onClick={() => showZipModal()}>Oreder Now</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg col-md-4 col-sm-6 p-2" data-aos="fade-right" data-aos-delay="900" data-aos-duration="1000">
                            <div className="card">
                                <div className="card-header bg-primary text-center">
                                    <p className="text-white m-0">4 BEDROOM</p>
                                </div>
                                <div className="card-body-main">
                                    <div className="text-center">
                                        <h2>$259</h2>
                                        <p className="fs-14 mb-0">First week</p>
                                        <p className="fs-14">Additional Weeks: $70</p>
                                        <p className="border-top border-bottom">80 Bluebox Boxes </p>

                                    </div>
                                    <table className="table-pricing">
                                        <tr>
                                            <td className="border-0">
                                                <i className="fa fa-check"></i>
                                            </td>
                                            <td className="border-0">
                                                <p className="text-primary mb-0">
                                                    70 Large Boxes
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="border-0">
                                                <i className="fa fa-check"></i>
                                            </td>
                                            <td className="border-0">
                                                <p className="text-primary mb-0">
                                                    5 Medium Boxes
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="border-0">
                                                <i className="fa fa-check"></i>
                                            </td>
                                            <td className="border-0">
                                                <p className="text-primary mb-0">
                                                    5 Extra Large Boxes
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="border-0">
                                                <i className="fa fa-check"></i>
                                            </td>
                                            <td className="border-0">
                                                <p className="text-primary mb-0">
                                                    1 Moving Dolly
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="border-0">
                                                <i className="fa fa-check"></i>
                                            </td>
                                            <td className="border-0">
                                                <p className="text-primary mb-0">
                                                    80 Box Labels
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
                                        <button className="btn btn-dark" onClick={() => showZipModal()}>Oreder Now</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg col-md-4 col-sm-6 p-2" data-aos="fade-right" data-aos-delay="1200" data-aos-duration="1000">
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
                        </div>



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
                <img src="img/box.png"/>
            </div>
          </div>
      </div>
  </section>
            {/* gallery Slider  */}
        </>
    );
}