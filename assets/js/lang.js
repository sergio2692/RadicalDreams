document.addEventListener("DOMContentLoaded", function() {
    const checkboxes = document.querySelectorAll('.lang-toggle-checkbox');
    
    // Check if we are currently on a -ja.html page
    const isJapanese = window.location.pathname.endsWith('-ja.html');
    
    checkboxes.forEach(chk => {
        chk.checked = isJapanese;
        chk.addEventListener('change', function(e) {
            const setToJapanese = e.target.checked;
            
            // Get filename from URL
            let pathSegments = window.location.pathname.split('/');
            let currentFile = pathSegments[pathSegments.length - 1];
            
            if (currentFile === '') {
                currentFile = 'index.html';
            }
            
            if (setToJapanese) {
                if (!currentFile.endsWith('-ja.html')) {
                    const newFile = currentFile.replace('.html', '-ja.html');
                    window.location.href = newFile;
                }
            } else {
                if (currentFile.endsWith('-ja.html')) {
                    const newFile = currentFile.replace('-ja.html', '.html');
                    window.location.href = newFile;
                }
            }
        });
    });
});
