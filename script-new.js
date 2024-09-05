import { renderTemplateCard } from "./templates/template-card/template";

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
        let adHtml;
        let src = `https://cdn.reallygreatads.com/${data.template}.min.css`;

        // If we're in development node, then we can use the local template
        if (isDevMode) src = `/templates/${data.template}/styles.css`;

        const link = document.createElement("link");

        link.rel = "stylesheet";
        link.href = src;

        document.head.appendChild(link);

        // Load the html now
        const container = document.getElementById(containerId);

        console.log("data.template", data);

        switch (data.template) {
          case "template-card":
            adHtml = renderTemplateCard({
              adverts: data.adverts,
            });
            break;
        }

        if (container) {
          container.innerHTML = adHtml;
        } else {
          if (!adHtml) {
            console.error("Unable to find layout for this advert");
          } else {
            console.error("Container not found");
          }
        }
      } else {
        console.log("No template was found");
      }
    })
    .catch((error) => {
      console.error("Error fetching adverts:", error);
    });
};
