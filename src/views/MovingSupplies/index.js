import React from "react";
import ZipCode from "../Home/ZipModal";
import { getSelectMovings } from "../../data/API";

export default function Index() {
    const [openZipModal, setZipModal] = React.useState(false);

    const hideZipM = () => {
        setZipModal(false);
    };

    const showZipModal = () => {
        setZipModal(true);
    };
    
    const [toggleModal, setToggleModal] = React.useState(true);
    const [movingProductss, setMovingProductss] = React.useState([]);

    const callAPI = () => {
        getSelectMovings('Home', "Moving Supplies")
            .then((res) => {
                setMovingProductss(res.data);

                //console.log(moving_products);
            }).catch((e) => console.log(e));
    };

    React.useEffect(() => {
        callAPI();
    }, []);
    function toggleModalFunction(argu) {
        setToggleModal(argu);   
    }
    return (
        <>
         <ZipCode 
      showModal={openZipModal}
       hideModal={hideZipM} 
       toggleModal={toggleModal}
            toggleModalFunction={toggleModalFunction}
    //    showHideHeader={props.showHideHeader} 
    //    setShowHideHeader={props.setShowHideHeader}
    //    showHideFooter={props.showHideFooter}
    //    setshowHideFooter={props.setshowHideFooter}
    //    showHideinnerFooter={props.showHideinnerFooter}
    //    setshowHideinnerFooter={props.setshowHideinnerFooter}
       />
            <section className="hero move-movingsupply position-relative">
                <div className="container">
                    <div className="text-center">
                        <h1 className="text-white" data-aos="fade-down" data-aos-delay="0" data-aos-duration="1000">
                            <span className="font-weight-bold">Moving supplies</span>
                        </h1>
                        <button className="btn btn-primary px-4 mt-2" data-aos="fade-down" data-aos-delay="400" data-aos-duration="1000" onClick={() => {showZipModal(); setToggleModal(true)}} >Order Now</button>
                    </div>
                </div>
            </section>
            <section className="moving-supplies" >
            <h2 className="text-center page-head">Everything you need for an easy, stress-free move</h2>

            {movingProductss?.results?.map((moving) => {
                //  console.log(moving)

                return (
                    <>
                        <div className="row">
                            <div className="small-12 large-10 large-offset-1 end" id="supplies-list">
                                <div className="product">
                                    <div className="row">
                                        <div className="columns small-12 medium-6 large-4 product-image">
                                            <img
                                                src={ moving.image}
                                                alt=""
                                                style={{ height: "250px" }}
                                            />
                                            {/* <img src="img/ones.png"></img> */}
                                        </div>
                                        <div className="columns small-12 medium-6 large-8">
                                            <h3>{moving.title}</h3>
                                            <span className="product-price">
                                                ${moving.price} {moving.unit}
                                            </span>
                                            <div className="product-description">
                                                {/* <p>Our patent pending exclusive reusable plate divider insert is a must have when packing all your plates and bowls from the kitchen. It can hold up to 18 plates and can be easily adjusted to accommodate bowls as well. Just place each plate in one of the 16 sections of the divider and you'll be done packing your kitchen before you know it. These are a reusable rental item and are made from corrugated plastic.</p> */}

                                               
                                                <ul className="mt-3 checklist">

                                                    <div
                                                        dangerouslySetInnerHTML={{
                                                            __html: moving.description,
                                                        }}
                                                    ></div>

                                                </ul>
                                                {/* <div className="card-body-moving">
                                                    <ul className="mt-3">
                                                        <ul className="mt-3 ">
                                                            <div
                                                            dangerouslySetInnerHTML={{
                                                                __html: moving.description,
                                                            }}
                                                            
                                                            ></div>

                                                        </ul>
                                                    </ul>
                                                </div> */}

                                            </div>
                                            <a href="#." className="button alert" onClick={() => {showZipModal(); setToggleModal(true)}}>Order Now</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                );
            })
        }
        </section> 
        </>
    );
}