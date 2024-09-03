function fetchAdverts(uniqueId, currentUrl) {
  const apiEndpoint = "http://localhost/placement";
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
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }

    throw new Error("Failed to fetch adverts");
  });
}

window.initAdverts = function (uniqueId, containerId, isDevMode = false) {
  const currentUrl = window.location.href;

  fetchAdverts(uniqueId, currentUrl)
    .then((data) => {
      if (data.template) {
        let src = `https://cdn.reallygreatads.com/${data.template}.min.css`;

        // If we're in development node, then we can use the local template
        if (isDevMode) src = `/templates/${data.template}/styles.css`;

        const link = document.createElement("link");

        link.rel = "stylesheet";
        link.href = src;

        document.head.appendChild(link);

        // Now let's fetch the html from the dist/ folder
        return fetch(`/templates/${data.template}/index.html`)
          .then((response) => response.text())
          .then((html) => {
            const container = document.getElementById(containerId);

            // Parse html so we can query the elements
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");

            const adHtml = doc.querySelector("#rga_ad-wrapper").innerHTML;

            if (container) {
              container.innerHTML = adHtml;
            } else {
              console.error("Container not found");
            }
          });
      } else {
        return console.log("No template was found");
      }
    })
    .catch((error) => {
      console.error("Error fetching adverts:", error);
    });
};
