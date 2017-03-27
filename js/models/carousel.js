
var app = app || {};

(function () {
	'use strict';

	var Carousel = Backbone.Model.extend({
		localStorage: new Backbone.LocalStorage('carousel-backbone'),
		initialize: function () {
			var r = null;
			for(var i = 0; i < this.get('data').length; i++){
				r = this.getRandomInt(0,this.get('data')[i].images.length - 1);
				this.randomIndex.push(r);
			}
		},
    	defaultSize: 4,
		firstActive: 0,
		lastActive: null,
		setupAnimations: false,
		currentGroupSize: null,
		randomIndex: [],
		defaults: {
			data: [
				{
					title: 'Lakes in Spain',
					images: [
						'Aiguestortes_i_Estany_de_Sant_Maurici-Spain.png',
						'Estany_de_Banyoles-Spain.png',
						'Panta_de_Sau-Spain.png'
					]
				},
				{
					title: 'Lakes in United States of America',
					images: [
						'Bear_Rock_Lakes-US.png',
						'Lake_Sonoma-US.png'
					]
				},
				{
					title: 'Lakes in Portugal',
					images: [
					'Lagoa_das_Sete_Cidades-Portugal.png',
					'Lagoa_do_Fogo-Portugal.png'
					]
				},
				{
					title: 'Lakes in Guatemala',
					images: ['Lake_Atitlan-Guatemala.png']
				},
				{
					title: 'Lakes in Slovenia',
					images: ['Lake_Bled-Slovenia.png']
				},
				{
					title: 'Lakes in New Zealand',
					images: ['Lake_Mapourika-New_Zealand.png']
				},
				{
					title: 'Lakes in Estonia',
					images: [
					'Mahuste_Lake-Estonia.png',
					'Sinine_rabajarv-Estonia.png',
					'Vanamoisa_Estonia.png'
					]
				},
				{
					title: 'Lakes in Canada',
					images: ['Peyto_lake-Canada.png']
				},
				{
					title: 'Lakes in United Kingdom',
					images: ['Windermere-England.png']
				}
			],
		},
		getRandomInt(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}
	});
	app.carousel = new Carousel();
})();
