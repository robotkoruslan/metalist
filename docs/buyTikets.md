# Project: Metalist API 
## Description: 
This is documantation how to buy tickets.

![Buy tickets workflow](./buyDiagram.png)

## Additional documents for API
+ [Main Api documentation](./api.md)
+ [Stadium details](./stadiumDetails.md)

## End-point: Registation
### Description: Create an account and register.
Method: POST
>```
>/api/users/
>```
### Body (**raw**)

```json
{   
    "name": "example",
    "email": "example@example.com",
    "password": "example"
}
```
### Response (**json**)
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDk2OWVjN2I0OWMxOTA4MmNiN2M1ZDQiLCJpYXQiOjE2MjA0ODM3ODMsImV4cCI6MTYyMDUwMTc4M30.ggspZX9Lp7VzBBz7g4gtIk0x4i-vPESez9pykpfk9U0"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
## End-point: User info
### Description: Get information about current user, It is necessary to contact the server administrator to change the access roles, since by default the access roles do not allow buying and printing tickets. To check access roles and obtain information about the user, you need to send a GET request with the token received during registration.
Method: GET
>```
>/api/users/me/
>```
### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDk2OWVjN2I0OWMxOTA4MmNiN2M1ZDQiLCJpYXQiOjE2MjA0ODM3ODMsImV4cCI6MTYyMDUwMTc4M30.ggspZX9Lp7VzBBz7g4gtIk0x4i-vPESez9pykpfk9U0|string|
### Response (**json**)
```json
{
    "_id": "60969ec7b49c19082cb7c5d4",
    "provider": "local",
    "name": "example",
    "email": "example@example.com",
    "__v": 0,
    "isOfferNotification": true,
    "seasonTickets": [],
    "tickets": [],
    "role": "user",
    "profile": {
        "role": "user",
        "name": "example"
    },
    "token": {
        "role": "user",
        "_id": "60969ec7b49c19082cb7c5d4"
    },
    "id": "60969ec7b49c19082cb7c5d4"
}

```
⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: Login
### Description: After obtaining the "role": "api" access rules, you need to login to get the updated token with the updated access roles. 
Method: POST
>```
>/auth/local/
>```
### 🔑 Authentication noauth

|Param|value|Type|
|---|---|---|
### Body (**raw**)

```json
{   
    "name": "example",
    "email": "example@example.com",
    "password": "example"
}
```
### Response (**json**)
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDk2OWVjN2I0OWMxOTA4MmNiN2M1ZDQiLCJpYXQiOjE2MjA0ODM3ODMsImV4cCI6MTYyMDUwMTc4M30.ggspZX9Lp7VzBBz7g4gtIk0x4i-vPESez9pykpfk9U0"
}
```
⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
## End-point: Get next matches
### Description: You need to get a list of next matches, for further use of the match id when choosing tickets 
Method: GET
>```
>/api/matches/next/
>```
### 🔑 Authentication noauth

|Param|value|Type|
|---|---|---|
### Body (**raw**)
```json

```
### Response (**json**)
```json
[
    {
        "_id": "608d1bf7b748f70f6cbecdb8",
        "rival": "Манчестер ",
        "priceSchema": {
            "_id": "60795c26b87a071ee4b3172b",
            "priceSchema": {
                "stadiumName": "metalist",
                "name": "100 uah",
                "colorSchema": [
                    {
                        "price": 100,
                        "color": "#ffcc00"
                    },
                    {
                        "price": 111,
                        "color": "#ffcc00"
                    }
                ],
                "tribune_west": {
                    "name": "west",
                    "price": 100
                },
                "tribune_north": {
                    "name": "north",
                    "price": 100
                },
                "tribune_south": {
                    "name": "south",
                    "price": 100
                },
                "tribune_east": {
                    "name": "east",
                    "price": 111
                },
                "id": "60795c26b87a071ee4b3172b"
            },
            "__v": 0,
            "id": "60795c26b87a071ee4b3172b"
        },
        "stadiumName": "metalist",
        "__v": 0,
        "abonement": false,
        "date": "2021-05-09T06:00:00.000Z",
        "headline": "Металлист 1925 - Манчестер ",
        "id": "608d1bf7b748f70f6cbecdb8"
    }
]

```
⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
## End-point: Get reserved and bought seats
### Description: To get a selection of available tickets, you need to get information about the sector and in response there will be reserved and sold seats, all other seats are available for sale, for this you need to use the description of the sector in the [Stadium details](/StadiumDetails.md) document exclude all seats. 


Method: GET
>```
>/api/seats/reserved-on-match/60902ce3d610462e64904656/sector/17
>```
### 🔑 Authentication noauth

|Param|value|Type|
|---|---|---|
### Body (**raw**)
```json

```
### Response (**json**)
```json
[
    "s17r28st17"
]
```
### From response we can see, that only one seat reserved all other seats are avalible to buy, full list of seats you can find in [Stadium details](/StadiumDetails.md)
"s17r28st17"
where
s17- sector 17 
r28 - row 28
st17 - seat 17
⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
## End-point: Create cart for order
### Description: You need to create a cart to create an order, after creating a cart of orders, a cart id is created in the database, which is used to select seats for printing tickets.
Method: POST
>```
>/api/carts/
>```
### 🔑 Authentication noauth

|Param|value|Type|
|---|---|---|
### Body (**raw**)

```json

```
### Response (**json**)
```json
{
    "__v": 0,
    "publicId": "dfdc74b8fb338c4545b73346c9f88e18588445c2",
    "_id": "6096b4d1b49c19082cb7c5d7",
    "customPrice": null,
    "freeMessageStatus": null,
    "created": "2021-05-08T15:57:05.174Z",
    "seats": [],
    "seasonTickets": [],
    "tickets": [],
    "type": "cart",
    "status": "new",
    "price": 0,
    "size": 0,
    "id": "6096b4d1b49c19082cb7c5d7"
}
```
⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
## End-point: Add seats in cart
### Description: It is necessary to add the selected seats to the cart, for this you need to use the PublicId of the previously created cart add cookies to the request header, seat information in the request body. In response to your request, you will receive a list of all seats in the cart.

### Example seats: "slug":"s16r9st9", 
" where 
s16- sector 16 
r9 - row 9
st9 - seat 9
### Full list of seats you can find in [Stadium details](/StadiumDetails.md)

Method: POST
>```
>/api/carts/addSeat
>```
### Headers

|Content-Type|Value|
|---|---|
|Cookie|cart=2cf547e1da0f071edc466a73c7df5422e0901bc7|
### 🔑 Authentication noauth

|Param|value|Type|
|---|---|---|
### Body (**raw**)

```json
{
    "slug":"s16r9st9",
    "matchId":"60902ce3d610462e64904656",
    "data":{
        "seat":9,
        "row":"9",
        "sector":"16",
        "tribune":"north"
        }
}
```
### Response (**json**)
```json
{
    "_id": "609694c78c4a151b6873cbd4",
    "publicId": "2cf547e1da0f071edc466a73c7df5422e0901bc7",
    "__v": 6,
    "customPrice": null,
    "freeMessageStatus": null,
    "created": "2021-05-08T13:40:23.103Z",
    "seats": [
        {
            "_id": "60902cf9d610462e64905a23",
            "slug": "s17r9st11",
            "match": {
                "_id": "60902ce3d610462e64904656",
                "rival": "Реал-Мадрид",
                "info": "Супер лига",
                "priceSchema": "60795c26b87a071ee4b3172b",
                "stadiumName": "metalist",
                "__v": 0,
                "abonement": false,
                "date": "2021-05-15T09:00:00.000Z",
                "headline": "Металлист 1925 - Реал-Мадрид",
                "id": "60902ce3d610462e64904656"
            },
            "tribune": "north",
            "sector": "17",
            "row": "9",
            "seat": 11,
            "reservedUntil": "2021-05-08T16:40:06.382Z",
            "reservedByCart": "2cf547e1da0f071edc466a73c7df5422e0901bc7",
            "__v": 0,
            "reservationType": "RESERVE",
            "price": 100,
            "isReserved": true,
            "id": "60902cf9d610462e64905a23"
        },
    ],
    "seasonTickets": [],
    "tickets": [],
    "type": "cart",
    "status": "new",
    "price": 0,
    "size": 3,
    "id": "609694c78c4a151b6873cbd4"
}
```
⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
## End-point: Buy tickets
### Description: To buy and print tickets, you need to make a post request in the table of contents of the request, specify the token and the id of the basket with the selected seats. In response, you will receive information about the ticket.
Method: POST
>```
>/api/orders/pay-cashier
>```
### Headers

|Content-Type|Value|
|---|---|
|Cookie|cart=2cf547e1da0f071edc466a73c7df5422e0901bc7|
### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDk2OWVjN2I0OWMxOTA4MmNiN2M1ZDQiLCJyb2xlIjoiYXBpIiwiaWF0IjoxNjIwNDkxMzU0LCJleHAiOjE2MjA1MDkzNTR9.sO0dcUat2Kr8ZP5Pt7B4kSUrAOJY4Ua7ft30m82ZMPM|string|

### Body (**raw**)

```json

```
### Response (**json**)
```json
{
    "__v": 1,
    "publicId": "73399e307c8cc1c30e4e0a87b8c543711d95fde6",
    "privateId": "29278184",
    "_id": "6096c61ab49c19082cb7c5d9",
    "customPrice": null,
    "freeMessageStatus": null,
    "created": "2021-05-08T17:10:50.240Z",
    "user": {
        "id": "60969ec7b49c19082cb7c5d4",
        "name": "example",
        "email": "example@example.com"
    },
    "seats": [
        {
            "_id": "60902cfdd610462e64905d68",
            "slug": "s16r28st8",
            "match": {
                "_id": "60902ce3d610462e64904656",
                "rival": "Реал-Мадрид",
                "info": "Супер лига",
                "priceSchema": "60795c26b87a071ee4b3172b",
                "stadiumName": "metalist",
                "__v": 0,
                "abonement": false,
                "date": "2021-05-15T09:00:00.000Z",
                "headline": "Металлист 1925 - Реал-Мадрид",
                "id": "60902ce3d610462e64904656"
            },
            "tribune": "north",
            "sector": "16",
            "row": "28",
            "seat": 8,
            "reservedUntil": "2021-05-08T17:39:59.927Z",
            "reservedByCart": "2cf547e1da0f071edc466a73c7df5422e0901bc7",
            "__v": 0,
            "reservationType": "RESERVE",
            "price": 100,
            "isReserved": true,
            "id": "60902cfdd610462e64905d68"
        }
    ],
    "seasonTickets": [],
    "tickets": [
        {
            "__v": 0,
            "accessCode": "4067615162514328",
            "status": "paid",
            "ticketNumber": "1afa81962cf5efbf26e577909e7613dec95c5341",
            "reserveDate": "2021-05-08T17:10:50.316Z",
            "_id": "6096c61ab49c19082cb7c5da",
            "customPrice": null,
            "freeMessageStatus": null,
            "timesUsed": 0,
            "amount": 100,
            "match": {
                "id": "60902ce3d610462e64904656",
                "headline": "Металлист 1925 - Реал-Мадрид",
                "date": "2021-05-15T09:00:00.000Z",
                "abonement": false
            },
            "seat": {
                "id": "60902cfdd610462e64905d68",
                "tribune": "north",
                "sector": "16",
                "row": "28",
                "seat": 8
            }
        }
    ],
    "type": "order",
    "status": "paid",
    "price": 200,
    "size": 1,
    "id": "6096c61ab49c19082cb7c5d9"
}

```
⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃