#!/bin/bash

API="http://localhost:4741"
URL_PATH="/products"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
--header "Authorization: Bearer ${TOKEN}" \
--data '{
    "product": {
      "productName": "'"${NAME}"'",
      "productDescription": "'"${DESC}"'",
      "productPrice": "'"${PRICE}"'",
      "productClass": "'"${CLASS}"'",
      "productCatagory": "'"${CAT}"'",
      "productImages": "'"${IMG}"'"
    }
  }'

echo
