"use strict"

var button = document.createElement("button"); button.style = `
position: fixed;
top:0;
left:0;
z-index: 100000;

`
button.textContent= "TRIGGER"
// document.body.append(button)


// IPSUM
;(function() {

	"use strict";

	/**
	 * LoremIpsum constructor
	 *
	 * @type {Function}
	 */
	window.LoremIpsum = function() {
		// pass
	}

	/**
	 * LoremIpsum prototype
	 *
	 * @type {Object}
	 */
	window.LoremIpsum.prototype = {

		/**
		 * Possible words
		 *
		 * @type {Array}
		 */
		_words: [ "a", "ac", "accumsan", "ad", "adipiscing", "aenean", "aenean", "aliquam", "aliquam", "aliquet", "amet", "ante", "aptent", "arcu", "at", "auctor", "augue", "bibendum", "blandit", "class", "commodo", "condimentum", "congue", "consectetur", "consequat", "conubia", "convallis", "cras", "cubilia", "curabitur", "curabitur", "curae", "cursus", "dapibus", "diam", "dictum", "dictumst", "dolor", "donec", "donec", "dui", "duis", "egestas", "eget", "eleifend", "elementum", "elit", "enim", "erat", "eros", "est", "et", "etiam", "etiam", "eu", "euismod", "facilisis", "fames", "faucibus", "felis", "fermentum", "feugiat", "fringilla", "fusce", "gravida", "habitant", "habitasse", "hac", "hendrerit", "himenaeos", "iaculis", "id", "imperdiet", "in", "inceptos", "integer", "interdum", "ipsum", "justo", "lacinia", "lacus", "laoreet", "lectus", "leo", "libero", "ligula", "litora", "lobortis", "lorem", "luctus", "maecenas", "magna", "malesuada", "massa", "mattis", "mauris", "metus", "mi", "molestie", "mollis", "morbi", "nam", "nec", "neque", "netus", "nibh", "nisi", "nisl", "non", "nostra", "nulla", "nullam", "nunc", "odio", "orci", "ornare", "pellentesque", "per", "pharetra", "phasellus", "placerat", "platea", "porta", "porttitor", "posuere", "potenti", "praesent", "pretium", "primis", "proin", "pulvinar", "purus", "quam", "quis", "quisque", "quisque", "rhoncus", "risus", "rutrum", "sagittis", "sapien", "scelerisque", "sed", "sem", "semper", "senectus", "sit", "sociosqu", "sodales", "sollicitudin", "suscipit", "suspendisse", "taciti", "tellus", "tempor", "tempus", "tincidunt", "torquent", "tortor", "tristique", "turpis", "ullamcorper", "ultrices", "ultricies", "urna", "ut", "ut", "varius", "vehicula", "vel", "velit", "venenatis", "vestibulum", "vitae", "vivamus", "viverra", "volutpat", "vulputate" ],

		/**
		 * Get random number
		 *
		 * @param  {Number} x
		 * @param  {Number} y
		 * @return {Number}
		 */
		_random: function(x, y) {
			var rnd = (Math.random() * 2 - 1) + (Math.random() * 2 - 1) + (Math.random() * 2 - 1);
			return Math.round(Math.abs(rnd) * x + y);
		},

		/**
		 * Get random number between min and max
		 *
		 * @param  {Number} min (optional) lower result limit
		 * @param  {Number} max (optional) upper result limit
		 * @return {Number}     random number
		 */
		_count: function(min, max) {
			var result;
			if (min && max) result = Math.floor(Math.random() * (max - min + 1) + min);
			else if (min) result = min;
			else if (max) result = max;
			else result = this._random(8, 2);

			return result;
		},

		/**
		 * Get random words
		 *
		 * @param  {Number} min (optional) minimal words count
		 * @param  {Number} max (optional) maximal words count
		 * @return {Object}     array of random words
		 */
		words: function(min, max) {
			var result = [];
			var count = this._count(min, max);

			// get random words
			while (result.length < count) {
				var pos = Math.floor(Math.random() * this._words.length);
				var rnd = this._words[pos];

				// do not allow same word twice in a row
				if (result.length && result[result.length - 1] === rnd) {
					continue;
				}

				result.push(rnd);
			}

			return result;
		},

		/**
		 * Generate sentence
		 *
		 * @param  {Number} min (optional) minimal words count
		 * @param  {Number} max (optional) maximal words count
		 * @return {String}     sentence
		 */
		sentence: function(min, max) {
			var words = this.words(min, max);

			// add comma(s) to sentence
			var index = this._random(6, 2);
			while (index < words.length - 2) {
				words[index] += ",";
				index += this._random(6, 2);
			}

			// append puctation on end
			var punct = "...!?"
			words[words.length - 1] += punct.charAt(Math.floor(Math.random() * punct.length));

			// uppercase first letter
			words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);

			return words.join(" ");
		},

		/**
		 * Generate paragraph
		 *
		 * @param  {Number} min (optional) minimal words count
		 * @param  {Number} max (optional) maximal words count
		 * @return {String}     paragraph
		 */
		paragraph: function(min, max) {
			if (!min && !max) {
				min = 20;
				max = 60;
			}

			var result = "";
			var count = this._count(min, max);

			// append sentences until limit is reached
			while (result.slice(0, -1).split(" ").length < count) {
				result += this.sentence() + " ";
			}
			result = result.slice(0, -1)

			// remove words
			if (result.split(" ").length > count) {
				var punct = result.slice(-1);
				result = result.split(" ").slice(0, count).join(" ");
				result = result.replace(/,$/, "");
				result += punct;
			}

			return result;
		}

	}

})();

var ipsum = new LoremIpsum();
console.log(ipsum.sentence(12));


/** I need to reach bottom of page to load every dinamic elements, like src, imgs, pictures etc
 * - Change text with lorem ipsum
 */
var body = document.body;
var html = document.documentElement;
var height = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight );

var h1s = document.querySelectorAll("h1");
var h2s = document.querySelectorAll("h2");
var h3s = document.querySelectorAll("h3");
var h4s = document.querySelectorAll("h4");
var h5s = document.querySelectorAll("h5");

var as = document.querySelectorAll("a");


var pictures = document.querySelectorAll("picture");
var sources = document.querySelectorAll("source");
var imgs = document.querySelectorAll("img");

var ps = document.querySelectorAll("p");

var divs = document.querySelectorAll("div");


button.onClick = ()=>{
    
    window.addEventListener('scroll', someFunction);
    window.scrollBy(0,600);
}


// Event listener for scrolling


function someFunction (){

    // Check if we're at the bottom
    if (window.innerHeight + window.scrollY >= height) {
        console.log("You`ve reached the bottom!")

        // Remove scroller
        window.removeEventListener("scroll", someFunction);

        //Execute main script
        executeScript();

    } else {
            console.log("Keep scrolling")

            setTimeout(()=>{ window.scrollBy(0,600);}, 400)
        // Change color to white
        //document.querySelector('body').style.background = 'white';
    }

};

function executeScript(){
    h1s.forEach(h1=>{ h1.style.backgroundColor = "black"; h1.style.color = "black"})
    h2s.forEach(h2=>{ h2.style.backgroundColor = "black"; h2.style.color = "black"})
    h3s.forEach(h3=>{ h3.style.backgroundColor = "black"; h3.style.color = "black"})
    h4s.forEach(h4=>{ h4.style.backgroundColor = "black"; h4.style.color = "black"})
    h5s.forEach(h5=>{ h5.style.backgroundColor = "black"; h5.style.color = "black"})
    as.forEach(a=>{ a.style.backgroundColor = "#808080"; a.style.color = "#808080"})


    pictures.forEach(picture=>{ picture.srcset = "https://www.wirify.com/client/images/placeholder.png";});
    sources.forEach(source=>{ source.srcset = "https://www.wirify.com/client/images/placeholder.png";});

    imgs.forEach(img=>{ img.src = "https://www.wirify.com/client/images/placeholder.png"; img.srcset = "https://www.wirify.com/client/images/placeholder.png"});
    divs.forEach(div=>{ 
        // if(div.textContent !== ""){
        //     div.style.background = "black"; div.style.color = "green"
        // }
        if(div.style.backgroundImage !== ""){
            div.style.backgroundImage = "url(https://www.wirify.com/client/images/placeholder.png)";
        }





    });
    
    
    
    
    ps.forEach( p => { 
        // p.style.backgroundColor = "#606060"; 
        // p.style.color = "#606060"
        if(p.textContent !== ""){
            let count = p.textContent.split(' ').length;
            p.textContent = ipsum.sentence(count)
        }
    
    })   

}





// let scrollToBottom = setInterval(function(){ window.scrollBy(0,600); }, 400);
// clearInterval()