import { renderSimpleTemplate } from "./templates/simple-template/template";
import { renderTemplateCard } from "./templates/template-card/template";

function fetchAdverts(uniqueId, currentUrl) {
  // @TODO: Replace with the real api endpoint
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

function renderLoadingSpinner(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const style = document.createElement("style");

  style.textContent = `
    .rga_loading-spinner {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }

    .rga_loading-spinner .rga_spinner {
      width: 40px;
      height: 40px;
      border: 4px solid rgba(0, 123, 255, 0.3);
      border-top-color: #007bff;
      border-radius: 50%;
      animation: rga_spin 1s linear infinite;
    }

    .rga_loading-spinner p {
      margin-top: 1rem;
      font-size: 1rem;
      color: #333;
    }

    @keyframes rga_spin {
      to {
        transform: rotate(360deg);
      }
    }
  `;

  document.head.appendChild(style);

  container.innerHTML = `
    <div class="rga_loading-spinner">
      <div class="rga_spinner"></div>
      <p>Loading adverts...</p>
    </div>
  `;
}

function removeLoadingSpinner(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const spinner = container.querySelector(".loading-spinner");
  if (spinner) {
    container.removeChild(spinner);
  }
}

window.initAdverts = function (uniqueId, containerId, isDevMode = false) {
  const currentUrl = window.location.href;

  // Display loading indicator...
  renderLoadingSpinner(containerId);

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

        switch (data.template) {
          case "template-card":
            adHtml = renderTemplateCard({
              adverts: data.adverts,
            });
            break;

          case "simple-template":
            adHtml = renderSimpleTemplate({
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

      removeLoadingSpinner();
    })
    .catch((error) => {
      console.error("Error fetching adverts:", error);
    });
};
