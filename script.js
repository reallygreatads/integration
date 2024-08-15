(function() {
    function fetchAdverts(uniqueId, currentUrl) {
        const apiEndpoint = 'https://api.reallygreatads.com/v1/placement';
        const payload = {
            uniqueId: uniqueId,
            url: currentUrl
        };

        return fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then(response => response.json());
    }

    // Function to display adverts on the page
    function displayAdverts(adverts, template, containerId) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error('Adverts container not found');
            return;
        }
        container.innerHTML = ''; // Clear any existing content
        container.className = ''; // Reset any previous template class
        container.classList.add(template); // Apply the new template class

        adverts.forEach(advert => {
            const advertElement = document.createElement('div');
            advertElement.className = 'advert';

            const title = document.createElement('h3');
            title.innerText = advert.title;
            advertElement.appendChild(title);

            const description = document.createElement('p');
            // Check if the description is an array and join with new lines if it is
            if (Array.isArray(advert.description)) {
                description.innerText = advert.description.join('\n');
            } else {
                description.innerText = advert.description;
            }
            advertElement.appendChild(description);

            const button = document.createElement('a');
            button.href = advert.click_url;
            button.innerText = advert.cta_text;
            button.className = 'advert-button';
            advertElement.appendChild(button);

            container.appendChild(advertElement);
        });
    }

    // Function to insert styles into the document head
    function insertStyles(containerId) {
        const style = document.createElement('style');
        style.type = 'text/css';
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
                margin-bottom: 16px;
                display: block;
            }

            /* Styles for template-card */
            #${containerId}.template-card {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                gap: 16px;
            }
            #${containerId}.template-card .advert {
                margin: 0;
            }
        `;
        document.head.appendChild(style);
    }

    // Main function to initialize the adverts fetching and displaying
    window.initAdverts = function(uniqueId, containerId) {
        const currentUrl = window.location.href;

        // Insert styles
        insertStyles(containerId);

        fetchAdverts(uniqueId, currentUrl)
            .then(data => {
                displayAdverts(data.adverts, data.template, containerId);
            })
            .catch(error => {
                console.error('Error fetching adverts:', error);
            });
    };
})();
