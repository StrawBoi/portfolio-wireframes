//un-comment next line to see guides
//document.body.classList.toggle("debug")

const hero = document.querySelector(".hero")
const heroTexts = document.querySelectorAll(".hero h2")

function init() {

	let duration = 0.75
	
	gsap.set(".hero", {yPercent:75})
	let tl = gsap.timeline()
	heroTexts.forEach((text, index) => {
		tl.set(text, {opacity:1})
		tl.from(text, {
			duration:duration, 
			yPercent:120, 
			scale:0.6, 
		ease:"power3"})
		
		if(index > 0){
			tl.to(hero, {
				yPercent:"-=25", 
				duration:duration, 
				ease:"power2"}, "<")
		}
	})
	
	// original effect by https://x.com/mChanhdev
	// view site https://wonjyou.studio/
	// learn GSAP: https://www.creativecodingclub.com 
	
	GSDevTools.create({animation:tl})

	
	
  
}






// Create a Promise for window.onload
const pageLoadedPromise = new Promise(resolve => {
  window.onload = resolve;
});

// Wait for both the page and fonts to be ready
Promise.all([pageLoadedPromise, document.fonts.ready])
  .then(() => {
    console.log("Page and all fonts are loaded and ready.");
    init()
  })
  .catch(error => {
    console.error("An error occurred during loading:", error);
  });