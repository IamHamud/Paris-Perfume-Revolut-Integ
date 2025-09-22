# Paris Perfumes - Luxury Ecommerce with Revolut Integration

Beautiful single-page luxury perfume ecommerce website showcasing **Revolut Card Pop-up Integration** for secure payment processing.

## 🌟 Project Overview

This project demonstrates the implementation of Revolut's Card Pop-up checkout solution in a real-world ecommerce scenario. The site features an elegant luxury perfume store with two premium fragrances, complete with:

- **Revolut Card Pop-up Integration**: Secure payment processing using Revolut's popup widget
- **Modern UI/UX**: Elegant design with video backgrounds and smooth animations
- **Shopping Cart**: Full cart functionality with add/remove items
- **Responsive Design**: Works seamlessly across all devices
- **Auto-scrolling Carousel**: Beautiful product showcase

## 🔧 Technical Implementation

### Revolut Integration Features:
- **Card Pop-up Widget**: Uses `@revolut/checkout` SDK for secure payment collection
- **Order Management**: Backend API creates orders via Revolut Merchant API
- **Sandbox Mode**: Configured for testing with Revolut's sandbox environment
- **ESM Module Support**: Modern JavaScript implementation with ES modules
- **Webhook Support**: Ready for production webhook handling

### Architecture:
- **Frontend**: Vanilla JavaScript with Tailwind CSS served via Python HTTP server
- **Backend**: Node.js/Express API for Revolut order creation and webhook handling
- **Payment Flow**: Card details collected securely through Revolut's popup widget

## 🚀 Quick Start - How to Run

### Prerequisites
- **Node.js** (v14 or higher)
- **Python 3** (for frontend server)
- **Revolut Business Account** (sandbox for testing)

### Step 1: Setup Environment
Create a `.env` file in the `paris-perfumes/server` directory:
```env
REVOLUT_API_KEY=your_sandbox_api_key_here
REVOLUT_WEBHOOK_SECRET=your_webhook_secret_here
```

### Step 2: Install Dependencies
```bash
cd paris-perfumes/server
npm install
```

### Step 3: Run the Application

**You need 2 terminals running simultaneously:**

**Terminal 1 - Backend Server:**
```bash
cd paris-perfumes/server
node app.js
```
*Backend runs on: http://localhost:5177*

**Terminal 2 - Frontend Server:**
```bash
cd paris-perfumes/frontend
python3 -m http.server 3000
```
*Frontend runs on: http://localhost:3000*

### Step 4: Access Your Site
Open your browser and go to: **http://localhost:3000**

---

## 📱 Usage

1. **Browse Products**: View Rose Noir ($120) and Golden Elegance ($95)
2. **Add to Cart**: Click "Add to Cart" or use "Buy Now" for instant checkout
3. **Payment**: Revolut popup opens for secure card detail collection
4. **Testing**: Use Revolut's test cards for sandbox payments

## 🧪 Testing with Revolut

### Test for Successful Payments

Use the following test cards to simulate successful payments in the Sandbox environment. You can also use them to test the use case of charging a customer's saved payment method.

Use any 3-digit CVV and any future expiry date (MM/YY).

| Card PAN | Brand |
|----------|-------|
| 4929420573595709 | VISA |
| 5281438801804148 | MASTERCARD |

For more test cards, visit: [Revolut Test Cards Documentation](https://developer.revolut.com/docs/guides/accept-payments/get-started/test-implementation/test-cards)

## 📁 Project Structure

```
paris-perfumes/
├── frontend/           # Client-side application
│   ├── index.html     # Main landing page
│   └── src/
│       ├── css/       # Styling (style.css)
│       ├── js/        # JavaScript (main.js)
│       └── images/    # Product images and videos
└── server/            # Backend API
    ├── app.js         # Express server with Revolut integration
    ├── orders.js      # Order management logic
    ├── helpers.js     # Utility functions
    ├── package.json   # Dependencies
    └── .env           # Environment variables
```

## 📚 Documentation References

### Official Revolut Documentation
- [Card Pop-up Payment Integration Guide](https://developer.revolut.com/docs/guides/accept-payments/payment-methods/card-payments/web/pop-up#accept-payments-via-card-pop-up) - Main implementation guide
- [Merchant Web SDK Documentation](https://developer.revolut.com/docs/sdks/merchant-web-sdk/introduction) - Official Web SDK and integration guide
- [Revolut Merchant API Reference](https://developer.revolut.com/docs/merchant/merchant-api) - Complete API documentation

### GitHub Examples & References
- [Official Card Pop-up Example](https://github.com/revolut-engineering/revolut-checkout-example/tree/main/card-pop-up-example) - Reference implementation
- [Revolut Test Cards](https://developer.revolut.com/docs/guides/accept-payments/get-started/test-implementation/test-cards) - Testing documentation

### Developer Resources
- [Revolut Business Sandbox](https://sandbox-business.revolut.com/) - Create test merchant accounts

## ⚖️ Legal & License

### MIT License

Copyright (c) 2025 Paris Perfumes Demo

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

### ⚠️ Important Disclaimers

**Professional Implementation**: This project demonstrates a complete Revolut payment integration in a modern ecommerce application. Built with production-ready practices and clean architecture.

**Not for Production Use**: This code is intended for educational use only. Before using any part of this code in a production environment:
- Conduct thorough security reviews
- Implement proper error handling and validation
- Follow Revolut's production guidelines and best practices
- Ensure compliance with relevant financial regulations

**No Liability**: The authors and contributors of this project are not responsible for any misuse, financial loss, or security issues that may arise from using this code inappropriately.

**Revolut Integration**: For official Revolut integration guidance, always refer to the official [Revolut Developer Documentation](https://developer.revolut.com/). This project is not affiliated with or endorsed by Revolut Ltd.

**Compliance**: Ensure your implementation complies with PCI DSS standards and relevant financial regulations in your jurisdiction.

---

© 2025 Paris Perfumes. All rights reserved.