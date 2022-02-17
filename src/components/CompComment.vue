<template>
  <div class="compcmment">
    <div>名前：<br /><input type="text" v-model="commentName" /></div>
    <div>
      コメント：<br /><textarea
        name="textarea"
        cols="30"
        rows="5"
        v-model="commentContent"
      ></textarea>
    </div>
    <button type="button" v-on:click="addComment(articleId)">
      コメント投稿</button
    ><br />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class XXXComponent extends Vue {}
</script>

<style scoped></style>
