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
      context.commit("addArticle", payload);
    },
  }, // end actions
  mutations: {
    /**
     * 記事を追加する.
     * @param state - ステート
     * @param payload - 記事情報
     */
    addArticle(state, payload) {
      state.articles = new Array<Article>();
      for (const article of payload.articles) {
        state.articles.unshift(
          new Article(
            article.id,
            article.name,
            article.content,
            article.commentList
          )
        );
      }
    },
    /**
     * コメントを追加する.
     * @param state - ステート
     * @param payload - コメント情報
     */
    addComment(state, payload) {
      // 渡されたpayloadの中のarticleIdから追加対象の記事を検索する
      const article = state.articles.find(
        (article) => article.id === payload.comment.articleId
      );
      // 記事が存在していたらCommentListにコメントを追加する
      if (article) {
        // 渡されたpayloadからCommentオブジェクトを生成
        const comment = new Comment(
          payload.comment.id,
          payload.comment.name,
          payload.comment.content,
          payload.comment.articleId
        );
        // commentListにコメントをcommentを追加する
        article.commentList.unshift(comment);
      }
    },
  }, // end mutations
  getters: {
    /**
     * 記事一覧を返す.
     * @param state - ステート
     */
    getArticles(state) {
      return state.articles;
    },
  },
  modules: {},
});
