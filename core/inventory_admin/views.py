from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
import csv
from django.http import HttpResponse
import json
from django.http import JsonResponse
from django.db.models import Q

from django.shortcuts import render, get_object_or_404, redirect
from .models import Product, Supplier
from inventory_admin.forms import ProductForm,SupplierForm

@api_view(['GET'])
def product_list(request):

    data = Product.objects.all()

    product_form = ProductForm(data, context={'request': request}, many=True)

    return Response(product_form.data)


@api_view(['POST'])
def product_create(request):

    serializer = ProductForm(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def product_update(request, pk):
    try:
        product = Product.objects.get(pk=pk)
    except Product.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = ProductForm(product, data=request.data,context={'request': request})
    if serializer.is_valid():
        serializer.save()
        return Response(status=status.HTTP_204_NO_CONTENT)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['DELETE'])
def product_delete(request, pk):
    try:
        product = Product.objects.get(pk=pk)
    except Product.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    product.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def product_detail(pk):
    try:
        product = Product.objects.get(pk=pk)
    except Product.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    product_form = ProductForm(product, context={'request': pk})

    return Response(product_form.data)


@api_view(['GET'])
def supplier_list(request):

    data = Supplier.objects.all()

    supplier_form = SupplierForm(data, context={'request': request}, many=True)

    return Response(supplier_form.data)


@api_view(['POST'])
def supplier_create(request):

    res = SupplierForm(data=request.data)
    if res.is_valid():
        res.save()
        return Response(status=status.HTTP_201_CREATED)

    return Response(res.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['PUT'])
def supplier_update(request, pk):
    try:
        supplier = Supplier.objects.get(pk=pk)
    except Supplier.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = SupplierForm(supplier, data=request.data,context={'request': request})
    if serializer.is_valid():
        serializer.save()
        return Response(status=status.HTTP_204_NO_CONTENT)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['DELETE'])
def supplier_delete(request, pk):
    try:
        supplier = Supplier.objects.get(pk=pk)
    except Supplier.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    supplier.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)



@api_view(['GET'])
def supplier_detail(pk):
    try:
        supplier = Supplier.objects.get(pk=pk)
    except Supplier.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    supplier_form = SupplierForm(supplier, context={'request': pk})

    return Response(supplier_form.data)


@api_view(['POST'])
def generateCSV(request):
    data = request.data
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="data.csv"'
    csv_writer = csv.DictWriter(response, fieldnames=data[0].keys())
    csv_writer.writeheader()
    csv_writer.writerows(data)

    return response


@api_view(['POST'])
def filter_products(request):
    data = json.loads(request.body)
    suppliers = data.get('supplier')
    min_price = data.get('min_price')
    max_price = data.get('max_price')
   

    products = Product.objects.all()

    if suppliers and len(suppliers)!=0:
        products= products.filter(supplier__in=suppliers)
    
    # if min_price:
    #     products = products.filter(price__gte=min_price)
    
    # if max_price:
    #     products = products.filter(price__lte=max_price)

    supplier_form = ProductForm(products, context={'request': request}, many=True)

    return Response(supplier_form.data)