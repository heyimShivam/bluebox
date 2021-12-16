import React from "react";
import { ReactSession } from 'react-client-session';

export default function Tabs() {

  return (
    <>
      <section className="tabsSection  stepheader">
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
                          <li className="stepli current" id="st1li">
                            {/* <div className="text-center"> */}
                            <span className="number">1</span>
                            <span className="steplabel">
                              Choose <br></br>
                              Box Package
                            </span>
                            {/* </div> */}
                          </li>
                        </ul>

                      </div>
                    </div>
                    <div className="col-2">
                      <div className="card st2 " id="st2">
                        <ul>
                          <li className="stepli" id="st2li">
                            {/* <div className="text-center"> */}
                            <span className="number">2</span>
                            <span className="steplabel">
                              Packing <br />
                              Supplies
                            </span>
                            {/* </div> */}
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-2">
                      <div className="card st3" id="st3">
                        <ul>
                          <li className="stepli" id="st3li">
                            {/* <div className="text-center"> */}
                            <span className="number">3</span>
                            <span className="steplabel">

                              Moving <br />
                              Supplies
                            </span>
                            {/* </div> */}
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-2">
                      <div className="card st4" id="st4">
                        <ul>
                          <li className="stepli" id="st4li">
                            {/* <div className="text-center"> */}
                            <span className="number">4</span>
                            <span className="steplabel">
                              Delivery <br />
                              Details
                            </span>
                            {/* </div> */}
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-2">
                      <div className="card st5" id="st5">
                        <ul>
                          <li className="stepli" id="st5li">
                            {/* <div className="text-center"> */}
                            <span className="number">5</span>
                            <span className="steplabel">
                              Pickup <br />
                              Details
                            </span>
                            {/* </div> */}
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-2">
                      <div className="card st6" id="st6">
                        <ul>
                          <li className="stepli" id="st6li">
                            {/* <div className="text-center"> */}
                            <span className="number">6</span>
                            <span className="steplabel">
                              Personal and Payment <br/> Details
                            </span>
                            {/* </div> */}
                          </li>
                        </ul>
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
