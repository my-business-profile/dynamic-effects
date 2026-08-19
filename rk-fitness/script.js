/* ============================================================
   R.K. FITNESS AND SPORTS
   INTERACTION ENGINE
============================================================ */


/* ============================================================
   PAGE LOADER
============================================================ */

(function initLoader() {

    const loader =
        document.getElementById("pageLoader");

    if (!loader) {
        return;
    }


    const minimumTime =
        650;

    const startTime =
        performance.now();


    function finishLoader() {

        const elapsed =
            performance.now() - startTime;

        const remaining =
            Math.max(
                0,
                minimumTime - elapsed
            );


        setTimeout(() => {

            loader.classList.add("is-done");

        }, remaining);

    }


    if (document.readyState === "complete") {

        finishLoader();

    } else {

        window.addEventListener(
            "load",
            finishLoader,
            { once: true }
        );

    }

})();


/* ============================================================
   YEAR
============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    const year =
        document.getElementById("year");

    if (year) {

        year.textContent =
            new Date().getFullYear();

    }

});


/* ============================================================
   MOBILE MENU
============================================================ */

(function initMobileMenu() {

    const button =
        document.getElementById("mobileMenuButton");

    const menu =
        document.getElementById("mobileMenu");

    if (!button || !menu) {
        return;
    }


    button.addEventListener("click", () => {

        const open =
            menu.classList.toggle("open");

        button.setAttribute(
            "aria-expanded",
            String(open)
        );

        document.body.classList.toggle(
            "menu-open",
            open
        );

    });


    menu.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            menu.classList.remove("open");

            button.setAttribute(
                "aria-expanded",
                "false"
            );

            document.body.classList.remove(
                "menu-open"
            );

        });

    });

})();


/* ============================================================
   SCROLL REVEALS
============================================================ */

(function initReveal() {

    const elements =
        document.querySelectorAll(".reveal");

    if (!elements.length) {
        return;
    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "is-visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: .12,
                rootMargin: "0px 0px -40px 0px"
            }
        );


    elements.forEach(element => {

        observer.observe(element);

    });

})();


/* ============================================================
   HORIZONTAL SERVICE CAROUSEL
============================================================ */

(function initServiceCarousel() {

    const carousel =
        document.getElementById(
            "featuredServices"
        );

    const left =
        document.getElementById(
            "serviceLeft"
        );

    const right =
        document.getElementById(
            "serviceRight"
        );


    if (!carousel) {
        return;
    }


    function amount() {

        const first =
            carousel.querySelector(
                ".service-card"
            );

        if (!first) {
            return 320;
        }

        return first.offsetWidth + 14;

    }


    left?.addEventListener(
        "click",
        () => {

            carousel.scrollBy({
                left: -amount(),
                behavior: "smooth"
            });

        }
    );


    right?.addEventListener(
        "click",
        () => {

            carousel.scrollBy({
                left: amount(),
                behavior: "smooth"
            });

        }
    );


    /* Drag support */

    let isDown = false;
    let startX = 0;
    let scrollStart = 0;


    carousel.addEventListener(
        "pointerdown",
        event => {

            isDown = true;

            startX =
                event.clientX;

            scrollStart =
                carousel.scrollLeft;

            carousel.classList.add(
                "is-dragging"
            );

            carousel.setPointerCapture(
                event.pointerId
            );

        }
    );


    carousel.addEventListener(
        "pointermove",
        event => {

            if (!isDown) {
                return;
            }

            const delta =
                event.clientX - startX;

            carousel.scrollLeft =
                scrollStart - delta;

        }
    );


    function stopDrag(event) {

        isDown = false;

        carousel.classList.remove(
            "is-dragging"
        );

        try {

            carousel.releasePointerCapture(
                event.pointerId
            );

        } catch (_) {}

    }


    carousel.addEventListener(
        "pointerup",
        stopDrag
    );

    carousel.addEventListener(
        "pointercancel",
        stopDrag
    );

})();


/* ============================================================
   3D TILT
============================================================ */

(function initTilt() {

    const canHover =
        window.matchMedia(
            "(hover: hover) and (pointer: fine)"
        ).matches;


    if (!canHover) {
        return;
    }


    document.addEventListener(
        "pointermove",
        event => {

            const card =
                event.target.closest(
                    ".tilt-card"
                );


            if (!card) {
                return;
            }


            const rect =
                card.getBoundingClientRect();


            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;


            const rotateY =
                ((x / rect.width) - .5) * 8;

            const rotateX =
                ((y / rect.height) - .5) * -8;


            card.style.transform =
                `perspective(900px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-5px)`;

        }
    );


    document.addEventListener(
        "pointerout",
        event => {

            const card =
                event.target.closest(
                    ".tilt-card"
                );


            if (!card) {
                return;
            }


            if (
                event.relatedTarget &&
                card.contains(
                    event.relatedTarget
                )
            ) {

                return;

            }


            card.style.transform =
                "";

        }
    );

})();


/* ============================================================
   MAGNETIC BUTTONS
============================================================ */

(function initMagnetic() {

    const canHover =
        window.matchMedia(
            "(hover: hover) and (pointer: fine)"
        ).matches;


    if (!canHover) {
        return;
    }


    document.querySelectorAll(
        ".magnetic"
    ).forEach(button => {

        button.addEventListener(
            "pointermove",
            event => {

                const rect =
                    button.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left -
                    rect.width / 2;


                const y =
                    event.clientY -
                    rect.top -
                    rect.height / 2;


                button.style.transform =
                    `translate(
                        ${x * .08}px,
                        ${y * .08}px
                    )`;

            }
        );


        button.addEventListener(
            "pointerleave",
            () => {

                button.style.transform =
                    "";

            }
        );

    });

})();


/* ============================================================
   CURSOR GLOW
============================================================ */

(function initCursorGlow() {

    const glow =
        document.getElementById(
            "cursorGlow"
        );


    if (!glow) {
        return;
    }


    const canHover =
        window.matchMedia(
            "(hover: hover) and (pointer: fine)"
        ).matches;


    if (!canHover) {
        return;
    }


    window.addEventListener(
        "pointermove",
        event => {

            glow.style.opacity =
                ".75";

            glow.style.left =
                `${event.clientX}px`;

            glow.style.top =
                `${event.clientY}px`;

        },
        { passive: true }
    );


    window.addEventListener(
        "pointerleave",
        () => {

            glow.style.opacity =
                "0";

        }
    );

})();


/* ============================================================
   RIPPLE EFFECT
============================================================ */

(function initRipple() {

    document.addEventListener(
        "pointerdown",
        event => {

            const button =
                event.target.closest(
                    ".primary-button, .secondary-button, .header-whatsapp"
                );


            if (!button) {
                return;
            }


            const rect =
                button.getBoundingClientRect();


            const ripple =
                document.createElement(
                    "span"
                );


            ripple.style.position =
                "absolute";

            ripple.style.pointerEvents =
                "none";

            ripple.style.borderRadius =
                "50%";

            ripple.style.width =
                "10px";

            ripple.style.height =
                "10px";

            ripple.style.left =
                `${event.clientX - rect.left - 5}px`;

            ripple.style.top =
                `${event.clientY - rect.top - 5}px`;

            ripple.style.background =
                "rgba(255,255,255,.35)";

            ripple.style.transform =
                "scale(0)";

            ripple.style.transition =
                "transform .55s ease, opacity .55s ease";

            button.style.position =
                "relative";

            button.style.overflow =
                "hidden";

            button.appendChild(
                ripple
            );


            requestAnimationFrame(() => {

                ripple.style.transform =
                    "scale(18)";

                ripple.style.opacity =
                    "0";

            });


            setTimeout(
                () => ripple.remove(),
                650
            );

        }
    );

})();


/* ============================================================
   PARTICLE ENGINE
   Lightweight Canvas — Mobile Optimized
============================================================ */

(function initParticles() {

    const canvas =
        document.getElementById(
            "particleCanvas"
        );


    if (!canvas) {
        return;
    }


    const ctx =
        canvas.getContext("2d", {
            alpha: true
        });


    if (!ctx) {
        return;
    }


    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (reducedMotion) {
        return;
    }


    let width = 0;
    let height = 0;

    let particles = [];


    function resize() {

        const dpr =
            Math.min(
                window.devicePixelRatio || 1,
                1.5
            );


        width =
            window.innerWidth;

        height =
            window.innerHeight;


        canvas.width =
            width * dpr;

        canvas.height =
            height * dpr;

        canvas.style.width =
            `${width}px`;

        canvas.style.height =
            `${height}px`;


        ctx.setTransform(
            dpr,
            0,
            0,
            dpr,
            0,
            0
        );

    }


    function particleCount() {

        if (width < 500) {
            return 22;
        }

        if (width < 900) {
            return 35;
        }

        return 58;

    }


    function createParticles() {

        particles =
            Array.from(
                {
                    length:
                        particleCount()
                },
                () => ({

                    x:
                        Math.random() * width,

                    y:
                        Math.random() * height,

                    size:
                        Math.random() * 1.7 + .35,

                    speed:
                        Math.random() * .25 + .08,

                    drift:
                        (Math.random() - .5) * .18,

                    alpha:
                        Math.random() * .45 + .1

                })
            );

    }


    function draw() {

        ctx.clearRect(
            0,
            0,
            width,
            height
        );


        particles.forEach(p => {

            p.y -= p.speed;

            p.x += p.drift;


            if (p.y < -10) {
                p.y = height + 10;
                p.x = Math.random() * width;
            }


            if (p.x < -10) {
                p.x = width + 10;
            }


            if (p.x > width + 10) {
                p.x = -10;
            }


            ctx.beginPath();

            ctx.arc(
                p.x,
                p.y,
                p.size,
                0,
                Math.PI * 2
            );


            ctx.fillStyle =
                `rgba(244,196,0,${p.alpha})`;

            ctx.fill();

        });


        requestAnimationFrame(draw);

    }


    resize();

    createParticles();

    draw();


    window.addEventListener(
        "resize",
        () => {

            resize();

            createParticles();

        },
        {
            passive: true
        }
    );

})();


/* ============================================================
   HERO PARALLAX
============================================================ */

(function initParallax() {

    const hero =
        document.querySelector(
            ".hero"
        );


    if (!hero) {
        return;
    }


    const photo =
        hero.querySelector(
            ".hero-photo"
        );


    if (!photo) {
        return;
    }


    let ticking = false;


    function update() {

        const scroll =
            window.scrollY;


        if (
            scroll <=
            window.innerHeight * 1.2
        ) {

            photo.style.transform =
                `scale(1.06)
                 translateY(${scroll * .08}px)`;

        }


        ticking = false;

    }


    window.addEventListener(
        "scroll",
        () => {

            if (!ticking) {

                requestAnimationFrame(
                    update
                );

                ticking = true;

            }

        },
        {
            passive: true
        }
    );

})();


/* ============================================================
   SERVICE IMAGE FALLBACK
============================================================ */

document.addEventListener(
    "error",
    event => {

        const image =
            event.target;


        if (
            image.tagName !==
            "IMG"
        ) {

            return;

        }


        if (
            image.dataset.fallbackApplied
        ) {

            return;

        }


        image.dataset.fallbackApplied =
            "true";


        image.src =
            "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80";

    },
    true
);


/* ============================================================
   PAGE TRANSITION FOR INTERNAL LINKS
============================================================ */

(function initPageTransitions() {

    document.addEventListener(
        "click",
        event => {

            const link =
                event.target.closest(
                    "a"
                );


            if (!link) {
                return;
            }


            const href =
                link.getAttribute(
                    "href"
                );


            if (!href) {
                return;
            }


            if (
                href.startsWith("#") ||
                href.startsWith("http") ||
                href.startsWith("tel:") ||
                href.startsWith("mailto:")
            ) {

                return;

            }


            if (
                href.includes(".html")
            ) {

                event.preventDefault();


                const loader =
                    document.getElementById(
                        "pageLoader"
                    );


                if (loader) {

                    loader.classList.remove(
                        "is-done"
                    );

                }


                setTimeout(
                    () => {

                        window.location.href =
                            href;

                    },
                    220
                );

            }

        }
    );

})();


/* ============================================================
   SAFETY: PREVENT IMAGE DRAG
============================================================ */

document.addEventListener(
    "dragstart",
    event => {

        if (
            event.target.tagName ===
            "IMG"
        ) {

            event.preventDefault();

        }

    }
);
