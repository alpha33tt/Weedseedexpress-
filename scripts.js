// Initialize EmailJS
emailjs.init("YOUR_EMAILJS_USER_ID");

// Order Cannabis Form
document.getElementById('orderForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const data = gatherFormData('orderForm', 'product', 'quantity');
  sendEmail(data, 'Cannabis Order');
});

// Order Accessories Form
document.getElementById('accessoriesForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const data = gatherFormData('accessoriesForm', 'accessory', 'accessoryQuantity');
  sendEmail(data, 'Accessories Order');
});

// Calculate Total Price for Cannabis
document.getElementById('product').addEventListener('change', updateTotalPrice);
document.getElementById('quantity').addEventListener('input', updateTotalPrice);

// Calculate Total Price for Accessories
document.getElementById('accessory').addEventListener('change', updateAccessoryTotalPrice);
document.getElementById('accessoryQuantity').addEventListener('input', updateAccessoryTotalPrice);

function updateTotalPrice() {
  const product = document.getElementById('product').value;
  const quantity = parseInt(document.getElementById('quantity').value) || 1;
  const prices = { Gram: 25, Eighth: 60, Quarter: 110, Half: 220, Ounce: 400 };
  document.getElementById('totalPrice').value = `$${prices[product] * quantity}`;
}

function updateAccessoryTotalPrice() {
  const accessory = document.getElementById('accessory').value;
  const quantity = parseInt(document.getElementById('accessoryQuantity').value) || 1;
  const prices = { Grinder: 15, RollingPapers: 5, Bong: 50, VapePen: 80, Lighter: 3 };
  document.getElementById('accessoryTotalPrice').value = `$${prices[accessory] * quantity}`;
}

function gatherFormData(formId, productId, quantityId) {
  const form = document.getElementById(formId);
  return {
    product: form.querySelector(`#${productId}`).value,
    quantity: form.querySelector(`#${quantityId}`).value,
    name: form.querySelector('[id$="Name"]').value,
    email: form.querySelector('[id$="Email"]').value,
    address: form.querySelector('[id$="Address"]').value,
    totalPrice: form.querySelector('[id$="totalPrice"]').value,  // Add totalPrice field for both forms
  };
}

function sendEmail(data, subject) {
  emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", { ...data, subject })
    .then(() => alert(`${subject} placed successfully!`))
    .catch(() => alert(`Failed to place ${subject.toLowerCase()}.`));
}

// Smooth Scroll Functionality
function scrollToSection(sectionId) {
  document.getElementById(sectionId).scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}
