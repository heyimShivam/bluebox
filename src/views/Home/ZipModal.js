import React, { useEffect } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { checkZipCode } from "../../data/API";
import SimpleReactValidator from "simple-react-validator";
import Mainloader from "../BoxPackages/components/Mainloader";

export default function ZipCode(props) {

  const history = useHistory();
  const { addToast } = useToasts();
  const [isLoading, setLoading] = React.useState(false);
  const [, forceUpdate] = React.useState();
  const [is_selected, setSelect] = React.useState(false);
  const validator = React.useRef(new SimpleReactValidator());
  const [mainloader, setMainloader] = React.useState(false);

  const [isError, setError] = React.useState(false);
  const [errorMsg, setMsg] = React.useState("");

  const [values, setValues] = React.useState({
    pickup_zipcode: "",
    delivery_zipcode: "",
  });


  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });

    const item = {
      value: true,
      expiry: new Date().getTime()
    }
    // console.log(item.expiry);
    localStorage.setItem('zipcode', JSON.stringify(item))

  };
  const handleZipCode = (e) => {

    setMainloader(true);
    if (validator.current.allValid()) {

      e.preventDefault();

      let obj = {
        pickup_zipcode: values.pickup_zipcode,
        delivery_zipcode: values.delivery_zipcode,
      };
      checkZipCode(obj)
        .then((res) => {
          if (res?.data?.success) {
            history.push("/box-packages");
            // localStorage.setItem('setShowHideHeader', "false") 
            // localStorage.setItem('setshowHideFooter', "false") 
            // localStorage.setItem('setshowHideinnerFooter', "true") 
            props.hideModal();
            props.setShowHideHeader(false);
            props.setshowHideFooter(false);
            props.setshowHideinnerFooter(true);


          } else {
            setError(true);
            setMsg(res?.data?.message);
          }
        })
        .catch((e) => { });
    } else {

      // e.preventDefault();
      validator.current.showMessages();
      forceUpdate(1);
      return false;

    }

  };

  // const handleCloseModal = () => {
  //   this.setState({ isOpen: false });
  // };

  return (
    <>
      {/* {isLoading ? (
        <div className="text-center">
          <div className=" mt-5">
            <Spinner
              animation="border"
              size={"lg"}
              role="status"
              variant="primary"
            >
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        </div>
      ) : (
        <></>
      )} */}
      {props.mainloader ? <Mainloader /> : " "}
      {props.toggleModal && <Modal
        show={props.showModal}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={props.hideModal}
      >
        <div className="">
          <div className="" style={{position: 'relative', backgroundColor: 'white', borderRadius: '4px'}}>
            <div className="modal-header">
              <h5>
                <img src="img/logo.png" className="img-fluid" alt="" />
                Where are you moving?
              </h5>
              <button type="button" style={{position: 'absolute', right: '14px'}}
                      className="close" 
                      onClick={()=>{props.toggleModalFunction(false)}}>
                <span aria-hidden="true"
                      class="close"
                      data-dismiss="modal">
                        &times;</span>
              </button>

            </div>
            <div className="modal-body">
              <div className="row">
                {isError ? <p style={{ color: "red" }}>{errorMsg} </p> : ""}
                <div className="col-md-6 p-2">
                  Zipcode of your current address?
                  <input
                    type="text"
                    id="ship-address"
                    className="form-control"
                    placeholder="Enter Zipcode"
                    name="pickup_zipcode"
                    value={values.pickup_zipcode}
                    onChange={(e) => handleChange(e)}
                  />
                  {validator.current.message(
                    "pickup_zipcode",
                    values.pickup_zipcode,
                    "required",
                    { className: "text-danger" }
                  )}
                </div>
                <div className="col-md-6 p-2">
                  Zipcode of your new address?
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Zipcode"
                    name="delivery_zipcode"
                    value={values.delivery_zipcode}
                    onChange={(e) => handleChange(e)}
                  />
                  {validator.current.message(
                    "delivery_zipcode",
                    values.delivery_zipcode,
                    "required",
                    { className: "text-danger" }
                  )}
                </div>
                {/* <div className="col-12 text-right mt-4 zipmodal">
                  <button
                    className="btn btn-dark"
                    disabled={is_selected ? true : " "}
                    onClick={(e) => handleZipCode(e)}
                  >
                    Continue
                  </button>
                </div> */}
                <div className="col-12">
                  <div className="text-right mt-4 zipmodal">
                    <button
                      className="btn btn-dark"
                      onClick={(e) => handleZipCode(e)}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    }
    </>
  );
}
