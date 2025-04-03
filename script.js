/* let user=prompt('What is your name')*/
const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');

        // Set canvas size
        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resize();
        window.addEventListener('resize', resize);

        // Mouse cursor class
        class Cursor {
            constructor() {
                this.x = window.innerWidth / 2;
                this.y = window.innerHeight / 2;
                this.ringX = this.x;
                this.ringY = this.y;
                this.size = 2;
                this.ringSize = 12;
                this.easing = 0.2;
            }

            draw() {
                // Draw outer ring with easing
                ctx.beginPath();
                ctx.arc(this.ringX, this.ringY, this.ringSize, 0, Math.PI * 2);
                ctx.strokeStyle = '#000';
                ctx.lineWidth = 1;
                ctx.stroke();

                // Draw inner dot exactly at cursor position
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = '#000';
                ctx.fill();
            }

            update(mouseX, mouseY) {
                // Update dot position immediately (like normal cursor)
                this.x = mouseX;
                this.y = mouseY;
                
                // Update ring position with smooth easing
                this.ringX += (mouseX - this.ringX) * this.easing;
                this.ringY += (mouseY - this.ringY) * this.easing;
            }
        }

        // Initialize cursor
        const cursor = new Cursor();

        // Mouse position
        window.addEventListener('mousemove', (event) => {
            cursor.update(event.x, event.y);
        });

        // Animation loop
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            cursor.draw();
            requestAnimationFrame(animate);
        }
        animate();
