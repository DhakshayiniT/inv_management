# Inventory Management System

## Overview
The Inventory Management System is a Django-based web application designed to monitor and manage product stock levels and supplier information. It provides CRUD functionality for products and suppliers, search functionality for products, and features to generate inventory reports.

## Features
- Models for Product and Supplier with relevant fields.
- Django Admin interface for managing products and suppliers.
- CRUD functionality for products.
- Search functionality for products by name or description.
- Inventory report generation with dynamic sorting.
- Advanced filtering for product searches.
- Export functionality to CSV format.

## Technologies Used
- Django
- Django REST Framework
- React (for the frontend)
- MongoDB (for data storage)

## Setup

### Backend Setup

To run the Django backend locally, follow these steps:

1. *Clone the repository:*

    
    git clone <repository_url>
    

2. *Navigate to the project directory:*

    
    cd inventory_management_system
    

3. *Create a virtual environment (optional but recommended):*

    
    python3 -m venv venv
    

4. *Activate the virtual environment:*

  
    venv\Scripts\activate
    
    

5. *Install dependencies:*

    
    pip install -r requirements.txt
    

6. *Run migrations:*

    
    python manage.py migrate
    

7. *Create a superuser (for admin access):*

    
    python manage.py createsuperuser
    

8. *Start the development server:*

    
    python manage.py runserver
    

The Django backend should now be running locally.

### Frontend Setup

To run the React frontend locally, follow these steps:

1. **Navigate to the inventory_fe directory:**

    
    cd inventory_fe
    

2. *Install dependencies:*

    
    npm install
    

3. *Start the development server:*

    
    npm run dev
    

The React frontend should now be running locally.

### MongoDB Setup

To run MongoDB locally, you can install it from the official MongoDB website: (https://www.mongodb.com/try/download/community)

After installation, start MongoDB using the following command:


mongod


By default, MongoDB will run on port 27017.


-------------------------------------------------------------------------------------------------------------------------------------    



## Event API 

### Setup

    follow the same step mentioned above

### List Events
   **URL**: `/api/events/`
   **Method**: GET
   **Request**: None
   **Response**: List of events with their details.
[
    {
        "id": 1,
        "name": "Event 1",
        "date": "2024-03-01",
        "capacity": 100
    },
    {
        "id": 2,
        "name": "Event 2",
        "date": "2024-03-10",
        "capacity": 50
    }
]

### Register for Event
- **URL**: `/api/register/`
- **Method**: POST
- **Request**:

{
    "event_id": 1
}

- **Response**: Message indicating successful registration.

{
    "message": "Registration successful."
}

### Cancel Event Registration
**URL**: `/api/cancel/`
**Method**: POST
**Request**:
{
    "event_id": 1
}

 **Response**
{
    "message": "Cancellation successful."
}

## Examples

1. **Token API:**
    **URL:** `/api/token/`
    **Method:** POST
    **Input Data:**
     {
         "username": "your_username",
         "password": "your_password"
     }

2. **List Events API:**
    **URL:** `/api/events/`
    **Method:** GET
    **Input Data:** None

3. **Create Event API:**
    **URL:** `/api/events/`
    **Method:** POST
    **Input Data:**
     {
         "name": "Event Name",
         "date": "2024-03-01",
         "capacity": 100
     }

4. **Retrieve Single Event API:**
    **URL:** `/api/events/<event_id>/`
    **Method:** GET
    **Input Data:** None

5. **Update Event API:**
    **URL:** `/api/events/<event_id>/`
    **Method:** PUT
    **Input Data:**
     {
         "name": "Updated Event Name",
         "date": "2024-03-02",
         "capacity": 150
     }

6. **Delete Event API:**
    **URL:** `/api/events/<event_id>/`
    **Method:** DELETE
    **Input Data:** None

7. **Register for Event API:**
    **URL:** `/api/register/`
    **Method:** POST
    **Input Data:**
     {
         "event_id": 1
     }

8. **Cancel Event Registration API:**
    **URL:** `/api/cancel/`
    **Method:** POST
    **Input Data:**
     {
         "event_id": 1
     }


