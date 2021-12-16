import React, { useState } from "react";
import { saveNewsLetter } from "../../data/API";
import { useToasts } from "react-toast-notifications";

export default function Footerinnr() {
  const { addToast } = useToasts();
  const [email_address, setEmail] = useState();
  const newsLetterSubmit = (e) => {
    e.preventDefault();
    let obj = { email: email_address };
    saveNewsLetter(obj)
      .then((res) => {
        addToast("Request Recived Successfully. We will get back to you soon.Thanks!", {
          appearance: "success",
          autoDismiss: true,
        });
      })
      .catch((e) => {
        addToast("Some error occure,please try again", {
          appearance: "error",
          autoDismiss: true,
        });
      });
  };

  return (
    <>
      {/* <!-- contact --> */}
      <div class="silouhette"></div>
      <section className="contact">
        <div className="container">
          <div className="row">
            <div className="col-lg-2"></div>
            <div className="col-lg-8">
              <div className="row">
                <div
                  className="col-md-6"
                  data-aos="fade-up"
                  data-aos-delay="0"
                  data-aos-duration="1000"
                >
                  <div className="row">
                    <div className="col-3 m-auto">
                      <i className="fa fa-headphones text-white"></i>
                    </div>
                    <div className="col-9">
                      <p className="mb-0 fs-13 font-weight-bold text-white">
                        Phone
                      </p>
                      <a href="tel:(719) 445-2808" className="text-white fs-13">
                        (719) 445-2808
                      </a>
                    </div>
                  </div>
                </div>
                {/* <div
                  className="col-md-4"
                  data-aos="fade-up"
                  data-aos-delay="500"
                  data-aos-duration="1000"
                >
                  <div className="row">
                    <div className="col-3 m-auto">
                      <i className="fa fa-map-marker-alt text-white"></i>
                    </div>
                    <div className="col-9">
                      <p className="mb-0 fs-13 font-weight-bold text-white">
                        Address:
                      </p>
                      <p className="fs-13 mb-0 text-white">4575 Marmora Road</p>
                    </div>
                  </div>
                </div> */}
                <div
                  className="col-md-6"
                  data-aos="fade-up"
                  data-aos-delay="1000"
                  data-aos-duration="1000"
                >
                  <div className="row">
                    <div className="col-3 m-auto">
                      <i className="far fa-envelope text-white"></i>
                    </div>
                    <div className="col-9">
                      <p className="mb-0 fs-13 font-weight-bold text-white">
                        Email:
                      </p>
                      <a
                        href="mailto:info@zeppgo.com"
                        className="text-white fs-13"
                      >
                        info@bluebox.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-2"></div>
          </div>
        </div>
      </section>
      {/* <!-- contact --> */}
      {/* <!-- footer --> */}
      {/* <section className="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <a href="/">
                <img
                  src={"../../img/logo.png"}
                  className="img-fluid logo"
                  alt="footer logo"
                />
              </a>
              <p className="text-white fs-13 mt-3">
              Since 2009 BlueBox has delivered 
						more than a half million reusable
						moving boxes to Bay Area homes 
						and offices. 
              </p>
            </div>
            <div className="col-md-4">
              <h5 className="text-white font-weight-bold">Company</h5>
              <div className="line bg-primary w-50"></div>
              <ul>
                <li>
                  <a href="http://localhost:3000/" className="text-white fs-12">
                  About BlueBox
                  </a>
                </li>
                <li>
                  <a href="../pricing" className="text-white fs-12">
                  Pricing
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/" className="text-white fs-12">
                    Home Moves
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/" className="text-white fs-12">
                    Office Moves
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-md-4">
              <h5 className="text-white font-weight-bold">Support</h5>
              <div className="line bg-primary w-50"></div>
              <ul>
                <li>
                  <a href="../faq" className="text-white fs-12">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/" className="text-white fs-12">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/" className="text-white fs-12">
                    Terms & Cond
                  </a>
                </li>
                <li>
                  <a href="../privacypolicy" className="text-white fs-12">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            
          </div>
        </div>
      </section> */}
    </>
  );
}
