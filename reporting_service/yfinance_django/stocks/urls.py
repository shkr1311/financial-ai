from . import views
from django.urls import path

urlpatterns = [
    path('', views.index, name='index'),
    path("<str:ticker>/", views.stock_data, name="stock_data"),
    path("live/<str:ticker>/", views.live_price, name="live_price"),
    path("multiple-live/<str:tickers>/", views.multiple_live_prices, name="multiple_live_prices"),
    path("summary/<str:ticker>/", views.stock_summary, name="multiple_live_prices"),
    path("ratios/<str:ticker>/", views.financial_ratios, name="financial_ratios"),
    path("history/<str:ticker>/", views.financial_history, name="financial_history"),
    path('heatmap/<str:ticker>/', views.format_stock_summary, name='format_stock_summary')
]