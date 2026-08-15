import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useScrollReveal = () => {
  const location = useLocation();

  useEffect(() => {
    // Select sections, cards, and grid items to animate on scroll
    const initScrollReveal = () => {
      const targets = document.querySelectorAll<HTMLElement>(
        'section, .card-editorial, article, [data-reveal], .grid > div, .grid > article, .grid > a'
      );

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              // Optionally unobserve once revealed so it stays visible
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -40px 0px',
        }
      );

      targets.forEach((el) => {
        if (!el.classList.contains('scroll-reveal-item')) {
          el.classList.add('scroll-reveal-item');
        }

        // Apply automatic staggered delay if child of a grid
        const parent = el.parentElement;
        if (parent && parent.classList.contains('grid')) {
          const siblings = Array.from(parent.children);
          const index = siblings.indexOf(el);
          if (index >= 0 && index < 6) {
            el.style.transitionDelay = `${index * 120}ms`;
          }
        }

        // If element is already in initial top viewport on page load, reveal immediately
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.85) {
          el.classList.add('is-visible');
        } else {
          observer.observe(el);
        }
      });
    };

    // Run on mount & route change with a tiny timeout to allow DOM rendering
    const timer = setTimeout(initScrollReveal, 100);

    return () => clearTimeout(timer);
  }, [location.pathname]);
};
