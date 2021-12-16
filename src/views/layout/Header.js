import React, { isValidElement } from "react";
import ZipCode from "../Home/ZipModal";
import { useHistory } from "react-router-dom";



export default function Header(props) {
  // console.log(props);
  const [openZipModal, setZipModal] = React.useState(false);
  const history = useHistory();
 

  const hideZipM = () => {
    setZipModal(false);
  };

  const showZipModal = () => {
    setZipModal(true);
  };
  

  return (
    <>
      <ZipCode 
      showModal={openZipModal}
       hideModal={false}
       showHideHeader={props.showHideHeader} 
       setShowHideHeader={props.setShowHideHeader}
       showHideFooter={props.showHideFooter}
       setshowHideFooter={props.setshowHideFooter}
       showHideinnerFooter={props.showHideinnerFooter}
       setshowHideinnerFooter={props.setshowHideinnerFooter}
      //  zipcode={zipcode}
      //  setZipcode={setZipcode}
      
       />

      <section className="header">
        <div className="container">
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
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a className="nav-link text-dark" href="/">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-dark" href="../pricing">
                    Pricing
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-dark" href="../movingboxes">
                    Moving Boxes
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-dark" href="../movingsupplies">
                    Moving Supplies
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-dark" href="../location">
                    Location
                  </a>
                </li>

                <li className="nav-item">
                  <a className="nav-link text-dark" href="../faq">
                    FAQ
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link text-white py-1 btn btn-dark"
                    onClick={() => showZipModal()}
                  >
                    Order Now
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </section>
    </>
  );
}
