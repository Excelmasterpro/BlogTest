let toggle = document.querySelector("#header .toggle-button")
let collapse = document.querySelectorAll("#header .collapse")
// we use querySelectorAll because we do have 2 collpase clases and we want both to the selected

// create an event

toggle.addEventListener('click', function(){
   console.log(collapse);

   collapse.forEach(col => col.classList.toggle("collapse-toggle"));
})

//  With masonry JS library to make the grid style, gutter is the withd between elements

new Masonry("#posts .grid", {
    itemSelector: '.grid-item',
    gutter: 10
})

// swiper library initialization

new Swiper('.swiper-container', {
    direction: 'horizontal',
    loop: true,
    slidesPerView: 5,
    autoplay:{
        delay: 2000
    },
    // responsive breakpoints
    breakpoints: {
        '@0' :{
            slidesPerView: 2
        },
        // 888px
        '@1.00':{
            slidesPerView: 3
        },
        // 1110px
        '@1.25':{
            slidesPerView: 4
        },
        // 1330px
        '@1.50':{
            slidesPerView: 5
        },      
    }

})

// Sticky Navigation
window.onscroll = function(){ myFunction()};

// get the current value 
let navbar = document.getElementById("header");

// get the navbar position
let sticky = navbar.offsetTop;

// sticky function
function myFunction(){
    if(window.pageYOffset >= sticky){
        navbar.classList.add("sticky");
    }else{
        navbar.classList.remove("sticky");
    }
}