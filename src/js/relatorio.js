const radioButtons = document.querySelectorAll('input[type="radio"]');

// Variável para armazenar o botão selecionado atualmente
let selectedRadio = null;

// Adicionar um evento de clique a cada botão de rádio
radioButtons.forEach((radio) => {
    radio.addEventListener('click', (event) => {
        if (selectedRadio === event.target) {
            // Se o botão atual já está selecionado, desmarcá-lo
            event.target.checked = false;
            selectedRadio = null; // Resetar a seleção
        } else {
            // Caso contrário, atualizar a seleção
            selectedRadio = event.target;
        }
    });
});