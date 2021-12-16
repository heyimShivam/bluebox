from django.urls import path
from order import views

urlpatterns = [
    path('test-payment/', views.test_payment),
    path('save-stripe-info/', views.save_stripe_info),
    path('cart/', views.CartListView.as_view()),

]
