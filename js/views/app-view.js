var app = app || {};

(function ($) {
	'use strict';

	app.AppView = Backbone.View.extend({
		el: '.carousel-app',
		events: {
			'click .shift-next': 'shiftNext',
			'click .shift-prev': 'shiftPrev'
		},
		initialize: function () {
			var data = this.model.get('data');
			for(var i = 0; i < data.length; i++){
				this.$('#frame').append('<div><img src=\"assets/' + 
										data[i].images[this.model.randomIndex[i]] + 
										'\"/><div class="overlay">' + data[i].title + '</div>');
			}
			this.updateCarousel();
        	this.model.setupAnimations = true;
			$(window).on("resize", $.proxy(this.updateCarousel, this));
		},
		shiftNext: function () {
			this.shift(1);
		},
		shiftPrev: function () {
			this.shift(-1);
		},
		shift: function (n) {
			this.model.firstActive = Math.max(Math.min(this.model.firstActive + n * this.model.currentGroupSize, this.model.get('data').length - 1), 0);
			this.updateCarousel();
		},
		updateCarousel(){
			var slides = this.$('#frame').children();
			var currentFrameWidth = this.$('#frame')[0].offsetWidth;
			var currentElementWidth = slides[0].offsetWidth;
        	this.model.currentGroupSize = Math.min(this.model.defaultSize, Math.floor(currentFrameWidth / currentElementWidth));
	        this.model.lastActive = Math.min(this.model.firstActive + this.model.currentGroupSize - 1, slides.length - 1);

			// make elements before currentGroup overflow to the left of the frame
			for(var i = 0; i < this.model.firstActive; i++){
				slides[i].style.marginLeft = -currentElementWidth + 'px';
			}

			// restore margin of other elements (left aligned, by design)
			for(var i = this.model.firstActive; i < slides.length; i++){
				slides[i].style.marginLeft = "0px";
			}

			// if element after group fits partially in frame, make it overflow to the right of the frame
			var remainingSpace = Math.floor(currentFrameWidth - ((this.model.lastActive - this.model.firstActive + 1) * currentElementWidth));
			if(remainingSpace > 0 && this.model.lastActive < slides.length - 1){
				slides[this.model.lastActive + 1].style.marginLeft = remainingSpace + 'px';
			}

        	// align center
			slides[this.model.firstActive].style.marginLeft = Math.floor(remainingSpace / 2) + 'px';

			if(this.model.setupAnimations){
				for(var i = 0; i < slides.length; i++){
					slides[i].style.transition = "margin 0.75s ease-in-out";
				}
				this.model.setupAnimations = false;
			}

			// update buttons state
			this.$('#prev').prop('disabled', this.model.firstActive == 0);
			this.$('#next').prop('disabled', !(this.model.lastActive < this.model.get('data').length - 1));
		}
	});
})(jQuery);
