import React from "react";
import { ReactSession } from 'react-client-session';
import Step1 from "./Step1";


const step1 = () => {
  document.getElementById("step2").style.display = "none";
  document.getElementById("step3").style.display = "none";
  document.getElementById("step4").style.display = "none";
  document.getElementById("step5").style.display = "none";
  document.getElementById("step6").style.display = "none";
  document.getElementById("step1").style.display = "block";
  document.getElementById("tabsSection").classList.remove("newstp");

  document.getElementById("show_btn").style.display = "block";

  document.getElementById("st2").classList.remove("active");
  document.getElementById("st3").classList.remove("active");
  document.getElementById("st4").classList.remove("active");
  document.getElementById("st5").classList.remove("active");
  document.getElementById("st6").classList.remove("active");
  
  document.getElementById("st1li").classList.remove("complete");
  document.getElementById("st2li").classList.remove("complete");
  document.getElementById("st3li").classList.remove("complete");
  document.getElementById("st4li").classList.remove("complete");
  document.getElementById("st5li").classList.remove("complete");
  document.getElementById("st6li").classList.remove("complete");

  document.getElementById("st2li").classList.remove("current");
  document.getElementById("st3li").classList.remove("current");
  document.getElementById("st4li").classList.remove("current");
  document.getElementById("st5li").classList.remove("current");
  document.getElementById("st6li").classList.remove("current");
  document.getElementById("st2li").classList.remove("current");

  document.getElementById("st1").classList.add("active");
  document.getElementById("st1li").classList.add("current");
};
const step2 = () => {
 
  document.getElementById("step3").style.display = "none";
  document.getElementById("step4").style.display = "none";
  document.getElementById("step5").style.display = "none";
  document.getElementById("step6").style.display = "none";
  document.getElementById("step2").style.display = "block";

  document.getElementById("st3").classList.remove("active");
  document.getElementById("st4").classList.remove("active");
  document.getElementById("st5").classList.remove("active");
  document.getElementById("st6").classList.remove("active");

  document.getElementById("st2li").classList.remove("complete");
  document.getElementById("st3li").classList.remove("complete");
  document.getElementById("st4li").classList.remove("complete");
  document.getElementById("st5li").classList.remove("complete");
  document.getElementById("st6li").classList.remove("complete");

  document.getElementById("st3li").classList.remove("current");
  document.getElementById("st4li").classList.remove("current");
  document.getElementById("st5li").classList.remove("current");
  document.getElementById("st6li").classList.remove("current");

  document.getElementById("st2").classList.add("active");
  document.getElementById("st2li").classList.add("current");

};
const step3 = () => {

  document.getElementById("step4").style.display = "none";
  document.getElementById("step5").style.display = "none";
  document.getElementById("step6").style.display = "none";
  document.getElementById("step3").style.display = "block";


  document.getElementById("st4").classList.remove("active");
  document.getElementById("st5").classList.remove("active");
  document.getElementById("st6").classList.remove("active");

  document.getElementById("st3li").classList.remove("complete");
  document.getElementById("st4li").classList.remove("complete");
  document.getElementById("st5li").classList.remove("complete");
  document.getElementById("st6li").classList.remove("complete");

  
  document.getElementById("st4li").classList.remove("current");
  document.getElementById("st5li").classList.remove("current");
  document.getElementById("st6li").classList.remove("current");

  document.getElementById("st3").classList.add("active");
  document.getElementById("st3li").classList.add("current");

};
const step4 = () => {

  document.getElementById("step5").style.display = "none";
  document.getElementById("step6").style.display = "none";
  document.getElementById("step4").style.display = "block";

  document.getElementById("st5").classList.remove("active");
  document.getElementById("st6").classList.remove("active");

  document.getElementById("st4li").classList.remove("complete");
  document.getElementById("st5li").classList.remove("complete");
  document.getElementById("st6li").classList.remove("complete");

  
  document.getElementById("st5li").classList.remove("current");
  document.getElementById("st6li").classList.remove("current");

  document.getElementById("st4").classList.add("active");
  document.getElementById("st4li").classList.add("current");

};
const step5 = () => {


  document.getElementById("step6").style.display = "none";
  document.getElementById("step5").style.display = "block";

  document.getElementById("st6").classList.remove("active");


  document.getElementById("st5li").classList.remove("complete");
  document.getElementById("st6li").classList.remove("complete");

  document.getElementById("st6li").classList.remove("current");

  document.getElementById("st5").classList.add("active");
  document.getElementById("st5li").classList.add("current");

};
const step6 = () => {

  document.getElementById("step6").style.display = "block";

  document.getElementById("st6li").classList.remove("complete");

  document.getElementById("st6li").classList.remove("current");

  document.getElementById("st6").classList.add("active");
  document.getElementById("st6li").classList.add("current");

};

export default function Tabs() {

  return (
    <>
      <section className="tabsSection  stepheader" id="tabsSection">
        <div className="container">
          <div className="row">
            <nav className="navbar navbar-expand-lg navbar-light bg-transparent px-0">
              <a className="navbar-brand" href="/">
                <img
                  src="img/logo.png"
                  className="logo img-fluid"
                  alt="somethinglogo"
                />
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <div className="col-lg-9 p-0">
                  <div className="row">
                    <div className="col-2">
                      <div className="card st1 active" id="st1">
                        <ul>

                            <a href="#" onClick={step1}>
                          <li className="stepli current" id="st1li">
                              {/* <div className="text-center"> */}
                              <span className="number">1</span>
                              <span className="steplabel" >
                                {/* <a > */}
                                Choose <br></br>
                                Box Package
                                {/* </a> */}
                              </span>
                          </li>
                            </a>
                          {/* </div> */}
                        </ul>
                      </div>
                    </div>
                    <div className="col-2">
                      <div className="card st2 " id="st2">
                      <a href="#" onClick={step2}>
                        <ul>
                          <li className="stepli" id="st2li">
                            {/* <div className="text-center"> */}
                            <span className="number">2</span>
                                                     
                              Packing <br />
                              Supplies
                            {/* </span> */}
                            {/* </div> */}
                          </li>
                        </ul>
                        </a>
                      </div>
                    </div>
                    <div className="col-2">
                      <div className="card st3" id="st3">
                      <a href="#" onClick={step3}>
                          <ul>
                            <li className="stepli" id="st3li">
                              {/* <div className="text-center"> */}
                              <span className="number">3</span>
                              {/* <span className="steplabel"> */}
                              {/* <a onClick={step3}> */}
                              Moving <br />
                              Supplies
                              {/* </a> */}
                              {/* </span> */}
                              {/* </div> */}
                            </li>
                          </ul>
                        </a>
                      </div>
                    </div>
                    <div className="col-2">
                      <div className="card st4" id="st4">
                      <a href="#" onClick={step4}>
                          <ul>
                            <li className="stepli" id="st4li">
                              {/* <div className="text-center"> */}
                              <span className="number">4</span>
                              {/* <span className="steplabel"> */}
                              {/* <a onClick={step4}> */}
                              Delivery <br />
                              Details
                              {/* </a> */}
                              {/* </span> */}
                              {/* </div> */}
                            </li>
                          </ul>
                        </a>
                      </div>
                    </div>
                    <div className="col-2">
                      <div className="card st5" id="st5">
                      <a href="#" onClick={step5}>
                          <ul>
                            <li className="stepli" id="st5li">
                              {/* <div className="text-center"> */}
                              <span className="number">5</span>
                              {/* <span className="steplabel"> */}
                              {/* <a onClick={step5}> */}
                              Pickup <br />
                              Details
                              {/* </a> */}
                              {/* </span> */}
                              {/* </div> */}
                            </li>
                          </ul>
                        </a>
                      </div>
                    </div>
                    <div className="col-2">
                      <div className="card st6" id="st6">
                      <a href="#" onClick={step6}>
                          <ul>
                            <li className="stepli" id="st6li">
                              {/* <div className="text-center"> */}
                              <span className="number">6</span>
                              {/* <span className="steplabel"> */}
                              {/* <a onClick={step6}> */}
                              Personal and Payment <br /> Details
                              {/* </a> */}
                              {/* </span> */}
                              {/* </div> */}
                            </li>
                          </ul>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="col-md-3"></div> */}
              </div>
            </nav>

          </div>
        </div>
      </section>
    </>
  );
}
