// ==========================================
// KONFETI ANIMASI
// ==========================================
function createConfetti() {
    const confettiContainer = document.getElementById('confettiContainer');
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7', '#a29bfe', '#fd79a8', '#fdcb6e'];
    
    // Buat 50 konfeti
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        
        // Random posisi horizontal
        confetti.style.left = Math.random() * 100 + '%';
        
        // Random warna
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        // Random delay
        confetti.style.animationDelay = Math.random() * 4 + 's';
        
        // Random durasi
        confetti.style.animationDuration = (Math.random() * 3 + 3) + 's';
        
        confettiContainer.appendChild(confetti);
    }
}

// ==========================================
// MODAL KEJUTAN
// ==========================================
function initModal() {
    const surpriseBtn = document.getElementById('surpriseBtn');
    const modal = document.getElementById('surpriseModal');
    const closeBtn = document.getElementById('closeBtn');
    
    // Buka modal ketika tombol diklik
    surpriseBtn.addEventListener('click', function() {
        modal.classList.add('active');
        createFireworks();
    });
    
    // Tutup modal ketika X diklik
    closeBtn.addEventListener('click', function() {
        modal.classList.remove('active');
    });
    
    // Tutup modal ketika area di luar modal diklik
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}

// ==========================================
// FIREWORKS EFFECT (untuk modal)
// ==========================================
function createFireworks() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7'];
    const modalContent = document.querySelector('.modal-content');
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.width = '10px';
            particle.style.height = '10px';
            particle.style.borderRadius = '50%';
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            particle.style.left = '50%';
            particle.style.top = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '9999';
            
            const angle = (Math.PI * 2 * i) / 30;
            const velocity = 5 + Math.random() * 5;
            
            document.body.appendChild(particle);
            
            let posX = 0;
            let posY = 0;
            let opacity = 1;
            
            const animation = setInterval(() => {
                posX += Math.cos(angle) * velocity;
                posY += Math.sin(angle) * velocity;
                opacity -= 0.02;
                
                particle.style.transform = `translate(${posX}px, ${posY}px)`;
                particle.style.opacity = opacity;
                
                if (opacity <= 0) {
                    clearInterval(animation);
                    particle.remove();
                }
            }, 16);
        }, i * 30);
    }
}

// ==========================================
// TIUP LILIN
// ==========================================
function initCandles() {
    const candles = document.querySelectorAll('.candle');
    let blownCount = 0;
    
    candles.forEach((candle, index) => {
        candle.addEventListener('click', function() {
            if (!this.classList.contains('blown')) {
                this.classList.add('blown');
                blownCount++;
                
                // Efek asap
                createSmoke(this);
                
                // Cek apakah semua lilin sudah ditiup
                if (blownCount === candles.length) {
                    setTimeout(() => {
                        showCelebration();
                    }, 500);
                }
            }
        });
    });
}

// ==========================================
// EFEK ASAP SAAT LILIN DITIUP
// ==========================================
function createSmoke(candleElement) {
    const smoke = document.createElement('div');
    smoke.textContent = '💨';
    smoke.style.position = 'absolute';
    smoke.style.fontSize = '2rem';
    smoke.style.left = '50%';
    smoke.style.transform = 'translateX(-50%)';
    smoke.style.animation = 'smoke-rise 1s ease-out forwards';
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes smoke-rise {
            0% {
                bottom: 80px;
                opacity: 1;
            }
            100% {
                bottom: 150px;
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    candleElement.style.position = 'relative';
    candleElement.appendChild(smoke);
    
    setTimeout(() => {
        smoke.remove();
        style.remove();
    }, 1000);
}

// ==========================================
// PERAYAAN SAAT SEMUA LILIN DITIUP
// ==========================================
function showCelebration() {
    const celebration = document.createElement('div');
    celebration.style.position = 'fixed';
    celebration.style.top = '50%';
    celebration.style.left = '50%';
    celebration.style.transform = 'translate(-50%, -50%)';
    celebration.style.fontSize = '5rem';
    celebration.style.zIndex = '1000';
    celebration.style.animation = 'celebrate 2s ease-out forwards';
    celebration.textContent = '🎊 Yeay! Semua lilin sudah ditiup! 🎊';
    celebration.style.textAlign = 'center';
    celebration.style.background = 'rgba(255, 255, 255, 0.95)';
    celebration.style.padding = '30px';
    celebration.style.borderRadius = '20px';
    celebration.style.boxShadow = '0 10px 40px rgba(0,0,0,0.3)';
    celebration.style.maxWidth = '90%';
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes celebrate {
            0% {
                transform: translate(-50%, -50%) scale(0);
                opacity: 0;
            }
            50% {
                transform: translate(-50%, -50%) scale(1.1);
                opacity: 1;
            }
            70% {
                transform: translate(-50%, -50%) scale(1);
            }
            100% {
                transform: translate(-50%, -50%) scale(1);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(celebration);
    
    // Konfeti meledak
    for (let i = 0; i < 100; i++) {
        createBurstConfetti();
    }
    
    setTimeout(() => {
        celebration.remove();
        style.remove();
    }, 2000);
}

// ==========================================
// KONFETI MELEDAK
// ==========================================
function createBurstConfetti() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7', '#a29bfe', '#fd79a8', '#fdcb6e'];
    const confetti = document.createElement('div');
    
    confetti.style.position = 'fixed';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = '50%';
    confetti.style.top = '50%';
    confetti.style.borderRadius = '50%';
    confetti.style.pointerEvents = 'none';
    confetti.style.zIndex = '999';
    
    document.body.appendChild(confetti);
    
    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 10 + 5;
    let posX = 0;
    let posY = 0;
    let velocityY = -Math.random() * 10;
    let opacity = 1;
    
    const animation = setInterval(() => {
        posX += Math.cos(angle) * velocity;
        posY += velocityY;
        velocityY += 0.5; // Gravitasi
        opacity -= 0.01;
        
        confetti.style.transform = `translate(${posX}px, ${posY}px) rotate(${posX * 2}deg)`;
        confetti.style.opacity = opacity;
        
        if (opacity <= 0 || posY > window.innerHeight) {
            clearInterval(animation);
            confetti.remove();
        }
    }, 16);
}

// ==========================================
// ANIMASI TEKS YANG MUNCUL SAAT SCROLL
// ==========================================
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    const wishItems = document.querySelectorAll('.wish-item');
    wishItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.6s ease';
        observer.observe(item);
    });
}

// ==========================================
// MUSIK LATAR (OPSIONAL - TIDAK AKTIF DEFAULT)
// ==========================================
function initBackgroundMusic() {
    // Fungsi ini bisa digunakan jika ingin menambahkan musik latar
    // Tidak aktif secara default karena tidak semua browser mengizinkan autoplay
    
    // Contoh penggunaan:
    // const audio = new Audio('happy-birthday.mp3');
    // audio.loop = true;
    // document.body.addEventListener('click', () => {
    //     audio.play();
    // }, { once: true });
}

// ==========================================
// EFEK HOVER PADA EMOJI
// ==========================================
function initEmojiEffects() {
    const emojis = document.querySelectorAll('.wish-icon, .emoji');
    
    emojis.forEach(emoji => {
        emoji.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.5) rotate(20deg)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        emoji.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// ==========================================
// RESET LILIN
// ==========================================
function initResetButton() {
    const candleInstruction = document.querySelector('.candle-instruction');
    
    // Tambahkan tombol reset setelah semua lilin ditiup
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('candle') && e.target.classList.contains('blown')) {
            const allBlown = Array.from(document.querySelectorAll('.candle')).every(c => c.classList.contains('blown'));
            
            if (allBlown && !document.getElementById('resetBtn')) {
                const resetBtn = document.createElement('button');
                resetBtn.id = 'resetBtn';
                resetBtn.textContent = '🔄 Nyalakan Lagi';
                resetBtn.style.cssText = `
                    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
                    color: white;
                    border: none;
                    padding: 12px 30px;
                    font-size: 1.1rem;
                    border-radius: 25px;
                    cursor: pointer;
                    margin-top: 20px;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                    transition: transform 0.3s ease;
                `;
                
                resetBtn.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-3px)';
                });
                
                resetBtn.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0)';
                });
                
                resetBtn.addEventListener('click', function() {
                    document.querySelectorAll('.candle').forEach(c => c.classList.remove('blown'));
                    this.remove();
                });
                
                candleInstruction.parentElement.appendChild(resetBtn);
            }
        }
    });
}

// ==========================================
// INISIALISASI SEMUA FUNGSI
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    // Jalankan semua fungsi
    createConfetti();
    initModal();
    initCandles();
    initScrollAnimations();
    initEmojiEffects();
    initResetButton();
    
    console.log('🎉 Website Ulang Tahun Lan sudah siap! 🎂');
});

// ==========================================
// EASTER EGG - Ketik "WISH" di keyboard
// ==========================================
let keySequence = '';
let wishTimeout;

document.addEventListener('keypress', function(e) {
    clearTimeout(wishTimeout);
    keySequence += e.key.toLowerCase();
    
    if (keySequence.includes('wish')) {
        const wishes = [
            'Semoga semua mimpimu tercapai! ✨',
            'Semoga selalu bahagia! 😊',
            'Semoga sehat selalu! 💪',
            'Semoga rezeki melimpah! 💰',
            'Semoga sukses selalu! 🌟'
        ];
        
        const randomWish = wishes[Math.floor(Math.random() * wishes.length)];
        
        const wishPopup = document.createElement('div');
        wishPopup.textContent = randomWish;
        wishPopup.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(102, 126, 234, 0.95);
            color: white;
            padding: 20px 40px;
            border-radius: 15px;
            font-size: 1.5rem;
            z-index: 10000;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            animation: wish-pop 2s ease-out forwards;
        `;
        
        const wishStyle = document.createElement('style');
        wishStyle.textContent = `
            @keyframes wish-pop {
                0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
                10% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
                90% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
                100% { transform: translate(-50%, -50%) scale(0.8); opacity: 0; }
            }
        `;
        document.head.appendChild(wishStyle);
        document.body.appendChild(wishPopup);
        
        setTimeout(() => {
            wishPopup.remove();
            wishStyle.remove();
        }, 2000);
        
        keySequence = '';
    }
    
    wishTimeout = setTimeout(() => {
        keySequence = '';
    }, 1000);
});