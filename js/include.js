document.addEventListener('DOMContentLoaded', function() {
    const includePlaceholders = document.querySelectorAll('[data-include-path]');

    includePlaceholders.forEach(placeholder => {
        const filePath = placeholder.getAttribute('data-include-path');
        if (filePath) {
            fetch(filePath)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.text();
                })
                .then(data => {
                    placeholder.innerHTML = data;
                    // Optionally run scripts within the loaded content if needed
                    // Be cautious with this approach due to potential security risks
                    // placeholder.querySelectorAll('script').forEach(script => {
                    //     const newScript = document.createElement('script');
                    //     newScript.textContent = script.textContent;
                    //     // Handle script attributes like src if necessary
                    //     document.body.appendChild(newScript);
                    // });
                })
                .catch(error => {
                    console.error('Error fetching include file:', filePath, error);
                    placeholder.innerHTML = `<p style="color: red;">Error loading content from ${filePath}</p>`;
                });
        }
    });
}); 