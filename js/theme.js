document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    // Ensure we find the i element specifically inside themeToggle if it exists
    const icon = themeToggle ? themeToggle.querySelector('i') : null;
    
    // Check saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateIcon(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', (e) => {
            e.preventDefault();
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateIcon(newTheme);
        });
    }

    function updateIcon(theme) {
        if (!icon) return;
        if (theme === 'light') {
            icon.className = 'fas fa-moon';
        } else {
            icon.className = 'fas fa-sun';
        }
    }
});
