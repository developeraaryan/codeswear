# Next.js E-Commerce Project

## Overview

This project is an e-commerce web application built with Next.js. It allows users to log in using their mobile number and OTP, browse products, add items to their wishlist and cart, and complete purchases using the Razorpay payment gateway. The application also includes an admin panel for managing products and orders.

## Features

- **User Authentication**: Log in using mobile number and OTP.
- **Product Browsing**: Browse and search for products.
- **Wishlist**: Add products to a wishlist for future reference.
- **Cart**: Add products to the cart and manage quantities.
- **Checkout**: Order products using the Razorpay payment gateway.
- **Order Management**: View order history and details.
- **Admin Panel**: Manage products, orders, and user data.

## Tech Stack

- **Frontend**: Next.js, React
- **Backend**: Next.js
- **Database**: MongoDB
- **Authentication**: Custom mobile OTP authentication
- **Payment Gateway**: Razorpay
- **Styling**: Tailwind CSS
- **State Management**: Redux
- **API Testing**: thunderclient

## Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/developeraaryan/codeswear.git
    ```

2. **Navigate to the project directory:**
    ```bash
    cd codeswear
    ```

3. **Install dependencies:**
    ```bash
    yarn install
    ```

4. **Set up environment variables:**
    Create a `.env.local` file in the root directory and add the following variables:
    ```bash
    MONGODB_URI=your_mongodb_connection_string
    NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
    RAZORPAY_KEY_SECRET=your_razorpay_key_secret
    JWT_SECRET=your_jwt_secret
    ```

5. **Run the development server:**
    ```bash
    yarn dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

### User Authentication

- Users can log in using their mobile number.
- An OTP will be sent to the provided mobile number for verification.

### Browsing Products

- Users can browse all available products on the homepage.
- Search functionality is available for finding specific products.

### Wishlist and Cart

- Products can be added to the wishlist for future reference.
- Items can be added to the cart and managed from the cart page.

### Checkout

- Users can proceed to checkout from the cart page.
- Payments are processed using Razorpay.

### Admin Panel

- Accessible by logging in with admin credentials.
- Admins can manage products, view and process orders, and manage user data.

## Project Structure

- **/components**: Reusable React components.
- **/pages**: Next.js pages for routing.
- **/api**: API routes for handling server-side logic.
- **/models**: Mongoose models for MongoDB collections.
- **/redux**: Redux slices and store configuration.
- **/styles**: Global and component-specific styles.

## Contributing

1. Fork the repository.
2. Create your feature branch: `git checkout -b feature/YourFeature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/YourFeature`
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or suggestions, please contact [aryanak9163@gmail.com](mailto:aryanak9163@gmail.com).