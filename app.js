// Initialize an empty cart and orders array
let cart = [];
let totalPrice = 0;
let orders = [];  // To track all placed orders

// Function to add items to the cart
function addToCart(productName, productPrice) {
    // Add the product to the cart array
    cart.push({ name: productName, price: productPrice });

    // Update the total price
    totalPrice += productPrice;
    // Update the cart display
    updateCartDisplay();
}


// Function to update the cart display
function updateCartDisplay() {
    const cartItemsDiv = document.getElementById('cart-items');
    const totalPriceSpan = document.getElementById('total-price');

    // Clear previous cart items
    cartItemsDiv.innerHTML = '';

    // Display the current cart items
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        cartItemsDiv.appendChild(cartItem);
    });

    // Update the total price display
    totalPriceSpan.textContent = totalPrice.toFixed(2);
}

// Function to handle form submission
function submitOrder(event) {
    event.preventDefault(); // Prevent form from reloading the page

    // Get the values from the form
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    // Create an order object
    const order = {
        name: name,
        email: email,
        phone: phone,
        cart: [...cart],  // Clone the cart array to keep a record
        totalPrice: totalPrice
    };

    // Add the order to the orders array
    orders.push(order);

    // Display a thank you message
    const thankYouMessage = document.getElementById('thank-you-message');
    thankYouMessage.style.display = 'block';

    // Hide the order form and product section
    const orderForm = document.querySelector('.order-form');
    orderForm.style.display = 'none';
    const productSection = document.querySelector('.products');
    productSection.style.display = 'none';

    // Simulate sending a confirmation email (this part would actually be handled by a backend)
    console.log(`Order placed by: ${name}, Email: ${email}, Phone: ${phone}`);
    console.log('Order details:', cart);

    // Clear the cart
    cart = [];
    // totalPrice = 0;

    // Clear the form fields
    document.getElementById('order-form').reset();

    // Clear the cart display
    updateCartDisplay();
}

// Function to handle the "Go Back to Shopping" button click
function goBack() {
    // Hide the thank you message
    const thankYouMessage = document.getElementById('thank-you-message');
    thankYouMessage.style.display = 'none';

    // Show the order form and product section
    const orderForm = document.querySelector('.order-form');
    orderForm.style.display = 'block';
    const productSection = document.querySelector('.products');
    productSection.style.display = 'block';
}

// Function to display the list of all orders
function showOrderList() {
    const orderListDiv = document.getElementById('order-list');
    orderListDiv.innerHTML = ''; // Clear any previous order list

    // If there are no orders, display a message
    if (orders.length === 0) {
        orderListDiv.innerHTML = '<p>No orders placed yet.</p>';
        return;
    }

    // Loop through all orders and display them
    orders.forEach((order, index) => {
        const orderDiv = document.createElement('div');
        orderDiv.classList.add('order');

        // Add order details like name, email, total price
        orderDiv.innerHTML = `
            <h4>Order ${index + 1}</h4>
            <p>Name: ${order.name}</p>
            <p>Email: ${order.email}</p>
            <p>Phone: ${order.phone}</p>
            <p>Total: $${order.totalPrice.toFixed(2)}</p>
            <h5>Order Items:</h5>
        `;

        // Add order items (cart items)
        order.cart.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.textContent = `${item.name} - $${item.price.toFixed(2)}`;
            orderDiv.appendChild(itemDiv);
        });

        // Append the order to the order list
        orderListDiv.appendChild(orderDiv);
    });
}
document.querySelector('a[href="#contact"]').addEventListener('click', function(event) {
    event.preventDefault();  // Prevent default action of link

    // Scroll to the contact section smoothly
    document.querySelector('#contact').scrollIntoView({
        behavior: 'smooth'
    });

    // Add blinking effect to contact section
    const contactSection = document.querySelector('.contact-content');
    
    // Add blinking class
    contactSection.classList.add('blinking');
    
    // Remove blinking effect after animation ends
    setTimeout(() => {
        contactSection.classList.remove('blinking');
    }, 1500);  // Match the duration of the animation (1.5 seconds)
});

const form = document.querySelector("form");

function sendEmail() {
    console.log(totalPrice);
  Email.send({
    Host: "smtp.elasticemail.com",          // Updated SMTP host
    Username: "chanikyachowdary8866@gmail.com",   // Your email address
    Password: "3D071CAB22AAB48EBD703A468B9E93277E1E",   // Your API key
    To: "chanikyachowdary8866@gmail.com",    // Recipient's email
    From: "chanikyachowdary8866@gmail.com",  // Sender's email
    Subject: "This is the subject",
    Body: `Total That you have purchased ${totalPrice } `,
    SecureToken: "",  // This can be used as an alternative to a password if needed
    Port: 2525,        // Use the TLS-enabled port
    SSL: true          // Enable SSL for a secure connection
  }).then(
    message => alert(message+" "+"we recived your order request")
  );
}

function sendEmail1(){
    console.log(totalPrice);
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
  sendEmail();
});
function makePayment() {
    const totalAmount = document.getElementById("total-price").innerText;
    const amount = parseFloat(totalAmount);

    if (amount > 0) {
        // Simulate UPI payment gateway (e.g., PhonePe or Google Pay)
        alert("Redirecting to payment gateway. Total amount: ₹" + amount);

        // Here you would normally integrate with the payment provider API
        // For example, you can redirect to a UPI payment gateway URL:
        // window.location.href = `upi://pay?pa=your-upi-id@upi&pn=YourName&mc=0000&tid=00000001&url=https://www.example.com&am=${amount}`;
        
        // For the sake of simulation, let's show a redirect
        setTimeout(() => {
            window.location.href = "https://example-payment-gateway.com"; // Replace with your gateway URL
        }, 2000);
    } else {
        alert("Invalid amount for payment.");
    }
}
function showPaymentOptions() {
    const paymentOptions = document.getElementById("payment-options");
    paymentOptions.classList.toggle("active"); // Toggle visibility
}

function cashOnDelivery() {
    alert("You have selected Cash on Delivery. Please have the exact amount ready upon delivery.");
    // Optionally, close the payment options modal here after selection
    const paymentOptions = document.getElementById("payment-options");
    paymentOptions.classList.remove("active");
}
// Function to show the payment options
function showPaymentOptions() {
    const paymentOptions = document.getElementById("payment-options");
    paymentOptions.style.display = 'block'; // Show payment options
}

// Function for Cash on Delivery
function cashOnDelivery() {
    alert("You have selected Cash on Delivery. Please have the exact amount ready upon delivery.");
    const paymentOptions = document.getElementById("payment-options");
    paymentOptions.style.display = 'none'; // Hide payment options after selection
    document.getElementById("thank-you-message").style.display = 'block'; // Show Thank You message
}

// Function to handle the order submission
function submitOrder(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Here you can send the order details to the server using AJAX or other methods
    // After that, show the payment options
    alert("Your order has been placed!");
    const paymentOptions = document.getElementById("payment-options");
    paymentOptions.style.display = 'block'; // Show payment options for the customer to proceed
}

// Function to go back to the shopping page
function goBack() {
    document.getElementById("thank-you-message").style.display = 'none';
    // Optionally, reset the form and cart
    document.getElementById("order-form").reset();
}
// Handle Star Rating Clicks
const starButtons = document.querySelectorAll('.star-button');

starButtons.forEach(starButton => {
    starButton.addEventListener('click', function() {
        const ratingValue = this.getAttribute('data-value');
        
        // Remove "selected" class from all buttons
        starButtons.forEach(star => {
            star.classList.remove('selected');
        });
        
        // Add "selected" class to the clicked button and all previous stars
        for (let i = 0; i < ratingValue; i++) {
            starButtons[i].classList.add('selected');
        }

        // Store the selected rating value in the form (optional)
        document.getElementById('order-form').rating.value = ratingValue;
    });
});

