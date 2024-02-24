from django.contrib import admin
from . import models

class  InventoryArea(admin.AdminSite):
    site_header = "Inventory Admin"
    site_title = "Inventory Admin"

inv_site = InventoryArea(name = 'InvAdmin')

inv_site.register(models.Supplier)
inv_site.register(models.Product)


