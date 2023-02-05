<script setup>
import { NForm, NFormItem, NInput, NButton, NSelect, useMessage } from 'naive-ui';
import { ref } from 'vue';

import { supabase } from '../lib/supabase';
import { loader } from '../lib/maps';

import { categories } from './IncidentCategories';

let autocomplete;
loader.load().then((google) => {
	autocomplete = new google.maps.places.Autocomplete(
		document.querySelector('#addressInput input'),
		{
			types: ['address',],
			componentRestrictions: { 'country': ['US',], },
			fields: ['name', 'place_id',],
		}
	);
});

const message = useMessage();
const incidentForm = ref(null);
const incidentCategories = categories.map((category) => {
	return {
		label: category,
		value: category,
	};
});
const incidentValueDefaults = {
	title: '',
	description: '',
	address: '',
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
	address: {
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
	incidentValues.value.address = document.querySelector('.pac-target-input').value;
	incidentForm.value?.validate((errors) => {
		if (!errors) {
			submitIncident();
		} // if
	});
} // createIncident

async function submitIncident() {
	const { error, } = await supabase.from('incidents').insert({
		...incidentValues.value,
		map_code: autocomplete.getPlace().place_id,
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
		<n-form-item label="Address" path="address" required>
			<n-input id="addressInput" v-model:value="incidentValues.address" />
		</n-form-item>
		<n-form-item label="Category" path="category" required="">
			<n-select v-model:value="incidentValues.category" :options="incidentCategories" />
		</n-form-item>

		<n-form-item>
			<n-button type="primary" @click="createIncident">Create</n-button>
		</n-form-item>
	</n-form>
</template>
