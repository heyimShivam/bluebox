import { relativeTimeRounding } from "moment";
import React, { useEffect, useState, useRef } from "react";
import ZipCode from "../Home/ZipModal";
import { propTypes } from "react-bootstrap/esm/Image";
import SimpleReactValidator from "simple-react-validator";
import { rentalsPeriods, getBoxPackages, getPackage, checkZipCode } from "../../data/API";

export default function Index() {

    const [openZipModal, setZipModal] = React.useState(false);

    const hideZipM = () => {
        setZipModal(false);
    };

    const showZipModal = () => {
        setZipModal(true);
    };

    const [rentals, setRentalList] = useState([]);
    const [products1, setProducts1] = useState([]);
    const [rental2, setRental2] = useState([]);
    const [rental3, setRental3] = useState([]);
    const [rental4, setRental4] = useState([]);
    const [rental5, setRental5] = useState([]);
    const [rental6, setRental6] = useState([]);


    async function getrentalprice(id) {

        await getPackage('Home', 'Box', id)
            .then((res) => {
                if (id == 2) {
                    setRental2(res?.data?.results);
                }
                if (id == 3) {
                    setRental3(res?.data?.results);
                }
                if (id == 4) {
                    setRental4(res?.data?.results);
                }
                if (id == 5) {
                    setRental5(res?.data?.results);
                }
                if (id == 6) {
                    setRental6(res?.data?.results);
                }

            })

    }

    const getRentals = () => {

        rentalsPeriods()
            .then((res) => {
                setRentalList(res?.data);

                res?.data.results?.map((obj) => {
                    console.log(obj.sort_by);
                    if (obj.sort_by > 1) {
                        getrentalprice(obj.sort_by);
                    }

                })

            })
            .catch((e) => console.log(e));
    };

    const getBoxProducts = () => {

        getBoxPackages("Home", "Box Packges", "1")
            .then((res) => {
                setProducts1(res?.data);
            })
            .catch((e) => console.log(e));
    };

    React.useEffect((props) => {
        getRentals();
        getBoxProducts();

    }, []);
    return (
        <>
            <ZipCode showModal={openZipModal} hideModal={hideZipM} />
            <section className="hero move-home position-relative">
                <div className="container">
                    <div className="text-center">
                        <h1 className="text-white" data-aos="fade-down" data-aos-delay="0" data-aos-duration="1000">
                            Why Rent <span className="font-weight-bold">Moving <span className="text-primary">Boxes</span></span>
                        </h1>
                        <button className="btn btn-primary px-4 mt-2" data-aos="fade-down" data-aos-delay="400"
                            data-aos-duration="1000" onClick={() => showZipModal()} >Order Now</button>
                    </div>
                </div>
            </section>
          

            <section className="packages">
                    <div className="container">
                        <div className="row">
                        <div className="col-md-12">
                                <p>Let’s face it, moving can be stressful. Especially the part dealing with cardboard boxes: sourcing clean ones, building the boxes, breaking them down after the move, then finally trying to figure out how to (conscientiously) dispose of them. BlueBox simplifies your moving experience by removing the cardboard effect. Our reusable moving boxes are designed to maximize storage space and minimize packing time. Plus movers love them too. You can count on a stress-free move using our tree-free, plastic moving boxes for your next move within the San Francisco Bay Area.</p>

                                <p>We deliver to all types of residences — from high-rise apartment complexes to ten-bedroom mansions in the hills — and everything in between. All box rental packages include free delivery and pick up of our clean, sanitized moving boxes.</p>
                                <img src="img/box.png"/>
                            </div>     
                        </div>     
                    </div>
                </section>

        </>


    );
}