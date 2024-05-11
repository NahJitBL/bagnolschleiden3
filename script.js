const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Cloud image
const cloudImage = new Image();
cloudImage.src = 'cloud.png'; // Replace 'cloud.png' with the path to your cloud image

// Cloud object
const cloud = {
  x: canvas.width / 2,
  y: -100, // Start above the canvas
  speed: 2,
  width: 200, // Adjust as needed
  height: 100 // Adjust as needed
};

// Raindrops
const raindrops = [];

// Create raindrops
function createRaindrop() {
  const x = cloud.x + Math.random() * cloud.width; // Randomize raindrop x position within cloud bounds
  const y = cloud.y + cloud.height; // Start raindrop below the cloud
  const speed = Math.random() * 4 + 2; // Randomize raindrop speed
  raindrops.push({ x, y, speed });
}

// Update function
function update() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw cloud
  ctx.drawImage(cloudImage, cloud.x, cloud.y, cloud.width, cloud.height);

  // Move cloud down
  cloud.y += cloud.speed;

  // Create raindrops
  if (Math.random() < 0.1) { // Adjust raindrop frequency as needed
    createRaindrop();
  }

  // Draw raindrops and move them
  raindrops.forEach(raindrop => {
    ctx.beginPath();
    ctx.moveTo(raindrop.x, raindrop.y);
    ctx.lineTo(raindrop.x, raindrop.y + 10); // Adjust raindrop length
    ctx.strokeStyle = '#0000FF'; // Blue color for raindrops
    ctx.stroke();
    raindrop.y += raindrop.speed;

    // Remove raindrop if it goes below the canvas
    if (raindrop.y > canvas.height) {
      const index = raindrops.indexOf(raindrop);
      if (index > -1) {
        raindrops.splice(index, 1);
      }
    }
  });

  // Request animation frame
  requestAnimationFrame(update);
}

// Start animation
update();