#!/bin/bash

# Set base URL
BASE_URL="http://<PORT>/api"

Register User
echo "Registering user..."
curl -X POST "$BASE_URL/auth/register" -H "Content-Type: application/json" -d '{
    "username": "<>",
    "email": "<>",
    "password": "<>"
}'
echo -e "\n"

# Login User
echo "Logging in user..."
curl -X POST "$BASE_URL/auth/login" -H "Content-Type: application/json" -d '{
    "email": "<>",
    "password": "<>"
}'

echo -e "\n"


# Send OTP
echo "Sending OTP..."
curl -X POST "$BASE_URL/auth/send-otp" -H "Content-Type: application/json" -d '{
    "email": "<>"
}'
echo -e "\n"

# Verify OTP
echo "Verifying OTP..."
curl -X POST "$BASE_URL/auth/verify-otp" -H "Content-Type: application/json" -d '{
    "email": "<>",
    "otp": "<>"
}'
echo -e "\n"


# Set base URL and authorization token

AUTH_TOKEN= <>

# Book details
TITLE="The Great Gatsby"
AUTHOR="F. Scott Fitzgerald"
DESCRIPTION="A classic novel set in the 1920s."
PRICE=15.99
CATEGORY="Classics"
STOCK=10
IMAGE_PATH= "<>"

# Add Book using cURL
echo "Adding book..."
curl -X POST "$BASE_URL/addBook" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -F "title=$TITLE" \
    -F "author=$AUTHOR" \
    -F "description=$DESCRIPTION" \
    -F "price=$PRICE" \
    -F "category=$CATEGORY" \
    -F "stock=$STOCK" \
    -F "file=@$IMAGE_PATH"

echo -e "\nBook added successfully!"

