<script setup>
import { NForm, NFormItem, NInput, NButton, useMessage } from 'naive-ui';
import { ref } from 'vue';

const message = useMessage();

const incidentForm = ref(null);
const incidentValues = ref({
	title: '',
	description: '',
	location: '',
});
const formRules = {
	title: {
		required: true,
		message: 'Please provide a title.',
		trigger: 'blur',
	},
	description: {

	},
	location: {
		required: true,
		message: 'Please provide a location.',
		trigger: 'blur',
	},
};

function createIncident() {
	incidentForm.value?.validate((errors) => {
		if (errors) {
			message.error('Invalid values provided.');
		} // if

		// TODO: submit incident
	});
}

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

		<n-form-item>
			<n-button @click="createIncident">Create</n-button>
		</n-form-item>
	</n-form>
</template>
