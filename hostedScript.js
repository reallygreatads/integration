// hostedScript.js
(function() {
    // Function to fetch adverts data from the internal API
    function fetchAdverts(uniqueId, currentUrl) {
        const apiEndpoint = 'https://reallygreatads.test/api/placement'; // Update with your API endpoint
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
            description.innerText = advert.description;
            advertElement.appendChild(description);

            const button = document.createElement('a');
            button.href = advert.clickUrl;
            button.innerText = 'Learn More';
            button.className = 'advert-button';
            advertElement.appendChild(button);

            container.appendChild(advertElement);
        });
    }

    // Main function to initialize the adverts fetching and displaying
    window.initAdverts = function(uniqueId, containerId) {
        const currentUrl = window.location.href;

        fetchAdverts(uniqueId, currentUrl)
            .then(data => {
                displayAdverts(data.adverts, data.template, containerId);
            })
            .catch(error => {
                console.error('Error fetching adverts:', error);
            });
    };
})();
