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

            <div className="terms">
                <div className="">
                    <div className="row">
                        <div className="col-md-12">
                            <h1>Terms & Conditions</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div class="termsrow terms-cond" >
                <div class="columns small-12 large-10 large-offset-1 end" id="page-content">
                    <div className="container">
                        {/* <h2><strong>What do we do with your information?</strong></h2> */}
                        <h2><strong>Terms and Conditions</strong></h2>
                       <p>Please read this agreement carefully. These terms and conditions apply to the use of our websites, use of our web or mobile applications and/or use of our products and/or services. By accessing our website, using our service, procuring our products and/or using our web or mobile applications, you agree with and agree to be bound by these terms and conditions (the “Agreement”). Furthermore, you agree that all information you provide us is accurate, correct and up to date and that you will notify us of any changes immediately should there be changes to the information that you provide us. You consent to our use of your information in accordance with our Privacy Policy. You also warrant that you are legally entitled to procure services from us on your own behalf or on the behalf of the beneficiary of the services.</p>
                       <p>1. EQUIPMENT RENTAL: You (the “Client”) agree to rent the equipment ordered from BlueBox which includes our Crates, Custom Dollies, Wardrobe Boxes, Glass and Plate Divider Kits, Hand Trucks not including packing materials (which is on a purchase basis), and includes Bubble Wrap, Geami Wrap, Kraft Paper or Green Wrap, Glass Dividers, Plate Dividers, Packing Paper, Furniture/Mattress Covers, Zip Ties, and Box Labels. The rental period and related charges will begin on the date the equipment is delivered to Client by BlueBox and will end on the Client’s scheduled/requested pick-up date.</p>
                       <p>2. RENTAL PAYMENT: Client will pay BlueBox rent for equipment for the dates and amount stated on the website at checkout and in the emailed Invoice, adjusted for the actual rental period.</p>
                       <p>3. PAYMENT TERMS: To complete an order, payment will be made on the BlueBox website during the checkout process. Initial payment is for a rental period of our equipment for 2 weeks (14 days). The rental period ends on the date the Client requests a pickup. If Client requests a pickup on day 15, Client will be charged for an additional week.</p>
                       <p>4. CREDIT CARD AUTHORIZATION: The client acknowledges that their credit card will be kept on file for the duration of the rental agreement. The client acknowledges and authorizes BlueBox to charge any amount associated with the above-stated terms and conditions.</p>
                       <p>5. DELIVERY & PICK-UP: The client acknowledges that they have sole responsibility to be present to receive boxes and supplies at chosen time windows client selected during order process for delivery and pick-up of the rented boxes, and all other rented items. If the Client does not give a minimum of 48 hours notice to reschedule appointments, there may be additional delivery or cancellation fees applied to the client's account depending on the situation (see FAQs for more details).</p>
                       <p>Free delivery and pick-up is included for elevator buildings that do not have more than 5 entry steps. Ground floor lobby, curbside or hallway delivery and pick-up are included. Walk-ups (any building with more than 5 entry steps): If you have a walk-up and would like us to deliver the crates up to your apartment or bring the crates down from your apartment at the time of pick-up there is an additional charge of $25.00 for each service (delivery and/or pick-up). Additionally, BlueBox does not perform partial pick-ups of equipment and therefore, ALL BlueBox and other rental equipment must be available for pick-up on the scheduled pick-up date. If BlueBox has to return for an additional pick-up of our rental equipment, there will be a transportation fee of $30.00 for each additional pick-up.</p>
                       <p>6. RENTAL EXTENSION: The client acknowledges that they have sole responsibility to have the equipment returned by the agreed-upon date. If the equipment is not returned on said date, the Client will be charged for an additional rental charge until all rental equipment has been returned at a rate of:<br/>
                            $45/week - 1 Bedroom Package;<br/>
                            $65/week - 2 Bedroom Package;<br/>
                            $85/week - 3 Bedroom Package;<br/>
                            $105/week - 4 Bedroom Package;<br/>
                            $125/week - 5 Bedroom Package<br/>
                            $8/week – Custom Dolly;<br/>
                            $12/week - Hand Truck<br/>
                            If Client ordered extra Crates in addition to their box rental package, the additional 1 week rental charges are: $5/Crate/week.<br/>
                            Client must request a postponement of the scheduled date of pick up by calling or emailing BlueBox not less than two (2) days prior to the scheduled pick up date. BlueBox will make all reasonable efforts to accommodate such requests, however, we reserve the absolute right to decline them since the equipment may be previously booked.<br/>

                            If the equipment has not been returned after 90 days and there has been no communication to extend the rental term, it is assumed that the Client wishes to purchase the equipment and will be charged the full retail value of the equipment, in addition to the cost of the total rental term, however long it shall be, at a rate of:
                            $30 - Large Crate; $50 - Extra Large Crate; $70 - Custom Dolly; $60 - Wardrobe (Corrugated Plastic) Box; $80 - Hand Truck;  $20.00 Glass/Plate Divider Kits. All prices listed above are per unit.<br/>
                            Rental extensions will be charged automatically to the Client’s credit card and are calculated based on the equipment pick-up date and time.
                        </p>
                       <p>7. REPLACEMENT COST: The cost to repair damaged equipment or the replacement cost for equipment not returned at the time of pickup or anytime thereafter will be charged to the Client. Any unpaid rental fees will also be charged to the Client. The replacement costs charged will be as follows: $30 - Large Crate; $50 - Extra Large Crate; $70 - Custom Dolly; $60 - Wardrobe (Corrugated Plastic) Box; $80 - Hand Truck;  $20.00 Glass/Plate Divider Kits. All prices listed above are per unit.</p>
                       <p>8. OWNERSHIP: Equipment are, and shall at all times remain, the sole and exclusive property of BlueBox.</p>
                       <p>9. WARRANTY: BlueBox guarantees that equipment is in good operating condition at the time of delivery and will be replaced at no charge to Client otherwise, but not as a result of damage or mishandling from Client. </p>
                       <p>10. WARRANTY: BlueBox guarantees that equipment is in good operating condition at the time of delivery and will be replaced at no charge to Client otherwise, but not as a result of damage or mishandling from Client. </p>
                       <p>11. ALTERATION: No alteration to the equipment may be made without the prior written consent of BlueBox. Proper care and maintenance of the equipment will be the responsibility of the Client. Equipment, which is returned in a condition requiring cleaning or repairs due to excessive wear and tear or mishandling will be restored to rentable condition at the expense of the Client. Clients will be charged full replacement cost if any equipment returned to us is deemed to be in a state that cannot be continued to use.</p>
                       <p>12. Client agrees that under no circumstances shall the Client sublease, rent, hire, lend, assign, pledge, encumber or otherwise part with possession of the Equipment.</p>
                       <p>13. DEFAULT AND REMEDIES: Client shall be deemed to have breached this Agreement if the Client: <br/>
                                <span className="termspan">a. Defaults in any payment for equipment ordered and/or additional weeks the equipment was rented for.</span><br/>
                                <span className="termspan">b. Defaults in any of the terms herein and such default shall continue unremedied for three (3) days after written notice thereof to Client by BlueBox.</span><br/>
                                <span className="termspan">c. Becomes insolvent or files for bankruptcy.</span>
                       </p>
                       <p>14. TERMINATION: In the event of any default, BlueBox will declare the entire amount of unpaid rental payments immediately due and payable, and BlueBox can immediately terminate this agreement. All costs and expenses to recover equipment and/or rental fees, including court costs and legal fees incurred in the execution of this section, will be sole responsibility of the Client.</p>
                       <p>15. RISK OF LOSS: Upon delivery of the equipment at the Client’s location, the Client will carefully inspect the equipment to determine whether they have been damaged during delivery. In the event of any such damage, the Client will inform the BlueBox delivery person and a replacement of any/all items will be provided. If the Client shall fail to notify BlueBox of any damages on the day of the receipt of the equipment, then the Client shall be deemed to have accepted the Equipment as-is and being in acceptable operating condition. During the period of the Client's possession and control of the equipment, all risk of loss, destruction of, or damage to the equipment, from any cause whatsoever shall be assumed by the Client.</p>
                       <p>16. If a holiday is requested, your delivery will be made during normal business hours on the previous or following business day of the holiday and/or time BlueBox and its staff observe as a Holiday. Please contact us at info@bluebox.rent if you require special delivery for your move.</p>
                       <p>17. RELEASE OF LIABILITY: Indemnification. I agree to indemnify and hold you, your officers, agents, and employees harmless from and against all liabilities, claims, actions, proceedings, damages, losses, cost and expense, including attorneys; fees, for all injuries or death of any person or damage to any property occurring or arising from or connected with directly or indirectly, my possession, use and return of any of the Equipment. The Client shall be in charge of the Equipment’s operation and is fully responsible for its operation as well as the return of the Equipment in good working order. BlueBox and its officers, employees and agents are not responsible for injury occurring to the Client or to any other persons using the Equipment, and the Client further agrees to hold BlueBox and its officers, employees and agents harmless against any injury or property claims. The Client shall indemnify BlueBox and its officers, employees and agents from/against any cost incurred due to claims from anyone and for attorney’s fees and related costs involving the use and return of the Equipment, should any legal action become necessary.</p>
                    </div>
                </div>
            </div>

        </>
    );
}