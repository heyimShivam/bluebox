import React, { useEffect, useState, useRef } from "react";
import SimpleReactValidator from "simple-react-validator";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

export default function index(props) {
    props.setFooteroffice(true);
    props.setshowHideFooter(false);
    return (
        <>
            <section className="hero move-hero-about position-relative ">
                <div className="container">
                    {/* <div className="text-center">
                        <h1 className="text-white" data-aos="fade-down" data-aos-delay="0" data-aos-duration="1000">
                           About Us
                        </h1>
                       
                        <button className="btn btn-primary px-4 mt-2" data-aos="fade-down" data-aos-delay="400" data-aos-duration="1000"  >Order Now</button>
                    </div> */}
                      <div class ="about_icon">
                          <h1>PRODUCING ONE TON OF CARDBOARD REQUIRED</h1>
                      <div class ="row">
                                <div class ="col-md-4">
                                    <img src="img/trees.png"/>
                                    <h4>17</h4> <p>Trees</p>
                                </div>
                                <div class ="col-md-4">
                                        <img src="img/oil.png"/>
                                        <h4>79</h4> <p>Gallon<br/>of Oil</p>
                                </div>
                                <div class ="col-md-4">
                                        <img src="img/water.png"/>
                                        <h4>7000</h4><p>Gallon of <br/> Water</p>
                                </div>
                                <div className="aftricn">
                                    <p>In the US, over 17,000 tons of cardboard end up in landfills each year</p>
                                </div>
                        </div>
                        </div>
                </div>
            </section>

            <div class="termsrow terms-cond" >
                <div class="columns small-12 large-10 large-offset-1 end" id="page-content">
                    <div className="container">
                        {/* <h2><strong>What do we do with your information?</strong></h2> */}
                        <h2><strong>How we started</strong></h2>
                        <p>We’re a small startup with a big vision. Our goal is to make peoples’ lives easier while at the same time reducing ours as well as our customers’ environmental footprint on our planet.<br/>
                        <div class="spacer20"></div>
                        The idea for BlueBox was born from the need to become more sustainable as landfills continue to get filled and cities continue to grow in size and population. But we also needed to figure out how to add value and provide convenience in peoples’ daily lives. <br/>
                        <div class="spacer20"></div>
                        Moving is a fact of life. And it can be an unpleasant one at that. Since it must be done, how can we reduce stress, provide convenience to people, while at the same time having a positive impact on our planet? Well, first of all, forget cardboard boxes altogether. All that does is add to stress levels; sourcing the boxes, picking them up, building them then having to break them down, and finally disposing of the cardboard waste.<br/>
                        <div class="spacer20"></div>
                        BlueBox is an eco-friendly, zero-waste solution for your home or office moves. We deliver clean, reusable, tree-free boxes and eco-friendly moving supplies directly to your door. Once you pack and move, we then pick them up at your new home or office once unpacked and settled in. All boxes are quarantined for seven days then sanitized between use. <br/>
                        <div class="spacer20"></div>
                        We do this using a fleet of fully electric vehicles. No fossil fuels. Only 100% renewable, sustainable energy powers our delivery vehicles. It’s our first step in providing an unmatched service enabling our customers to make the smart decision of a more environmentally conscious move.<br/>
                        <div class="spacer20"></div>
                        At BlueBox we believe it’s time for a change. Time to change the outdated concept of “the way things have always been done” by replacing it with “the way things should be done” — now and moving into the future.

                        </p>
                    </div>
                </div>
            </div>

        </>
    );
}