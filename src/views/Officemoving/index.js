import React, { useState } from "react";
import ZipCode from "../Home/ZipModal";
import { getPackage } from "../../data/API";

export default function Index(props) {

    props.setFooteroffice(true);
    props.setshowHideFooter(false);

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
    
    const [toggleModal, setToggleModal] = useState(true);


    async function getrentalprice(id) {
   

        await getPackage('Office', 'Box', id)
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

    
    
    React.useEffect((props) => {
        // getRentals();
        // getBoxProducts();
        

    }, []);
    function toggleModalFunction(argu) {
        setToggleModal(argu);   
    }
    return (
        <>
          <ZipCode showModal={openZipModal} hideModal={hideZipM}
          toggleModal={toggleModal}
          toggleModalFunction={toggleModalFunction} />
            <section class="hero move-office position-relative">
                <div class="container">
                    <div class="text-center">
                        <h1 class="text-white" data-aos="fade-down" data-aos-delay="0" data-aos-duration="1000">
                             <span class="font-weight-bold">Office Moving Box Rentals</span>
                        </h1>
                        <button className="btn btn-primary px-4 mt-2" data-aos="fade-down" data-aos-delay="400"
                            data-aos-duration="1000" onClick={() => {showZipModal(); setToggleModal(true)}} >Order Now</button>
                    </div>
                </div>
            </section>
            <section class="moving_office">
                <div class="container">
                    <div class ="moving_office_main">
                         <div class ="row">
                                <div class ="col-md-4">
                                    <img src="img/delivery-truck.png" alt=""/>
                                    <p>Fewer manpower hours required<br/> and less moving trucks<br/> needed</p>
                                </div>
                                <div class ="col-md-4">
                                        <img src="img/productivity.png" alt=""/>
                                        <p>Reduce employee downtime<br/> increasing productivity</p>
                                </div>
                                <div class ="col-md-4">
                                        <img src="img/corporate.png" alt=""/>
                                        <p>Sustainable moves boost <br/>corporate image</p>
                                </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="officecontaint">
                <div className="container">
                    <div class="row">
                        <div class="col-md-12">
                            <p>Do you have an upcoming San Francisco Bay Area office move on the calendar? BlueBox moving boxes are the perfect solution for your business relocation needs. Reduce unproductive downtime by removing the need for employees to build cardboard boxes, while eliminating all that cardboard waste. BlueBox offers a zero-waste office moving solution perfect for retail stores, medical offices, venture-funded startups and everything in between. No matter your business, we have a solution for your company.</p>

                            <p>BlueBox enables sustainable, low-stress office moves within the San Francisco Bay Area by providing clean, eco-friendly, reusable moving boxes delivered to your current office. Boxes are easy to pack and neatly stack on top of one another when full and nest within one another when empty — helping you save valuable office space. Stack boxes 3 - 4 high then wheel them through the office out to the truck using our custom fit 4-wheel dollies. Once you’ve completed your move and your office is done unpacking, we will come pick up all the supplies. No dump, no dumpsters, no cardboard waste!</p>
                            <img src="img/box.png" alt="" />
                        </div>
                    </div>
                </div>
            </section>

            {/* <section className="packages">
                <div className="container">
                    <div class="row">
                        <div class="col-2">
                            <a href="../homemoving">
                                <button class="btn homeBtn d-block w-100  tab1">
                                    <div class="btn-holder">
                                        <img src="img/home.png" class="img-fluid w-50 ImgBorder m-auto" alt="something" /> <br />
                                    </div>
                                    HOME
                                </button>
                            </a>
                        </div>
                        <div class="col-2">
                            <a href="../officemoving">
                                <button class="btn homeBtn d-block w-100 active tab2">
                                    <div class="btn-holder">
                                        <img src="img/home.png" class="img-fluid w-50 ImgBorder m-auto" alt="something" /> <br />
                                    </div>
                                    OFFICE
                                </button>
                            </a>
                        </div>
                    </div>


                    <div className="tables p-2 bg-white">
                        <table className="table mb-0 table-striped table1">
                            <tr>
                                <td className="border-0 w-24 tdbg">
                                    <span className="h3 bg-secondary">PACKAGES</span>
                                    <p className="my-4">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse gravida. Risus
                                        commodo viverra maecenas accumsan lacus vel facilisis.
                                    </p>
                                </td>
                                {rentals.results?.map((obj) => {

                                    return (
                                        <td className="border-0 text-center w-19">
                                            <div className="btn-holder m-auto">
                                                <img src="img/home.png" className="img-fluid w-50 ImgBorder m-auto" alt="something" /> <br />
                                            </div>
                                            <span className="mt-3 fs-20 d-inline-block">{obj.period}</span> <br />
                                            <span className="fw-700 fs-20 d-inline-block">rental</span>
                                        </td>
                                    );
                                })}
                            </tr>
                            {products1.results?.map((obj, index) => {

                                return (
                                    <tr className="bg-sec">
                                        <td className="border-0 w-24">
                                            <p className="fs-20 fw-700 mb-0">{obj.title}</p>
                                            <a href="" className="text-dark fs-14">Click for details</a>
                                        </td>
                                        <td className="border-0 bg-sec text-center w-19">
                                            <p className="m-0 fw-700">${obj.price}</p>
                                        </td>
                                        <td className="border-0 bg-sec text-center w-19">
                                            <p className="m-0 fw-700">${ rental2?.[index]?.price}</p>
                                        </td>
                                        <td className="border-0 bg-sec text-center w-19">
                                            <p className="m-0 fw-700">${ rental4?.[index]?.price}</p>
                                        </td>
                                        <td className="border-0 bg-sec text-center w-19">
                                            <p className="m-0 fw-700">${ rental5?.[index]?.price}</p> 
                                        </td>
                                        <td className="border-0 bg-sec text-center w-19">
                                            <p className="m-0 fw-700">${ rental6?.[index]?.price}</p> 
                                        </td>
                                    </tr>
                                );
                            })}
                        </table>
                    </div>

                </div>
            </section> */}
            {/* <section className="movingSafely py-5">
                <div className="container-fluid p-0">
                    <div className="row">
                        <div className="col-md-7" data-aos="fade-right">
                            <div className="card bg-primary">
                                <div className="card-body pl-5">
                                    <h2 className="text-white mb-0">For Your Office</h2>
                                    <p className="fs-14 text-white">
                                        The greatest obstacle when relocating a business is minimizing the downtime
                                        between locations. Rental Crates include many features that allow you to
                                        pack faster, move efficiently, and return to what you do best. Rental Crates
                                        are great for:
                                    </p>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <ul className="fa-ul m-0 p-0">
                                                <li className="text-white">
                                                    <i className="fa fa-check fs-14"></i>
                                                    <span className="fs-14">Packing Desks & Surfaces</span>
                                                </li>
                                                <li className="text-white">
                                                    <i className="fa fa-check fs-14"></i>
                                                    <span className="fs-14">Packing Lateral File Cabinets</span>
                                                </li>
                                                <li className="text-white">
                                                    <i className="fa fa-check fs-14"></i>
                                                    <span className="fs-14">Transferring Hanging Files</span>
                                                </li>
                                                <li className="text-white">
                                                    <i className="fa fa-check fs-14"></i>
                                                    <span className="fs-14">Packing Workstations & Cubicles</span>
                                                </li>
                                                <li className="text-white">
                                                    <i className="fa fa-check fs-14"></i>
                                                    <span className="fs-14">Office to Office Moving</span>
                                                </li>
                                                <li className="text-white">
                                                    <i className="fa fa-check fs-14"></i>
                                                    <span className="fs-14">Internal Office Moving</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-md-6">
                                            <ul className="fa-ul m-0 p-0">
                                                <li className="text-white">
                                                    <i className="fa fa-check fs-14"></i>
                                                    <span className="fs-14">Packing Executive Offices</span>
                                                </li>
                                                <li className="text-white">
                                                    <i className="fa fa-check fs-14"></i>
                                                    <span className="fs-14">Moving Secure Files</span>
                                                </li>
                                                <li className="text-white">
                                                    <i className="fa fa-check fs-14"></i>
                                                    <span className="fs-14">Renovations & Temporary Storage</span>
                                                </li>
                                                <li className="text-white">
                                                    <i className="fa fa-check fs-14"></i>
                                                    <span className="fs-14">Libraries, Schools, & Law Offices</span>
                                                </li>
                                                <li className="text-white">
                                                    <i className="fa fa-check fs-14"></i>
                                                    <span className="fs-14">Moving Medical Records</span>
                                                </li>
                                                <li className="text-white">
                                                    <i className="fa fa-check fs-14"></i>
                                                    <span className="fs-14">Packing IT Components</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-5" data-aos="fade-left" data-aos-delay="100" data-aos-duration="1000">
                            <iframe src="https://www.youtube.com/embed/A0gITUjBIcg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>




                    </div>

                    <div className="row mt-5">
                        <div className="col-md-6 mt-4 py-2 p-4" data-aos="fade-right" data-aos-delay="100" data-aos-duration="1000">
                            <img src="img/reduce.png" className="img-fluid m-auto w-75" alt="something" />
                        </div>

                        <div className="col-md-6 mt-4 py-2 br-left m-auto" data-aos="fade-left" data-aos-delay="100" data-aos-duration="1000">
                            <div className="card bg-primary">
                                <div className="card-body pl-4 pr-5">
                                    <h2 className="text-white mb-0 fs-55">
                                        Reduce Move Time
                                        and Costs, Stay
                                        Secure and Organized
                                    </h2>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <ul className="fa-ul m-0 p-0 mt-3">
                                                <li className="text-white">
                                                    <i className="fa fa-check fs-14"></i>
                                                    <span className="fs-14">No assembly required. Rental Crates are delivered ready to pack. No tape needed</span>
                                                </li>
                                                <li className="text-white">
                                                    <i className="fa fa-check fs-14"></i>
                                                    <span className="fs-14">Rental Crates are cheaper than cardboard. Save on packing materials when you
                                                        switch to plastic moving boxes.</span>
                                                </li>
                                                <li className="text-white">
                                                    <i className="fa fa-check fs-14"></i>
                                                    <span className="fs-14">Rental Crates are designed to store both legal and letter hanging files.</span>
                                                </li>
                                                <li className="text-white">
                                                    <i className="fa fa-check fs-14"></i>
                                                    <span className="fs-14">Each Rental Crate Package includes Rental Skates to make packing and
                                                        transporting easier than cardboard.</span>
                                                </li>
                                                <li className="text-white">
                                                    <i className="fa fa-check fs-14"></i>
                                                    <span className="fs-14">No waste, no disposal fees. We pick up Rental Crates when you’re finished.</span>
                                                </li>

                                            </ul>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}
         

        </>


    );
}