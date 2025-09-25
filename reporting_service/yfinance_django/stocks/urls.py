from . import views
from django.urls import path

urlpatterns = [
    path("", views.index, name="index"),
    path("live/<str:ticker>/", views.live_price, name="live_price"),
    path("multiple-live/<str:tickers>/", views.multiple_live_prices, name="multiple_live_prices"),
    path("multiple-live-others/", views.multiple_live_prices_others, name="multiple_live_prices_others"),
    path("summary/<str:ticker>/", views.stock_summary, name="stock_summary"),
    path("ratios/<str:ticker>/", views.financial_ratios, name="financial_ratios"),
    path("history/<str:ticker>/", views.financial_history, name="financial_history"),
    path('heatmap/<str:tickers>/', views.heatmap_view, name='heatmap'),
    path('top-gainers/<str:tickers>/', views.top_gainers_view, name='top_gainers'),
    path('top-losers/<str:tickers>/', views.top_losers_view, name='top_losers'),
    path('multiple-news/<str:tickers>/', views.multiple_stock_news, name='mulitple_stock_news'),
    path('stock-info/<str:tickers>/', views.stock_basic_info, name='stock-info'),
    path('health/', views.api_health_check, name='api_health_check'),

    # Always keep this last
    path("<str:ticker>/", views.stock_data, name="stock_data"),
]