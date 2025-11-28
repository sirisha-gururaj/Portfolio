import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import './SimpleBackground.css';

export default function SimpleBackground() {
  const containerRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Create or reuse a portal container attached to document.body so the
    // background is outside any transformed ancestors and remains fixed
    // to the viewport. We set inline styles to guarantee it fills the
    // viewport and doesn't intercept pointer events. Do NOT remove this
    // portal on unmount so the background persists across route changes.
    if (!containerRef.current) {
      let portal = document.getElementById('simple-bg-portal');
      if (!portal) {
        portal = document.createElement('div');
        portal.id = 'simple-bg-portal';
        portal.style.cssText = 'position:fixed;inset:0;z-index:0;pointer-events:none;';
        document.body.appendChild(portal);
      }
      containerRef.current = portal;
      setMounted(true);
    }

    function initParticles() {
      // try to initialize particles once the library and DOM node are ready
      try {
        window.particlesJS('particles-js', {
          particles: {
            // fewer visible dots, emphasize the linking lines to create a mesh
            number: { value: 90, density: { enable: true, value_area: 1000 } },
            color: { value: '#ffffff' },
            shape: { type: 'circle' },
            // make particles subtle / nearly invisible so links form the main visual
            opacity: { value: 0.04, random: false },
            size: { value: 2, random: true },
            line_linked: { enable: true, distance: 200, color: '#dfe6f7', opacity: 0.18, width: 1.2 },
            move: { enable: true, speed: 0.7, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false }
          },
          interactivity: {
            detect_on: 'canvas',
            events: { onhover: { enable: false }, onclick: { enable: false }, resize: true }
          },
          retina_detect: true
        });
      } catch (e) {
        // silent fail if particles lib isn't available or init errors
      }
    }

    function ensureInit() {
      // Poll briefly until both the library and the target DOM node exist.
      let attempts = 0;
      const maxAttempts = 60; // ~6 seconds
      const timer = setInterval(() => {
        attempts += 1;
        if (window.particlesJS && document.getElementById('particles-js')) {
          clearInterval(timer);
          initParticles();
        } else if (attempts >= maxAttempts) {
          clearInterval(timer);
        }
      }, 100);
    }

    // Load particles.js if not already loaded
    const existing = document.getElementById('particles-js-script');
    if (!existing) {
      const script = document.createElement('script');
      script.id = 'particles-js-script';
      script.src = 'https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js';
      script.async = true;
      script.onload = () => ensureInit();
      document.body.appendChild(script);
    } else {
      // If library already present, ensure initialization (poll until DOM node ready)
      ensureInit();
      if (!window.particlesJS) existing.addEventListener('load', ensureInit);
    }

    return () => {
      // Do NOT remove the portal on unmount so the background stays
      // mounted across route/component changes. Only clean up particles.
      // attempt to destroy particles instances on unmount
      try {
        if (window.pJSDom && window.pJSDom.length) {
          window.pJSDom.forEach((p) => {
            if (p && p.pJS && p.pJS.fn && p.pJS.fn.vendors && p.pJS.fn.vendors.destroypJS) {
              p.pJS.fn.vendors.destroypJS();
            }
          });
          window.pJSDom = [];
        }
      } catch (e) {
        // ignore
      }
    };
  }, []);

  // Render the background into the portal attached to body so it's not affected
  // by transforms on ancestor elements (this preserves a true-parallax effect)
  if (typeof document === 'undefined') return null;
  if (!mounted || !containerRef.current) return null;
  return createPortal(
    <div id="particles-js" className="simple-bg" aria-hidden="true" />,
    containerRef.current
  );
}
