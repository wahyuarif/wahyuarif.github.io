document.addEventListener("DOMContentLoaded", function() {
    const toggleButton = document.querySelector('.toggle-menu');

    toggleButton.addEventListener('click', function() {
        document.querySelector('nav').classList.toggle('active');
    });

    function checkScreenWidth() {
        if (window.innerWidth > 768) {
            document.querySelector('nav').classList.remove('active');
        }
    }

    checkScreenWidth();
    window.addEventListener('resize', checkScreenWidth);
});
