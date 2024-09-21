<template>
    <v-row justify="center">
        <v-col cols="9">
            <h2>Create A New Project</h2>
            <div class="py-2" />
            <v-form v-model="valid">
                <v-row>
                    <v-col>
                        <v-text-field
                        v-model="firstname"
                        :counter="10"
                        :rules="nameRules"
                        label="Project name"
                        hide-details
                        required
                        ></v-text-field>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col>
                        <v-textarea
                            v-model="lastname"
                            :counter="10"
                            :rules="nameRules"
                            label="Project Description"
                            hide-details
                            required
                        ></v-textarea>
                    </v-col>
                </v-row>

                <v-row justify="center">
                    <v-col cols="6">
                        <v-btn type="submit" block>create project</v-btn>
                    </v-col>
                </v-row>
            </v-form>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        data: () => ({
            valid: false,
            firstname: '',
            lastname: '',
            nameRules: [
                value => {
                    if (value) return true

                    return 'Name is required.'
                },
                value => {
                    if (value?.length <= 10) return true

                    return 'Name must be less than 10 characters.'
                },
            ],
            email: '',
            emailRules: [
                value => {
                    if (value) return true

                    return 'E-mail is requred.'
                },
                value => {
                    if (/.+@.+\..+/.test(value)) return true

                    return 'E-mail must be valid.'
                },
            ],
        }),
    }
</script>

<style>
    html, body {
    overflow: hidden; /* Totally prevents scrolling */
    }
</style>