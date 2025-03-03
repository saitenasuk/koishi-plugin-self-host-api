import { log } from "console";
import { Context, Logger, Schema, h } from "koishi";
import {} from "koishi-plugin-markdown-to-image-service";

export const name = "self-host-api";

export const inject = {
  required: ["database", "http"],
  optional: ["markdownToImage"],
};

export interface Config {
  llm_config: LLM_config[];
}

export interface LLM_config {
  tokens: string;
  url: string;
  modelName: string;
  multiRoundDialogue: boolean;
  use_markdownToImage: boolean;
  tips: string;
}

export const Config: Schema<Config> = Schema.intersect([
  Schema.object({
    llm_config: Schema.array(
      Schema.object({
        name: Schema.string().description("查看模型列表时显示的名称").required(),
        url: Schema.string()
          .description("Api地址示例：https://api.deepseek.com")
          .required(),
        tokens: Schema.string().description("tokens&&apikey").required(),
        modelName: Schema.string().description("模型名称").required(),
        multiRoundDialogue: Schema.boolean()
          .description("是否开启多轮对话")
          .default(false)
          .hidden(),
        use_markdownToImage: Schema.boolean()
          .description("是否开启长文本markdown转图片")
          .default(false),
        tips: Schema.string().description(
          "大模型生成时发送的提示，不填写则不发送"
        ),
      })
    ),
  })
    .collapse(),
]);
declare module "koishi" {
  interface Tables {
    self_host_api_user: hostUser;
    self_host_api_room: hostRoom;
  }
}
export interface hostUser {
  id: number; // 主键
  qid: string; //QQid
  modelName: string; // 默认模型，进入房间时使用的模型
  currentRoom: string; // 用户当前所在房间
  roomId: string[]; //房间号,用户创建的房间
}
export interface hostRoom {
  id: number; // 主键
  uid: number; //user id
  modelName: string; // 当前房间使用的模型
  roomName: string; // 房间名称
  dialog_record: object; //对话记录
  request_content: object; //多轮对话请求内容
}

const text1: string =
  "根据搜索结果，以下是一些关于露码岛（露玛岛）的通关攻略和技巧：\n\n1. **基础操作**：游戏基础操作为WASD移动，鼠标左键进行割草/采集等动作，长按鼠标右键并拖动可以转动视角。长按鼠标左键可以连续操作，砍树挖矿不用重复点击[^3^]。\n\n2. **物品位置**：在建设你在露玛岛的小窝时，可能会找不到个别素材与道具，你可以在制造时使用QE来切换显示，不同原料的获取方式[^3^]。\n\n3. **露玛蛋获取**：游戏最快能获取的露玛蛋在城镇入口旁的遗迹中，通过解谜与战斗来到终点后，就能获得一颗露玛蛋。在城镇购买露玛孵化器蓝图后，就能孵化第一只露玛了[^3^]。\n\n4. **蓝图获取**：进入城镇左手边即可购买包括露玛孵化器在内的各种蓝图，随游戏进度商店会更新蓝图，记得时不时过来看看[^3^]。\n\n5. **职业选择**：内置七种职业，玩家进入其中后可以根据自己的需求选择喜欢的职业[^3^]。\n\n6. **矿洞探索**：矿井中需要大量火把，火把移除不返还材料，其他建筑返还材料[^5^]。\n\n7. **战斗技巧**：正式版中可以击杀幽灵与蜘蛛敌人了，使用鞭子可以打出硬直，之后注意走位就能消灭敌人了[^3^]。\n\n8. **黑暗地区**：在山洞等黑暗地区停留，将会很快死亡，因此采矿时请备好足够的火把与照明弹[^3^]。\n\n9. **喂食露玛**：选择露玛食物后，按R键即可抛出，露玛会自动进行。个别物品也可用R抛出，方便联机时快速交换物品[^3^]。\n\n10. **联机交换**：除抛物外，联机时也可通过小型箱子交换物品，其中也包括货币。箱子蓝图可在城镇处购买[^3^]。\n\n11. **提高采集效率**：城镇处铁砧可以升级工具，前期赚取金币的同时，多采集铜矿与收集宝箱中的工具代币，能有效提高工具升级速度[^3^]。\n\n12. **前往新地图**：城镇入口处右转即可触发前往新地图任务，更多区域大家可以自由探索[^3^]。\n\n这些攻略和技巧可以帮助你更好地通关露玛岛游戏。希望这些信息对你有所帮助！\n\n搜索结果来自：\n【检索 1】 [露玛岛攻略秘籍专题_露玛岛攻略大全 | 图文视频攻略 _ 游民星空 Gamersky.com](https://www.gamersky.com/handbook/Special/lumaisland/)\n\n【检索 2】 [欢迎来到露玛岛贴吧_露玛岛吧_百度贴吧](https://tieba.baidu.com/p/9274140295)\n\n【检索 3】 [露玛岛 全流程通关攻略合集 献礼水晶 解密 宝箱寻找 持续更新_哔哩哔哩bilibili](https://www.bilibili.com/video/BV1RmBiYcEs4/)\n\n【检索 4】 [【露玛岛】入坑必看！实用MOD+中文联机手把手教学攻略合集（小白级）_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV13qUUYXEdA/)\n\n【检索 5】 [前往山地区！拿到修船地图、别墅图纸、宠物增加到10只《露玛岛》实况第三期_单机游戏热门视频](https://www.bilibili.com/video/BV11wUdYfE13/)\n\n【检索 6】 [luma island 露玛岛开局攻略，两天两个luma蛋，开农场城镇所有宝箱和解密_哔哩哔哩bilibili_游戏实况](https://www.bilibili.com/video/BV1MySuYBEu9/)\n\n【检索 7】 [露玛岛攻略大全-露玛岛最新图文攻略汇总-游侠网](https://gl.ali213.net/html/2024-11/1553857.html)\n\n【检索 8】 [【露玛岛】最全地图解锁攻略，森林，雪山还有丛林岛_单机游戏热门视频](https://www.bilibili.com/video/BV1GMB1YSETY/)\n\n【检索 9】 [Steam｜多人联机种田+探险《露玛岛》值得入吗？_游戏推荐](https://www.bilibili.com/video/BV1LXzGYeEXe/)\n\n【检索 10】 [露玛岛攻略秘籍专题_露玛岛攻略大全 | 图文视频攻略 _ 游民星空 Gamersky.com](https://www.gamersky.com/z/luma-island/handbook/)\n\n【检索 11】 [种田养家采矿升级，全面探索农场区域【露玛岛】双人试玩实况02_哔哩哔哩bilibili_游戏实况](https://www.bilibili.com/video/BV1KPBxYDEfj/)\n\n【检索 12】 [四个地区矿洞攻略、四本太古之籍《露玛岛》实况第四期_实况解说](https://www.bilibili.com/video/BV1VMBiYZEoF/)\n\n【检索 13】 [【露玛岛】森林神庙全攻略，手把手教你通关森林神庙，位置和通关教程_单机游戏热门视频](https://www.bilibili.com/video/BV1G3BmYxEGi/)\n\n【检索 14】 [【露玛岛】边玩边分享的新手攻略，包括地图和成就攻略-3楼猫](https://game.3loumao.org/982200167)\n\n【检索 15】 [【露玛岛】建筑蓝图解锁攻略，摆脱小房车，住进大别墅_哔哩哔哩bilibili](https://www.bilibili.com/video/BV1qgBbYVENf/)\n\n【检索 16】 [【首发攻略】让我们成为露玛岛高手！](https://www.msn.com/zh-cn/gaming/other/%E9%A6%96%E5%8F%91%E6%94%BB%E7%95%A5-%E8%AE%A9%E6%88%91%E4%BB%AC%E6%88%90%E4%B8%BA%E9%9C%B2%E7%8E%9B%E5%B2%9B%E9%AB%98%E6%89%8B/ar-AA1uqymu)\n\n【检索 17】 [露玛岛正式版新人教程_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1PhSgYTErA/)\n\n【检索 18】 [露玛岛开局常见问题以及建议_哔哩哔哩bilibili](https://www.bilibili.com/video/BV1hAUDY9Ero/)\n\n【检索 19】 [露玛岛个人心得-3楼猫](https://game.3loumao.org/769113313)\n\n【检索 20】 [鲁玛岛_露玛岛LumaIsland下载,MOD,攻略,修改器,汉化补丁 ...](https://www.3dmgame.com/games/lumais/)\n\n【检索 21】 [玩了几天了说下游戏心得，适合新手老手就不用看了【露玛岛 ...](https://tieba.baidu.com/p/9289302252)\n\n【检索 22】 [两眼一睁就是肝!《露玛岛》：四位活宝的田园之梦_ …](https://club.gamersky.com/activity/947886?club=2)\n\n【检索 23】 [【11.22.24】《露玛岛（Luma Island）》官方中文 TENOKE ...](https://bbs.3dmgame.com/thread-6551504-1-1.html)\n\n【检索 24】 [[游戏评测] 不止联机种田，为什么说《露玛岛》是款细水长流 ...](https://nga.178.com/read.php?tid=42547001)\n\n【检索 25】 [【更新公告】 11月29日更新说明 - 见习猎魔团游戏 ... - TapTap](https://www.taptap.cn/moment/610545559446489067)\n\n【检索 26】 [《露玛岛》前往山地方法介绍 - 游侠网](https://gl.ali213.net/html/2024-11/1557791.html)\n\n【检索 27】 [《露玛岛（Luma Island）》联机版 - PC游戏综合资源区 ...](https://bbs.3dmgame.com/thread-6551259-1-1.html)\n\n【检索 28】 [露玛岛山地献礼水晶在哪-露玛岛山地献礼水晶位置介绍-游侠网](https://gl.ali213.net/html/2024-11/1559285.html)\n\n【检索 29】 [鲁玛岛攻略_鲁玛岛心得,秘籍,视频,流程攻略_3DM游戏网](https://www.3dmgame.com/games/lumais/gl/)\n\n【检索 30】 [露玛岛攻略秘籍专题_露玛岛攻略大全专题 | 图文视频攻略 ...](https://wap.gamersky.com/gl/List_11029/)\n\n【检索 31】 [鲁玛岛攻略秘籍_鲁玛岛全攻略_鲁玛岛攻略专区_游侠网](https://gl.ali213.net/z/91581/)\n\n【检索 32】 [《露玛岛》全自动种田攻略 如何搭建自动化农场 - 游民星空](https://www.gamersky.com/handbook/202411/1848425.shtml)\n\n【检索 33】 [《露玛岛》蜘蛛打法通关图文攻略 - 游侠网](https://gl.ali213.net/html/2024-11/1557659.html)\n\n【检索 34】 [《露玛岛》蜘蛛打法通关图文攻略_九游手机游戏](https://www.9game.cn/news/10654636.html)\n\n【检索 35】 [《露玛岛 Luma Island》如何解锁森林 – 游乐乐](https://www.yxlele.com/13186.html)\n\n【检索 36】 [露玛岛基础操作介绍 - 52PK单机游戏](https://pc.52pk.com/miji/7585772.shtml)\n\n【检索 37】 [联机玩怎么多人获得露玛蛋？【露玛岛吧】_百度贴吧](https://tieba.baidu.com/p/9278753446)\n\n【检索 38】 [露玛岛怎么玩 - 兔叽下载站](https://tujixiazai.com/tushushouce/v348055.html)\n\n【检索 39】 [鲁玛岛攻略分享 鲁玛岛玩法攻略大全 - 豌豆荚](https://www.wandoujia.com/strategy/15834861931722379401.html)\n\n【检索 40】 [露玛岛探险指南：揭秘如何达成所有隐藏成就_游戏攻略 ...](https://www.csgojidi.com/post/41083.html)\n\n【检索 41】 [露玛岛山地神庙全攻略 第一个神庙-游侠网](https://gl.ali213.net/html/2024-11/1559339_2.html)\n\n【检索 42】 [眩月【LumaIsland 露码岛】超乎想象的好玩！P17：探索山地矿洞，获得太古之籍_哔哩哔哩bilibili_游戏实况](https://www.bilibili.com/video/BV1q1zGYMEeY/)\n\n";

const text2: string =
  "好的，我已经阅读了你提供的链接内容。以下是该页面的主要内容概要：";
const text3: string =
  "根据搜索结果，以下是一些关于露码岛（露玛岛）的通关攻略和技巧：\n\n1. **基础操作**：游戏基础操作为WASD移动，鼠标左键进行割草/采集等动作，长按鼠标右键并拖动可以转动视角。长按鼠标左键可以连续操作，砍树挖矿不用重复点击[^3^]。\n\n2. **物品位置**：在建设你在露玛岛的小窝时，可能会找不到个别素材与道具，你可以在制造时使用QE来切换显示，不同原料的获取方式[^3^]。\n\n3. **露玛蛋获取**：游戏最快能获取的露玛蛋在城镇入口旁的遗迹中，通过解谜与战斗来到终点后，就能获得一颗露玛蛋。在城镇购买露玛孵化器蓝图后，就能孵化第一只露玛了[^3^]。\n\n4. **蓝图获取**：进入城镇左手边即可购买包括露玛孵化器在内的各种蓝图，随游戏进度商店会更新蓝图，记得时不时过来看看[^3^]。\n\n5. **职业选择**：内置七种职业，玩家进入其中后可以根据自己的需求选择喜欢的职业[^3^]。\n\n6. **矿洞探索**：矿井中需要大量火把，火把移除不返还材料，其他建筑返还材料[^5^]。\n\n7. **战斗技巧**：正式版中可以击杀幽灵与蜘蛛敌人了，使用鞭子可以打出硬直，之后注意走位就能消灭敌人了[^3^]。\n\n8. **黑暗地区**：在山洞等黑暗地区停留，将会很快死亡，因此采矿时请备好足够的火把与照明弹[^3^]。\n\n9. **喂食露玛**：选择露玛食物后，按R键即可抛出，露玛会自动进行。个别物品也可用R抛出，方便联机时快速交换物品[^3^]。\n\n10. **联机交换**：除抛物外，联机时也可通过小型箱子交换物品，其中也包括货币。箱子蓝图可在城镇处购买[^3^]。\n\n11. **提高采集效率**：城镇处铁砧可以升级工具，前期赚取金币的同时，多采集铜矿与收集宝箱中的工具代币，能有效提高工具升级速度[^3^]。\n\n12. **前往新地图**：城镇入口处右转即可触发前往新地图任务，更多区域大家可以自由探索[^3^]。\n\n这些攻略和技巧可以帮助你更好地通关露玛岛游戏。希望这些信息对你有所帮助！\n\n";
//解析失败文本
const analyze_err_text: string = "可能的原因:\n\n视频已被删除或者链接不正确。";
export async function apply(ctx: Context, config: Config) {
  //读取llm配置
  // let llm_url;
  // config.llm_config.map((item) => {
  //   llm_url = {
  //     ...llm_url,
  //     [item.modelName]: {
  //       url: item.url,
  //       tokens: item.tokens,
  //       multiRoundDialogue: item.multiRoundDialogue,
  //       use_markdownToImage: item.use_markdownToImage,
  //       tips: item.tips,
  //     },
  //   };
  // });
  // console.log("test1:", llm_url);

  ctx.model.extend("self_host_api_user", {
    // 各字段的类型声明
    id: "unsigned", // id
    qid: "char", //qq号
    modelName: "string", // 默认模型，进入房间时使用的模型
    currentRoom: "string", //当前房间
    roomId: "list", //房间号,用户创建的房间
  });
  ctx.model.extend("self_host_api_room", {
    id: "unsigned", // id
    uid: "unsigned", //user id
    modelName: "string", // 当前房间使用的模型
    roomName: "string", // 房间名称
    dialog_record: "object", //对话记录
    request_content: "object", //多轮对话请求内容
  });

  /**
   * 实现流式响应接收
   * @param url 请求地址
   * @param content
   * @param config
   * @returns
   */
  const deepseekAPI = async (url: string, content: any, config: any) => {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: "Bearer" + " " + config.tokens,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek",
          messages: [
            {
              role: "user",
              content: content,
            },
          ],
          use_search: config.use_search.link,
          stream: false,
        }),
      });
      return res.json();
    } catch (error) {
      ctx.logger.error("error", error);
      throw error;
    }
  };
  const universalAPI = async (
    url: string,
    content: any,
    model: string,
    token: string
  ) => {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: "Bearer" + " " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: model,
          messages: [
            {
              role: "user",
              content: content,
            },
          ],
          stream: false,
        }),
      });
      return res.json();
    } catch (error) {
      ctx.logger.error("error", error);
      throw error;
    }
  };
  //判断是否markdown
  function isMarkdown(text: string): boolean {
    const markdownPatterns = [
      /^#+\s/, // 标题
      /^-\s/, // 无序列表
      /^\d+\.\s/, // 有序列表
      /\[.*?\]\(.*?\)/, // 链接
      /!\[.*?\]\(.*?\)/, // 图片
      /\*\*(.*?)\*\*/, // 粗体
      /__(.*?)__/, // 粗体
      /\*(.*?)\*/, // 斜体
      /_(.*?)_/, // 斜体
      /`(.*?)`/, // 代码
      /^\|.*\|$\n^\|([-:]+\|)+$(\n^\|.*\|$)*/m, // 表格
    ];
    return markdownPatterns.some((pattern) => pattern.test(text));
  }
  // ctx.command("ai <message:text> 与ai对话").action(() => {});
  ctx
    .command("ds <message:text> 与ai对话")
    // .option("link", "-l <message:text>")
    .example("ds 鲁迅为什么暴打周树人")
    .action(async (_, message) => {
      ctx.logger.info(_.session.username+"发送了："+_.source)
      // console.log(_);
      // return;
      let tipMessageId;
      try {
        if (config.llm_config[0].tips)
          tipMessageId = await _.session.send(<>{config.llm_config[0].tips}</>);
        const startTime = Date.now(); // 记录请求开始时间
        const res = await universalAPI(
          config.llm_config[0].url,
          message,
          config.llm_config[0].modelName,
          config.llm_config[0].tokens
        );
        const endTime = Date.now(); // 记录请求结束时间
        const duration = endTime - startTime; // 计算请求耗时（单位：毫秒）
        ctx.logger.info("消息：“"+_.source+"”请求已返回，耗时"+ duration / 1000 + "秒")
        const content = res.choices[0].message.content;
        if (
          isMarkdown(content) &&
          ctx.markdownToImage &&
          config.llm_config[0].use_markdownToImage
        ) {
          const imageBuffer = await ctx.markdownToImage.convertToImage(content);
          await _.session.sendQueued(
            <>
              <quote id={_.session.messageId} />
              {h.image(imageBuffer, "image/png")}
              {"生成耗时" + duration / 1000 + "秒"}
            </>
          );
          //发送kimi检索的网址
          // if (
          //   config[0].use_search.link &&
          //   config.use_search.show_link &&
          //   parts.length > 1
          // ) {
          //   const searchSource = parts[1].split("\n\n");
          //   // console.log("searchSource :>> ", searchSource);
          //   await _.session.sendQueued(
          //     <>
          //       <message forward>
          //         {searchSource.map((item) => (
          //           <>
          //             <message>{item}</message>
          //           </>
          //         ))}
          //       </message>
          //     </>
          //   );
          // }
        } else {
          _.session.send(
            <>
              <quote id={_.session.messageId} />
              {content}
              {`\n生成耗时${duration / 1000}秒`}
            </>
          );
        }
      } catch (error) {
        ctx.logger.error("error :>> ", error);
        try {
          // 尝试发送错误信息，也进行异常捕获，防止再次引发异常
          _.session.send(`出现错误：${error.message}`);
        } catch (sendError) {
          ctx.logger.error("发送错误信息时出现异常：", sendError.message);
        }
      } finally {
        await _.session.cancelQueued();
        await _.session.bot.deleteMessage(_.session.channelId, tipMessageId);
      }
    });
  ctx
    .command("dstk <message:text> 与deepseek-R1对话")
    .action(async (_, message) => {
      ctx.logger.info(_.session.username+"发送了："+_.source)
      let tipMessageId;
      try {
        if (config.llm_config[0].tips)
          tipMessageId = await _.session.send(<>{config.llm_config[0].tips}</>);
        const startTime = Date.now(); // 记录请求开始时间
        const res = await universalAPI(
          config.llm_config[1].url,
          message,
          config.llm_config[1].modelName,
          config.llm_config[1].tokens
        );
        console.log("res :>> ", res);
        const endTime = Date.now(); // 记录请求结束时间
        const duration = endTime - startTime; // 计算请求耗时（单位：毫秒）
        ctx.logger.info("消息：“"+_.source+"”请求已返回，耗时"+ duration / 1000 + "秒")
        const content = res.choices[0].message.content;
        let thinkContent
        if (
          isMarkdown(content) &&
          ctx.markdownToImage &&
          config.llm_config[0].use_markdownToImage
        ) {
          const imageBuffer = await ctx.markdownToImage.convertToImage(content);
          await _.session.sendQueued(
            <>
              <quote id={_.session.messageId} />
              {h.image(imageBuffer, "image/png")}
              {"生成耗时" + duration / 1000 + "秒"}
            </>
          );
          if(res.choices[0].message.reasoning_content){
            const reasoning_content = res.choices[0].message.reasoning_content;
            thinkContent = reasoning_content
            await _.session.sendQueued(
              <>
                <message forward>
                  <>
                    <message>思考过程</message>
                    <message>{reasoning_content}</message>
                  </>
                </message>
              </>
            );
          }
          
        } else {
          await _.session.sendQueued(
            <>
              <quote id={_.session.messageId} />
              {content}
              {`\n生成耗时${duration / 1000}秒`}
            </>
          );
          if(thinkContent){
            await _.session.sendQueued(
              <>
                <message forward>
                  <>
                  <message>思考过程</message>
                  <message>{thinkContent}</message>
                </>
              </message>
            </>
          );
        }
        }
      } catch (error) {
        ctx.logger.error("error :>> ", error);
        try {
          // 尝试发送错误信息，也进行异常捕获，防止再次引发异常
          _.session.send(`出现错误：${error.message}`);
        } catch (sendError) {
          ctx.logger.error("发送错误信息时出现异常：", sendError.message);
        }
      } finally {
        await _.session.cancelQueued();
        await _.session.bot.deleteMessage(_.session.channelId, tipMessageId);
      }
    });
  ctx.command("kimi <message:text> 与kimi对话").action(async (_, message) => {
    ctx.logger.info(_.session.username+"发送了："+_.source)
    let tipMessageId;
    try {
      if (config.llm_config[0].tips)
        tipMessageId = await _.session.send(<>{config.llm_config[0].tips}</>);
      const startTime = Date.now(); // 记录请求开始时间
      const res = await universalAPI(
        config.llm_config[2].url,
        message,
        config.llm_config[2].modelName,
        config.llm_config[2].tokens
      );
      console.log("res :>> ", res);
      const endTime = Date.now(); // 记录请求结束时间
      const duration = endTime - startTime; // 计算请求耗时（单位：毫秒）
      ctx.logger.info("消息：“"+_.source+"”请求已返回，耗时"+ duration / 1000 + "秒")
      const content = res.choices[0].message.content;
      console.log("res.choices[0] :>> ", res.choices[0]);
      if (
        isMarkdown(content) &&
        ctx.markdownToImage &&
        config.llm_config[0].use_markdownToImage
      ) {
        const imageBuffer = await ctx.markdownToImage.convertToImage(content);
        await _.session.sendQueued(
          <>
            <quote id={_.session.messageId} />
            {h.image(imageBuffer, "image/png")}
            {"生成耗时" + duration / 1000 + "秒"}
          </>
        );
      } else {
        await _.session.sendQueued(
          <>
            <quote id={_.session.messageId} />
            {content}
            {`\n生成耗时${duration / 1000}秒`}
          </>
        );
      }
    } catch (error) {
      ctx.logger.error("error :>> ", error);
      try {
        // 尝试发送错误信息，也进行异常捕获，防止再次引发异常
        _.session.send(`出现错误：${error.message}`);
      } catch (sendError) {
        ctx.logger.error("发送错误信息时出现异常：", sendError.message);
      }
    } finally {
      await _.session.cancelQueued();
      await _.session.bot.deleteMessage(_.session.channelId, tipMessageId);
    }
  });
  ctx
    .command("doubao <message:text> 与doubao对话")
    .action(async (_, message) => {
      let tipMessageId;
      try {
        if (config.llm_config[0].tips)
          tipMessageId = await _.session.send(<>{config.llm_config[0].tips}</>);
        const startTime = Date.now(); // 记录请求开始时间
        const res = await universalAPI(
          config.llm_config[3].url,
          message,
          config.llm_config[3].modelName,
          config.llm_config[3].tokens
        );
        console.log("res :>> ", res);
        const endTime = Date.now(); // 记录请求结束时间
        const duration = endTime - startTime; // 计算请求耗时（单位：毫秒）
        const content = res.choices[0].message.content;
        if (
          isMarkdown(content) &&
          ctx.markdownToImage &&
          config.llm_config[0].use_markdownToImage
        ) {
          const imageBuffer = await ctx.markdownToImage.convertToImage(content);
          await _.session.sendQueued(
            <>
              <quote id={_.session.messageId} />
              {h.image(imageBuffer, "image/png")}
              {"生成耗时" + duration / 1000 + "秒"}
            </>
          );
        } else {
          await _.session.sendQueued(
            <>
              <quote id={_.session.messageId} />
              {content}
              {`\n生成耗时${duration / 1000}秒`}
            </>
          );
        }
      } catch (error) {
        ctx.logger.error("error :>> ", error);
        try {
          // 尝试发送错误信息，也进行异常捕获，防止再次引发异常
          _.session.send(`出现错误：${error.message}`);
        } catch (sendError) {
          ctx.logger.error("发送错误信息时出现异常：", sendError.message);
        }
      } finally {
        await _.session.cancelQueued();
        await _.session.bot.deleteMessage(_.session.channelId, tipMessageId);
      }
    });
  ctx.command("ails <message:text> 与kimil对话").action(async (_, message) => {
    _.session.send(
      `1.deepseek-v3 \t指令：ds \n2.deepseek-R1 \t指令：dstk \n4.kimi \t指令：kimi \n3.doubao \t指令：doubao \n5.默认模型 \t指令：ai`
    );
  });
}
