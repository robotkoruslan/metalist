
# Api documentation
## Registration
   - [Login](#login)
   - [Information about current user](#information-about-current-user)
   - [Recovery user password](#recovery-user-password)
   - [Change user password](#change-user-password)
## Matches
  - [Get all next matches](#get-all-next-matches)
  - [Get all previous matches](#get-all-previous-matches)
  - [Get match by ID](#get-match-by-id)
## Seats
  - [Get bought and reserved seats on sector](#get-bought-and-reserved-seats-on-sector)
## Cart
  - [Create cart](#create-cart)
  - [Get cart](#get-cart)
  - [Add tickets to cart](#add-tickets-to-cart)
  - [Delete tickets from cart](#delete-tickets-from-cart)
  - [Get reserved seats](#get-reserved-seats)
## Order
  - [Buy tickets](#buy-tickets)
## Tickets
  - [Print PDF tiket by number](#print-pdf-tiket-by-number)
  - [Get tiket information by number](#get-tiket-information-by-number)
  - [Delete tickets](#delete-tickets)
  - [Statistics sold tickets by day](#statistics-sold-tickets-by-day)
  - [Statistics sold tickets by event and day](#statistics-sold-tickets-by-event-and-day)
  
## Additional documents for API
- [Buy tikets workflow](./buyTikets.md)
- [Stadium details](./stadiumDetails.md)

## Main README
- [Readme](../README.md)

# Registration

Used to registration User.
By default, all users are registered with limited ruls. To change access rights for sellers, you must contact the administrator and provide the email and name after registering a user to change access ruls.

**URL** : `/api/users/`

**Method** : `POST`

**Auth required** : NO

**Payload example**

```json
{   
    "name": "[string name]",
    "email": "[valid email address]",
    "password": "[password in plain text]"
}
```

### Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDk0Zjc4OTFhYTM1MjI0OGNkN2I3NDAiLCJpYXQiOjE2MjAzNzU0MzMsImV4cCI6MTYyMDM5MzQzM30.LbqI7B9ETqUn7PMfuY0bse4-k3GPSvy5Y80-xG7ofHM"
}
```

# Login

Used to collect a Token for a registered User.

**URL** : `/auth/local/`

**Method** : `POST`

**Auth required** : NO

**Payload example**

```json
{   
    "name": "[string name]",
    "email": "[valid email address]",
    "password": "[password in plain text]"
}
```

### Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDk0Zjc4OTFhYTM1MjI0OGNkN2I3NDAiLCJpYXQiOjE2MjAzNzU0MzMsImV4cCI6MTYyMDM5MzQzM30.LbqI7B9ETqUn7PMfuY0bse4-k3GPSvy5Y80-xG7ofHM"
}
```
## Information about current user

Used to get information about current user.

**URL** : `/api/users/me/`

**Method** : `GET`

**Auth required** : YES Bearer Token


### Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "_id": "6095279d1aa352248cd7b74e",
    "provider": "local",
    "email": "user@gmail.com",
    "name": "user",
    "__v": 0,
    "isOfferNotification": false,
    "seasonTickets": [],
    "tickets": [],
    "role": "user",
    "profile": {
        "role": "user",
        "name": "user"
    },
    "token": {
        "role": "user",
        "_id": "6095279d1aa352248cd7b74e"
    },
    "id": "6095279d1aa352248cd7b74e"
}
```
## Recovery user password

Used to collect a Token for a registered User.

**URL** : `/api/users/recovery-password`

**Method** : `PUT`

**Auth required** : NO

**Payload example**

```json
{   
    "email": "[valid email address]"
}
```

### Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "message": "На ваш email был выслан временный пароль."
}
```

## Change user password

Used to collect a Token for a registered User.

**URL** : `/api/users/:id/password`

**Method** : `PUT`

**Auth required** : YES Bearer Token

**Payload example**

```json
{
"oldPassword": "oldPassword",
"newPassword": "newPassword"
}
```

### Success Response

**Code** : `204 No Content`

# Matches

## Get all next matches

Used to get all next matches.

**URL** : `/api/matches/next/`

**Method** : `GET`

**Auth required** : NO
### Success Response

**Code** : `200 OK`

**Content example**

```json
[
    {
        "_id": "60902ce3d610462e64904656",
        "rival": "Реал-Мадрид",
        "info": "Супер лига",
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
                    "price": 100
                },
                "id": "60795c26b87a071ee4b3172b"
            },
            "__v": 0,
            "id": "60795c26b87a071ee4b3172b"
        },
        "stadiumName": "metalist",
        "__v": 0,
        "abonement": false,
        "date": "2021-05-15T09:00:00.000Z",
        "headline": "Металлист 1925 - Реал-Мадрид",
        "id": "60902ce3d610462e64904656"
    }
]
```
## Get all previous matches

Used to get all previous matches.

**URL** : `/api/matches/prev/`

**Method** : `GET`

**Auth required** : NO
### Success Response

**Code** : `200 OK`

**Content example**

```json
[
    {
        "_id": "60902ce3d610462e64904656",
        "rival": "Реал-Мадрид",
        "info": "Супер лига",
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
        "date": "2021-05-15T09:00:00.000Z",
        "headline": "Металлист 1925 - Реал-Мадрид",
        "id": "60902ce3d610462e64904656"
    }
]
```

## Get match by ID

Used to get match information by id.

**URL** : `/api/matches/:id`

**Method** : `GET`

**Auth required** : NO
### Success Response

**Code** : `200 OK`

**Content example**

```json
[
    {
        "_id": "60902ce3d610462e64904656",
        "rival": "Реал-Мадрид",
        "info": "Супер лига",
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
        "date": "2021-05-15T09:00:00.000Z",
        "headline": "Металлист 1925 - Реал-Мадрид",
        "id": "60902ce3d610462e64904656"
    }
]
```
# Seats

## Get bought and reserved seats on sector

Used to get inforation about reserved seats. 
For example, you want to reserve or buy a ticket at a certain sector, but you need to understand which seats cannot be bought, reserved.
Response there will be reserved and sold seats, all other seats are available for sale, for this you need to use the description of the sector in the [Stadium details](/StadiumDetails.md) document exclude all seats. 

**URL** : `/api/seats/reserved-on-match/:id/sector/:id`

**Method** : `GET`

**Auth required** : NO
### Success Response

**Code** : `200 OK`

**Content example**

```json
[
    "s16r33st1",
    "s16r33st2",
    "s16r32st1"
]
```
# Cart

## Create cart

Used to reserve and buy seats, without card you can't buy tickets, you have to save and use cart publicId

**URL** : `/api/carts/`

**Method** : `POST`

**Auth required** : NO
### Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "__v": 0,
    "publicId": "f7ac026899dee8d060fa19be5f86dc6712b48ba4",
    "_id": "609539861aa352248cd7b750",
    "customPrice": null,
    "freeMessageStatus": null,
    "created": "2021-05-07T12:58:46.172Z",
    "seats": [],
    "seasonTickets": [],
    "tickets": [],
    "type": "cart",
    "status": "new",
    "price": 0,
    "size": 0,
    "id": "609539861aa352248cd7b750"
}
```
## Get cart

Used to get information about cart, you have to put publicId cart in headers after creation cart 

**URL** : `/api/carts/my-cart`

**Method** : `GET`

**Request headers**

* Cookie: "cart=publicId"

**Auth required** : NO
### Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "__v": 0,
    "publicId": "f7ac026899dee8d060fa19be5f86dc6712b48ba4",
    "_id": "609539861aa352248cd7b750",
    "customPrice": null,
    "freeMessageStatus": null,
    "created": "2021-05-07T12:58:46.172Z",
    "seats": [],
    "seasonTickets": [],
    "tickets": [],
    "type": "cart",
    "status": "new",
    "price": 0,
    "size": 0,
    "id": "609539861aa352248cd7b750"
}
```
## Add tickets to cart

Used to add ticket to cart, some tickets and then confirm payment

**URL** : `/api/carts/addSeat`

**Method** : `POST`

**Request headers**

* Cookie: "cart=publicId"

**Auth required** : NO
### Success Response

**Code** : `200 OK`

**Payload example**
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

**Content example**

```json
{
    "_id": "608fb1c02da6a11a1c9ff571",
    "publicId": "a7b8018ae4f75e5096cb0e5864ce4f5bb0558ff5",
    "__v": 63,
    "customPrice": null,
    "freeMessageStatus": null,
    "created": "2021-05-03T08:18:08.077Z",
    "seats": [
        {
            "_id": "60902d0cd610462e64907173",
            "slug": "s12r30st11",
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
            "sector": "12",
            "row": "30",
            "seat": 11,
            "reservedUntil": "2021-05-07T14:08:54.309Z",
            "reservedByCart": "a7b8018ae4f75e5096cb0e5864ce4f5bb0558ff5",
            "__v": 0,
            "reservationType": "RESERVE",
            "price": 100,
            "isReserved": true,
            "id": "60902d0cd610462e64907173"
        }
    ],
    "seasonTickets": [],
    "tickets": [],
    "type": "cart",
    "status": "new",
    "price": 0,
    "size": 4,
    "id": "608fb1c02da6a11a1c9ff571"
}
```

## Delete tickets from cart

Used to add tickets to cart, some tickets and then confirm payment. After delete you'll have rasponce with you reserved tikets without deleted tiket
Slug example: s16r9st9, 
where 
s16- sector 16 
r9 - row 9
st9 - seat 9
### Full list of seats you can find in [Stadium details](/StadiumDetails.md)

**URL** : `/api/carts/match/:matchId/seat/:slug`

**Method** : `DELETE`

**Request headers**

* Cookie: "cart=publicId"

**Auth required** : NO
### Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "_id": "608fb1c02da6a11a1c9ff571",
    "publicId": "a7b8018ae4f75e5096cb0e5864ce4f5bb0558ff5",
    "__v": 63,
    "customPrice": null,
    "freeMessageStatus": null,
    "created": "2021-05-03T08:18:08.077Z",
    "seats": [
        {
            "_id": "60902d0cd610462e64907173",
            "slug": "s12r30st11",
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
            "sector": "12",
            "row": "30",
            "seat": 11,
            "reservedUntil": "2021-05-07T14:08:54.309Z",
            "reservedByCart": "a7b8018ae4f75e5096cb0e5864ce4f5bb0558ff5",
            "__v": 0,
            "reservationType": "RESERVE",
            "price": 100,
            "isReserved": true,
            "id": "60902d0cd610462e64907173"
        }
    ],
    "seasonTickets": [],
    "tickets": [],
    "type": "cart",
    "status": "new",
    "price": 0,
    "size": 4,
    "id": "608fb1c02da6a11a1c9ff571"
}
```

## Get reserved seats

Used to get information about reserved seats

**URL** : `/api/seats/reserved-on-match/:id/sector/:id`

**Method** : `GET`

**Auth required** : NO
### Success Response

**Code** : `200 OK`

**Content example**

```json
[
    "s16r33st1",
    "s16r33st2",
    "s16r32st1"
]
```

# Order

## Buy tickets 

Used to confirm buy reserved or selected tikets and print tikets to stadium

**URL** : `/api/orders/pay-cashier`

**Method** : `POST`

**Auth required** : YES Bearer Token

**Request headers**

* Cookie: "cart=publicId"
### Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "__v": 1,
    "publicId": "e984153763206f01d785ad11db22e82fb50b89f8",
    "privateId": "73418252",
    "_id": "609572b861e52632345fef5d",
    "customPrice": null,
    "freeMessageStatus": null,
    "created": "2021-05-07T17:02:48.246Z",
    "user": {
        "id": "608c2d840f713720d0e5b59f",
        "name": "api",
        "email": "api@gmail.com"
    },
    "seats": [
        {
            "_id": "60902d01d610462e6490630c",
            "slug": "s15r26st10",
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
            "sector": "15",
            "row": "26",
            "seat": 10,
            "reservedUntil": "2021-05-07T17:32:00.852Z",
            "reservedByCart": "a7b8018ae4f75e5096cb0e5864ce4f5bb0558ff5",
            "__v": 0,
            "reservationType": "RESERVE",
            "price": 100,
            "isReserved": true,
            "id": "60902d01d610462e6490630c"
        }
    ],
    "seasonTickets": [],
    "tickets": [
        {
            "__v": 0,
            "accessCode": "3281165144889817",
            "status": "paid",
            "ticketNumber": "5b93d51b373eb935b032dfb0ac32ad0aa65590c6",
            "reserveDate": "2021-05-07T17:02:48.309Z",
            "_id": "609572b861e52632345fef5e",
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
                "id": "60902d01d610462e6490630c",
                "tribune": "north",
                "sector": "15",
                "row": "26",
                "seat": 10
            }
        }
    ],
    "type": "order",
    "status": "paid",
    "price": 100,
    "size": 1,
    "id": "609572b861e52632345fef5d"
}
```

# Tickets

## Print PDF tiket by number

Used to print bought tikets

**URL** : `/api/tickets/ticket/:ticketNumber`

**Method** : `GET`

**Auth required** : NO

### Success Response

**Code** : `200 OK`

**Content example**
```
PDF tiket
```

## Get tiket information by number

Used to get information about ticket by the access code

**URL** : `/api/tickets/ticket/:accessCode`

**Method** : `GET`

**Auth required** : NO

### Success Response

**Code** : `200 OK`

**Content example**
```json
{
    "tribune": "north",
    "sector": "15",
    "row": "22",
    "seat": 14,
    "headLine": "Металлист 1925 - Реал-Мадрид",
    "ticketNumber": "5491663406146286",
    "status": "paid",
    "price": 100
}
```

## Delete tickets

Used to delete tickets and cancel reserve by Object id

**URL** : `/api/tickets/ticket/:_id`

**Method** : `DELETE`

**Auth required** : YES Bearer Token

### Success Response

**Code** : `204 No Content`

## Statistics sold tickets by day

Used to get statistics sold tickets by day

anyday format: YYYY-MM-DD

**URL** : `/api/tickets/statistics?date=anyday&metod=day`

**Method** : `GET`

**Auth required** : YES Bearer Token

### Success Response

**Code** : `200 OK`

**Content example**
```json
[
    {
        "price": 100,
        "sum": 900,
        "count": 9
    }
]
```

## Statistics sold tickets by event and day

Used to get statistics sold tickets by day, and you can see Object id of tikets for delete tickets

anyday format: YYYY-MM-DD

**URL** : `/api/tickets/statistics?date=anyday&metod=event`

**Method** : `GET`

**Auth required** : YES Bearer Token

### Success Response

**Code** : `200 OK`

**Content example**
```json
[
    {
        "match": {
            "abonement": false,
            "date": "2021-05-15T09:00:00.000Z",
            "headline": "Металлист 1925 - Реал-Мадрид",
            "id": "60902ce3d610462e64904656"
        },
        "tribune": "north",
        "sector": "15",
        "row": "22",
        "seat": 10,
        "amount": 100,
        "accessCode": "1564822766871544",
        "id": "609571bd61e52632345fef5b",
        "freeMessageStatus": null,
        "customPrice": null
    }
]
```