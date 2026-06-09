document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Header
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // 3. Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 4. Menu Category Switching (Mock Data)
    const menuData = {
        appetizers: [
            { name: 'Truffle Infused Carpaccio', desc: 'Thinly sliced wagyu beef, parmesan shavings, micro-greens.', price: '$28' },
            { name: 'Scallops St. Jacques', desc: 'Pan-seared scallops, cauliflower purée, crispy pancetta.', price: '$32' },
            { name: 'Lobster Bisque', desc: 'Creamy lobster soup, cognac, chive oil.', price: '$24' },
            { name: 'Burrata & Heirloom', desc: 'Creamy burrata, heirloom tomatoes, basil oil, balsamic glaze.', price: '$22' }
        ],
        mains: [
            { name: 'Wild Mushroom Risotto', desc: 'Arborio rice, porcini, truffle oil, aged parmesan.', price: '$45' },
            { name: 'Roasted Lamb Rack', desc: 'Herb-crusted lamb, mint pea purée, fondant potatoes.', price: '$52' },
            { name: 'Wagyu Ribeye', desc: 'Grade A5 wagyu, red wine reduction, roasted asparagus.', price: '$85' },
            { name: 'Pan-Seared Sea Bass', desc: 'Sea bass fillet, lemon butter sauce, wilted spinach.', price: '$48' }
        ],
        desserts: [
            { name: 'Gold Leaf Fondant', desc: 'Dark chocolate fondant, 24k gold leaf, vanilla bean gelato.', price: '$20' },
            { name: 'Matcha Tiramisu', desc: 'Ceremonial grade matcha, mascarpone, ladyfingers.', price: '$18' },
            { name: 'Deconstructed Lemon Tart', desc: 'Lemon curd, sable crumble, toasted meringue.', price: '$16' },
            { name: 'Artisan Cheese Plate', desc: 'Selection of fine cheeses, honey, candied walnuts.', price: '$26' }
        ]
    };

    const tabBtns = document.querySelectorAll('.tab-btn');
    const menuGrid = document.querySelector('.menu-grid');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update menu items
            const category = btn.getAttribute('data-id');
            const items = menuData[category];
            
            // Simple fade out effect
            menuGrid.style.opacity = '0';
            
            setTimeout(() => {
                menuGrid.innerHTML = items.map(item => `
                    <div class="menu-item">
                        <div class="menu-item-info">
                            <h3>${item.name}</h3>
                            <p>${item.desc}</p>
                        </div>
                        <span class="price">${item.price}</span>
                    </div>
                `).join('');
                menuGrid.style.opacity = '1';
            }, 300);
        });
    });

    // 5. Reservation Form Handling
    const reservationForm = document.getElementById('reservation-form');
    if (reservationForm) {
        reservationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = reservationForm.querySelector('button');
            const originalText = btn.textContent;
            
            btn.textContent = 'Processing...';
            btn.disabled = true;

            setTimeout(() => {
                alert('Thank you! Your reservation request has been received. We will contact you shortly.');
                reservationForm.reset();
                btn.textContent = originalText;
                btn.disabled = false;
            }, 1500);
        });
    }
});
