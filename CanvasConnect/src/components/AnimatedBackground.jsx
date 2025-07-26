// client/src/components/AnimatedBackground.jsx
// React component to render the Three.js background.

import React, { useEffect, useRef } from 'react';
import { initThreeScene, disposeThreeScene } from '../assets/three_background_scene';

const AnimatedBackground = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        // Initialize the Three.js scene when the component mounts
        if (containerRef.current) {
            initThreeScene(containerRef.current);
        }

        // Clean up the Three.js scene when the component unmounts
        return () => {
            disposeThreeScene();
        };
    }, []); // Empty dependency array ensures this runs once on mount/unmount

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-0 opacity-20" // Position fixed, behind content, subtle opacity
            style={{ pointerEvents: 'none' }} // Ensure it doesn't block mouse events
        >
            {/* Three.js canvas will be appended here */}
        </div>
    );
};

export default AnimatedBackground;