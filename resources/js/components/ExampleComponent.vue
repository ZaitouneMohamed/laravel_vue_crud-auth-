<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">
                        Contacts <button type="button" class="btn btn-success float-right" data-bs-toggle="modal"
                            v-if="logged" data-bs-target="#create"><i class="fa fa-plus" aria-hidden="true"></i></button>

                        <button type="button" class="btn btn-success float-right" data-bs-toggle="modal" v-if="!logged"
                            data-bs-target="#Login">Login</button>

                        <button type="button" class="btn btn-primary float-right" data-bs-toggle="modal" v-if="!logged"
                            data-bs-target="#Register">Register</button>

                        <button type="button" class="btn btn-danger float-right" @click="logout"
                            v-if="logged">Logout</button>
                    </div>

                    <div class="card-body" v-if="logged">
                        <ul class="list-group">
                            <li class="list-group-item d-flex justify-content-between" v-for="(contact, index) in contacts"
                                :key="index">
                                <span>{{ contact.name }}</span>
                                <span><i class="fa fa-phone" aria-hidden="true"></i>{{ contact.phone }}</span>
                                <span>
                                    <button @click="GetContact(contact.id)" data-bs-toggle="modal" data-bs-target="#update"
                                        class="btn btn-warning"><i class="fa fa-pen" aria-hidden="true"></i></button>
                                </span>
                                <span>
                                    <a class="btn btn-danger" @click="DeleteContact(contact.id)"><i class="fa fa-trash"
                                            aria-hidden="true"></i></a>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Login @logged="login" />
    <Register/>
    <div class="modal fade" id="update" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Update Contact</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Name</label>
                            <input type="text" class="form-control" placeholder="name" required v-model="contact.name">
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Phone</label>
                            <input type="text" class="form-control" placeholder="phone number" v-model="contact.phone"
                                required>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-warning" @click="UpdateContact(contact.id)">Update
                            Contact</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div class="modal fade" id="create" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Add New Contact</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Name</label>
                            <input type="text" class="form-control" placeholder="name" required v-model="contact.name">
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Phone</label>
                            <input type="text" class="form-control" placeholder="phone number" v-model="contact.phone"
                                required>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" @click="AddContact">Create
                            Contact</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

import Login from "./Login.vue";
import Register from "./Register";

export default {
    data() {
        return {
            contacts: [],
            contact: { name: "", phone: "" },
            updating: false,
            logged: localStorage.getItem('token') ? true : false,
            token: JSON.parse(localStorage.getItem('token')) || '',
        };
    },
    components: {
        Login,
        Register
    },
    mounted() {
        this.getContacts();
    },
    methods: {
        getContacts() {
            const config = {
                headers: {
                    "Authorization": `Bearer ${this.token}`
                },
            };
            axios.get('/api/contacts', config)
                .then((response) => this.contacts = response.data.data);
            console.log(config)
        },
        AddContact() {
            const config = {
                headers: {
                    "Authorization": `Bearer ${this.token}`
                },
            };
            axios.post('/api/contacts', this.contact, config)
                .then((response) => {
                    this.getContacts();
                    this.contact = { name: "", phone: "" }
                })
                .catch(err => console.log(err))
        },
        GetContact(id) {
            const config = {
                headers: {
                    "Authorization": `Bearer ${this.token}`
                },
            };
            axios.get('/api/contacts/' + id, config)
                .then((response) =>
                    this.contact = response.data.data,
                    this.updating = true
                );
        },
        UpdateContact(id) {
            const config = {
                headers: {
                    "Authorization": `Bearer ${this.token}`
                },
            };
            axios.put('/api/contacts/' + id, this.contact, config)
                .then((response) =>
                    this.updating = false,
                    this.getContacts()
                );
        },
        DeleteContact(id) {
            const config = {
                headers: {
                    "Authorization": `Bearer ${this.token}`
                },
            };
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete('/api/contacts/' + id, config)
                        .then((response) =>
                            this.getContacts()
                        );
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                }
            })
        },
        logout() {
            localStorage.removeItem('token'),
                this.logged = false,
                this.token = ''
        },
        login() {
            this.logged = true,
                this.token = JSON.parse(localStorage.getItem('token'))
        }
    }
}

</script>
