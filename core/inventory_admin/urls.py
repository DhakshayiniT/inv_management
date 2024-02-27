
from django.contrib import admin
from django.urls import path, re_path
from . import views

urlpatterns = [
    re_path(r'^api/product/list', views.product_list),
    re_path(r'^api/product/create', views.product_create),
    re_path(r'^api/product/update/([0-9]+)$', views.product_update),
    re_path(r'^api/product/delete/([0-9]+)$', views.product_delete),
    re_path(r'^api/product/detail/([0-9]+)$', views.product_detail),
    re_path(r'^api/supplier/list', views.supplier_list),
    re_path(r'^api/supplier/create', views.supplier_create),
    re_path(r'^api/supplier/update/([0-9]+)$', views.supplier_update),
    re_path(r'^api/supplier/delete/([0-9]+)$', views.supplier_delete),
    re_path(r'^api/supplier/detail/([0-9]+)$', views.supplier_detail),
    re_path(r'^api/generatecsv', views.generateCSV),
    re_path(r'^api/filter_products',views.filter_products)
]
