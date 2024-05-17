<template>
    <div style="letter-spacing: 1px">
        <div class="head">
            <!-- 评论框 -->
            <input
                type="text"
                placeholder="请输入评论 . . ."
                ref="input"
                @focus="obtain"
                @blur="lose"
                v-model="firstComments"
                @keyup.enter="submit"
            />
            <!-- 发布按钮 -->
            <button @click="submit">发表评论</button>
        </div>
        <div class="content">
            <!-- 一级评论 -->
            <div class="first" v-for="(item, index) in comments" :key="index">
                <div class="space"></div>
                <div class="first-content">
                    <!-- 一级评论用户昵称 -->
                    <h3 class="first-username">{{ item.username }}</h3>
                    <!-- 一级评论发布时间 -->
                    <span class="first-time">{{ item.date }}</span>
                    <!-- 一级评论评论内容 -->
                    <p class="first-comment">
                        {{ item.content }}
                    </p>
                    <div class="first-right">
                        <span class="delete" @click="commentDelete(item)">删除</span>
                        <span class="comments" @click="commentInput(item)">评论</span>
                    </div>
                    <!-- 回复一级评论 -->
                    <div class="reply-comment" v-if="item.display">
                        <input
                            type="text"
                            placeholder="请输入评论 . . ."
                            v-model="childComments"
                            @keyup.enter="replySubmit(item, '父级', index)"
                            @blur="lose(item)"
                        />
                        <!-- 0为回复一级评论 -->
                        <button @click="replySubmit(item, '父级', index)">发表评论</button>
                    </div>
                    <!-- 次级评论 -->
                    <div class="second">
                        <ul>
                            <li v-for="(sons, sons_index) in item.sons" :key="sons_index">
                                <div class="top">
                                    <div class="second-content">
                                        <!-- 次级评论用户昵称 -->
                                        <h3 class="second-username">{{ sons.username }}</h3>
                                        <!-- 次级评论评论时间 -->
                                        <span class="second-time">{{ sons.date }}</span>
                                        <!-- 次级评论内容 xxx回复xxx：评论内容-->
                                        <p class="second-comment">
                                            <span class="second-reply">
                                                <span class="to_reply">{{ sons.username }}</span>
                                                回复
                                                <span class="to_reply">{{ sons.to_username }}</span
                                                >：
                                            </span>
                                            {{ sons.content }}
                                        </p>
                                        <div class="second-right">
                                            <span class="delete" @click="commentDelete(sons)"
                                                >删除</span
                                            >
                                            <span class="comments" @click="commentInput(sons)"
                                                >评论</span
                                            >
                                        </div>
                                    </div>
                                </div>
                                <!-- 回复次级评论 -->
                                <div class="reply-comment reply_li" v-if="sons.display">
                                    <input
                                        type="text"
                                        placeholder="请输入评论 . . ."
                                        v-model="childComments"
                                        @keyup.enter="replySubmit(sons, '子级', index, sons_index)"
                                        @blur="lose(sons)"
                                    />
                                    <!-- 1为回复次级评论 -->
                                    <button @click="replySubmit(sons, '子级', index, sons_index)">
                                        发表评论
                                    </button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- 暂无评论的空状态 -->
            <elEmpty description="暂无评论" v-if="show"></elEmpty>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Api from '@/api/comments'
import { ElEmpty } from 'element-plus'

onMounted(() => {
    getComments()
})
function getComments() {
    Api.getData().then((res: any) => {
        comments.value = res.data || []
    })
}
function lose(m) {
    // m.display = false
}
const current = ref(new Date()) //时间
const firstComments = ref('')
const comments = ref([])
const childComments = ref('')
const show = ref(false) //暂无条件显示

function submit() {
    if (firstComments.value == '') return
    current.value = new Date() //获取当前时间年月日、时分秒
    const newMsg = {
        username: sessionStorage.getItem('userName'),
        content: firstComments.value
    }
    comments.value.push(newMsg)
    Api.add(newMsg).then(() => {
        getComments()
    })
    firstComments.value = ''
}

function commentInput(m) {
    m.display = true
}

function commentDelete(m) {
    Api.del(m.id).then(() => {
        getComments()
    })
}

function replySubmit(m, n, w, t) {
    console.log(m, n, w, t, comments.value)
    if (childComments.value == '') return
    var index
    if (n == '父级') {
        index = t
    } else if (n == '子级') {
        index = t + 1
    }
    const newMsg = {
        parentId: n == '父级' ? m.id : m.parentId,
        username: sessionStorage.getItem('userName'),
        content: childComments.value,
        to_username: m.username
    }
    comments.value[w].sons.splice(index, 0, newMsg)
    // const params = JSON.stringify(newMsg)
    Api.add(newMsg).then(() => {
        getComments()
    })
    firstComments.value = ''
    childComments.value = ''
    m.display = false
}
</script>

<style>
/* 评论框 */
.head {
    background-color: rgb(248, 248, 248);
    position: relative;
    height: 75px;
    border-radius: 5px;
}
.head img {
    width: 55px;
    height: 55px;
    border-radius: 50%;
    position: absolute;
    top: 10px;
    left: 13px;
}
/* 评论框 */
.head input {
    position: absolute;
    top: 13px;
    left: 80px;
    height: 45px;
    border-radius: 5px;
    outline: none;
    width: 65%;
    font-size: 20px;
    padding: 0 20px;
    border: 2px solid #f8f8f8;
}
/* 发布评论按钮 */
.head button {
    position: absolute;
    top: 13px;
    right: 20px;
    width: 120px;
    height: 48px;
    border: 0;
    border-radius: 5px;
    font-size: 20px;
    font-weight: 500;
    color: #fff;
    background-color: #4cb275;
    cursor: pointer;
    letter-spacing: 2px;
}
/* 鼠标经过字体加粗 */
.head button:hover {
    font-weight: 600;
}

/* 评论内容区域 */
.content .first {
    display: flex;
    position: relative;
    padding: 10px 10px 0px 0;
    text-align: left;
    width: 100%;
}
.first .space {
    flex: 1;
    text-align: center;
}
.first img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
}
.first-username,
.second-username {
    color: #504f4f;
}
.first-content {
    flex: 9;
}
.first-time,
.second-time {
    color: #767575;
}
.first-comment,
.second-comment {
    margin-top: 5px;
}
/* 右边点赞和评论 */
.first-right,
.second-right {
    position: absolute;
    right: 1%;
    top: 10px;
}
.first-right span,
.second-right span {
    margin-right: 20px;
    cursor: pointer;
}
/* 删除评论 */
.delete:hover {
    color: red;
}
/* 点赞字体图标 */
.praise::before {
    /* 想使用的icon的十六制编码，去掉&#x之后的 */
    content: '\ec7f';
    /* 必须加 */
    font-family: 'iconfont';
    margin-right: 4px;
    font-size: 19px;
}
.second {
    background-color: #f3f3f3;
    margin-top: 10px;
}
.second li {
    padding: 10px 10px 10px 0;
    border-bottom: 1px solid rgb(237, 237, 237);
}
.second .top {
    display: flex;
    position: relative;
}
.to_reply {
    color: rgb(106, 106, 106);
}
.second-content {
    flex: 9;
}
.second .reply_li {
    margin-left: 70px;
}
/* 评论框 */
.reply-comment {
    margin: 10px 0 0 0;
}
.reply-comment input {
    height: 40px;
    border-radius: 5px;
    outline: none;
    width: 70%;
    font-size: 18px;
    padding: 0 20px;
    /* border: 2px solid #f8f8f8; */
    border: 1px solid #4cb275;
}
/* 发布评论按钮 */
.reply-comment button {
    width: 15%;
    height: 43px;
    border: 0;
    border-radius: 5px;
    font-size: 18px;
    font-weight: 500;
    color: #fff;
    background-color: #4cb275;
    cursor: pointer;
    letter-spacing: 2px;
    margin-left: 20px;
}
/* 鼠标经过字体加粗 */
.reply-comment button:hover {
    font-weight: 600;
}
/* 评论点赞颜色 */
.comment-like {
    color: red;
}
</style>
