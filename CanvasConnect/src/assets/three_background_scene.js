// client/src/assets/three_background_scene.js
// Logic for a Three.js background animation.

import * as THREE from 'three';

let scene, camera, renderer, cube, sphere, animateId;

export const initThreeScene = (container) => {
    if (!container) {
        console.error("Three.js container not found.");
        return;
    }

    // Scene
    scene = new THREE.Scene();
    // Use a subtle background color that blends with Tailwind's primary-dark
    scene.background = new THREE.Color(0x212F3D); // Matches primary.dark

    // Camera
    camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // alpha: true for transparent background
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Geometry: Create a simple cube and sphere for animation
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const sphereGeometry = new THREE.SphereGeometry(0.7, 32, 32);

    // Materials: Use basic materials for simplicity
    const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x3498DB, wireframe: true }); // Accent blue, wireframe
    const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xE67E22, wireframe: true }); // Secondary orange, wireframe

    cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

    // Position them slightly apart
    cube.position.x = -1.5;
    sphere.position.x = 1.5;

    scene.add(cube);
    scene.add(sphere);

    // Lights (optional for BasicMaterial, but good practice for future)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Handle window resize
    const handleResize = () => {
        if (container && camera && renderer) {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        }
    };
    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
        animateId = requestAnimationFrame(animate);

        if (cube) {
            cube.rotation.x += 0.005;
            cube.rotation.y += 0.005;
        }
        if (sphere) {
            sphere.rotation.x += 0.003;
            sphere.rotation.y += 0.003;
        }

        renderer.render(scene, camera);
    };

    animate(); // Start the animation
};

export const disposeThreeScene = () => {
    if (animateId) {
        cancelAnimationFrame(animateId);
    }
    if (renderer) {
        renderer.dispose();
        renderer.domElement.remove();
    }
    if (scene) {
        scene.traverse((object) => {
            if (object.isMesh) {
                if (object.geometry) object.geometry.dispose();
                if (object.material) {
                    // Dispose of textures if any
                    for (const key of Object.keys(object.material)) {
                        const value = object.material[key];
                        if (value && typeof value.dispose === 'function') {
                            value.dispose();
                        }
                    }
                    object.material.dispose();
                }
            }
        });
        scene.clear();
    }
    // Reset variables
    scene = null;
    camera = null;
    renderer = null;
    cube = null;
    sphere = null;
    animateId = null;
    window.removeEventListener('resize', () => {}); // Remove anonymous listener (best practice is to use named function)
};