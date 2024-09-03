(function () {
  function fetchAdverts(uniqueId, currentUrl) {
    const apiEndpoint = "https://api.reallygreatads.com/v1/placement";
    const payload = {
      uniqueId: uniqueId,
      url: currentUrl,
    };

    return fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then((response) => response.json());
  }

  // Function to show loading spinner
  function showLoadingSpinner(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = ""; // Clear any existing content
    const spinner = document.createElement("div");
    spinner.className = "loading-spinner";
    spinner.innerHTML = `
            <div class="spinner"></div>
            <p>Loading adverts...</p>
        `;
    container.appendChild(spinner);
  }

  // Function to remove loading spinner
  function removeLoadingSpinner(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const spinner = container.querySelector(".loading-spinner");
    if (spinner) {
      container.removeChild(spinner);
    }
  }

  // Function to display adverts on the page
  function displayAdverts(adverts, template, containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error("Adverts container not found");
      return;
    }
    container.className = ""; // Reset any previous template class
    container.classList.add(template); // Apply the new template class

    adverts.forEach((advert) => {
      const advertElement = document.createElement("div");
      advertElement.className = "advert";

      const title = document.createElement("h3");
      title.innerText = advert.title;
      advertElement.appendChild(title);

      // Add image
      if (advert.image_url) {
        const image = document.createElement("img");
        image.className = "advert-image";
        image.src = advert.image_url;
        image.alt = advert.title;
        advertElement.appendChild(image);
      }

      const description = document.createElement("p");
      // Check if the description is an array and join with new lines if it is
      if (Array.isArray(advert.description)) {
        description.innerText = advert.description.join("\n");
      } else {
        description.innerText = advert.description;
      }
      advertElement.appendChild(description);

      const button = document.createElement("a");
      button.href = advert.click_url;
      button.innerText = advert.cta_text;
      button.className = "advert-button";
      advertElement.appendChild(button);

      container.appendChild(advertElement);
    });
  }

  // Function to insert styles into the document head
  function insertStyles(containerId) {
    const style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = `
            /* Common styles for all templates */
            #${containerId} .advert {
                border: 1px solid #ccc;
                padding: 16px;
                margin: 16px 0;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                background-color: #fff;
            }
            #${containerId} .advert .advert-image {
                border-radius: 4px;
            }
            #${containerId} .advert h3 {
                margin: 0 0 8px;
                font-size: 1.25em;
                color: #333;
            }
            #${containerId} .advert p {
                margin: 0 0 16px;
                font-size: 1em;
                color: #666;
            }
            #${containerId} .advert-button {
                display: inline-block;
                padding: 8px 16px;
                font-size: 1em;
                color: #fff;
                background-color: #007bff;
                text-decoration: none;
                border-radius: 4px;
            }
            #${containerId} .advert-button:hover {
                background-color: #0056b3;
            }

            /* Styles for template-simple */
            #${containerId}.template-simple .advert {
                display: grid;
                grid-template-columns: 20% 60% 20%;
                align-items: center;
                margin-bottom: 16px;
                gap: 16px;
            }
            #${containerId}.template-simple .advert .advert-image {
                max-width: 100px;
            }
            #${containerId}.template-simple .advert .text-content {
                flex: 1;
            }
            #${containerId}.template-simple .advert .text-content h3 {
                margin-bottom: 8px;
            }
            #${containerId}.template-simple .advert .text-content p {
                margin-bottom: 16px;
            }

            /* Styles for template-card */
            #${containerId}.template-card {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                gap: 16px;
            }
            #${containerId}.template-card .advert {
                margin: 0;
                text-align: center;
            }
            #${containerId}.template-card .advert h3 {
                margin-bottom: 16px;
            }
            #${containerId}.template-card .advert .advert-image {
                width: 100%;
                margin-bottom: 16px;
            }

            /* Loading spinner styles */
            #${containerId} .loading-spinner {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 32px;
            }
            #${containerId} .loading-spinner .spinner {
                width: 40px;
                height: 40px;
                border: 4px solid rgba(0, 123, 255, 0.3);
                border-top-color: #007bff;
                border-radius: 50%;
                animation: spin 1s linear infinite;
            }
            #${containerId} .loading-spinner p {
                margin-top: 16px;
                font-size: 1em;
                color: #333;
            }
            @keyframes spin {
                to { transform: rotate(360deg); }
            }

            /* Responsive styles */
            @media (max-width: 768px) {
                #${containerId}.template-simple .advert {
                    grid-template-columns: 1fr;
                    text-align: center;
                }
                #${containerId}.template-simple .advert .advert-image {
                    margin: 0 auto;
                    margin-bottom: 16px;
                }
            }
        `;
    document.head.appendChild(style);
  }

  // Main function to initialize the adverts fetching and displaying
  window.initAdverts = function (uniqueId, containerId) {
    const currentUrl = window.location.href;

    // Insert styles
    insertStyles(containerId);

    // Show loading spinner
    showLoadingSpinner(containerId);

    fetchAdverts(uniqueId, currentUrl)
      .then((data) => {
        // Remove loading spinner
        removeLoadingSpinner(containerId);

        // Display adverts
        displayAdverts(data.adverts, data.template, containerId);
      })
      .catch((error) => {
        // Remove loading spinner and handle error
        removeLoadingSpinner(containerId);
        console.error("Error fetching adverts:", error);
      });
  };
})();
