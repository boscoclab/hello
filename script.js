
const {
    gsap,
    gsap: { registerPlugin, set, to, timeline },
    MorphSVGPlugin,
    Draggable,
} = window;
registerPlugin(MorphSVGPlugin);

const AUDIO = {
    CLICK: new Audio("https://assets.codepen.io/605876/click.mp3"),
};

const ON = document.querySelector("#on");
const OFF = document.querySelector("#off");
// const LOGIN_FORM = document.querySelector(".login-form");
const FRAME = document.querySelector(".frame");

let startX;
let startY;

const PROXY = document.createElement("div");

const CORDS = gsap.utils.toArray(".cords path");
const CORD_DURATION = 0.1;
const HIT = document.querySelector(".lamp__hit");
const DUMMY_CORD = document.querySelector(".cord--dummy");
const ENDX = DUMMY_CORD.getAttribute("x2");
const ENDY = DUMMY_CORD.getAttribute("y2");
const RESET = () => {
    set(PROXY, {
        x: ENDX,
        y: ENDY,
    });
};
RESET();

const STATE = {
    ON: false,
};

gsap.set([".cords", HIT], {
    x: -10,
});

gsap.set(".lamp__eye", {
    rotate: 180,
    transformOrigin: "50% 50%",
    yPercent: 50,
});

const CORD_TL = timeline({
    paused: true,
    onStart: () => {
        STATE.ON = !STATE.ON;
        set(document.documentElement, { "--on": STATE.ON ? 1 : 0 });

        // random color
        const hue = gsap.utils.random(0, 359);

        set(document.documentElement, { "--shade-hue": hue });

        const glowColor0 = `hsl(${hue}, 30%, 45%)`;
        const glowColor1 = `hsl(${hue}, 30%, 42.5%)`;
        const glowColor2 = `hsl(${hue}, 30%, 40%)`;
        const glowColor3 = `hsl(${hue}, 30%, 37.5%)`;


        const glowColorDark = `hsl(${hue}, 30%, 35%)`;
        const glowColor4 = `hsl(${hue}, 10%, 30%)`;
        const glowColor5 = `hsl(${hue}, 10%, 25%)`;


        set(document.documentElement, {
            "--glow-color-0": glowColor0,
            "--glow-color-1": glowColor1,
            "--glow-color-2": glowColor2,
            "--glow-color-3": glowColor3,
            "--glow-color-4": glowColor4,
            "--glow-color-5": glowColor5,
        });
        set(document.documentElement, {
            "--glow-color-dark": glowColorDark,
        });

        set(".lamp__eye", {
            rotate: STATE.ON ? 0 : 180,
        });

        set([DUMMY_CORD, HIT], { display: "none" });
        set(CORDS[0], { display: "block" });
        AUDIO.CLICK.play();

        if (STATE.ON) {
            ON.setAttribute("checked", true);
            OFF.removeAttribute("checked");
            // From
            // LOGIN_FORM.classList.add("active");
            // Letter
            FRAME.classList.add("active");
        } else {
            ON.removeAttribute("checked");
            OFF.setAttribute("checked", true);
            // From
            // LOGIN_FORM.classList.remove("active");
            // Letter
            FRAME.classList.remove("active");
        }
    },
    onComplete: () => {
        set([DUMMY_CORD, HIT], { display: "block" });
        set(CORDS[0], { display: "none" });
        RESET();
    },
});

for (let i = 1; i < CORDS.length; i++) {
    CORD_TL.add(
        to(CORDS[0], {
            morphSVG: CORDS[i],
            duration: CORD_DURATION,
            repeat: 1,
            yoyo: true,
        })
    );
}

Draggable.create(PROXY, {
    trigger: HIT,
    type: "x,y",
    onPress: (e) => {
        startX = e.x;
        startY = e.y;
    },
    onDrag: function () {
        set(DUMMY_CORD, {
            attr: {
                x2: this.x,
                y2: Math.max(400, this.y),
            },
        });
    },
    onRelease: function (e) {
        const DISTX = Math.abs(e.x - startX);
        const DISTY = Math.abs(e.y - startY);
        const TRAVELLED = Math.sqrt(DISTX * DISTX + DISTY * DISTY);
        to(DUMMY_CORD, {
            attr: { x2: ENDX, y2: ENDY },
            duration: CORD_DURATION,
            onComplete: () => {
                if (TRAVELLED > 50) {
                    CORD_TL.restart();
                } else {
                    RESET();
                }
            },
        });
    },
});

gsap.set(".lamp", { display: "block" });






$(document)
    .ready(function () {
        $('.frame')
            .click(function () {
                $('.top')
                    .addClass('open');
                $('.message')
                    .addClass('pull');
            })
    });

// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function () {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}










