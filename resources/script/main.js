function isMobile() {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) return true
    if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) return true;
    if (window.screen.availWidth < 1024) return true;
    return false;
}

function moveNavigation() {
    var navigation = document.querySelector('nav.cd-main-nav-wrapper');
    var isDeviceMobile = isMobile();
    if (!isDeviceMobile) {
        document.querySelector('header.header-menu').insertBefore(navigation, null);
    } else {
        document.getElementById("main").insertBefore(navigation, document.querySelector('div.cd-main-content').nextElementSibling);
    }
}

/*
 * element: Element that will be the target of scroll
 * headerOffset: number of pixels that will offset window scroll
 */
function scrollSmoothToElement(element, headerOffset) {
    var headerOffset = 60;
    var elementPosition = element.getBoundingClientRect().top;
    var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
    });
}

function initNav() {
    moveNavigation();

    window.addEventListener("resize", function () {
        (!window.requestAnimationFrame) ? setTimeout(moveNavigation, 300) : window.requestAnimationFrame(moveNavigation);
    });

    document.querySelector("div.cd-logo").addEventListener("click", function (e) {
        e.preventDefault();
        let mainDiv = document.querySelector("div#main");
        mainDiv.scrollIntoView({ behavior: 'smooth' });
    });

    var myAnchors = document.querySelectorAll("a.menu-link");
    for (var i = 0; i < myAnchors.length; i++) {
        myAnchors[i].addEventListener("click",
            function (event) {
                event.preventDefault();
                scrollSmoothToElement(document.querySelector(this.getAttribute("href")));
            },
            false);
    }

    Array.prototype.forEach.call(document.getElementsByClassName("cd-nav-trigger"), (elem) => {
        elem.addEventListener("click", function (e) {
            e.preventDefault();
            Array.prototype.forEach.call(document.querySelectorAll("header.header-menu, .cd-main-content, footer, .cd-main-nav"), function  (elem,index, list) {
                elem.classList.toggle("nav-is-visible");
            });
        })
    });
}