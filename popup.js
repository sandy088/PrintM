function printOrder() {
    console.log("entered in popup.js")
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.scripting.executeScript({
        target: {tabId: tabs[0].id},
        function: () => {
            const orderDetails = {
              orderId: "",
              items: [],
              totalPrice: 0
            };
            
            
              const orderNumber = 1;
              orderDetails.orderId = orderNumber;
            
              const orderItems = document.querySelectorAll(".product-detail-section .product-information");
              orderItems.forEach(item => {
                const itemDetails = {
                  name: "",
                  price: 0
                };
                itemDetails.name = document.querySelector('.product-detail-section h3').textContent;
                itemDetails.price = document.querySelector('.product-information label.price').textContent;
                orderDetails.items.push(itemDetails);
                orderDetails.totalPrice += Number(itemDetails.price.replace(/[^0-9.-]+/g,""));
              });

              
            
              const date = new Date().toLocaleDateString();
              const time = new Date().toLocaleTimeString();
              const shopName = "Patanjali";
              const shopLogo = "https://i.imgur.com/KZ5np5K.png";
              let printContents = "";
              printContents += `<div style="text-align:center;font-size:16px;"><img src="${shopLogo}" width="60" height="60"><br>${shopName}</div>`;
              printContents += `<div style="font-size:14px;margin-top:5px;">Order No: ${orderDetails.orderId}</div>`;
              printContents += `<div style="font-size:14px;">Date: ${date} ${time}</div>`;
              printContents += `<div style="font-size:14px;">`;
              orderDetails.items.forEach(item => {
                printContents += `<div>${item.name}<span style="float:right;">${item.price}</span></div>`;
              });
              printContents += `</div>`;
              printContents += `<div style="font-size:14px;border-top:1px solid black;padding-top:5px;">Total: <span style="float:right;">${orderDetails.totalPrice}</span></div>`;
            
              const printWindow = window.open('', '', 'height=500,width=500');
              printWindow.document.write('<html><head><title>Print Receipt</title>');
              printWindow.document.write('</head><body>');
              printWindow.document.write(printContents);
              printWindow.document.write('</body></html>');
              printWindow.document.close();
              printWindow.print();
              printWindow.close();
          }
      });
    });
  }

  function printProductDetails() {
    const productName = document.querySelector('.product-detail-section h3').textContent.trim();
    const productDetails = document.querySelector('.product-information .description p').textContent.trim();
    const productPrice = document.querySelector('.product-information label.price').textContent.trim();
    const productQuantity = document.querySelector('#quantity').value.trim();
  
    const productString = `${productName}\n${productDetails}\n${productPrice}\nQuantity: ${productQuantity}`;
  
    printJS({ printable: productString, type: 'raw-html', css: 'path/to/thermal-printer.css' });
  }
  

  console.log("Entered in popup.js")
  
  document.querySelector("#printButton").addEventListener("click", printOrder);
  