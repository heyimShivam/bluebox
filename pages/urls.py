from django.urls import path
from pages import views


urlpatterns = [
    path("faq", views.FAQListView.as_view()),
    path("home", views.HomeListView.as_view()),
]
