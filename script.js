document.addEventListener('DOMContentLoaded', () => {
    const bookCards = document.querySelectorAll('.book-card'); // All book cards
    const bookContainer = document.querySelector('.book-container'); // Book container for scrolling
    const popup = document.getElementById('book-popup'); // Popup container
    const popupTitle = document.getElementById('popup-book-title'); // Popup title
    const popupRating = document.getElementById('popup-rating'); // Rating section in popup
    const closeBtn = document.querySelector('.close-btn'); // Close button for popup

    // Show popup on book card click
    bookCards.forEach(card => {
        card.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link navigation

            const title = card.getAttribute('data-title'); // Get book title from data attribute
            const submissionUrl = card.getAttribute('data-submission-url'); // Get submission URL

            // Set popup content
            popupTitle.textContent = title; // Set the title in the popup
            document.getElementById('submission-link').href = submissionUrl; // Set the submission link

            // Show popup
            popup.classList.add('visible');
        });
    });

    // Close popup
    closeBtn.addEventListener('click', () => {
        popup.classList.remove('visible'); // Hide popup
    });

    // Click logic for rating
    popupRating.addEventListener('click', (event) => {
        if (event.target.tagName === 'SPAN') {
            const value = parseInt(event.target.getAttribute('data-value'), 10); // Clicked star value

            // Highlight selected stars
            popupRating.querySelectorAll('span').forEach(star => {
                const starValue = parseInt(star.getAttribute('data-value'), 10);
                star.classList.toggle('selected', starValue <= value); // Highlight stars up to the selected one
            });

            console.log(`Rated ${value} stars.`);
        }
    });

    // Function to check which card is in the center for scaling
    const checkCenterCard = () => {
        const containerRect = bookContainer.getBoundingClientRect();
        const containerCenter = containerRect.left + containerRect.width / 2;

        bookCards.forEach(card => {
            const cardRect = card.getBoundingClientRect();
            const cardCenter = cardRect.left + cardRect.width / 2;

            // Check if the card is in the center
            if (Math.abs(cardCenter - containerCenter) < cardRect.width / 2) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
    };

    // Add scroll event listener to the container
    bookContainer.addEventListener('scroll', checkCenterCard);

    // Initial check on page load
    checkCenterCard();
});

