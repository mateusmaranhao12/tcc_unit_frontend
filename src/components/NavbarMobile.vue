<template>
    <!-- Menu Hamburguer para telas menores -->
    <button class="md:hidden text-gray-800 focus:outline-none" @click="toggleMenu">
        <i class="fa-solid fa-bars text-2xl"></i>
    </button>

    <!-- Mobile Menu -->
    <ul :class="{ 'hidden': !menuOpen, 'block': menuOpen }"
        class="md:hidden bg-white w-full shadow-md text-center py-4">
        <li>
            <router-link to="/" class="text-gray-700 text-lg font-semibold block py-2" @click="toggleMenu">
                <i class="fa-solid fa-house"></i> Home
            </router-link>
        </li>
        <li>
            <router-link to="/sobre" class="text-gray-700 text-lg font-semibold block py-2" @click="toggleMenu">
                <i class="fa-solid fa-circle-info"></i> Sobre
            </router-link>
        </li>
        <li>
            <router-link to="/medicos" class="text-gray-700 text-lg font-semibold block py-2" @click="toggleMenu">
                <i class="fa-solid fa-user-doctor"></i> Médicos
            </router-link>
        </li>
        <li>
            <router-link to="/login" class="text-gray-700 text-lg font-semibold block py-2" @click="toggleMenu">
                Login
            </router-link>
        </li>
        <li>
            <router-link to="/cadastro"
                class="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition block mx-auto mt-2 w-40"
                @click="toggleMenu">
                Cadastre-se
            </router-link>
        </li>
    </ul>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({})
export default class NavbarMobile extends Vue {
    menuOpen = false

    toggleMenu() {
        this.menuOpen = !this.menuOpen
    }
}
</script>