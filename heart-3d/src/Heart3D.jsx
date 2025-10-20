import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const Heart3D = () => {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a1a);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = isMobile ? 5 : 4;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    const heartFunction = (u, v, scale = 1) => {
      const x = scale * (Math.pow(Math.sin(u), 3));
      const y = scale * (0.8 * Math.cos(u) - 0.3 * Math.cos(2 * u) - 0.1 * Math.cos(3 * u) - 0.05 * Math.cos(4 * u));
      const z = scale * v * Math.sin(u);
      return new THREE.Vector3(x, y, z);
    };

    const particleCount = isMobile ? 8000 : 12000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const u = Math.random() * Math.PI * 2;
      const v = (Math.random() - 0.5) * 0.5;
      const radius = Math.pow(Math.random(), 0.5);
      const point = heartFunction(u, v, radius);
      
      positions[i * 3] = point.x;
      positions[i * 3 + 1] = point.y;
      positions[i * 3 + 2] = point.z;

      const intensity = 0.7 + Math.random() * 0.3;
      const depthFactor = (point.z + 0.3) / 0.6;
      colors[i * 3] = intensity;
      colors[i * 3 + 1] = 0.2 * intensity + depthFactor * 0.1;
      colors[i * 3 + 2] = 0.4 * intensity + depthFactor * 0.1;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: isMobile ? 0.03 : 0.025,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const heartParticles = new THREE.Points(geometry, material);
    scene.add(heartParticles);

    const fallingCount = isMobile ? 100 : 200;
    const fallingPositions = new Float32Array(fallingCount * 3);
    const fallingVelocities = [];
    const fallingColors = new Float32Array(fallingCount * 3);

    for (let i = 0; i < fallingCount; i++) {
      fallingPositions[i * 3] = (Math.random() - 0.5) * 4;
      fallingPositions[i * 3 + 1] = 2 + Math.random() * 2;
      fallingPositions[i * 3 + 2] = (Math.random() - 0.5) * 3;
      
      fallingVelocities.push({
        y: -0.01 - Math.random() * 0.02,
        x: (Math.random() - 0.5) * 0.003,
        rotation: Math.random() * 0.1,
        resetY: 3 + Math.random() * 2
      });

      const c = 0.7 + Math.random() * 0.3;
      fallingColors[i * 3] = c;
      fallingColors[i * 3 + 1] = c * 0.3;
      fallingColors[i * 3 + 2] = c * 0.5;
    }

    const fallingGeometry = new THREE.BufferGeometry();
    fallingGeometry.setAttribute('position', new THREE.BufferAttribute(fallingPositions, 3));
    fallingGeometry.setAttribute('color', new THREE.BufferAttribute(fallingColors, 3));

    const fallingMaterial = new THREE.PointsMaterial({
      size: isMobile ? 0.04 : 0.03,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    const fallingParticles = new THREE.Points(fallingGeometry, fallingMaterial);
    scene.add(fallingParticles);

    const galaxyCount = isMobile ? 2000 : 3000;
    const galaxyPositions = new Float32Array(galaxyCount * 3);
    const galaxyColors = new Float32Array(galaxyCount * 3);
    const galaxyAngles = [];
    const galaxyRadii = [];

    const wishes = [
      "Luôn xinh đẹp 💕",
      "Hạnh phúc mỗi ngày ✨",
      "Tràn đầy năng lượng 🌟",
      "Được yêu thương 💖",
      "Thành công rực rỡ 🌺",
      "Luôn tự tin 🌷",
      "Mãi trẻ trung 🌸",
      "Gặp nhiều may mắn 🍀"
    ];

    const textSprites = [];
    wishes.forEach((wish, index) => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = isMobile ? 384 : 512;
      canvas.height = isMobile ? 96 : 128;
      
      context.fillStyle = 'rgba(255, 105, 180, 0.9)';
      context.font = isMobile ? 'bold 32px Arial' : 'bold 48px Arial';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      
      context.shadowColor = 'rgba(255, 105, 180, 1)';
      context.shadowBlur = 20;
      context.fillText(wish, canvas.width / 2, canvas.height / 2);
      
      const texture = new THREE.CanvasTexture(canvas);
      const spriteMaterial = new THREE.SpriteMaterial({ 
        map: texture,
        transparent: true,
        opacity: 0.8
      });
      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.scale.set(isMobile ? 1.2 : 1.5, isMobile ? 0.3 : 0.4, 1);
      
      const angle = (index / wishes.length) * Math.PI * 2;
      const radius = isMobile ? 2.5 : 2.8;
      sprite.position.set(
        Math.cos(angle) * radius,
        -1.2,
        Math.sin(angle) * radius
      );
      
      sprite.userData = { 
        angle: angle, 
        radius: radius,
        baseOpacity: 0.8
      };
      
      scene.add(sprite);
      textSprites.push(sprite);
    });

    for (let i = 0; i < galaxyCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 2.5;
      const spiralAngle = radius * 2;
      
      galaxyAngles.push(angle + spiralAngle);
      galaxyRadii.push(radius);

      const x = Math.cos(angle + spiralAngle) * radius;
      const z = Math.sin(angle + spiralAngle) * radius;
      const y = -1.2 + (Math.random() - 0.5) * 0.3 - radius * 0.1;

      galaxyPositions[i * 3] = x;
      galaxyPositions[i * 3 + 1] = y;
      galaxyPositions[i * 3 + 2] = z;

      const colorIntensity = 1 - (radius / 2.5) * 0.5;
      const colorVariation = Math.random();
      
      if (colorVariation < 0.3) {
        galaxyColors[i * 3] = colorIntensity;
        galaxyColors[i * 3 + 1] = colorIntensity * 0.3;
        galaxyColors[i * 3 + 2] = colorIntensity * 0.8;
      } else if (colorVariation < 0.6) {
        galaxyColors[i * 3] = colorIntensity * 0.6;
        galaxyColors[i * 3 + 1] = colorIntensity * 0.4;
        galaxyColors[i * 3 + 2] = colorIntensity;
      } else {
        galaxyColors[i * 3] = colorIntensity * 0.9;
        galaxyColors[i * 3 + 1] = colorIntensity * 0.9;
        galaxyColors[i * 3 + 2] = colorIntensity;
      }
    }

    const galaxyGeometry = new THREE.BufferGeometry();
    galaxyGeometry.setAttribute('position', new THREE.BufferAttribute(galaxyPositions, 3));
    galaxyGeometry.setAttribute('color', new THREE.BufferAttribute(galaxyColors, 3));

    const galaxyMaterial = new THREE.PointsMaterial({
      size: isMobile ? 0.025 : 0.02,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const galaxyParticles = new THREE.Points(galaxyGeometry, galaxyMaterial);
    scene.add(galaxyParticles);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xff1493, 0.8, 100);
    pointLight1.position.set(2, 2, 2);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xff69b4, 0.6, 100);
    pointLight2.position.set(-2, -1, 2);
    scene.add(pointLight2);

    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;

      heartParticles.rotation.y = time * 0.5;
      heartParticles.rotation.x = Math.sin(time * 0.3) * 0.1;
      heartParticles.rotation.z = Math.cos(time * 0.2) * 0.05;

      const pulse = 1 + Math.sin(time * 2) * 0.06;
      heartParticles.scale.set(pulse, pulse, pulse);

      const positions = fallingParticles.geometry.attributes.position.array;
      for (let i = 0; i < fallingCount; i++) {
        positions[i * 3] += fallingVelocities[i].x;
        positions[i * 3 + 1] += fallingVelocities[i].y;
        positions[i * 3] += Math.sin(time + i) * 0.001;
        
        if (positions[i * 3 + 1] < -2) {
          positions[i * 3 + 1] = fallingVelocities[i].resetY;
          positions[i * 3] = (Math.random() - 0.5) * 4;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 3;
        }
      }
      fallingParticles.geometry.attributes.position.needsUpdate = true;

      pointLight1.position.x = Math.cos(time * 0.5) * 2;
      pointLight1.position.z = Math.sin(time * 0.5) * 2;

      galaxyParticles.rotation.y = time * 0.3;
      
      textSprites.forEach((sprite, index) => {
        sprite.userData.angle += 0.005;
        const x = Math.cos(sprite.userData.angle) * sprite.userData.radius;
        const z = Math.sin(sprite.userData.angle) * sprite.userData.radius;
        sprite.position.x = x;
        sprite.position.z = z;
        
        const fadeEffect = Math.sin(time * 2 + index * 0.5) * 0.3 + 0.7;
        sprite.material.opacity = fadeEffect;
      });
      
      const galaxyPos = galaxyParticles.geometry.attributes.position.array;
      for (let i = 0; i < galaxyCount; i++) {
        galaxyAngles[i] += 0.001 + (galaxyRadii[i] / 2.5) * 0.002;
        
        const x = Math.cos(galaxyAngles[i]) * galaxyRadii[i];
        const z = Math.sin(galaxyAngles[i]) * galaxyRadii[i];
        
        galaxyPos[i * 3] = x;
        galaxyPos[i * 3 + 2] = z;
      }
      galaxyParticles.geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const newIsMobile = window.innerWidth < 768;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.position.z = newIsMobile ? 5 : 4;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('resize', checkMobile);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      fallingGeometry.dispose();
      fallingMaterial.dispose();
      galaxyGeometry.dispose();
      galaxyMaterial.dispose();
      textSprites.forEach(sprite => {
        sprite.material.map.dispose();
        sprite.material.dispose();
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Canvas 3D */}
      <div ref={containerRef} className="w-full h-full" />
      
      {/* Hiệu ứng vòng sáng xung quanh - Responsive */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-96 md:h-96 rounded-full bg-pink-500 opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-56 h-56 md:w-80 md:h-80 rounded-full bg-rose-500 opacity-30 blur-2xl animate-ping" style={{ animationDuration: '3s' }}></div>
      </div>

      {/* Hoa rơi HTML overlay - Ít hơn trên mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(window.innerWidth < 768 ? 20 : 40)].map((_, i) => (
          <div
            key={i}
            className="absolute text-lg md:text-2xl opacity-70"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-${Math.random() * 20}%`,
              animation: `fall ${5 + Math.random() * 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          >
            {['🌸', '🌺', '🌷', '🌹', '💐', '🎀', '💕', '✨', '🦆', '🪼', '🪸', '🦐', '🐡', '🐚', '🦀', '🐠', '🙊', '🙉', '🙈', '🤷', '🙋'][Math.floor(Math.random() * 21)]}
          </div>
        ))}
      </div>

    

      {/* Thêm CSS animation */}
      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Heart3D;