import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { Article } from "@/types/article";
import { Comment } from "@/types/comment";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    articles: new Array<Article>(),
  },
  actions: {
    async getArticle(context) {
      const responce = await axios.get(
        "http://153.127.48.168:8080/ex-bbs-api/bbs/articles"
      );
      console.dir("responce" + JSON.stringify(responce));
      const payload = responce.data;
      context.commit("ddArticle", payload);
    },
  },
  mutations: {
    /**
     * 記事を追加する.
     * @param state - ステート
     * @param payload - 記事情報
     */
    addArticle(state, payload) {
      // payloadのarticleをunshiftメソッドを使って0番目に追加する
      // 0番目に追加するときはunshift、最後尾に追加するときはpush
      state.articles.unshift(payload.article);
    },
  },
  getters: {},
  modules: {},
});
