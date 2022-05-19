import React, { useEffect, useState, useRef } from "react";
import SimpleReactValidator from "simple-react-validator";
import { useHistory } from "react-router-dom";

// import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import { getFaq } from "../../data/API";
import { useToasts } from "react-toast-notifications";



export default function Faq() {
    const [, forceUpdate] = useState();
    const [faq, setFaq] = useState([]);

    const callApi = () => {
        getFaq()
            .then((res) => {
                setFaq(res.data);
            })
            .catch((e) => console.log(e));

    };
    useEffect(() => {
        callApi();
    }, []);


    return (
        <>
            <div className="hero_faq">
                <section class="hero move-faq position-relative">
                    <div class="container">
                        <div class="text-center">
                            <h1 class="text-white" data-aos="fade-down" data-aos-delay="0" data-aos-duration="1000">
                                Frequently Asked Questions
                            </h1>
                            {/* <button class="btn btn-primary px-4 mt-2" data-aos="fade-down" data-aos-delay="400" data-aos-duration="1000">Order Now</button> */}
                        </div>
                    </div>
                </section>
            </div>
            <section className="faq">
                <div className="container">
                    <div className="accordion" id="accordionExample">

                        {faq.results?.map((obj) => {
                            // {console.log(obj)}
                            return (
                                <>
                                    <div className="card_main">
                                        <div className="card">
                                            <div className="card-header collapsed" data-toggle="collapse" data-target={`#collapseOne${obj.id}`} aria-expanded="false">
                                                <span className="title">{obj.question}</span>
                                                <span className="accicon"><i className="fas fa-angle-down rotate-icon"></i></span>
                                            </div>
                                            <div id={`collapseOne${obj.id}`} className="collapse" data-parent="#accordionExample">
                                                <div className="card-body"
                                                    dangerouslySetInnerHTML={{
                                                        __html: obj.answer,
                                                    }}
                                                >
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            );
                        })}

                    </div>
                </div>
            </section>

        </>
    );
}