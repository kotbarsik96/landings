<template>
    <div class="comments" v-if="comments">
        <component :is="titleTag" class="comments__title">
            <slot></slot>
        </component>
        <div
            class="comments__branch"
            v-for="branch in comments"
            :key="branch.date"
        >
            <div class="comments__item" v-if="userData(branch.userId)">
                <div class="comments__item-user">
                    <div class="comments__user-image">
                        <img
                            :src="`${rootPath}img/users/${
                                userData(branch.userId).image
                            }`"
                            :alt="userData(branch.userId).name"
                        />
                    </div>
                    <div class="comments__user-info">
                        <div class="comments__user-name">
                            <span>{{ userData(branch.userId).name }}</span>
                            <span class="tag--colored">{{
                                userData(branch.userId).tag
                            }}</span>
                        </div>
                        <div class="comments__date">{{ branch.date }}</div>
                    </div>
                </div>
                <div class="comments__item-content">
                    <p
                        class="comments__item-text"
                        v-for="(par, index) in branch.paragraphs"
                        :key="index"
                    >
                        {{ par }}
                    </p>
                </div>
            </div>
            <template v-if="userData(branch.userId)">
                <div
                    class="comments__item comments__item--reply"
                    v-for="reply in branch.replies"
                    :key="reply.date"
                >
                    <div class="comments__item-user">
                        <div class="comments__user-image">
                            <img
                                :src="`${rootPath}img/users/${
                                    userData(reply.userId).image
                                }`"
                                :alt="userData(reply.userId).name"
                            />
                        </div>
                        <div class="comments__user-info">
                            <div class="comments__user-name">
                                <span>{{ userData(reply.userId).name }}</span>
                                <span class="tag--colored">{{
                                    userData(reply.userId).tag
                                }}</span>
                            </div>
                            <div class="comments__date">{{ reply.date }}</div>
                        </div>
                    </div>
                    <div class="comments__item-content">
                        <p
                            class="comments__item-text"
                            v-for="(par, index) in reply.paragraphs"
                            :key="index"
                        >
                            {{ par }}
                        </p>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
// формат данных указан в data-samples.js

import rootPath from "@/root-path.js";
import { mapGetters } from "vuex";

export default {
    name: "CommentsBlock",
    props: {
        comments: {
            type: Array,
            required: true,
        },
        titleTag: {
            type: String,
            default: "h3",
        },
    },
    data() {
        return {
            rootPath,
        };
    },
    computed: {
        ...mapGetters(["users"]),
    },
    methods: {
        userData(userId) {
            return this.users.find((ur) => ur.id === userId);
        },
    },
};
</script>