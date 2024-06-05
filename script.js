document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('modal');
    const openModalButton = document.getElementById('open-modal-button');
    const closeButton = document.querySelector('.close-button');

    openModalButton.addEventListener('click', function() {
        modal.style.display = 'block';
    });

    closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});

function changeTheme() {
    const themeSelector = document.getElementById("themeSelector");
    const selectedTheme = themeSelector.value;
    const themeLink = document.getElementById("theme");
    themeLink.href = selectedTheme;
}

function changePolice() {
    const themeSelector = document.getElementById("policeSelector");
    const selectedTheme = themeSelector.value;
    const themeLink = document.getElementById("police");
    themeLink.href = selectedTheme;
}