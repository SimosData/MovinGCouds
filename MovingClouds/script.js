// Initialize Three.js scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#solarSystem'),
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);

// Create Sun
const sunGeometry = new THREE.SphereGeometry(5, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

// Create planets
function createPlanet(radius, color, distance) {
    const geometry = new THREE.SphereGeometry(radius, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: color });
    const planet = new THREE.Mesh(geometry, material);
    
    planet.position.x = distance;
    
    const planetOrbit = new THREE.Object3D();
    planetOrbit.add(planet);
    scene.add(planetOrbit);
    
    return { planet, orbit: planetOrbit };
}

// Create planets with their properties
const mercury = createPlanet(0.4, 0x808080, 10);
const venus = createPlanet(0.9, 0xffd700, 15);
const earth = createPlanet(1, 0x0000ff, 20);
const mars = createPlanet(0.5, 0xff0000, 25);
const jupiter = createPlanet(2.5, 0xffa500, 35);
const saturn = createPlanet(2, 0xffd700, 45);
const uranus = createPlanet(1.8, 0x00ffff, 55);
const neptune = createPlanet(1.7, 0x0000ff, 65);

// Position camera
camera.position.z = 50;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    // Rotate planets around the sun
    mercury.orbit.rotation.y += 0.02;
    venus.orbit.rotation.y += 0.015;
    earth.orbit.rotation.y += 0.01;
    mars.orbit.rotation.y += 0.008;
    jupiter.orbit.rotation.y += 0.005;
    saturn.orbit.rotation.y += 0.004;
    uranus.orbit.rotation.y += 0.003;
    neptune.orbit.rotation.y += 0.002;
    
    renderer.render(scene, camera);
}

// Handle window resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();

function createOrbitLine(radius) {
    const curve = new THREE.EllipseCurve(0, 0, radius, radius);
    const points = curve.getPoints(50);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: 0x666666 });
    const ellipse = new THREE.Line(geometry, material);
    ellipse.rotation.x = Math.PI / 2;
    scene.add(ellipse);
}

function addStars() {
    for(let i = 0; i < 1000; i++) {
        const geometry = new THREE.SphereGeometry(0.1, 24, 24);
        const material = new THREE.MeshBasicMaterial({color: 0xffffff});
        const star = new THREE.Mesh(geometry, material);
        
        const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(500));
        star.position.set(x, y, z);
        scene.add(star);
    }
}

// Add to your JavaScript
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
