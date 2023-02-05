<script setup>
import { ref } from 'vue';
import {
	NConfigProvider, darkTheme,
	NMessageProvider,
	NLayout,
	NLayoutHeader,
	NLayoutContent,
	NSpace
} from 'naive-ui';

import CreateIncidentForm from './components/CreateIncidentForm.vue';

import { supabase } from './lib/supabase';
import { loader } from './lib/maps';

const geocodeURL = new URL(
	'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBwV5Dq3vISSQZcR_kF52CdExTc10mYDzU'
);
const heatmapData = ref([]);
const heatmapLayer = ref(null);

loader.load().then(async (google) => {
	const athensGA = { lat: 33.9442545, lng: -83.4593333, };
	const map = new google.maps.Map(document.getElementById('map'), {
		zoom: 12,
		center: athensGA,
	});

	const { data, } = await supabase.from('incidents').select('*');
	data.forEach((incident) => addToMap(google, map, incident));
});

async function addToMap(google, map, incident) {
	const rawCoordinates = await getCoordinatesFor(incident);
	const coordinates = new google.maps.LatLng(rawCoordinates.lat, rawCoordinates.lng);

	new google.maps.Marker({
		position: coordinates,
		map,
	});

	heatmapData.value.push({ location: coordinates, weight: 1, });
	heatmapLayer.value = new google.maps.visualization.HeatmapLayer({
		data: heatmapData.value,
		map,
		radius: 25,
	});
} // addToMap



async function getCoordinatesFor(incident) {
	geocodeURL.searchParams.set('place_id', incident.location);
	const response = await fetch(geocodeURL);
	const data = await response.json();
	const coordinates = data.results[0].geometry.location;
	return coordinates;
} // getCoordinates
</script>

<template>
	<n-config-provider :theme="darkTheme">
		<n-message-provider>

			<n-layout>
				<n-layout-header>
					<n-space justify="space-around">
						<header style="display: inline-block;">
							<n-space align="center" style="height: 10vh;">
								<h1 style="display: inherit;">Map Map</h1>
							</n-space>
						</header>
					</n-space>
				</n-layout-header>

				<n-layout-content>
					<div id="map" style="width 80vw; height: 50vh;"></div>
					<create-incident-form />
				</n-layout-content>
			</n-layout>

		</n-message-provider>
	</n-config-provider>
</template>

<style scoped>

</style>
