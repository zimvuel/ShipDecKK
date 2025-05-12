// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Modal functionality
    const modal = document.getElementById('ship-modal');
    const modalContent = document.getElementById('modal-ship-content');
    const closeModal = document.querySelector('.close-modal');
    const viewDetailsButtons = document.querySelectorAll('.view-details');
    
    // Ship details data
    const shipDetails = {
        'Azure Dream': {
            type: 'Luxury Yacht',
            image: '../assets/gallery/yacht1.webp',
            price: '$5,200,000',
            description: 'A stunning 80-foot luxury yacht with 4 cabins, perfect for ocean adventures with family and friends.',
            specs: {
                'Length': '80 feet',
                'Cabins': '4',
                'Max Speed': '25 knots',
                'Built': '2023',
                'Engine': 'Twin MTU 10V 2000',
                'Fuel Capacity': '2,800 gallons'
            }
        },
        'Royal Marina': {
            type: 'Luxury Yacht',
            image: '../assets/gallery/yacht2.webp',
            price: '$7,800,000',
            description: 'Elegant 100-foot yacht featuring 5 luxury suites, a jacuzzi, and state-of-the-art entertainment systems.',
            specs: {
                'Length': '100 feet',
                'Cabins': '5',
                'Max Speed': '22 knots',
                'Built': '2024',
                'Engine': 'Twin CAT C32',
                'Fuel Capacity': '3,500 gallons'
            }
        },
        'Ocean Serenity': {
            type: 'Luxury Yacht',
            image: '../assets/gallery/yacht3.webp',
            price: '$4,500,000',
            description: 'A sleek 75-foot yacht with modern interior design, 3 cabins and exceptional fuel efficiency.',
            specs: {
                'Length': '75 feet',
                'Cabins': '3',
                'Max Speed': '28 knots',
                'Built': '2023',
                'Engine': 'Twin Volvo Penta',
                'Fuel Capacity': '2,400 gallons'
            }
        },
        'Pacific Trader': {
            type: 'Cargo Vessel',
            image: '../assets/gallery/cargo1.webp',
            price: '$15,300,000',
            description: 'Reliable cargo vessel with 8,000 TEU capacity, designed for transatlantic shipping routes.',
            specs: {
                'Capacity': '8,000 TEU',
                'Length': '294 meters',
                'Max Speed': '22 knots',
                'Built': '2022',
                'Engine': 'MAN B&W',
                'Fuel Efficiency': 'High'
            }
        },
        'Global Freight': {
            type: 'Cargo Vessel',
            image: '../assets/gallery/cargo2.webp',
            price: '$22,100,000',
            description: 'Modern 10,500 TEU capacity cargo ship with eco-friendly propulsion systems and advanced navigation.',
            specs: {
                'Capacity': '10,500 TEU',
                'Length': '325 meters',
                'Max Speed': '24 knots',
                'Built': '2024',
                'Engine': 'WinGD X92',
                'Fuel Efficiency': 'Very High'
            }
        },
        'Ocean Carrier': {
            type: 'Cargo Vessel',
            image: '../assets/gallery/cargo3.webp',
            price: '$18,750,000',
            description: 'Versatile cargo vessel suitable for various types of goods, featuring 9,200 TEU capacity.',
            specs: {
                'Capacity': '9,200 TEU',
                'Length': '305 meters',
                'Max Speed': '23 knots',
                'Built': '2023',
                'Engine': 'MAN B&W',
                'Fuel Efficiency': 'High'
            }
        },
        'Majestic Seas': {
            type: 'Cruise Liner',
            image: '../assets/gallery/liner1.webp',
            price: '$120,000,000',
            description: 'Luxury cruise liner with capacity for 2,800 passengers, featuring swimming pools, theaters, and restaurants.',
            specs: {
                'Capacity': '2,800 passengers',
                'Length': '295 meters',
                'Max Speed': '22 knots',
                'Built': '2023',
                'Restaurants': '8',
                'Entertainment': '12 venues'
            }
        },
        'Ocean Paradise': {
            type: 'Cruise Liner',
            image: '../assets/gallery/liner2.webp',
            price: '$145,000,000',
            description: 'State-of-the-art cruise ship accommodating 3,200 guests with premium amenities and entertainment options.',
            specs: {
                'Capacity': '3,200 passengers',
                'Length': '320 meters',
                'Max Speed': '24 knots',
                'Built': '2024',
                'Restaurants': '10',
                'Entertainment': '15 venues'
            }
        },
        'Celestial Voyager': {
            type: 'Cruise Liner',
            image: '../assets/gallery/liner3.webp',
            price: '$135,500,000',
            description: 'Modern cruise liner for 3,000 passengers with innovative design features and eco-friendly technology.',
            specs: {
                'Capacity': '3,000 passengers',
                'Length': '310 meters',
                'Max Speed': '23 knots',
                'Built': '2024',
                'Restaurants': '9',
                'Entertainment': '14 venues'
            }
        }
    };
    
    // Open modal with ship details
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get ship name
            const shipInfo = this.closest('.gallery-info');
            const shipName = shipInfo.querySelector('h3').textContent;
            
            // Get ship details
            const ship = shipDetails[shipName];
            
            if (ship) {
                // Create table rows for specs
                let specRows = '';
                for (let spec in ship.specs) {
                    specRows += `<tr>
                        <td>${spec}</td>
                        <td>${ship.specs[spec]}</td>
                    </tr>`;
                }
                
                // Build HTML for modal
                const modalHTML = `
                    <div class="ship-details-container">
                        <div class="ship-image-side">
                            <div class="ship-image">
                                <img src="${ship.image}" alt="${shipName}">
                            </div>
                        </div>
                        <div class="ship-info-side">
                            <h2 class="ship-name">${shipName}</h2>
                            <p class="ship-price">${ship.price}</p>
                            <p class="ship-type"><strong>Type:</strong> ${ship.type}</p>
                            <p class="ship-desc">${ship.description}</p>
                            <h3 class="specs-title">Specifications</h3>
                            <table class="specs-table">
                                ${specRows}
                            </table>
                        </div>
                    </div>
                `;
                
                // Set modal content
                modalContent.innerHTML = modalHTML;
                
                // Show modal
                modal.style.display = 'block';
                
                // Disable scrolling on modal and body
                document.body.style.overflow = 'hidden';
                modal.style.overflow = 'hidden';
                modalContent.style.overflow = 'hidden';
            }
        });
    });
    
    // Close modal when clicking X
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});