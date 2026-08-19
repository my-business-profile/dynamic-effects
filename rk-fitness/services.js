/* ============================================================
   R.K. FITNESS AND SPORTS
   SERVICE DATA + SERVICE CARD GENERATOR
============================================================ */


const RK_SERVICES = [

    {
        name: "Adult Sports",
        description:
            "Active sporting experiences designed to keep adults moving, playing and engaged.",
        image: window.RK_ASSETS.services["Adult Sports"]
    },

    {
        name: "Aerobics",
        description:
            "Energetic rhythmic fitness sessions combining movement, endurance and cardio.",
        image: window.RK_ASSETS.services["Aerobics"]
    },

    {
        name: "Aquatics",
        description:
            "Water-based activity and aquatic recreation for an active lifestyle.",
        image: window.RK_ASSETS.services["Aquatics"]
    },

    {
        name: "CrossFit",
        description:
            "High-intensity functional training built around strength, conditioning and movement.",
        image: window.RK_ASSETS.services["CrossFit"]
    },

    {
        name: "Cycling",
        description:
            "Indoor cycling sessions focused on endurance, cardio and sustained effort.",
        image: window.RK_ASSETS.services["Cycling"]
    },

    {
        name: "HIIT Exercise Classes",
        description:
            "High-intensity interval workouts designed around powerful bursts of effort.",
        image: window.RK_ASSETS.services["HIIT Exercise Classes"]
    },

    {
        name: "Kickboxing",
        description:
            "Dynamic striking-based training combining technique, conditioning and movement.",
        image: window.RK_ASSETS.services["Kickboxing"]
    },

    {
        name: "Nutrition Consulting",
        description:
            "Nutrition-focused guidance supporting healthier routines and fitness goals.",
        image: window.RK_ASSETS.services["Nutrition Consulting"]
    },

    {
        name: "Pilates Classes",
        description:
            "Controlled movement, core work, flexibility and body conditioning.",
        image: window.RK_ASSETS.services["Pilates Classes"]
    },

    {
        name: "Spa Services",
        description:
            "A dedicated relaxation and recovery-oriented service offering.",
        image: window.RK_ASSETS.services["Spa Services"]
    },

    {
        name: "Weight Training",
        description:
            "Strength-focused training using resistance and weight-based exercises.",
        image: window.RK_ASSETS.services["Weight Training"]
    },

    {
        name: "Yoga Classes",
        description:
            "Movement, flexibility, balance and mindful physical practice.",
        image: window.RK_ASSETS.services["Yoga Classes"]
    },

    {
        name: "Youth Classes",
        description:
            "Youth-focused movement and activity sessions designed around active development.",
        image: window.RK_ASSETS.services["Youth Classes"]
    },

    {
        name: "Youth Sports",
        description:
            "Sporting activities that encourage movement, coordination and participation.",
        image: window.RK_ASSETS.services["Youth Sports"]
    },

    {
        name: "Zumba",
        description:
            "High-energy dance fitness combining music, movement and cardio.",
        image: window.RK_ASSETS.services["Zumba"]
    },

    {
        name: "Swimming",
        description:
            "Swimming-focused activity combining fitness, endurance and water movement.",
        image: window.RK_ASSETS.services["Swimming"]
    },

    {
        name: "Badminton",
        description:
            "Fast-paced racket sport built around agility, coordination and reaction.",
        image: window.RK_ASSETS.services["Badminton"]
    },

    {
        name: "Table Tennis",
        description:
            "Quick-reaction racket sport focused on precision, timing and coordination.",
        image: window.RK_ASSETS.services["Table Tennis"]
    },

    {
        name: "Archery",
        description:
            "Precision-based sport built around focus, control and accurate target shooting.",
        image: window.RK_ASSETS.services["Archery"]
    },

    {
        name: "Snooker",
        description:
            "Precision cue sport combining strategy, control and concentration.",
        image: window.RK_ASSETS.services["Snooker"]
    },

    {
        name: "Chess",
        description:
            "Strategic board play focused on planning, concentration and decision-making.",
        image: window.RK_ASSETS.services["Chess"]
    },

    {
        name: "Boxing",
        description:
            "Combat-sport training focused on movement, technique, conditioning and discipline.",
        image: window.RK_ASSETS.services["Boxing"]
    }

];


/* ============================================================
   FEATURED HOME SERVICES
============================================================ */

const FEATURED_NAMES = [
    "Weight Training",
    "CrossFit",
    "Swimming",
    "Badminton",
    "Boxing"
];


/* ============================================================
   ESCAPE HTML
============================================================ */

function rkEscapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* ============================================================
   CREATE HOME SERVICE CARD
============================================================ */

function createFeaturedCard(service, index) {

    const card = document.createElement("article");

    card.className = "service-card featured-service-card tilt-card";

    card.setAttribute("data-service", service.name);

    card.innerHTML = `

        <div class="service-card-image">

            <img
                src="${service.image}"
                alt="${rkEscapeHTML(service.name)}"
                loading="${index < 2 ? "eager" : "lazy"}"
                decoding="async"
            >

            <div class="service-image-shade"></div>

            <span class="service-index">
                ${String(index + 1).padStart(2, "0")}
            </span>

        </div>


        <div class="service-card-content">

            <span class="service-mini">
                R.K. FITNESS AND SPORTS
            </span>

            <h3>
                ${rkEscapeHTML(service.name)}
            </h3>

            <p>
                ${rkEscapeHTML(service.description)}
            </p>

            <span class="service-card-arrow">
                ↗
            </span>

        </div>

    `;

    return card;

}


/* ============================================================
   CREATE EXPLORE CARD
============================================================ */

function createExploreCard() {

    const card = document.createElement("a");

    card.href = "services.html";

    card.className =
        "service-card explore-service-card magnetic";

    card.innerHTML = `

        <div class="explore-orbit"></div>

        <span class="explore-small">
            22 SERVICES
        </span>

        <strong>
            EXPLORE
            <br>
            MORE
            <br>
            SERVICES
        </strong>

        <span class="explore-arrow">
            ↗
        </span>

    `;

    return card;

}


/* ============================================================
   RENDER HOME SERVICES
============================================================ */

function renderFeaturedServices() {

    const container =
        document.getElementById("featuredServices");

    if (!container) {
        return;
    }


    FEATURED_NAMES.forEach((name, index) => {

        const service =
            RK_SERVICES.find(item => item.name === name);

        if (!service) {
            return;
        }

        container.appendChild(
            createFeaturedCard(service, index)
        );

    });


    container.appendChild(
        createExploreCard()
    );

}


/* ============================================================
   CREATE COMPLETE SERVICE CARD
============================================================ */

function createServiceCard(service, index) {

    const article = document.createElement("article");

    article.className =
        "service-page-card tilt-card reveal";

    article.style.setProperty(
        "--card-delay",
        `${(index % 4) * 70}ms`
    );


    article.innerHTML = `

        <div class="service-page-number">
            ${String(index + 1).padStart(2, "0")}
        </div>


        <div class="service-page-image">

            <img
                src="${service.image}"
                alt="${rkEscapeHTML(service.name)}"
                loading="${index < 4 ? "eager" : "lazy"}"
                decoding="async"
            >

            <div class="service-page-image-overlay"></div>

        </div>


        <div class="service-page-content">

            <span>
                ${String(index + 1).padStart(2, "0")}
            </span>

            <h3>
                ${rkEscapeHTML(service.name)}
            </h3>

            <p>
                ${rkEscapeHTML(service.description)}
            </p>

            <div class="service-line"></div>

            <b>
                EXPLORE
                <i>↗</i>
            </b>

        </div>

    `;

    return article;

}


/* ============================================================
   RENDER ALL SERVICES
============================================================ */

function renderAllServices() {

    const grid =
        document.getElementById("servicesGrid");

    if (!grid) {
        return;
    }


    RK_SERVICES.forEach((service, index) => {

        grid.appendChild(
            createServiceCard(service, index)
        );

    });

}


/* ============================================================
   INITIALIZE
============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    renderFeaturedServices();

    renderAllServices();

});
