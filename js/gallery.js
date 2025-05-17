const cards = document.querySelectorAll('.main-card');

function closeAllCardDetails() {
    cards.forEach(card => {
        card.querySelector('.card-details').classList.remove('active');
    });
}

function getCardsInSameRow(clickedCard) {
    const clickedRect = clickedCard.getBoundingClientRect();
    const rowCards = [];

    cards.forEach(card => {
        const rect = card.getBoundingClientRect();

        if(rect.top >= clickedRect.top && rect.top <= clickedRect.bottom){
            rowCards.push(card);
        }
    });
    return rowCards;
}

function expandCardDetails(card) {
    const rowCards = getCardsInSameRow(card);

    rowCards.forEach(rowCard => {
        rowCard.querySelector('.card-details').classList.add('active');
    });
}

function handleCardClick(event) {
    const card = event.currentTarget;
    const details = card.querySelector('.card-details');
    const isCurrentlyActive = details.classList.contains('active');

    closeAllCardDetails();
    if(!isCurrentlyActive){
        expandCardDetails(card);
    }
}

function handleOutsideClick(event) {
    if(!event.target.closest('.main-card')){
        closeAllCardDetails();
    }
}

function setupEventListeners() {
    cards.forEach(card => {
        card.addEventListener('click', handleCardClick);
    });
    document.addEventListener('click', handleOutsideClick);
    window.addEventListener('resize', closeAllCardDetails);
}
setupEventListeners();