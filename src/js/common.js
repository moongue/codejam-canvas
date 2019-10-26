window.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.ham');
    const dropDownMenu = document.querySelector('.drop-down-menu');

    menuToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      dropDownMenu.classList.toggle('show');
    });
});