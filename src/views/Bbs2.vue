<template>
  <div class="container">
    <div id="app">掲示板画面</div>

    <div>投稿者名：<input type="text" v-model="articleName" /></div>
    <div>
      投稿内容：<textarea
        name="textarea"
        cols="30"
        rows="5"
        v-model="articleContent"
      >
      </textarea>
    </div>
    <button type="button" v-on:click="addArticle">記事投稿</button><br />
    <hr />
    <div
      v-for="(article, articleIndex) of currentArticleList"
      v-bind:key="article.id"
    >
      <div>投稿者名：{{ article.name }}</div>
      <div>
        投稿内容：
        <pre>{{ article.content }}</pre>
      </div>

      <button type="button" v-on:click="deleteArticle(articleIndex)">
        記事削除</button
      ><br />

      <div v-for="comment of article.commentList" v-bind:key="comment.id">
        <div>コメント者名：{{ comment.name }}</div>
        <div>
          コメント内容：
          <pre>{{ comment.content }}</pre>
        </div>
      </div>

      <hr />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Article } from "@/types/article";
import axios from "axios";
@Component
export default class XXXComponent extends Vue {
  // 現在の記事一覧
  private currentArticleList = new Array<Article>();
  // 投稿者名
  private articleName = "";
  // 投稿内容
  private articleContent = "";
  // エラーメッセージ
  private errorMessage = "";

  /**
   * Vuexストア内のアクション経由で記事一覧を取得し表示する.
   */
  async created(): Promise<void> {
    await this.$store.dispatch("getArticle");
    this.currentArticleList = this.$store.getters.getArticles;
  }

  /**
   * 記事を追加する.
   */
  async addArticle(): Promise<void> {
    const responce = await axios.post(
      "http://153.127.48.168:8080/ex-bbs-api/bbs/article",
      { name: this.articleName, content: this.articleContent }
    );
    console.dir("responce:" + JSON.stringify(responce));
    // 今回はsuccessではなく200だったら投稿可能という意味になる
    if (responce.status !== 200) {
      this.errorMessage = "投稿できませんでした";
      return;
    }
    // 入力値をフォームからクリアする
    this.articleName = "";
    this.articleContent = "";
  }
}
</script>

<style scoped></style>
