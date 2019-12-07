<template>
  <div class="wrapper" ref="wrapper">
    <!-- 聊天内容区域 -->
    <div class="chatting" ref="chatting" :style="chattingStyleObj">
      <div ref="chattingContent" class="chatting-content">
        <div v-for="(item, index) in chatMsgs" v-bind:key="index">
          <div class="chatting-item" :class="{self:item.self}">
            <div class="msg-authorPic">
              <van-image :src="item.avatarUrl" />
            </div>
            <div class="msg-con">
              <div class="msg-author">{{item.from}}</div>
              <p class="msg-content">{{item.content}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部 -->
    <div class="foot" ref="foot">
      <div class="send" @click="clickSend">
        <!-- <van-button type="default">默认按钮</van-button> -->
        <van-button type="info" size="normal" :disabled="!light">发送</van-button>
      </div>
      <div class="input">
        <van-field
          :disabled="!enableInput"
          v-model="inputmessage"
          maxlength="100"
          clearable
          @input="whatInput"
          placeholder="聊聊吧..."
          class="input-message"
        />
      </div>
    </div>
    <!-- 这里可以放一些其它的 DOM，但不会影响滚动 -->
  </div>
</template>

<script>
import { Row, Col, Image, ImagePreview, Field, Button } from "vant";
import Bscroll from "better-scroll";
export default {
  name: "chat",
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Image.name]: Image,
    [ImagePreview.name]: ImagePreview,
    [Field.name]: Field,
    [Button.name]: Button
  },

  data() {
    return {
      path: "wss://localhost:44374/ws/",
      socket: "",
      chattingStyleObj: {
        height: ""
      },
      // scroll: null,
      chatMsgs: [
        {
          date: "2015-11-09 09:57:08",
          loc: "江西省南昌市",
          from: "microzz",
          avatarUrl: `http://m.3456.tv/images/2019yuan.png`,
          content: "testsssssssss ",
          self: true
        },
        {
          date: "2015-11-09 09:57:08",
          loc: "江西省南昌市",
          from: "昵称",
          avatarUrl: `http://m.3456.tv/images/2019yuan.png`,
          content:
            "中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文",
          self: false
        },
        {
          date: "2015-11-09 09:57:08",
          loc: "江西省南昌市",
          from: "microzz",
          avatarUrl: `http://m.3456.tv/images/2019yuan.png`,
          content: "testdddddddddd",
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
      enableInput: true, //是否禁言
      inputmessage: "", //输入的文本内容
      light: false //输入框不为空时，使能发送按钮
    };
  },
  methods: {
    setchattingHeight() {
      this.chattingStyleObj.height =
        this.$refs.wrapper.offsetHeight - this.$refs.foot.offsetHeight + "px";
      console.log(this.$refs.wrapper.offsetHeight);
      console.log(this.$refs.foot.offsetHeight);
    },
    whatInput() {
      if (this.inputmessage.replace(/\s+/g, "") == "") {
        this.light = false;
      } else {
        this.light = true;
      }
    },
    clickSend() {
      // socket.emit("chat", {
      //   user_id: this.userInfo.id,
      //   content: this.inputmessage
      // });
      this.socketsend({
        date: "2015-11-09 09:57:08",
        loc: "江西省南昌市",
        from: "microzz",
        avatarUrl: `http://m.3456.tv/images/2019yuan.png`,
        content: this.inputmessage,
        self: true
      });
      this.inputmessage = "";
      this.light = false;
    },
    /*websocket*/
    socketInit: function() {
      if (typeof WebSocket === "undefined") {
        this.enableInput = false;
      } else {
        // 实例化socket
        this.socket = new WebSocket(this.path);
        // 监听socket连接
        this.socket.onopen = this.socketopen;
        // 监听socket错误信息
        this.socket.onerror = this.socketerror;
        // 监听socket消息
        this.socket.onmessage = this.socketgetMessage;
      }
    },
    socketopen: function() {
      console.log("socket连接成功");
    },
    socketerror: function() {
      console.log("连接错误");
    },
    socketgetMessage: function(msg) {
      console.log(msg.data);
      this.chatMsgs.push(JSON.parse(msg.data));
      this.$nextTick(() => {
        this.scroll.refresh();
        console.log(this.$refs.chattingContent.offsetHeight);
        this.scroll.scrollTo(0, 250-this.$refs.chattingContent.offsetHeight, 700);
      });
    },
    socketsend: function(params) {
      this.socket.send(JSON.stringify(params));
    },
    socketclose: function() {
      console.log("socket已经关闭");
    }
  },

  mounted() {
    this.setchattingHeight();
    this.socketInit();
    this.$nextTick(() => {
      this.scroll = new Bscroll(this.$refs.chatting, {
        scrollY: true,
        scrollX: false,
        mouseWheel: true,
        click: true,
        taps: true,
        startY: -999
      });
    });
  },
  destroyed() {
    this.socket.onclose = this.close;
  }
};
</script>

<style scoped  lang="scss">
$blue: #2196f3;
.wrapper {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  .chatting {
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.1);
    .chatting-content {
      width: 100%;
      overflow: hidden;
      .self {
        flex-direction: row-reverse;
        text-align: right;
      }
      .chatting-item {
        margin-top: 5px;
        margin-bottom: 5px;
        width: 100%;
        display: flex;

        .msg-authorPic {
          width: 10%;
          margin-right: 2%;
          margin-left: 2%;
        }

        .msg-con {
          .msg-author {
            font-size: 12px;
            color: #666;
          }
          .msg-content {
            background-color: white;
            max-width: 250px;
            border-radius: 10px;
            padding: 10px;
            margin-top: 5px;
          }
        }
      }
    }
  }
  .foot {
    height: 60px;
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    .input {
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      padding-left: 10px;
      // input {
      //   border: 1px;
      //   border-style: solid;
      //   border-color: #999;
      //   border-radius: 5px;
      //   height: 30px;
      //   line-height: 30px;
      //   padding-left: 5px;
      //   margin-top:10px;
      //   margin-left:10px;
      //   font-size: 14px;
      //   width: 90%;
      // }
    }
    .send {
      width: 100px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
