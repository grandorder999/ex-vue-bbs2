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
import { Prop, Component, Vue } from "vue-property-decorator";
import axios from "axios";
import { Comment } from "@/types/comment";
@Component
export default class XXXComponent extends Vue {
  // 親コンポーネントから受け取る記事ID
  @Prop()
  private articleId!: number;
  // コメント者名
  private commentName = "";
  // コメント内容
  private commentContent = "";

  async addComment(articleId: number): Promise<void> {
    const responce = await axios.post(
      "http://153.127.48.168:8080/ex-bbs-api/bbs/comment",
      {
        name: this.commentName,
        content: this.commentContent,
        articleId: this.articleId,
      }
    );
    console.dir("responce:" + JSON.stringify(responce));
    // ミューテーションのaddCommentを呼ぶ
    this.$store.commit("addComment", {
      comment: new Comment(
        -1, // コメントIDは今回使わないから採番されない0未満の数字を適当に書く
        this.commentName,
        this.commentContent,
        articleId
      ),
    });
    // 入力値をフォームからクリアする
    this.commentName = "";
    this.commentContent = "";
  }
}
</script>

<style scoped></style>
