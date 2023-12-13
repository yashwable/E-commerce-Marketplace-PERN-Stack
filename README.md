This project involves building a REST API for an e-commerce marketplace with the following features:

- **User Registration and Login**: Users can register and login to the system. Users can be either buyers or sellers.

- **Catalog Management**: Sellers can create a catalog of items, with each item having a name and price. Each seller can have one catalog.

- **Order Management**: Buyers can create an order that contains a list of items from a seller's catalog. Sellers can retrieve a list of all orders they've received.

The system has the following entities:

- **Users**: Can be either buyers or sellers.
- **Catalogs**: Belongs to a seller and consists of products.
- **Products**: Has a name and a price.
- **Orders**: Can be created by a buyer to purchase items from a seller's catalog and consists of a list of products.

The API exposes the following endpoints:

- **Auth APIs**: 
  - `POST /api/auth/register`: Register a user.
  - `POST /api/auth/login`: Login a user.

- **APIs for buyers**: 
  - `GET /api/buyer/list-of-sellers`: Get a list of all sellers.
  - `GET /api/buyer/seller-catalog/:seller_id`: Get the catalog of a seller.
  - `POST /api/buyer/create-order/:seller_id`: Create an order for a seller.

- **APIs for sellers**: 
  - `POST /api/seller/create-catalog`: Create a catalog for a seller.
  - `GET /api/seller/orders`: Retrieve the list of orders received by a seller.
