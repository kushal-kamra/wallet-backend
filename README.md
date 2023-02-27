# wallet-backend
Wallet System API
***
This is a backend service for a wallet system that supports the following operations:

1. Setup wallet
2. Credit / Debit transactions
3. Fetching transactions on wallet
4. Get wallet details
***

### API Endpoints
##### 1. Setup and initialize wallet

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

    Requested balance can be decimal up to 4 precision points. E.g. 20.5612

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

Credit/Debit amount
Credit or debit the requested amount to the wallet.

URL: /transact/:walletId

Method: POST

Request parameters:

walletId - id of the wallet to be updated

Request body:

json
Copy code
{
  "amount": 10,
  "description": "Recharge"
}
For Credit the amount will be a positive number, for Debit it will be a negative number.
Amount can be decimal up to 4 precision points e.g. 4.1203, 0.321, 1.0045

Response:

Status 200 OK

json
Copy code
{
  "balance": 30,
  "transactionId": "8328832323"
}
Fetch transactions
Given the wallet id, fetch the recent transactions on it.

URL: /transactions

Method: GET

Query parameters:

walletId - id of the wallet
skip - number of documents to skip
limit - maximum number of documents to return

Response:

Status 200 OK

json
Copy code
[
  {
    "_id": "60970d6faae6a16f4707b05d",
    "walletId": "60970c14aae6a16f4707b054",
    "amount": 10,
    "balance": 30,
    "description": "Recharge",
    "date": "2022-02-01T12:15:00.000Z",
    "type": "CREDIT"
  },
  {
    "_id": "60970d0daae6a16f4707b05b",
    "walletId": "60970c14aae6a16f4707b054",
    "amount": 20,
    "balance": 20,
    "description": "Setup",
    "date": "2022-02-01T12:10:00.000Z",
    "type": "CREDIT"
  }
]
The response for this API is an array of transactions where each transaction object consists of the following properties:

_id: Transaction id
walletId: Id of wallet
amount: Transaction amount
balance: Balance of wallet after transaction
description: Description of transaction
date: Timestamp of transaction
type: Type of transaction (CREDIT/