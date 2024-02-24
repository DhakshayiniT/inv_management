
from django.contrib import admin
from django.urls import path
from inventory_admin.admin import inv_site

urlpatterns = [
    path('inv/', inv_site.urls),
]

