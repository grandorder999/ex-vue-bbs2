<template>
  <div class="container">
    <div id="app">掲示板画面</div>

    <div class="articleNameErrorMessage">{{ articleNameErrorMessage }}</div>
    <div>投稿者名：<input type="text" v-model="articleName" /></div>
    <div class="articleContentErrorMessage">
      {{ articleContentErrorMessage }}
    </div>
    <div>
      投稿内容：<textarea
        name="textarea"
        cols="30"
        rows="5"
        v-model="articleContent"
      ></textarea>
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

      <CompComment v-bind:article-id="article.id"></CompComment>
      <hr />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Article } from "@/types/article";
@Component
export default class XXXComponent extends Vue {
  // 現在の記事一覧
  private currentArticleList = new Array<Article>();
  // 投稿者名
  private articleName = "";
  // 投稿内容
  private articleContent = "";
  // 投稿者名のエラー
  private articleNameErrorMessage = "";
  // 投稿内容のエラー
  private articleContentErrorMessage = "";
}
</script>

<style scoped></style>
