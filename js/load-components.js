document.addEventListener('DOMContentLoaded', function() {
    // لود هدر
    fetch('partials/header.html')
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('afterbegin', data);
            // لود اسکریپت منوها بعد از لود هدر
            loadMenuScript();
        });
    
    // لود فوتر
    fetch('partials/footer.html')
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('beforeend', data);
        });
        
    function loadMenuScript() {
        const script = document.createElement('script');
        script.src = 'js/script.js';
        document.body.appendChild(script);
    }
});