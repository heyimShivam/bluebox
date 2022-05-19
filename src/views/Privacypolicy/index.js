import React from "react";
// import SimpleReactValidator from "simple-react-validator";
// import { useHistory } from "react-router-dom";
// import { useToasts } from "react-toast-notifications";

export default function index(props) {
    props.setFooteroffice(true);
    props.setshowHideFooter(false);
    return (
        <>
            <link rel="stylesheet" type="text/css" href="../../public/style/style.css" />

            <div className="privacypolicy">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1>Privacy Policy</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div class="policyrow policy" >
                <div class="columns small-12 large-10 large-offset-1 end" id="page-content">
                    <div className="container">
                        {/* <h2><strong>What do we do with your information?</strong></h2> */}
                        <h2><strong>Privacy Policy</strong></h2>
                       <b> <p>This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from www.rentgreenbin.com (the “Site”).</p></b>

                       <div className="spacer30"></div>
                        <h2><strong>PERSONAL INFORMATION WE COLLECT</strong></h2>

                        <p>When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the Site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site. We refer to this automatically-collected information as “Device Information.”</p>
                        <div className="spacer30"></div>   
                        <h2><strong>We collect Device Information using the following technologies:</strong></h2>

                        <p>- <b> “Cookies” </b> are data files that are placed on your device or computer and often include an anonymous unique identifier. For more <span> information about cookies, and how to disable cookies, visit http://www.allaboutcookies.org.</span><br/>
                        - <b>“Log files”</b> track actions occurring on the Site, and collect data including your IP address, browser type, Internet service provider, <span> referring/exit pages, and date/time stamps.</span><br/>
                        - <b>“Web beacons,”</b> “tags,” and “pixels” are electronic files used to record information about how you browse the Site.  </p>
                        
                        <p>   
                            <div className="spacer20"></div>
                        Additionally, when you make a purchase or attempt to make a purchase through the Site, we collect certain information from you, including your name, billing address, shipping address, payment information (including credit card numbers, email address, and phone number. We refer to this information as “Order Information.”</p>

                        <p>
                        <div className="spacer20"></div>
                            When we talk about “Personal Information” in this Privacy Policy, we are talking both about Device Information and Order Information. We comply with the California Consumer Protection Act (CCPA).
                        </p>
                        <div className="spacer30"></div>
                        <h2><strong>HOW DO WE USE YOUR PERSONAL INFORMATION?</strong></h2>
                        <p>We use the Order Information that we collect generally to fulfill any orders placed through the Site (including processing your payment information, arranging for delivery, and providing you with invoices and/or order confirmations). Additionally, we use this <br/>
                          <b> Order Information to:<br/></b>
                          <b> Communicate with you:<br/></b>
                          <b>  Screen our orders for potential risk or fraud:<br/></b>
                                and Provide you with information or advertising relating to our products or services.<br/></p>
                        <p>
                        <div className="spacer20"></div>
                            We use the Device Information that we collect to help us screen for potential risk and fraud (in particular, your IP address), and more generally to improve and optimize our Site (for example, by generating analytics about how our customers browse and interact with the Site, and to assess the success of our marketing and advertising campaigns).
                        </p>
                        <div className="spacer30"></div>
                        <h2><strong>SHARING YOUR PERSONAL INFORMATION</strong></h2>
                        <p>
                            We share your Personal Information with third parties to help us use your Personal Information, as described above. For example, we use Stripe to power our online store--you can read more about how Stripe uses your Personal Information here:  <a href=" https://stripe.com/us/privacy" target="_blank" > https://stripe.com/us/privacy.</a> We also use Google Analytics to help us understand how our customers use the Site--you can read more about how Google uses your Personal Information here: <a href=" https://www.google.com/intl/en/policies/privacy/" target="_blank"> https://www.google.com/intl/en/policies/privacy/.</a> You can also opt-out of Google Analytics here: <a href=" https://tools.google.com/dlpage/gaoptout." target="_blank"> https://tools.google.com/dlpage/gaoptout.</a>
                        </p>
                        <p>
                            Finally, we may also share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.
                        </p>
                        <div className="spacer30"></div>
                        <h2><strong>BEHAVIOURAL ADVERTISING</strong></h2>
                        <p>
                            As described above, we use your Personal Information to provide you with targeted advertisements or marketing communications we believe may be of interest to you. For more information about how targeted advertising works, you can visit the Network Advertising Initiative’s (“NAI”) educational page at: 
                            <a href="http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work" target="_blank" rel="noopener noreferrer" >http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work.<br /></a></p>
                            
                            <p>
                            <div className="spacer20"></div>
                                You can opt out of targeted advertising by visiting the following links:<br/>
                                <b>FACEBOOK</b> - <a href="https://www.facebook.com/settings/?tab=ads" target="_blank" rel="noopener noreferrer"> https://www.facebook.com/settings/?tab=ads<br/></a>
                                <b>GOOGLE</b> - <a href="https://www.google.com/settings/ads/anonymous" target="_blank" rel="noopener noreferrer">https://www.google.com/settings/ads/anonymous<br/></a>
                                <b>BING</b> - <a href="https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads" target="_blank" rel="noopener noreferrer">https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads<br/></a>
                                Additionally, you can opt out of some of these services by visiting the Digital Advertising Alliance’s opt-out portal at: <a href="http://optout.aboutads.info/" target="_blank" rel="noopener noreferrer" > http://optout.aboutads.info/.</a>
                            </p>
                            <div className="spacer30"></div>
                        <h2><strong> DO NOT TRACK </strong></h2>
                        <p>
                            Please note that we do not alter our Site’s data collection and use practices when we see a Do Not Track signal from your browser.
                        </p>
                        <h2><strong>MINORS</strong></h2>
                        <p>
                        The Site is not intended for individuals under the age of 18 unless approved by parent or guardian or emancipated under local laws.
                        </p>
                        <h2><strong>CHANGES</strong></h2>
                        <p>
                        We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal or regulatory reasons.
                        </p>
                        <h2><strong>CONTACT US</strong></h2>
                        <p>
                        For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at info@bluebox.rent
                        </p>
                    </div>
                </div>
            </div>

        </>
    );
}