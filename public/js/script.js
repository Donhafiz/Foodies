console.log("script is active");
function addFoodToBasket(did, dname, dprice, dimage) {
  cart = localStorage.getItem("cart");
  if (cart == null) {
    products = [];
    product = {
      id: did,
      name: dname,
      price: dprice,
      image: dimage,
      quantity: 1,
    };
    products.push(product);
    localStorage.setItem("cart", JSON.stringify(products));
    swal.fire({
      toast: "true",
      background: "#A82c48",
      html: "<h6 class='text-light text-small px-1'>Your fisrt food added to basket</h6>",
      position: "bottom",
      showConfirmButton: false,
      timer: "2000",
      timerProgressBar: true,
    });
  } else {
    pcart = JSON.parse(cart);
    oldcart = pcart.find((item) => item.id == did);
    if (oldcart) {
      pcart.map((item) => {
        if (item.id == oldcart.id) {
          item.quantity++;
        }
      });

      localStorage.setItem("cart", JSON.stringify(pcart));

      swal.fire({
        toast: "true",
        background: "#A82c48",
        html: "<h6 class='text-light text-small px-1'>Food Quantity increased...</h6>",
        position: "bottom",
        showConfirmButton: false,
        timer: "2000",
        timerProgressBar: true,
      });
    } else {
      p = {
        id: did,
        name: dname,
        price: dprice,
        image: dimage,
        quantity: 1,
      };
      pcart.push(p);
      localStorage.setItem("cart", JSON.stringify(pcart));

      swal.fire({
        toast: "true",
        background: "#A82c48",
        html: "<h6 class='text-light text-small px-1'>New Food added to basket</h6>",
        position: "bottom",

        showConfirmButton: false,
        timer: "2000",
        timerProgressBar: true,
      });
    }
  }
  updateCart();
}

function updateCart() {
  cart = JSON.parse(localStorage.getItem("cart"));
  if (cart == null || cart.length == 0) {
    $(".cart-num").html("( 0 )");
    $(".cart-body").html("Your cart is empty...");
    // $(".data").html("Select the Disire product for buy ....");
    $(".order-btn").addClass("disabled");
    // $(".check-btn2").addClass("d-none");
  } else {
    $(".cart-num").html(`(  ${cart.length}   )`);
    $(".order-btn").removeClass("disabled");
    // $(".check-btn2").removeClass("d-none");

    table = `
       
       <table class="table table-hover">
           <tr class="text-style">
                <th>Pic</th>
               <th>Name</th>
               <th>Price</th>
               <th>Quantity</th>
               <th>Total</th>
               <th>Action</th>
              
           </tr>
       
       `;

    var totalPrice = 0;
    cart.map((item) => {
      table += `
               <tr>
                   <td> <img style='width:50px;height:50px;border-radius:50%' src='/static/dishimage/${
                     item.image
                   }'/> </td>
                   <td><small>${item.name}</small></td>
                   <td><small>${item.price}</small></td>
                   <td><small>${item.quantity}</small></td>
                   <td><small>${item.price * item.quantity}</small></td>
                  
                   <td>
                       <button class="btn btn-danger btn-sm" onclick=" removeBook('${
                         item.id
                       }')">Remove</button>
                   </td>
                  
                   
               </tr>
           
           `;
      totalPrice += item.price * item.quantity;
    });

    table =
      table +
      `  
              <tr>
              
                   <td colspan='3' class='my-2 '>Total Price : ${totalPrice} </td>
               </tr>
               </table>
      
       
       `;
    $(".cart-body").html(table);
  }
}
function removeBook(did) {
  cart = JSON.parse(localStorage.getItem("cart"));
  updatecart = cart.filter((item) => item.id != did);
  n = `${updatecart.length}`;
  localStorage.setItem("cart", JSON.stringify(updatecart));
  if (n == 0) {
    localStorage.removeItem("cart");
  }
  updateCart();
  swal.fire({
    toast: "true",
    background: "#fecc0f",
    html: "<h6 class='text-dark text-small px-1'>Food remove from cart!! </h6>",
    position: "bottom",

    showConfirmButton: false,
    timer: "1000",
    timerProgressBar: true,
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const chatContainer = document.getElementById("chat-container");
  const showChatButton = document.getElementById("show-chat");
  const closeChatButton = document.getElementById("close-chat");
  const userInput = document.getElementById("user-input");

  // Show chat after a delay when the page loads
  setTimeout(() => {
    chatContainer.classList.remove("hidden");
  }, 5000); // Show after 5 seconds

  showChatButton.addEventListener("click", () => {
    chatContainer.classList.remove("hidden");
  });

  closeChatButton.addEventListener("click", () => {
    chatContainer.classList.add("hidden");
  });

  userInput.addEventListener("keypress", (event) => {
    if (event.key === 'Enter') {
      console.log("Key pressed");
      event.preventDefault();
      sendMessage();
    }
  });

  initializeChat();
});

function initializeChat() {
  const chatMessages = document.getElementById("chat-messages");
  addMessage("Hello! I'm your AI assistant. How can I help you today?", "ai");
}


function sendMessage() {
  const userInput = document.getElementById("user-input");
  const chatMessages = document.getElementById("chat-messages");

  if (userInput.value.trim() === "") return;

  // Display user message
  addMessage(userInput.value, "user");

  // Get AI response
  const aiResponse = getAIResponse(userInput.value);

  // Display AI message
  addMessage(aiResponse, "ai");

  // Clear input
  userInput.value = "";

  // Scroll to bottom
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addMessage(message, sender) {
  const chatMessages = document.getElementById("chat-messages");
  const messageElement = document.createElement("div");
  messageElement.className = sender + "-message";
  messageElement.textContent = message;
  chatMessages.appendChild(messageElement);
}

function getAIResponse(userMessage) {
  const lowercaseMessage = userMessage.toLowerCase();

  if (lowercaseMessage.includes("hello") || lowercaseMessage.includes("hi")) {
    return "Hello! How can I assist you today?";
  } else if (lowercaseMessage.includes("help")) {
    return "I'm here to help. What do you need assistance with? You can ask about our menu, services, or locations.";
  } else if (
    lowercaseMessage.includes("bye") ||
    lowercaseMessage.includes("goodbye")
  ) {
    return "Thank you for chatting with me. Have a great day!";
  } else if (lowercaseMessage.includes("thank")) {
    return "You're welcome! Is there anything else I can help you with?";
  } else if (lowercaseMessage.includes("menu")) {
    return "Our menu features a variety of dishes including appetizers, main courses, and desserts. Would you like to know about any specific category?";
  } else if (
    lowercaseMessage.includes("price") ||
    lowercaseMessage.includes("cost")
  ) {
    return "Our prices vary depending on the dish. Most main courses range from $15 to $30. Can you specify which item you're interested in?";
  } else if (
    lowercaseMessage.includes("reservation") ||
    lowercaseMessage.includes("book")
  ) {
    return "Certainly! To make a reservation, please call us at +233 559 137-611 or use our online booking system on our website. www.https://foodies.com";
  } else if (
    lowercaseMessage.includes("location") ||
    lowercaseMessage.includes("address")
  ) {
    return "We are located at 123 Main Street, CKT-UTAS. We're open Monday to Saturday from 11 AM to 10 PM.";
  } else if (lowercaseMessage.includes("delivery")) {
    return "Yes, we offer delivery services! You can order through our website or popular food delivery apps.";
  } else if (
    lowercaseMessage.includes("special") ||
    lowercaseMessage.includes("offer")
  ) {
    return "We have daily specials! Today's special is our chef's signature pasta dish at a 20% discount. Check our website for more offers!";
  } else if (
    lowercaseMessage.includes("vegetarian") ||
    lowercaseMessage.includes("vegan")
  ) {
    return "We have a variety of vegetarian and vegan options. Our veggie burger and plant-based curry are particularly popular!";
  } else if (lowercaseMessage.includes("allerg")) {
    return "We take food allergies very seriously. Please inform our staff about any allergies when ordering, and we'll ensure your meal is prepared safely.";
  } else if (lowercaseMessage.includes("park")) {
    return "We have a free parking lot available for our customers right next to the restaurant.";
  } else if (lowercaseMessage.includes("wifi")) {
    return "Yes, we offer free Wi-Fi to all our customers. Just ask our staff for the password when you're here.";
  } else if (
    lowercaseMessage.includes("take") &&
    lowercaseMessage.includes("out")
  ) {
    return "Yes, we offer take-out services. You can place your order online or by calling us directly.";
  } else if (
    lowercaseMessage.includes("gift") &&
    lowercaseMessage.includes("card")
  ) {
    return "We do offer gift cards! They're available for purchase in-store or on our website.";
  } else if (lowercaseMessage.includes("cancel")) {
    return "To cancel a reservation, please call us at least 2 hours before your scheduled time. For orders, please contact us as soon as possible.";
  } else if (
    lowercaseMessage.includes("hours") ||
    lowercaseMessage.includes("open")
  ) {
    return "We're open Monday to Saturday from 11 AM to 10 PM, and on Sundays from 12 PM to 9 PM.";
  } else {
    return "I'm not sure I understand. Could you please rephrase your question? I can help with information about our menu, services, locations, and more.";
  }
}

document.re;
$(document).ready(function () {
  updateCart();
});
