<script setup>
import { NForm, NFormItem, NInput, NButton, NSelect, useMessage } from 'naive-ui';
import { ref } from 'vue';

import { supabase } from '../lib/supabase';
import { loader } from '../lib/maps';

let autocomplete;
loader.load().then((google) => {
	autocomplete = new google.maps.places.Autocomplete(
		document.querySelector('#locationInput input'),
		{
			types: ['address',],
			componentRestrictions: { 'country': ['US',], },
			fields: ['name', 'place_id',],
		}
	);
});

const message = useMessage();

const incidentForm = ref(null);
const incidentCategories = [
	{ label: 'Theft', value: 'theft', },
	{ label: 'Tresspassing', value: 'tresspassing', },
	{ label: 'Environmental', value: 'environmental', },
];
const incidentValueDefaults = {
	title: '',
	description: '',
	location: '',
	category: null,
};
const incidentValues = ref({ ...incidentValueDefaults, });
const formRules = {
	title: {
		required: true,
		message: 'Please provide a title.',
		trigger: 'blur',
	},
	description: {},
	location: {
		required: true,
		message: 'Please provide a location.',
		trigger: 'blur',
	},
	category: {
		required: true,
		message: 'Please select a category.',
		trigger: 'blur',
	},
};

function createIncident() {
	incidentValues.value.location = document.querySelector('.pac-target-input').value;
	incidentForm.value?.validate((errors) => {
		if (!errors) {
			submitIncident();
		} // if
	});
} // createIncident

async function submitIncident() {
	const { error, } = await supabase.from('incidents').insert({
		...incidentValues.value,
		location: autocomplete.getPlace().place_id,
	});
	if (error) {
		message.error(error.message);
	} else {
		message.success('Incident successfully created!');
		incidentValues.value = { ...incidentValueDefaults, };
	} // if


} // submitIncident
</script>

<template>
	<header style="height: 5vh; width: 60%; margin: auto;">
		<h2>Create New Incident</h2>
	</header>

	<n-form size="large" :model="incidentValues" :rules="formRules" ref="incidentForm"
		style="height: 35vh; width: 60%; margin: auto;">
		<n-form-item label="Title" path="title" required>
			<n-input v-model:value="incidentValues.title" />
		</n-form-item>
		<n-form-item label="Description" path="description">
			<n-input v-model:value="incidentValues.description" />
		</n-form-item>
		<n-form-item label="Location" path="location" required>
			<n-input id="locationInput" v-model:value="incidentValues.location" />
		</n-form-item>
		<n-form-item label="Category" path="category" required="">
			<n-select v-model:value="incidentValues.category" :options="incidentCategories" />
		</n-form-item>

		<n-form-item>
			<n-button type="primary" @click="createIncident">Create</n-button>
		</n-form-item>
	</n-form>
</template>
