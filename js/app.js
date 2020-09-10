let controller;
let slideScene;
let pageScene;

function animateSlides() {
    // Init Controller
    controller = new ScrollMagic.Controller();
    // Select things 
    const sliders = document.querySelectorAll('.slide');
    const nav = document.querySelector('.nav-header');

    // Loop over slides
    sliders.forEach((slide, index, slides) => {
        const revealImg = slide.querySelector('.reveal-img');
        const img = slide.querySelector('img');
        const revealText = slide.querySelector('.reveal-text');
        
        // GSAP
        // Timeline
        const slideTl = gsap.timeline({
            defaults: { duration: 1, ease: 'power2.inOut' }
        });

        slideTl.fromTo(revealImg, { x: '0%' }, { x:'100%' });
        slideTl.fromTo(img, { scale: 2 }, { scale: 1 }, '-=1');
        slideTl.fromTo(revealText, { x: '0%' }, { x:'100%' }, '-=0.75');
        slideTl.fromTo(nav, { y: '-100%' }, { y:'0%' }, '-=1');
    
        // Create Scene
        slideScene = new ScrollMagic.Scene({
            triggerElement: slide,
            triggerHook: 0.25,
            reverse: false
        }) 
        .setTween(slideTl)
        .addIndicators({ colorStart: 'white', colorTrigger: 'white', name: 'slide' }) 
        .addTo(controller); 


        // New Animation 
        const pageTl = gsap.timeline(); 

        let nextslide = (slides.length - 1) === index ? 'end' : slides[index + 1];
        pageTl.fromTo(nextslide, { y: '0%' }, { y: '50%' });

        pageTl.fromTo(slide, { opacity: 1, scale: 1 }, { opacity: 0, scale: 0.5 });
        pageTl.fromTo(nextslide, { y: '50%' }, { y: '0%' }, '-=0.25');

        // Create new scene
        pageScene = new ScrollMagic.Scene({
            triggerElement: slide,
            duration: '100%',
            triggerHook: 0,
        })
        .addIndicators({ colorStart: 'white', colorTrigger: 'white', name: 'page', indent: 200 })
        .setPin(slide, { pushFollowers: false })
        .setTween(pageTl)
        .addTo(controller);
    }); 

}; 

let mouse = document.querySelector('.cursor');
let mouseTxt = mouse.querySelector('span');

function cursor(e) { 
    mouse.style.top = e.pageY + 'px';
    mouse.style.left = e.pageX + 'px';
    /* console.log(e) */
} 

function activeCursor(e) {
    item = e.target;
    if (item.id === 'logo' || item.classList.contains('burger')) {
        mouse.classList.add('nav-active');
    } else {
        mouse.classList.remove('nav-active');
    } 

    if (item.classList.contains('explore')) {
        mouse.classList.add('explore-active'); 
        mouseTxt.innerText = 'tap';
    } else {
        mouse.classList.remove('explore-active'); 
        mouseTxt.innerText = '';
    }
}

window.addEventListener('mousemove', cursor);
window.addEventListener('mouseover', activeCursor);

animateSlides();