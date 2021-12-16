import "./App.css";
import { ToastProvider } from "react-toast-notifications";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React from "react";
import Header from "./views/layout/Header";
import Footer from "./views/layout/Footer";
import Innerfooter from "./views/layout/Footer-inne"
import Footeroffice from "./views/layout/footeroffice"

import Home from "./views/Home";
import Pricing from "./views/Pricing";
import MovingBoxes from "./views/MovingBoxes";
import MovingSupplies from "./views/MovingSupplies";
import BoxPackages from "./views/BoxPackages";
import Faq from "./views/Faq";
import Privacypolicy from "./views/Privacypolicy";
import Location from "./views/Location";
import Terms from "./views/Terms";
import About from "./views/About"
import Contactus from "./views/Contactus"
import Homemoving from "./views/Homemoving"
import Officemoving from "./views/Officemoving"



export default function App() {

  const [showHideHeader, setShowHideHeader] = React.useState(true);
  const [showHideFooter, setshowHideFooter] = React.useState(true);
  const [showHideinnerFooter, setshowHideinnerFooter] = React.useState(false);
  const [showFooteroffice, setFooteroffice] = React.useState(false);
 
  function requireAuth() {

    if (!localStorage.getItem('zipcode')) {
      window.location.replace('/');
    }else{ 
      // alert("demo")
    let hours = 24 ;
    let saved = localStorage.getItem('zipcode');
    let newsaved = JSON.parse(saved);
    // console.log(newsaved.expiry)

    if (saved && (new Date().getTime() - newsaved.expiry > hours * 60 * 60 * 1000)) {
      // alert("tata byy byy")
      let keysToRemove = ["zipcode", "deliverydate","deliverywindow1","deliverywindow2","deliveryaddress","apt","extrawork1","pickupwindow1","pickupwindow2","pickupapt","extrawork2","pickupdescription","fname","lname","email","phone","sphone","voucher_code","hdyfu","company"];

      for (var key of keysToRemove) {
        localStorage.removeItem(key);
        // clearstorage();
    }
    }
  }
  }


  return (
    <ToastProvider>
      <div className="App">
        <Router>
          {showHideHeader && <Header
            showHideHeader={showHideHeader}
            setShowHideHeader={setShowHideHeader}
            showHideFooter={showHideFooter}
            setshowHideFooter={setshowHideFooter}
            showHideinnerFooter={showHideinnerFooter}
            setshowHideinnerFooter={setshowHideinnerFooter}


          />}
          <Switch>
            <Route path="/" exact component={() => <Home />} />
            <Route path="/pricing" exact component={() => <Pricing />} />
            <Route path="/MovingBoxes" exact component={() => <MovingBoxes />} />
            <Route path="/MovingSupplies" exact component={() => <MovingSupplies />} />
            <Route path="/Location" exact component={() => <Location />} />


            <Route path="/Faq" exact component={() => <Faq />} />
            <Route path="/Privacypolicy" exact component={() => <Privacypolicy />} />
            <Route path="/Contactus" exact component={() => <Contactus
               showFooteroffice={showFooteroffice}
               setFooteroffice={setFooteroffice}     
               setshowHideFooter={setshowHideFooter}
               showHideinnerFooter={showHideinnerFooter}      
            />} />
            <Route path="/Terms" exact component={() => <Terms />} />

            <Route path="/Homemoving" exact component={() => <Homemoving />} />
            
            <Route path="/Officemoving" exact component={() => <Officemoving 
              showFooteroffice={showFooteroffice}
              setFooteroffice={setFooteroffice}     
              setshowHideFooter={setshowHideFooter}
              showHideinnerFooter={showHideinnerFooter}         
            />} />

            <Route
              path="/box-packges"
              exact component={() => <BoxPackages
                showHideHeader={showHideHeader}
                setShowHideHeader={setShowHideHeader}
                showHideFooter={showHideFooter}
                setshowHideFooter={setshowHideFooter}
                showHideinnerFooter={showHideinnerFooter}
                setshowHideinnerFooter={setshowHideinnerFooter}
                onEnter={requireAuth()}
              />}
            />
            <Route path="/About" exact component={() => <About />} />

          </Switch>
          {showHideinnerFooter && <Innerfooter />}
          {showHideFooter && <Footer />}
          {showFooteroffice && <Footeroffice />}
        </Router>
      </div>
    </ToastProvider>
  );
}

// export default App;
