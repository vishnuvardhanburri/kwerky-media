import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Ethereal = ({
  colorPalette = {
    primary: "#1d4ed8",
    secondary: "#2563eb",
    tertiary: "#38bdf8",
    accent: "#60a5fa",
    dark: "#020816",
  },
}) => {
  const mountRef = useRef(null);
  const sparkLayerRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    const sparkLayer = sparkLayerRef.current;
    if (!container) return undefined;

    let disposed = false;
    let frameId = 0;
    let cleanup = () => {};

    const supportCanvas = document.createElement("canvas");
    const hasWebGL = Boolean(supportCanvas.getContext("webgl2") || supportCanvas.getContext("webgl"));

    if (!hasWebGL) {
      const fallback = document.createElement("div");
      fallback.style.position = "absolute";
      fallback.style.inset = "0";
      fallback.style.background =
        "radial-gradient(circle at 68% 30%, rgba(59,130,246,0.24), transparent 0 34%), radial-gradient(circle at 22% 22%, rgba(96,165,250,0.12), transparent 0 26%), linear-gradient(180deg, rgba(2,8,22,1), rgba(2,8,22,0.84))";
      fallback.style.pointerEvents = "none";
      container.appendChild(fallback);

      cleanup = () => {
        if (fallback.parentNode === container) {
          container.removeChild(fallback);
        }
      };

      return () => cleanup();
    }

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(colorPalette.dark);
    scene.fog = new THREE.Fog(colorPalette.dark, 7, 16);
    const isSmallScreen = window.matchMedia("(max-width: 767px)").matches;
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 7.2);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch (error) {
      const fallback = document.createElement("div");
      fallback.style.position = "absolute";
      fallback.style.inset = "0";
      fallback.style.background =
        "radial-gradient(circle at 68% 30%, rgba(59,130,246,0.24), transparent 0 34%), radial-gradient(circle at 22% 22%, rgba(96,165,250,0.12), transparent 0 26%), linear-gradient(180deg, rgba(2,8,22,1), rgba(2,8,22,0.84))";
      fallback.style.pointerEvents = "none";
      container.appendChild(fallback);

      cleanup = () => {
        if (fallback.parentNode === container) {
          container.removeChild(fallback);
        }
      };

      return () => cleanup();
    }

    renderer.setClearColor(0x020816, 1);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isSmallScreen ? 1.5 : 2));
    renderer.setSize(container.clientWidth, container.clientHeight, false);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const glowGeometry = new THREE.SphereGeometry(isSmallScreen ? 1.95 : 2.15, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(colorPalette.secondary),
      transparent: true,
      opacity: 0.14,
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    group.add(glow);

    const coreGeometry = new THREE.IcosahedronGeometry(isSmallScreen ? 1.02 : 1.2, isSmallScreen ? 2 : 4);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(colorPalette.primary),
      emissive: new THREE.Color(colorPalette.secondary),
      emissiveIntensity: 0.55,
      roughness: 0.35,
      metalness: 0.16,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    group.add(core);

    const shellGeometry = new THREE.TorusKnotGeometry(isSmallScreen ? 1.55 : 1.8, 0.14, isSmallScreen ? 96 : 180, isSmallScreen ? 16 : 24);
    const shellMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#07172f"),
      emissive: new THREE.Color(colorPalette.tertiary),
      emissiveIntensity: 0.26,
      roughness: 0.2,
      metalness: 0.44,
    });
    const shell = new THREE.Mesh(shellGeometry, shellMaterial);
    shell.rotation.x = Math.PI * 0.28;
    shell.rotation.z = Math.PI * 0.18;
    group.add(shell);

    const ringGeometry = new THREE.TorusGeometry(isSmallScreen ? 2.45 : 2.8, 0.03, 10, isSmallScreen ? 120 : 240);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(colorPalette.accent),
      transparent: true,
      opacity: 0.24,
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2.4;
    group.add(ring);

    const particlesCount = isSmallScreen ? 120 : 240;
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i += 1) {
      const radius = 3.8 + Math.random() * 2.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      color: new THREE.Color("#7cc0ff"),
      size: 0.03,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    group.add(particles);

    const ambient = new THREE.AmbientLight(0x6aa6ff, 1.7);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0x8dc2ff, 3.2);
    keyLight.position.set(4, 5, 6);
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(0x1457b6, 14, 24);
    fillLight.position.set(-4, -1, 5);
    scene.add(fillLight);

    const accentLight = new THREE.PointLight(0x1d4ed8, 10, 20);
    accentLight.position.set(0, 3, 2);
    scene.add(accentLight);

    group.scale.setScalar(1.1);
    group.position.x = 0.18;

    const pointer = { x: 0, y: 0 };
    const scrollState = { progress: 0 };
    let lastSparkAt = 0;

    const onPointerMove = (event) => {
      const rect = container.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 0.45;
      pointer.y = ((event.clientY - rect.top) / rect.height - 0.5) * 0.3;

      if (isSmallScreen || isTouchDevice || !sparkLayer) return;
      const now = performance.now();
      if (now - lastSparkAt < 42) return;
      lastSparkAt = now;

      const spark = document.createElement("span");
      const size = 6 + Math.random() * 8;
      const left = event.clientX - rect.left;
      const top = event.clientY - rect.top;
      spark.className = "hero-spark";
      spark.style.position = "absolute";
      spark.style.left = `${left}px`;
      spark.style.top = `${top}px`;
      spark.style.width = `${size}px`;
      spark.style.height = `${size}px`;
      spark.style.borderRadius = "9999px";
      spark.style.pointerEvents = "none";
      spark.style.transformOrigin = "center center";
      spark.style.translate = "-50% -50%";
      spark.style.background = `radial-gradient(circle, rgba(191, 219, 254, 0.96) 0%, rgba(96, 165, 250, 0.92) 35%, rgba(59, 130, 246, 0.0) 72%)`;
      spark.style.boxShadow = "0 0 16px rgba(96,165,250,0.42), 0 0 32px rgba(59,130,246,0.18)";
      spark.style.filter = "blur(0.2px)";
      spark.style.zIndex = "1";
      sparkLayer.appendChild(spark);

      const driftX = (Math.random() - 0.5) * 64;
      const driftY = -(18 + Math.random() * 38);
      spark.animate(
        [
          { transform: "translate3d(0, 0, 0) scale(0.6)", opacity: 0 },
          { transform: "translate3d(0, 0, 0) scale(1)", opacity: 1, offset: 0.15 },
          { transform: `translate3d(${driftX}px, ${driftY}px, 0) scale(0.35)`, opacity: 0 }
        ],
        {
          duration: 900,
          easing: "cubic-bezier(0.23, 1, 0.32, 1)",
        }
      ).onfinish = () => {
        spark.remove();
      };
    };

    const onResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      composer.setSize(width, height);
    };

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloom = new UnrealBloomPass(
      new THREE.Vector2(container.clientWidth, container.clientHeight),
      isSmallScreen ? 0.42 : 0.58,
      0.34,
      0.9,
    );
    composer.addPass(bloom);

    const clock = new THREE.Clock();
    const animate = () => {
      if (disposed) return;

      frameId = window.requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      group.rotation.y = elapsed * 0.045 + pointer.x * 0.18 + scrollState.progress * 0.15;
      group.rotation.x = Math.sin(elapsed * 0.35) * 0.06 + pointer.y * 0.12;
      glow.scale.setScalar(1 + Math.sin(elapsed * 0.45) * 0.04);
      shell.rotation.z = Math.PI * 0.18 + Math.sin(elapsed * 0.16) * 0.06;
      particles.rotation.y = elapsed * 0.02;
      particles.rotation.x = elapsed * 0.008;

      composer.render();
    };

    container.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("resize", onResize);
    onResize();

    const scrollTrigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      onUpdate: (self) => {
        scrollState.progress = self.progress;
      },
    });

    animate();

    cleanup = () => {
      container.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      scrollTrigger.kill();
      window.cancelAnimationFrame(frameId);
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      glowGeometry.dispose();
      glowMaterial.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      shellGeometry.dispose();
      shellMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      composer.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };

    return () => cleanup();
  }, [colorPalette]);

  return (
    <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <div ref={sparkLayerRef} className="absolute inset-0 overflow-hidden" />
    </div>
  );
};

export default Ethereal;
