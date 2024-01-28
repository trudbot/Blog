<script setup lang="ts">
defineProps<{
    jump?: boolean;
    delay?: number;
    selected?: boolean;
    color?: string;
}>();
</script>

<template>
    <a :class="['nav-item']">
        <span 
            :class="jump ? 'jump' : ''"
            :style="{
                borderBottom: (color && selected) ? '2px solid ' + color : 'none'
            }"
        >
            <slot></slot>
        </span>
    </a>
</template>

<style lang="scss" scoped>
@import "@/mixin.scss";
.nav-item {
    @include flex-center;
    transition: background-color 1s;
    height: max(96px, 15vh);
    cursor: pointer;
    border-radius: 10%;
    font-family: inherit;

    span {
        display: inline-block;
        color: v-bind(color);
        @include hover {
          background: #c7c5c5;
        }
    }
}

.jump {
    animation: jump 2s ease-in-out infinite;
    animation-delay: v-bind("delay + 'ms'");
}

@keyframes jump {
    0% {
        transform: translateY(0px);
    }
    20% {
        transform: translateY(-20px);
    }
    40%, 100% {
        transform: translateY(0px);
    }
}
</style>