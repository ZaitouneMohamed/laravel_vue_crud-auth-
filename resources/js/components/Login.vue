<template>
    <div class="modal fade" id="Login" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Login</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    <div class="alert alert-info" v-if="message !== ''">
                        {{ message }}
                    </div>
                </div>
                <form>
                    <div class="modal-body">
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
                        <button type="button" class="btn btn-warning" @click="Login">Login</button>
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
            user: { email: '', password: '' },
            message: ''
        }
    },
    methods: {
        Login() {
            axios.post('/api/login', this.user)
                .then(res => {
                    if (res.data.token) {
                        this.message = res.data.message;
                        localStorage.setItem('token',JSON.stringify(res.data.token)),
                        this.user = { email: '', password: '' },
                        this.$emit('logged')
                    } else {
                        this.message = res.data.message;
                        this.user = { email: '', password: '' }
                    }
                })
                .catch(err => this.message = err)
        }
    }
}
</script>
