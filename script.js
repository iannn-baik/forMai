const targetDate = new Date(2026, 6, 9, 0, 0, 0).getTime(); 

const countdownInterval = setInterval(function() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
        clearInterval(countdownInterval);
        document.getElementById("days").innerText = "00";
        document.getElementById("hours").innerText = "00";
        document.getElementById("minutes").innerText = "00";
        document.getElementById("seconds").innerText = "00";
 
        document.getElementById("countdown-trigger").style.display = "block";
        return;
    }

    const d = Math.floor(difference / (1000 * 60 * 60 * 24));
    const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = d < 10 ? "0" + d : d;
    document.getElementById("hours").innerText = h < 10 ? "0" + h : h;
    document.getElementById("minutes").innerText = m < 10 ? "0" + m : m;
    document.getElementById("seconds").innerText = s < 10 ? "0" + s : s;

}, 1000);

const letterText = `happy level up dayyy make a wish another year down, and you're just getting better. i hope you stay healthy and keep crushing your goals. whatever you want out of life, i hope it finds its way to you.

shoutout to you for being so resilient. you’ve been through a lot, and theres still a whole journey ahead. yeahh, adulting brings more hurdles, but you’re surrounded by so much love. embrace the ups and downs and just enjoy the ride.

wishing you endless happiness from here on out. may all your manifestations come true. happy birthdayy thanks for holding it together even when it was tough. keep staying strong, vibrant, and happy`;

let isTypingStarted = false; 
let typingTimeout; 

function typeWriter(text, i) {
    const letterBox = document.getElementById("typing-letter");
    if (letterBox && i < text.length) {
        if (text.charAt(i) === '\n') {
            letterBox.innerHTML += '<br>';
        } else {
            letterBox.innerHTML += text.charAt(i);
        }
        
        letterBox.scrollTop = letterBox.scrollHeight;

        typingTimeout = setTimeout(function() {
            typeWriter(text, i + 1);
        }, 30); 
    }
}

function startExperience(nextStepId) {
    const music = document.getElementById('bg-music');
    if(music) {
        music.play().catch(error => console.log("Autoplay musik tertahan:", error));
    }
    nextStep(nextStepId);
}

function nextStep(nextStepId) {
    const allVideos = document.querySelectorAll('video');
    allVideos.forEach(video => { video.pause(); });

    const allCards = document.querySelectorAll('.video-card-custom');
    allCards.forEach(card => {
        card.classList.remove('playing');
        const btn = card.querySelector('.video-custom-play-btn');
        if(btn) btn.innerText = "▶";
    });

    const sections = document.querySelectorAll('.section');
    sections.forEach(section => { section.classList.remove('active'); });

    const nextSection = document.getElementById(nextStepId);
    if (nextSection) {
        nextSection.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (nextStepId === 'step-countdown') {
        const music = document.getElementById('bg-music');
        if (music) { music.pause(); music.currentTime = 0; }
    }

    if (nextStepId === 'step-gift') {
        const giftContainer = document.querySelector('.gift-container');
        if (giftContainer) { giftContainer.classList.remove('opened'); }
    }

    if (nextStepId !== 'step-letter') {
        clearTimeout(typingTimeout); 
        isTypingStarted = false;
        const letterBox = document.getElementById("typing-letter");
        if (letterBox) letterBox.innerHTML = ""; 
    }

    if (nextStepId === 'step-letter' && !isTypingStarted) {
        isTypingStarted = true;
        typeWriter(letterText, 0);
    }

    if (nextStepId === 'step-final') {
        const wishCards = document.querySelectorAll('.wish-card');
        wishCards.forEach(card => {
            card.style.transform = '';
            card.style.opacity = '';
            card.classList.remove('swiped');
        });
        initWishCards();
    }
}

function restart() { location.reload(); }

function createHeartFlake() {
    const flake = document.createElement("div");
    flake.classList.add("heart-flake"); 
    flake.style.left = Math.random() * 100 + "vw";
    

    const size = Math.random() * 8 + 8; 
    flake.style.width = size + "px";
    flake.style.height = size + "px";
    
    const duration = Math.random() * 4 + 3; 
    flake.style.animationDuration = duration + "s";
    
    flake.style.transform = `rotate(${Math.random() * 360}deg)`;
    
    document.body.appendChild(flake);
    
    setTimeout(() => {
        flake.remove();
    }, duration * 1000);
}
document.addEventListener("DOMContentLoaded", function() {
    setInterval(createHeartFlake, 400);
});
function openTheGift() {
    const giftContainer = document.querySelector('.gift-container');
    if (giftContainer.classList.contains('opened')) return;
    giftContainer.classList.add('opened');
    const rect = giftContainer.getBoundingClientRect();
    const startX = rect.left + rect.width / 2;
    const startY = rect.top + rect.height / 2;
    const emojis = ["🎈", "🎊", "🎉", "✨"];
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.classList.add('burst-particle');
        particle.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        particle.style.left = startX + 'px';
        particle.style.top = startY + 'px';
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 150 + 100;
        const destinationX = Math.cos(angle) * distance + 'px';
        const destinationY = Math.sin(angle) * distance + 'px';
        const randomRotate = Math.random() * 360 + 'deg';
        particle.style.setProperty('--x', destinationX);
        particle.style.setProperty('--y', destinationY);
        particle.style.setProperty('--r', randomRotate);
        document.body.appendChild(particle);
        setTimeout(() => { particle.remove(); }, 1500);
    }
    setTimeout(() => { nextStep('step-polaroid'); }, 1200);
}

function openLightbox(element) {
    const imgElement = element.querySelector('img');
    const lightbox = document.getElementById('custom-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    if (imgElement && lightbox && lightboxImg && lightboxCaption) {
        lightboxImg.src = imgElement.src; 
        lightboxCaption.innerText = imgElement.getAttribute('data-caption') || "Our beautiful memory"; 
        lightbox.style.display = 'flex';
        setTimeout(() => { lightbox.classList.add('show'); }, 10);
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('custom-lightbox');
    if (lightbox) {
        lightbox.classList.remove('show');
        setTimeout(() => { lightbox.style.display = 'none'; }, 400);
    }
}

function togglePlayVideo(containerElement) {
    const video = containerElement.querySelector('video');
    const playBtn = containerElement.querySelector('.video-custom-play-btn');
    if (video) {
        video.muted = true;
        if (video.paused) {
            video.play();
            containerElement.classList.add('playing');
            if (playBtn) playBtn.innerText = "⏸";
        } else {
            video.pause();
            containerElement.classList.remove('playing');
            if (playBtn) playBtn.innerText = "▶";
        }
        video.onended = function() {
            containerElement.classList.remove('playing');
            if (playBtn) playBtn.innerText = "▶";
        };
    }
}

function initWishCards() {
    const container = document.querySelector('.wish-stack-container');
    const cards = document.querySelectorAll('.wish-card');
    if (cards.length === 0 || !container) return;

    const topCard = container.lastElementChild;
    if (!topCard || topCard.classList.contains('swiping')) return;

    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    const newTopCard = topCard.cloneNode(true);
    topCard.parentNode.replaceChild(newTopCard, topCard);

    newTopCard.addEventListener('mousedown', startDrag);
    window.addEventListener('mousemove', dragMove);
    window.addEventListener('mouseup', endDrag);

    newTopCard.addEventListener('touchstart', startDrag, { passive: true });
    window.addEventListener('touchmove', dragMove, { passive: false });
    window.addEventListener('touchend', endDrag);

    function startDrag(e) {
        isDragging = true;
        startX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
        newTopCard.style.transition = 'none';
        newTopCard.classList.add('swiping');
    }

    function dragMove(e) {
        if (!isDragging) return;
        
        currentX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
        const diffX = currentX - startX;
        

        const rotate = diffX * 0.03;
        const scale = Math.max(1 - Math.abs(diffX) / 2000, 0.95);
        
        newTopCard.style.transform = `translateX(${diffX}px) rotate(${rotate}deg) scale(${scale})`;
    }

    function endDrag() {
        if (!isDragging) return;
        isDragging = false;
        
        const diffX = currentX - startX;
        
        newTopCard.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.5s ease';

        if (Math.abs(diffX) > 100) {
            const throwDirection = diffX > 0 ? 1 : -1;
            
            newTopCard.style.transform = `translateX(${throwDirection * 200}px) rotate(${throwDirection * 8}deg) scale(0.95)`;
            newTopCard.style.opacity = '0';
            newTopCard.style.zIndex = '0';

            setTimeout(() => {
                newTopCard.style.transition = 'none';
                newTopCard.style.transform = '';
                newTopCard.style.opacity = '';
                newTopCard.classList.remove('swiping');
                
                container.insertBefore(newTopCard, container.firstElementChild);
                initWishCards();
            }, 450);

        } else {
            newTopCard.style.transition = 'transform 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.2)';
            newTopCard.style.transform = '';
            newTopCard.classList.remove('swiping');
        }
    }
}