<script setup>
import { Loader } from '@googlemaps/js-api-loader';

const loader = new Loader({
	apiKey: 'AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg',
	// version: 'weekly',
	// libraries: ['places',],
});

loader.load().then((google) => {
	// The location of Uluru
	const uluru = { lat: 25.344, lng: 131.031, };
	// The map, centered at Uluru
	const map = new google.maps.Map(document.getElementById('map'), {
		zoom: 4,
		center: uluru,
	});
	// The marker, positioned at Uluru
	const marker = new google.maps.Marker({
		position: uluru,
		map: map,
	});
});
</script>

<template>
	<header>
		<h1>shalom</h1>
	</header>
	<div id="map" style="width: 400px; height: 400px;"></div>
</template>

<style scoped>

</style>
