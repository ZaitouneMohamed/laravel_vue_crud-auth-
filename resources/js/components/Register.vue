<template>
    <div class="modal fade" id="Register" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Register</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    <div class="alert alert-info" v-if="message !== ''">
                        {{ message }}
                    </div>
                </div>
                <form>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">name</label>
                            <input type="email" class="form-control" placeholder="name" required v-model="user.name">
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Email</label>
                            <input type="email" class="form-control" placeholder="email" required v-model="user.email">
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">password</label>
                            <input type="password" class="form-control" placeholder="password" v-model="user.password"
                                required>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-warning" @click="Register">Register</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>


<script>
import axios from 'axios';

export default {
    data() {
        return {
            user: { email: '', password: '' ,  name:'' },
            message: ''
        }
    },
    methods: {
        Register() {
            axios.post('/api/register', this.user)
                .then(res => {
                    this.message = res.message
                })
                .catch(err => this.message = err)
        }
    }
}
</script>
