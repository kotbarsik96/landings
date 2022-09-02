import { mapGetters } from "vuex";
import rootPath from "@/root-path.js";

export default {
    props: {
        blogData: {
            type: Object,
            required: true,
        },
        tag: {
            type: String,
            default: "div"
        }
    },
    data() {
        return {
            rootPath
        }
    },
    computed: {
        ...mapGetters(["users"]),
        blogAuthor() {
            return this.users.find(ur => ur.id === this.blogData.authorId) || {};
        }
    },
}