from django.shortcuts import render
from rest_framework.decorators import api_view
# Create your views here.
import stripe
from rest_framework.response import Response
from rest_framework import status


stripe.api_key = "sk_test_51IkuRHSFxk7wZre1g9wzHzA36g5mxJ3dr3He8wrFE8mP2FFqLB4bYdX6XvjvJSt4uVAz18qBpI304MdqPlDxp3c400fl1d4St8"


@api_view(['POST'])
def test_payment(request):
    test_payment_intent = stripe.PaymentIntent.create(
        amount=100, currency='pln',
        payment_method_types=['card'],
        receipt_email='test@example.com')
    print("test_payment_intent", test_payment_intent)
    return Response(status=status.HTTP_200_OK, data=test_payment_intent)


@api_view(['POST'])
def save_stripe_info(request):
    data = request.data
    print("data", data)
    email = data['email']
    payment_method_id = data['payment_id']
    extra_msg = ''  # add new variable to response message
    # checking if customer with provided email already exists
    customer_data = stripe.Customer.list(email=email).data

    # if the array is empty it means the email has not been used yet
    if len(customer_data) == 0:
        # creating customer
        customer = stripe.Customer.create(
            email=email, payment_method=payment_method_id)
    else:
        customer = customer_data[0]
        extra_msg = "Customer already existed."
    stripe.PaymentIntent.create(
        customer=customer,
        payment_method=payment_method_id,
        currency='usd',  # you can provide any currency you want
        amount=999,
        confirm=True,
        description="testing payment")     # it equals 9.99 PLN

    return Response(status=status.HTTP_200_OK,
                    data={
                        "success": True,
                        'message': 'Success',
                        'data': {
                            'customer_id': customer.id, 'extra_msg': extra_msg}
                    })
