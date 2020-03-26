// 运行环境：安卓软件Auto.js(https://github.com/hyb1996/Auto.js), 下载地址: https://www.lanzous.com/i2hkbej
// 安卓7.0以上才能运行本脚本
// 需要先去图灵机器人官网(http://www.tuling123.com/)申请apiKey并填入代码

// 获取无障碍权限
auto.waitFor()

setInterval(() => {
    var msg = observePageMsg();
    if (msg) {
        sendMessage(msg);
    }
}, 2000)

// qq聊天界面监听对方消息
function observePageMsg() {
    // 获取聊天页面最后一个头像元素的left坐标
    var avatorElements = id("chat_item_head_icon").untilFind();
    var textElements = id("chat_item_content_layout").untilFind();
    var left = avatorElements[avatorElements.length - 1].bounds().left;
    var text = textElements[avatorElements.length - 1].text();

    // 最后一条消息来自对方
    if (left < 500) {
        return text;
    }
    return;
}

function sendMessage(herMsg) {
    var reqData = {
        perception: {
            inputText: {
                text: herMsg
            },
        },
        userInfo: {
            // apiKey，需要修改成你在图灵机器人官网申请下来的apiKey
            apiKey: "",
            userId: "1"
        }
    };
    // api接口地址
    var res = http.postJson('http://openapi.tuling123.com/openapi/api/v2', reqData);
    var resData = JSON.parse(res.body.string());
    input(0, resData.results[0].values.text);
    click("发送", 0)
}








