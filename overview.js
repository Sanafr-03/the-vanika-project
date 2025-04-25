// Animate bamboo decorations
document.querySelectorAll('.floating-bamboo').forEach((el, index) => {
    // Randomize animation
    const duration = Math.random() * 10 + 10;
    const delay = Math.random() * 5;
    const size = Math.random() * 50 + 70;
    
    el.style.width = `${size}px`;
    el.style.height = `${size}px`;
    el.style.animationDuration = `${duration}s`;
    el.style.animationDelay = `${delay}s`;
  });
  
  // Add subtle parallax effect to feature cards
  const featuresContainer = document.querySelector('.features-container');
  
  featuresContainer.addEventListener('mousemove', (e) => {
    const { left, top, width, height } = featuresContainer.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    
    document.querySelectorAll('.feature-card').forEach((card, i) => {
      const offsetX = (x - 0.5) * 20;
      const offsetY = (y - 0.5) * 20;
      
      if(i % 2 === 0) {
        card.style.transform = `translate(-${offsetX}px, -${offsetY}px) rotateY(${offsetX/2}deg)`;
      } else {
        card.style.transform = `translate(${offsetX}px, -${offsetY}px) rotateY(-${offsetX/2}deg)`;
      }
    });
  });
  
  featuresContainer.addEventListener('mouseleave', () => {
    document.querySelectorAll('.feature-card').forEach(card => {
      card.style.transform = '';
    });
  });