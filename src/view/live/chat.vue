<template>
  <div class="wrapper" ref="wrapper">
    <ul class="content">
      <div class="chatting">
        <!-- 聊天内容区域 -->
        <div ref="chattingContent" class="chatting-content">
          <div v-for="(item, index) in chatMsgs" v-bind:key="index">
            <div v-if="item.self" class="chatting-item self clearfix">
              <div class="msg-date">{{ item.date }}</div>
              <div class="msg-from">
                <span class="loc">[{{item.loc}}]</span>
                <span class="msg-author">{{ item.from}}</span>
                <img :src="item.avatarUrl" alt />
              </div>
              <div class="msg-content">{{ item.content }}</div>
            </div>
            <div v-else class="chatting-item other clearfix">
              <div class="msg-date">{{ item.date }}</div>
              <div class="msg-from">
                <img :src="item.avatarUrl" alt />
                <span class="msg-author">{{ item.from }}</span>
              </div>
              <div class="msg-content">{{ item.content }}</div>
            </div>
          </div>

          <!-- <div class="online">
          microzz上线了
          </div>-->
        </div>

        <!-- 输入区域 -->
        <!-- <div class="chatting-input">
          <transition name="slide-bottom">
            <div v-show="isShowEmoji" class="emoji-display">
              <ul>
                <li
                  @click="insertText(item)"
                  v-for="(item, index) of emojis"
                  v-bind:key="index"
                >{{item}}</li>
              </ul>
            </div>
          </transition>

          <div class="emoji">
            <i @click="showEmoji(isShowEmoji=!isShowEmoji);" class="icon-emoji"></i>
          </div>
          <textarea
            @keyup.enter="send"
            @input="newLine"
            ref="textarea"
            v-model.trim="inputContent"
            placeholder="左上角还有智能机器人哦"
          ></textarea>
          <button @click="send">发送</button>
        </div>-->
      </div>
    </ul>
    <!-- 这里可以放一些其它的 DOM，但不会影响滚动 -->
  </div>
</template>

<script>
export default {
  name: "chat",
  components: {},

  data() {
    return {
      chatMsgs: [
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

  .chatting-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    width: 100%;
    background-color: $blue;
    color: white;
    padding-left: 10px;
    padding-right: 15px;

    .chatting-back {
      width: 32px;
      height: 32px;
      .icon-back {
        background-size: contain;
      }
      .icon-back2 {
        background-size: contain;
      }
    }

    .chatting-title {
      i.icon-group {
        vertical-align: top;
        width: 30px;
        height: 30px;
        background-size: contain;
        margin-right: 3px;
      }
    }

    .chatting-menu {
      width: 30px;
      height: 30px;
      i.icon-menu {
        background-size: contain;
      }
    }
  }

  .chatting-content {
    flex: 1;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.1);
    overflow: auto;
    .chatting-item {
      padding: 10px;
      width: 100%;
      .msg-date {
        text-align: center;
        color: gray;
        font-size: 80%;
      }
      .msg-from {
        display: flex;
        align-items: center;
        span.loc {
          color: gray;
          font-size: 60%;
          margin-right: 5px;
        }
        .msg-author {
          font-size: 1.2rem;
        }
        img {
          width: 30px;
          height: 30px;
          border-radius: 15px;
        }
      }
      .msg-content {
        margin-top: 5px;
        background-color: white;
        width: 200px;
        padding: 6px 10px;
        border-radius: 10px;
      }
    }

    .chatting-item + .chatting-item {
      margin-top: 10px;
    }
    .self {
      .msg-from {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        img {
          margin-left: 10px;
        }
      }

      .msg-content {
        float: right;
        word-wrap: break-word;
        word-break: break-all;
        margin-right: 10px;
      }
    }

    .other {
      .msg-from {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        span.loc {
          color: gray;
          font-size: 60%;
          margin-right: 5px;
        }
        img {
          margin-right: 10px;
        }
      }

      .msg-content {
        float: left;
        margin-left: 10px;
        word-wrap: break-word;
        word-break: break-all;
      }
    }

    .online {
      width: 200px;
      // max-width: 100%;
      margin: 3px auto;
      border-radius: 4px;
      text-align: center;
      background-color: #fffde7;
    }
  }

  .chatting-input {
    position: relative;
    display: flex;
    height: 40px;
    width: 100%;
    .emoji-display {
      position: absolute;
      width: 100%;
      height: 210px;
      background-color: white;
      top: -210px;
      left: 0;
      overflow-y: auto;
      ul {
        display: flex;
        flex-wrap: wrap;

        li {
          padding: 2px 3px;
          font-size: 2.2rem;
        }
      }
    }
    .emoji {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 45px;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.1);
      .icon-emoji {
        width: 40px;
        height: 100%;
        background-size: contain;
      }
    }

    textarea {
      flex: 1;
      resize: none;
      padding-left: 3px;
      padding-top: 7px;
      padding-right: 3px;
      height: 100%;
      font-size: 1.4rem;
    }
    button {
      width: 60px;
      height: 100%;
      background-color: $blue;
      color: white;
      font-size: 16px;
    }
  }
}
</style>
