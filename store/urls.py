from django.urls import path
from store import views


urlpatterns = [
    path("rentals/", views.RentalListView.as_view()),
    path("products/<category>/<sub_category>/<rental>/", views.BoxPackgeListView.as_view()),
    path("products/<category>/<sub_category>/", views.ProductListView.as_view()),
    path("locations/", views.LocationListView.as_view()),
    path("quote/", views.QuoteCreateView.as_view()),
    path("news-letter/", views.NewsletterCreateView.as_view()),



]
