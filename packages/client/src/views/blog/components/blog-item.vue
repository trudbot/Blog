import { Post } from '../../../../../server/src/posts/post.entity';
<script setup lang="ts">
defineProps<{
    title: string;
}>();
</script>

<template>
    <article class="blog-item">
        <div class="post-title">
            <Transition type="transition">
                <span class="title-text">{{ title }}</span>
            </Transition>
        </div>
    </article>
</template>

<style lang="scss" scoped>
.blog-item {
    background: #fff;
    padding: 20px;
    border-radius: 20px;
    margin-top: 10px;
    color: #000;

    .post-title {
        display: flex;
        justify-content: center;
    }
    .title-text {
        text-align: center;
        font-size: 2rem;
        font-family: 'Lato', "PingFang SC", "Microsoft YaHei", sans-serif;
        position: relative;

        &::after {
            content: '';
            position: absolute;
            left: 0;
            top: 100%;
            transform: scaleX(0);
            background-color: #000;
            height: 2px;
            width: 100%;
            transition: all 0.2s ease-in-out;
        }

        &:hover::after {
            transform: scaleX(1);
        }
    }
}
</style>