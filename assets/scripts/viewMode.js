const gridDisplay = document.querySelector('#grid-mode');
const normalDisplay = document.querySelector('#normal-mode');

gridDisplay.addEventListener('click', () => {
    body.classList.remove('normalDisplay');
    body.classList.add('gridDisplay');
});

normalDisplay.addEventListener('click', () => {
    body.classList.remove('gridDisplay');
    body.classList.add('normalDisplay');
})

