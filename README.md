# Really Great Ads Integration Guide

Welcome to the Really Great Ads integration guide. This documentation will help you seamlessly integrate Really Great Ads into your website.

## Getting Started

To display ads on your website, follow these steps:

Add the Ad Container: Include the following HTML where you want the ads to appear on your page.

```html
<div id="adverts-container"></div>
```

You can customize the container ID by changing `adverts-container` to any other ID of your choice. Make sure to use the same ID in the JavaScript code.

Include the Script: Add the following script to your page to initialize the ads.

```html
<script>
  (function () {
    const uniqueId = "274e687a-d809-43e3-b33e-acc2d78d03e1"; // Replace with your own placement ID
    const containerId = "adverts-container"; // Replace if you used a different ID in the HTML

    const script = document.createElement("script");
    script.src = "https://cdn-reallygreatads.sfo3.cdn.digitaloceanspaces.com/script.min.js";
    script.type = "text/javascript";
    script.onload = function () {
      window.initAdverts(uniqueId, containerId);
    };
    document.head.appendChild(script);
  })();
</script>
```

## Important Notes

- **Custom Container ID**: If you want to use a different container ID, ensure that you update the containerId variable in the script to match the ID used in the HTML.

- **Placement ID**: Replace the uniqueId with your own placement ID provided by Really Great Ads. This ID is essential for loading the correct advertisements.

By following these instructions, you will successfully integrate Really Great Ads into your website, ensuring a seamless display of ads for your users.

If you encounter any issues or have further questions, please contact our support team.
