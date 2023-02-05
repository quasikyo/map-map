<script setup>
import { NForm, NFormItem, NInput, NButton, NSelect, useMessage } from 'naive-ui';
import { ref } from 'vue';

import { supabase } from '../supabase';

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
	incidentForm.value?.validate((errors) => {
		if (!errors) {
			submitIncident();
		} // if
	});
} // createIncident

async function submitIncident() {
	const { error, } = await supabase.from('incidents').insert(incidentValues.value);
	if (error) {
		message.error(error.message);
	} else {
		message.success('Incident successfully created!');
		incidentValues.value = { ...incidentValueDefaults, };
	} // if
} // submitIncident

</script>



<template>
	<header>
		<h2>Create New Incident</h2>
	</header>

	<n-form size="large" :model="incidentValues" :rules="formRules" ref="incidentForm">
		<n-form-item label="Title" path="title" required>
			<n-input v-model:value="incidentValues.title" />
		</n-form-item>
		<n-form-item label="Description" path="description">
			<n-input v-model:value="incidentValues.description" />
		</n-form-item>
		<n-form-item label="Location" path="location" required>
			<n-input v-model:value="incidentValues.location" />
		</n-form-item>
		<n-form-item label="Category" path="category" required="">
			<n-select v-model:value="incidentValues.category" :options="incidentCategories" />
		</n-form-item>

		<n-form-item>
			<n-button @click="createIncident">Create</n-button>
		</n-form-item>
	</n-form>
</template>
