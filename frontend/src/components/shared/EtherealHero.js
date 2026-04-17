import { useEffect, useRef } from "react";

const EtherealHero = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    let disposed = false;
    let frameId = 0;
    let cleanup = () => {};

    const init = async () => {
      const THREE = await import("three");

      if (disposed || !mountRef.current) {
        return;
      }

      const container = mountRef.current;
      const supportCanvas = document.createElement("canvas");
      const hasWebGL = Boolean(supportCanvas.getContext("webgl2") || supportCanvas.getContext("webgl"));

      if (!hasWebGL) {
        const fallback = document.createElement("div");
        fallback.style.position = "absolute";
        fallback.style.inset = "0";
        fallback.style.background =
          "radial-gradient(circle at 68% 30%, rgba(59,130,246,0.26), transparent 0 34%), radial-gradient(circle at 22% 22%, rgba(96,165,250,0.12), transparent 0 26%), linear-gradient(180deg, rgba(2,8,22,1), rgba(2,8,22,0.84))";
        fallback.style.pointerEvents = "none";
        container.appendChild(fallback);

        cleanup = () => {
          if (fallback.parentNode === container) {
            container.removeChild(fallback);
          }
        };
        return;
      }

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x020816);
      scene.fog = new THREE.Fog(0x020816, 7, 16);
      const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
      camera.position.set(0, 0, 7.2);

      let renderer;
      try {
        renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        });
      } catch (error) {
        const fallback = document.createElement("div");
        fallback.style.position = "absolute";
        fallback.style.inset = "0";
        fallback.style.background =
          "radial-gradient(circle at 68% 30%, rgba(59,130,246,0.26), transparent 0 34%), radial-gradient(circle at 22% 22%, rgba(96,165,250,0.12), transparent 0 26%), linear-gradient(180deg, rgba(2,8,22,1), rgba(2,8,22,0.84))";
        fallback.style.pointerEvents = "none";
        container.appendChild(fallback);

        cleanup = () => {
          if (fallback.parentNode === container) {
            container.removeChild(fallback);
          }
        };
        return;
      }

      renderer.setClearColor(0x020816, 1);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(container.clientWidth, container.clientHeight, false);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      container.appendChild(renderer.domElement);

      const group = new THREE.Group();
      scene.add(group);

      const glowGeometry = new THREE.SphereGeometry(2.15, 48, 48);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0x2563eb,
        transparent: true,
        opacity: 0.18
      });
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      group.add(glow);

      const coreGeometry = new THREE.IcosahedronGeometry(1.2, 4);
      const coreMaterial = new THREE.MeshStandardMaterial({
        color: 0x1d4ed8,
        emissive: 0x0f4caa,
        emissiveIntensity: 0.9,
        roughness: 0.35,
        metalness: 0.12
      });
      const core = new THREE.Mesh(coreGeometry, coreMaterial);
      group.add(core);

      const shellGeometry = new THREE.TorusKnotGeometry(1.8, 0.18, 240, 24);
      const shellMaterial = new THREE.MeshStandardMaterial({
        color: 0x091b33,
        emissive: 0x0f4caa,
        emissiveIntensity: 0.36,
        roughness: 0.2,
        metalness: 0.4
      });
      const shell = new THREE.Mesh(shellGeometry, shellMaterial);
      shell.rotation.x = Math.PI * 0.28;
      shell.rotation.z = Math.PI * 0.18;
      group.add(shell);

      const ringGeometry = new THREE.TorusGeometry(2.8, 0.03, 12, 240);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: 0x3b82f6,
        transparent: true,
        opacity: 0.28
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = Math.PI / 2.4;
      group.add(ring);

      const particlesCount = 260;
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
        color: 0x77b8ff,
        size: 0.03,
        transparent: true,
        opacity: 0.92,
        depthWrite: false
      });
      const particles = new THREE.Points(particlesGeometry, particlesMaterial);
      group.add(particles);

      const ambient = new THREE.AmbientLight(0x6aa6ff, 1.8);
      scene.add(ambient);

      const keyLight = new THREE.DirectionalLight(0x8dc2ff, 3.6);
      keyLight.position.set(4, 5, 6);
      scene.add(keyLight);

      const fillLight = new THREE.PointLight(0x1457b6, 16, 24);
      fillLight.position.set(-4, -1, 5);
      scene.add(fillLight);

      const accentLight = new THREE.PointLight(0x1d4ed8, 12, 20);
      accentLight.position.set(0, 3, 2);
      scene.add(accentLight);

      group.scale.setScalar(1.12);
      group.position.x = 0.3;

      const pointer = { x: 0, y: 0 };
      const onPointerMove = (event) => {
        const rect = container.getBoundingClientRect();
        pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 0.65;
        pointer.y = ((event.clientY - rect.top) / rect.height - 0.5) * 0.35;
      };

      const onResize = () => {
        if (!mountRef.current) {
          return;
        }

        const width = mountRef.current.clientWidth;
        const height = mountRef.current.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);
      };

      const clock = new THREE.Clock();

      const animate = () => {
        const elapsed = clock.getElapsedTime();

        group.rotation.y = elapsed * 0.07 + pointer.x * 0.22;
        group.rotation.x = Math.sin(elapsed * 0.45) * 0.08 + pointer.y * 0.14;
        glow.scale.setScalar(1 + Math.sin(elapsed * 0.65) * 0.05);
        shell.rotation.z = Math.PI * 0.18 + Math.sin(elapsed * 0.2) * 0.08;
        particles.rotation.y = elapsed * 0.03;
        particles.rotation.x = elapsed * 0.01;

        renderer.render(scene, camera);
        frameId = window.requestAnimationFrame(animate);
      };

      container.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("resize", onResize);
      animate();

      cleanup = () => {
        container.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("resize", onResize);
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
        renderer.dispose();
        if (renderer.domElement.parentNode === container) {
          container.removeChild(renderer.domElement);
        }
      };
    };

    init();

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true" />;
};

export default EtherealHero;
