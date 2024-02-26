
from django.contrib import admin
from django.urls import path,include


urlpatterns = [
    path('',include('inventory_admin.urls')),
    # path('inv/', inv_site.urls),
    # path('',views.index,name='index')
]

