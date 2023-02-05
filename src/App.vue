<script setup>
import CreateIncidentForm from './components/CreateIncidentForm.vue';

import {
	NConfigProvider, darkTheme,
	NMessageProvider,
	NLayout,
	NLayoutHeader,
	NLayoutContent,
	NSpace
} from 'naive-ui';

import { Loader } from '@googlemaps/js-api-loader';

const loader = new Loader({
	apiKey: 'AIzaSyCC_j2mEQE9kFIL_mV095_lQwoOf13VA7g',
	version: 'weekly',
	libraries: ['places',],
});

// loader.load().then((google) => {
// 	// The location of Uluru
// 	const uluru = { lat: -25.344, lng: 131.031, };
// 	// The map, centered at Uluru
// 	const map = new google.maps.Map(document.getElementById('map'), {
// 		zoom: 4,
// 		center: uluru,
// 	});
// 	// The marker, positioned at Uluru
// 	const marker = new google.maps.Marker({
// 		position: uluru,
// 		map: map,
// 	});
// });
</script>

<template>
	<n-config-provider :theme="darkTheme">
		<n-message-provider>

			<n-layout>
				<n-layout-header>
					<n-space justify="space-around" align="center">
						<header style="display: inline-block;">
							<h1 style="display: inherit;">Map Map</h1>
						</header>
					</n-space>
				</n-layout-header>

				<n-layout-content>
					<div id="map" style="width: 400px; height: 400px;"></div>
					<create-incident-form />
				</n-layout-content>
			</n-layout>

		</n-message-provider>
	</n-config-provider>
</template>

<style scoped>

</style>
