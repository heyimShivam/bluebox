// import exp from "constants";
import { instance } from "../config/api";

export async function getHomeData() {
  return await instance.get(`/page/home/`);
}
export async function getTestimonials() {
  return await instance.get(`/page/testimonials/`);
}
export async function getContactInfo() {
  return await instance.get(`/page/contactus-info/`);
}
export async function getWhyUs() {
  return await instance.get(`/page/why-us/`);
}
export async function getFaq() {
  return await instance.get(`/page/faq/`);
}
// How did uou find us
export async function getHdyfu(){
  return await instance.get(`page/hdyfy/`)
}
// get delivery served areas
export async function getLocations() {
  return await instance.get(`/store/locations/`);
}

export async function saveQuote(data) {
  return await instance.post(`/store/quote/`, data);
}

export async function saveNewsLetter(data) {
  return await instance.post(`/store/news-letter/`, data);
}

export async function rentalsPeriods() {
  return await instance.get(`/store/rentals/`);
}

// get box packages product
export async function getBoxPackages(category, sub_cate, rental) {
  return await instance.get(`/store/products/${category}/${sub_cate}/${rental}/`);
}

export async function checkZipCode(data) {
  return await instance.post(`/store/check-zipcode/`, data);
}

// Select Moving And Packing Supplies

export async function getSelectMovings(category, sub_cate) {
  return await instance.get(`/store/products/${category}/${sub_cate}/`);
}

export async function getDeliverWindows() {
  return await instance.get(`/store/delivery-windows/`);
}

export async function getExtraWork() {
  return await instance.get(`/store/extra-work/`);
}

export async function placeOrder(data) {
  // console.log("this is sent to stripe info api");
  // console.log(data);
  // console.log("this is sent to stripe info api end");
  return await instance.post(`/order/save-stripe-info/`, data);
}

// Cart API
export async function addtoCart(data) {
  return await instance.post(`/order/cart/add`, data);
}

export async function getCart(subcategory, session) {
  return await instance.get(`order/cart/${subcategory}/${session}/`);
}
export async function getTotalCart(session) {
  return await instance.get(`order/cart/${session}/`);
}
//get packages rental wise
export async function getPackage(category,sub_category,rental){
  return await instance.get(`store/products/${category}/${sub_category}/${rental}/`);
}

export async function delete_cart(cart_id){
  return await instance.delete(`order/delete_cart/${cart_id}`);
}

export async function getnewRental(data)
{
  //console.log(data)
  return await instance.post(`order/cart/update_rental`, data);
}

// Get Cart Total
export async function getTotal(session){
  return await instance.get(`order/total/?session=${session}`)
}
//clear cart
export async function clearCart(session){
  return await instance.get(`order/clear_cart/?session=${session}`)
}

// delivery and peackup
export async function addDelivery(data){
  // console.log("passing data : "+JSON.stringify(data));
  return await instance.post(`order/delivery/`,data);
}


// delivery details and pick up for preview
export async function getPreview(session){
  return await instance.get(`order/preview/?order_id=${session}`);
}
export async function getDeliverDetails(session){
  return await instance.get(`order/delivery/?order_id=${session}`);
}
export async function getPickupDetails(session){
  return await instance.get(`order/pickup/?order_id=${session}`);
}
export async function getPersonaldetails(session){
  return await instance.get(`order/personal_details/?order_id=${session}`);
}


// get time slot for delivery
export async function getDeliverSlots(session){
  return await instance.get(`order/delivery_time/?session=${session}`);
}
export async function getPickupSlots(session){
  return await instance.get(`order/pickup_time/?session=${session}`);
}
export async function addPickUp(data){
  return await instance.post(`/order/pickup/`,data);
}
export async function getPickUp(session){
  return await instance.get(`/order/pickup/?session=${session}`);
}
// add personal 
export async function addPersonal(data){
  return await instance.post(`/order/personal_details/`,data);
}
// add order details
export async function addOrder(data){
  return await instance.post(`/order/add`,data)
}
// add contact us
export async function addContactus(data){
  return await instance.post(`page/contact/`,data)
}
// add personal details
export async function addPaymentDetails(data){
  return await instance.post(`order/add/payment_details`,data)
}
// disable days
export async function getDays(){
  return await instance.get(`/store/unavailable_dates/`);
}

// coupon code
export async function getCoupon(session,code,email){
  return await instance.get(`order/total/?session=${session}&discount_code=${code}&email=${email}`);
}
