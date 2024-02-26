from rest_framework import serializers
from .models import Product,Supplier

class ProductForm(serializers.ModelSerializer):

    class Meta:
        model = Product 
        fields = ['id','name', 'description', 'quantity_in_stock', 'price', 'supplier']

class SupplierForm(serializers.ModelSerializer):

    class Meta:
        model = Supplier
        fields = ['id','name', 'contact_info']

