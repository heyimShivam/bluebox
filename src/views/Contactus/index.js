import React, { useState } from "react";
import SimpleReactValidator from "simple-react-validator";
import { addContactus } from "../../data/API";

export default function Index(props) {
    props.setFooteroffice(true);
    props.setshowHideFooter(false);
    const [isError, setError] = React.useState(false);
    const [errorMsg1, setMsg1] = React.useState("");
    const [errorMsg2, setMsg2] = React.useState("");

    const [values, setValues] = React.useState({
        full_name: "",
        email: "",
        phone: "",
        message: "",
    });

    const handleChange = (event) => {
        // props.setValues({ ...props.values, [event.target.name]: event.target.value });
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const submitdata = (e) => {
        e.preventDefault();
        let obj = {
            full_name: values.full_name,
            email: values.email,
            phone: values.phone,
            message: values.message,
        };

        addContactus(obj)
            .then((res) => {
                console.log(res);
                if (res?.status == "201") {
                    setError(true);
                    setMsg1("Thank You For Contact Us");
                    // values=""
                }
            })
    };

    return (
        <>
            <section className="hero move-contact position-relative">
                <div className="container">
                    <div className="text-center">
                        <h1 className="text-white" data-aos="fade-down" data-aos-delay="0" data-aos-duration="1000">
                            <p>Get in Touch</p>
                        </h1>

                    </div>
                </div>
            </section>

            <div className="row align-middle header-row contactus">
                <div className="container">
                    <div className="text_box">
                        <div className="contain">
                            <div className="columns small-6 large-5 large-offset-1 end page-content">
                                {/* <h1 className="page-head">Contact Us</h1> */}
                                <p>We're here to help:</p>
                                <div className="divli">
                                    <li>Need to keep your Blueboxes longer?</li>
                                    <li>Want to adjust your order?</li>
                                    <li>Have questions?</li>
                                </div>
                            </div>
                            <div className="columns small-6 large-5 end text-large-right page-content">
                                <div className="spanemail">
                                    <span className="span1">Email: info@bluebox.rent</span><span>Phone: 669-200-1630</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="row">
                <div className="container">
                    <div className="columns small-12 large-10 large-offset-1 end page-content">
                        <div id="contact-box1">
                            <form data-abide="ox375f-abide" novalidate="" method="post"
                                ps-dynamic-form-id="268aa4e5-97d1-45ea-8bbe-5aa50dd4557a">
                                <label>Full Name

                                    <input
                                        type="text"
                                        className="form-control"
                                        //placeholder="Enter Zipcode"
                                        name="full_name"
                                        value={values.full_name}
                                        onChange={(e) => handleChange(e)} />

                                    <span className="form-error ">Please enter your name</span>
                                </label>

                                <label>Email Address
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        required=""
                                        //placeholder="Email Address"
                                        value={values.email}
                                        onChange={(e) => handleChange(e)}
                                    />

                                    <span className="form-error ">Please enter a valid email address</span>
                                </label>

                                <label>Phone Number
                                    <input
                                        type="text"
                                        // placeholder="Phone Number"
                                        name="phone"
                                        className="form-control"
                                        value={values.phone}
                                        onChange={(e) => handleChange(e)}
                                    />
                                    <span className="form-error ">Please enter a valid phone number</span>
                                </label>

                                <label>Your message
                                    <textarea name="message" pattern="contact_message" rows="5" minlength="20" required=""
                                        className="form-control" value={values.message} onChange={(e) => handleChange(e)}></textarea>
                                    <span className="form-error ">Your message is too short</span>
                                </label>

                                {/* <div className="g-recaptcha" data-sitekey="6LfhPdQUAAAAAG9SZmd43wFN6dpDpzM0vHk91eK7">
                                    <div style={{width: "304px", height:"78px"}}>
                                        <div><iframe title="reCAPTCHA"
                                            src="https://www.google.com/recaptcha/api2/anchor?ar=2&amp;k=6LfhPdQUAAAAAG9SZmd43wFN6dpDpzM0vHk91eK7&amp;co=aHR0cHM6Ly93d3cuemlwcGdvLmNvbTo0NDM.&amp;hl=en&amp;v=qljbK_DTcvY1PzbR7IG69z1r&amp;size=normal&amp;cb=peo4s8adpmtq"
                                            width="304" height="78" role="presentation" name="a-238xn3jagwyl"
                                            frameborder="0" scrolling="no"
                                            sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation allow-modals allow-popups-to-escape-sandbox"></iframe>
                                        </div><textarea id="g-recaptcha-response" name="g-recaptcha-response"
                                            className="g-recaptcha-response"
                                            style="width: 250px; height: 40px; border: 1px solid rgb(193, 193, 193); margin: 10px 25px; padding: 0px; resize: none; display: none;"></textarea>
                                    </div><iframe style="display: none;"></iframe>
                                </div>
                                <span className="form-error ">Please complete robot check</span> */}

                                <div className="text-right">
                                    <button type="submit" className="button primary" onClick={(e) => submitdata(e)} >Send</button>
                                </div>
                                {isError ? <p className="messagegreen" style={{ color: "green" }}>{errorMsg1} </p> : ""}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}