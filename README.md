## API Documentation

### 1. Register User

#### Request

| **Method**     | **POST**                         |
| :------------- | :------------------------------- |
| `Endpoint`     | `/api/user/register`             |
| `Headers`      | `Content-Type: application/json` |
| `Request Body` | `JSON`                           |

##### Example

```json
{
  "username": "John Doe",
  "email": "johndoe@gmail.com",
  "password": "1234",
  "confirm_password": "1234"
}
```

#### Response

| **Method** | **Description** | **Response Body**                                                                                                  |
| :--------- | :-------------- | ------------------------------------------------------------------------------------------------------------------ |
| 201        | Success         | `{"status": {"acknowledged": true,"insertedId": "6805e97709614bf1b796f916"},"message": "Akun berhasil terdaftar"}` |
| 400        | Bad request     | `{"status": "failed","data": "Email sudah terdaftar"}`                                                             |

### 2. Login User

#### Request

| **Method**     | **POST**                         |
| :------------- | :------------------------------- |
| `Endpoint`     | `/api/user/login`                |
| `Headers`      | `Content-Type: application/json` |
| `Request Body` | `JSON`                           |

##### Example

```json
{
  "email": "johndoe@gmail.com",
  "password": "1234"
}
```

#### Response

| **Method** | **Description**        | **Response Body**                                         |
| :--------- | :--------------------- | --------------------------------------------------------- |
| 200        | Success                | `{"status": "success","token":"this-is-a-secret-token"}`  |
| 401        | Bad request (Password) | `{"status": "failed","message": "Password salah"}`        |
| 404        | Bad request (Email)    | `{"status": "failed","message": "Email tidak ditemukan"}` |
