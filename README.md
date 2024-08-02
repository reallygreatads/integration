# Really Great Ads

## Integration



```html
<!-- Include this where you want the ads to appear-->
<div id="adverts-container"></div>

<link rel="stylesheet" type="text/css" href="https://cdn.reallygreatads.com/hostedStyles.css">

<script>
    (function() {
        const uniqueId = '274e687a-d809-43e3-b33e-acc2d78d03e1'; // Set your placement ID here
        const containerId = 'adverts-container';

        const script = document.createElement('script');
        script.src = 'https://cdn.reallygreatads.com/script.min.js';
        script.type = 'text/javascript';
        script.onload = function() {
            window.initAdverts(uniqueId, containerId);
        };
        document.head.appendChild(script);
    })();
</script>
```