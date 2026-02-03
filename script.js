function scrollToMenu() {
  document.getElementById("menu").scrollIntoView({
    behavior: "smooth"
  });
}
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});


const slider = document.querySelector(".testimonial-track");

slider.addEventListener("mouseenter", () => {
  slider.style.animationPlayState = "paused";
});

slider.addEventListener("mouseleave", () => {
  slider.style.animationPlayState = "running";
});







document.addEventListener("DOMContentLoaded", function () {

  const btn = document.getElementById("sweetWaBtn");
  const popup = document.getElementById("sweetWaPopup");
  const closeBtn = document.getElementById("sweetWaClose");
  const sendBtn = document.getElementById("sweetSendOrder");
  const status = document.getElementById("sweetStatus");

  const products = [
    { name: "Kaju Katli", pricePerKg: 600, pricePerPiece: 15 },
    { name: "Rasgulla", pricePerKg: 700, pricePerPiece: 20 },
    { name: "Ras Malai", pricePerKg: 500, pricePerPiece: 12 },
    { name: "Ghevar", pricePerKg: 450, pricePerPiece: 10 },
    { name: "Modak", pricePerKg: 500, pricePerPiece: 12 },
    
  ];

  // Open popup
  btn.onclick = () => popup.style.display = "flex";

  // Close popup
  closeBtn.onclick = () => popup.style.display = "none";
  popup.onclick = (e) => { if (e.target === popup) popup.style.display = "none"; };

  function updatePrice(index) {
    const weight = parseFloat(document.getElementById("w" + index).value) || 0;
    const pieces = parseInt(document.getElementById("p" + index).value) || 0;

    const priceKg = products[index].pricePerKg;
    const pricePiece = products[index].pricePerPiece;

    const weightPrice = (priceKg / 1000) * weight;
    const piecePrice = pieces * pricePiece;

    const total = Math.round(weightPrice + piecePrice);

    document.getElementById("price" + index).innerText = total;
    updateTotal();
  }

  function updateTotal() {
    let total = 0;
    products.forEach((p, i) => {
      total += parseFloat(document.getElementById("price" + i).innerText) || 0;
    });
    document.getElementById("sweetTotal").innerText = total;
  }

  // Attach events
  products.forEach((p, i) => {
    document.getElementById("w" + i).addEventListener("input", () => updatePrice(i));
    document.getElementById("p" + i).addEventListener("input", () => updatePrice(i));
  });

  sendBtn.onclick = function () {
    const name = document.getElementById("sweetName").value.trim();
    const phone = document.getElementById("sweetPhone").value.trim();
    const address = document.getElementById("sweetAddress").value.trim();

    let orderText = "";

    products.forEach((p, i) => {
      const weight = document.getElementById("w" + i).value;
      const pieces = document.getElementById("p" + i).value;
      const price = document.getElementById("price" + i).innerText;

      if (weight > 0 || pieces > 0) {
        orderText += `- ${p.name}: `;
        if (weight > 0) orderText += `${weight}g `;
        if (pieces > 0) orderText += `(${pieces} pcs) `;
        orderText += `= ₹${price}\n`;
      }
    });

    if (!name || !phone || !orderText) {
      status.textContent = "Please fill details and select sweets.";
      status.style.color = "red";
      return;
    }

    const total = document.getElementById("sweetTotal").innerText;

    const message =
`🍬 New Sweets Order
Name: ${name}
Phone: ${phone}
Address: ${address}

Items:
${orderText}
Total Bill: ₹${total}`;

    const whatsappURL = "https://wa.me/919412837000?text=" + encodeURIComponent(message);

    window.open(whatsappURL, "_blank");
  };

});

