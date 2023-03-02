# wallet-backend
Wallet System API

Service is deployed on Render with base url - https://wallet-1sqh.onrender.com/
Postman collection with file name is added in this repo - Wallet.postman_collection.json

This is a backend service for a wallet system that supports the following operations:

1. Setup wallet
2. Credit / Debit transactions
3. Fetching transactions on wallet
4. Get wallet details

## API Endpoints


### 1. Setup and initialize wallet

Setup a new wallet with initial balance.

URL: /setup

Method: POST

Request body:

```json
{
    "name": "Wallet H",
    "balance": 100
}
```

Requested balance can be decimal up to 4 precision points. E.g. 20.5612.

*Balance should be positive for setup to be successfull*

Response:

Status 200 OK

```json
{
    "id": "63fc5073d3a54f72403c9356",
    "balance": "100.0000",
    "name": "Wallet H",
    "date": "2023-02-27T06:40:51.784Z"
}
```


### 2. Credit/Debit amount
Credit or debit the requested amount to the wallet.

URL: /transact/:walletId

Method: POST

Request parameters:

```
walletId - id of the wallet to be updated
```

Request body:

```json
{
    "amount": 24,
    "description": "Recharge"
}
```

For Credit the amount will be a positive number, for Debit it will be a negative number.

Amount can be decimal up to 4 precision points e.g. 4.1203, 0.321, 1.0045.

*If after transaction balance comes out ot be negative, transaction will fail.*

Response:

Status 200 OK

```json
{
    "balance": "124.0000",
    "transactionId": "63fc54e7d3a54f72403c935c"
}
```


### 3. Fetch transactions
Given the wallet id, fetch the transactions on it sorted by createdAt

URL: /transactions

Method: GET

Query parameters:
```
walletId - id of the wallet

skip - number of documents to skip

limit - maximum number of documents to return
```

Response:

Status 200 OK

```json
[
    {
        "id": "63fc5073d3a54f72403c9358",
        "walletId": "63fc5073d3a54f72403c9356",
        "amount": 100,
        "balance": 100,
        "description": "Setup",
        "date": "2023-02-27T06:40:51.840Z",
        "type": "CREDIT"
    },
    {
        "id": "63fc54e7d3a54f72403c935c",
        "walletId": "63fc5073d3a54f72403c9356",
        "amount": 24,
        "balance": 124,
        "description": "Recharge",
        "date": "2023-02-27T06:59:51.394Z",
        "type": "CREDIT"
    }
]
```
The response for this API is an array of transactions where each transaction object consists of the following properties:

```
id: Transaction id
walletId: Id of wallet
amount: Transaction amount
balance: Balance of wallet after transaction
description: Description of transaction
date: Timestamp of transaction
type: Type of transaction (CREDIT/DEBIT)
```


### 4. Get Wallet details

Given wallet id, fetch the wallet details

URL: /wallet/:walletId

Method: GET

Request parameters:

```
walletId - id of the wallet to be fetched
```

Response:

Status 200 OK

```json
{
    "balance": "124.0000",
    "id": "63fc5073d3a54f72403c9356",
    "name": "Wallet H",
    "date": "2023-02-27T06:40:51.784Z"
}
```