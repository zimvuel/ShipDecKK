document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.main-card');
    
    const closeAllCardDetails = () => {
        cards.forEach(card => {
            card.querySelector('.card-details').classList.remove('active');
        });
    };

    cards.forEach(card => {
        card.addEventListener('click', (event) => {
            if (event.target.closest('a')){
                return;
            } 

            const details = card.querySelector('.card-details');
            const isCurrentlyActive = details.classList.contains('active');

            closeAllCardDetails();

            if (!isCurrentlyActive) {
                if (window.innerWidth <= 768) {
                    details.classList.add('active');
                } else {
                    const cardIndex = Array.from(cards).indexOf(card);
                    
                    for (let i = cardIndex; i < cardIndex + 3 && i < cards.length; i++) {
                        cards[i].querySelector('.card-details').classList.add('active');
                    }
                }
            }
        });
    });

    document.addEventListener('click', (event) => {
        if (!event.target.closest('.main-card')) {
            closeAllCardDetails();
        }
    });

    window.addEventListener('resize', closeAllCardDetails);
});