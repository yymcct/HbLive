<template>
  <div class="wrapper" ref="wrapper">
    <div class="chatting">
      <!-- 聊天内容区域 -->
      <div ref="chattingContent" class="chatting-content">
        <div class="chatting-item">
          <div class="msg-authorPic">
            <van-image src="http://m.3456.tv/images/2019yuan.png" />
          </div>
          <div>
            <div class="msg-author">翁奎</div>
            <div class="msg-content">你好你好你好你你好你好你好你你好你好你好你</div>
          </div>
        </div>

        <div class="chatting-item self">
          <div class="msg-authorPic">
            <van-image src="http://m.3456.tv/images/2019yuan.png" />
          </div>
          <div>
            <div class="msg-author">翁奎</div>
            <div class="msg-content">你好你好</div>
          </div>
        </div>
        <div v-for="(item, index) in chatMsgs" v-bind:key="index">
          <div class="chatting-item" :class="{self:item.self}">
            <div class="msg-authorPic">
              <van-image :src="item.avatarUrl" />
            </div>
            <div>
              <div class="msg-author">{{item.from}}</div>
              <div class="msg-content">{{item.content}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 这里可以放一些其它的 DOM，但不会影响滚动 -->
  </div>
</template>

<script>
//import Bscroll from "better-scroll";
import { Row, Col, Image, ImagePreview } from "vant";
export default {
  name: "chat",
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Image.name]: Image,
    [ImagePreview.name]: ImagePreview
  },

  data() {
    return {
      chatMsgs: [
        {
          date: "2015-11-09 09:57:08",
          loc: "江西省南昌市",
          from: "microzz",
          avatarUrl: `http://m.3456.tv/images/2019yuan.png`,
          content: "test",
          self: true
        },
        {
          date: "2015-11-09 09:57:08",
          loc: "江西省南昌市",
          from: "microzz",
          avatarUrl: `http://m.3456.tv/images/2019yuan.png`,
          content: "test",
          self: false
        },
        {
          date: "2015-11-09 09:57:08",
          loc: "江西省南昌市",
          from: "microzz",
          avatarUrl: `http://m.3456.tv/images/2019yuan.png`,
          content: "test",
          self: false
        },
        {
          date: "2015-11-09 09:57:08",
          loc: "江西省南昌市",
          from: "microzz",
          avatarUrl: `http://m.3456.tv/images/2019yuan.png`,
          content: "test",
          self: false
        },
        {
          date: "2015-11-09 09:57:08",
          loc: "江西省南昌市",
          from: "microzz",
          avatarUrl: `http://m.3456.tv/images/2019yuan.png`,
          content: "test",
          self: false
        },
        {
          date: "2015-11-09 09:57:08",
          loc: "江西省南昌市",
          from: "microzz",
          avatarUrl: `http://m.3456.tv/images/2019yuan.png`,
          content: "test",
          self: false
        }
      ],
      inputContent: "",
      oContent: {},
      oTextarea: {},
      emojis: [],
      isShowEmoji: false,
      isRedAI: false
    };
  },
  methods: {},
  mounted() {}
};
</script>

<style scoped  lang="scss">
$blue: #2196f3;

.chatting {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .chatting-content {
    flex: 1;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.1);
    overflow: auto;
    .self {
      flex-direction: row-reverse;
      text-align: right;
    }

    .chatting-item {
      padding-top: 1rem;
      width: 100%;
      display: flex;
      .msg-author {
        font-size: 0.8rem;
        color: #666;
      }
      .msg-authorPic {
        width: 10%;
        margin-right: 0.5rem;
        margin-left: 0.5rem;
      }

      .msg-content {
        margin-top: 0.3rem;
        background-color: white;
        max-width: 15rem;
        padding: 6px 10px;
        border-radius: 10px;
        margin-bottom: 0.3rem;
      }
    }
  }
}
</style>
