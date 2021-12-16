import React, { useEffect, useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { checkZipCode, getLocations } from "../../data/API";

export default function Index(props) {
    const history = useHistory();
    const { addToast } = useToasts();
    const [isLoading, setLoading] = React.useState(false);
    const [isError, setError] = React.useState(false);
    const [errorMsg, setMsg] = React.useState("");
    const [locations, setLocation] = React.useState([]);

    const [values, setValues] = React.useState({
        pickup_zipcode: "",
        delivery_zipcode: "",
    });

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };


    const handleZipCode = (e) => {
        e.preventDefault();
        let obj = {
            pickup_zipcode: values.pickup_zipcode,
            delivery_zipcode: values.delivery_zipcode,
        };
        checkZipCode(obj)
            .then((res) => {
                // console.log(res);
                if (res?.data?.success) {
                    history.push("/box-packges");
                    props.hideModal();
                    props.setShowHideHeader(false);
                    props.setshowHideFooter(false);
                    props.setshowHideinnerFooter(true);

                } else {
                    setError(true);
                    setMsg(res?.data?.message);
                }
            })
            .catch((e) => { });
    };
    const callApi = () => {
        getLocations()
      .then((res) => {
        setLocation(res.data);
      })
      .catch((e) => console.log(e));

    };
    useEffect(() => {
        callApi();
    }, []);
    return (
        <>
            <section className="hero move-location position-relative location ">
                <div className="container">
                    <div id="locations-content" ng-app="zippgo" ng-controller="CheckController as controller" className="ng-scope">
                        <div className="row">
                            <div className="columns small-12 large-10 large-offset-1 end">
                                <div className="order-box locationform">
                                    {/* <h2><img width="32" src="img/icon-truck.png" data-interchange="[/assets/img/icon-truck@2x.png, (retina)]" /> Check If We Service Your Area</h2> */}

                                    {isLoading ? (
                                        <div className="text-center">
                                            <div className=" mt-5">
                                                <Spinner
                                                    animation="border"
                                                    size={"lg"}
                                                    role="status"
                                                    variant="primary"
                                                >
                                                    <span className="sr-only">Loading...</span>
                                                </Spinner>
                                            </div>
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                    {/* <Modal
                                        show={props.showModal}
                                        aria-labelledby="contained-modal-title-vcenter"
                                        centered
                                        onHide={props.hideModal}
                                    > */}
                                    <div className="">
                                        <div className="">
                                            <div className="modal-header">
                                                <h5>
                                                    <img src="img/icon-truck.png" className="img-fluid" alt="" />
                                                    Where are you moving?
                                                </h5>
                                                {/* <button type="button" className="close" onClick={props.hideModal}>
                                                            <span aria-hidden="true">&times;</span>
                                                        </button> */}
                                            </div>
                                            <div className="modal-body">
                                                <div className="row">
                                                    {isError ? <p style={{ color: "red" }}>{errorMsg} </p> : ""}
                                                    <div className="col-md-6 p-2">
                                                        Zipcode of your current address?
                                                        <input
                                                            type="text"
                                                            id="ship-address"
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
                                                            id="pickup-address"
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
                                                            onClick={(e) => handleZipCode(e)}
                                                        >
                                                            Continue
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* </Modal> */}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
            <section className="locationiframe">
            <iframe src='https://www.google.com/maps/d/embed?mid=12kcjTorPJsZapSyYTn6pryBGaOazmiPn' width='640' height='480'></iframe>
            </section>
            <section className="areas_cities">
                <div className="container">
                    <h2 className="font-weight-bold">We deliver to cities in the San Francisco Bay Area and beyond</h2>
                    <div className="line bg-primary"></div>
                    <div className="row">
                        <div className="col-md-12">
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
                    </div>
                </div>
            </section>



        </>
    )

}
