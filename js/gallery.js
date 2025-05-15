document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.main-card');
    const cardContainer = document.querySelector('.card-container');
    
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

            if (Math.abs(rect.top - clickedRect.top) < 20) {
                rowCards.push(card);
            }
        });
        
        return rowCards;
    }
    
    function expandCardDetails(card) {
        const details = card.querySelector('.card-details');
        
        if (window.innerWidth <= 768) {
            details.classList.add('active');
        } else {
            const rowCards = getCardsInSameRow(card);
            rowCards.forEach(rowCard => {
                rowCard.querySelector('.card-details').classList.add('active');
            });
        }
    }
    
    function handleCardClick(event) {
        if (event.target.closest('a')) {
            return;
        } 
        const card = event.currentTarget;
        const details = card.querySelector('.card-details');
        const isCurrentlyActive = details.classList.contains('active');

        closeAllCardDetails();
        if (!isCurrentlyActive) {
            expandCardDetails(card);
        }
    }
    
    function handleOutsideClick(event) {
        if (!event.target.closest('.main-card')) {
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
});