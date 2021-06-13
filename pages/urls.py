from django.urls import path
from pages import views


urlpatterns = [
    path("faq/", views.FAQListView.as_view()),
    path("home/", views.HomeListView.as_view()),
    path("terms/", views.ServicesListView.as_view()),
    path("policy/", views.PolicyListView.as_view()),
    path("contact/", views.ContactListView.as_view()),
    # path("testimonials/", views.TestimonialListView.as_view()),
    # path("why-us/", views.WhyChooseUsListView.as_view()),
    # path("contactus-info/", views.ContactUsInfoListView.as_view()),



]
