*   目前OpenAI-HK主要提供GPT3.5和GPT4.0两种接口服务，需要支付费用后才可调用
*   用户可根据需求进行调用。
*   [官方参考](https://platform.openai.com/docs/api-reference/chat/create) 需要科学上网

调用方式[​](https://www.openai-hk.com/docs/getting-started.html#%E8%B0%83%E7%94%A8%E6%96%B9%E5%BC%8F)
-------------------------------------------------------------------------------------------------

1.  先通过 [openai-hk](https://www.openai-hk.com/m/ai)注册一个帐号；
2.  登录后，点击：【获取key】即可获得api-key;
3.  复制KEY 返回的hk-开头的api\_key，将原请求头中的api\_key 替换成我们专属的 api\_key![cover](https://www.openai-hk.com/docs/assets/h1.086ee373.png)例如：

原来: sk-sdiL2SMN4D7GBqFhBsYdT2345kFJhwEHGXbU5RzCM8dS3lrn

现在: hk-wsvj0oyeb0srl8b76xgzolc678996mhwlk3p3y7p3qo9wjdl

OpenAI 的 api\_key 通常以 sk- 作为开头，但我们平台的 api\_key 以 hk- 开头 后面是 48 位随机字符串

原请求地址 api.openai.com的后面加上-hk，即 api.openai-hk.com

例如：

原来: [https://api.openai.com/v1/chat/completions](https://api.openai.com/v1/chat/completions)

现在: [https://api.openai-hk.com/v1/chat/completions](https://api.openai-hk.com/v1/chat/completions)

🔥对话接口实例[​](https://www.openai-hk.com/docs/getting-started.html#%F0%9F%94%A5%E5%AF%B9%E8%AF%9D%E6%8E%A5%E5%8F%A3%E5%AE%9E%E4%BE%8B)
-----------------------------------------------------------------------------------------------------------------------------------

*   实例是以对话(v1/chat/completions) 接口 作为样例；官方还有很多类型的结果
*   更多对话接口参数，请参考官网文档 [https://platform.openai.com/docs/api-reference/chat/create](https://platform.openai.com/docs/api-reference/chat/create)
*   下面为各位准备好多实例

### CURL 实例[​](https://www.openai-hk.com/docs/getting-started.html#curl-%E5%AE%9E%E4%BE%8B)


```
    curl --request POST \
      --url https://api.openai-hk.com/v1/chat/completions \
      --header 'Authorization: Bearer hk-替换为你的key' \
      -H "Content-Type: application/json" \
      --data '{
        "max_tokens": 1200,
        "model": "gpt-3.5-turbo",
        "temperature": 0.8,
        "top_p": 1,
        "presence_penalty": 1,
        "messages": [
            {
                "role": "system",
                "content": "You are ChatGPT, a large language model trained by OpenAI. Answer as concisely as possible."
            },
            {
                "role": "user",
                "content": "你是chatGPT多少？"
            }
        ]
    }'

```

如需调用4.0，可将上面modle中 gpt-3.5-turbo改为gpt-4或gpt-4-0613即可。

### PHP 实例[​](https://www.openai-hk.com/docs/getting-started.html#php-%E5%AE%9E%E4%BE%8B)

```
    $ch = curl_init();
    
    curl_setopt($ch, CURLOPT_URL, 'https://api.openai-hk.com/v1/chat/completions');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POST, 1);
    
    $headers = array();
    $headers[] = 'Content-Type: application/json';
    $headers[] = 'Authorization: Bearer hk-替换为你的key';
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    
    $data = array(
        'max_tokens' => 1200,
        'model' => 'gpt-3.5-turbo',
        'temperature' => 0.8,
        'top_p' => 1,
        'presence_penalty' => 1,
        'messages' => array(
            array(
                'role' => 'system',
                'content' => 'You are ChatGPT, a large language model trained by OpenAI. Answer as concisely as possible.'
            ),
            array(
                'role' => 'user',
                'content' => '你是chatGPT多少？'
            )
        )
    );
    
    $data_string = json_encode($data);
    
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
    
    $result = curl_exec($ch);
    
    if (curl_errno($ch)) {
        echo 'Error:' . curl_error($ch);
    }
    
    curl_close($ch);
    
    echo $result;
```

如需调用4.0，可将上面modle中 gpt-3.5-turbo改为gpt-4或gpt-4-0613即可。

### Python 实例[​](https://www.openai-hk.com/docs/getting-started.html#python-%E5%AE%9E%E4%BE%8B)

```

    import requests
    import json
    
    url = "https://api.openai-hk.com/v1/chat/completions"
    
    headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer hk-替换为你的key"
    }
    
    data = {
        "max_tokens": 1200,
        "model": "gpt-3.5-turbo",
        "temperature": 0.8,
        "top_p": 1,
        "presence_penalty": 1,
        "messages": [
            {
                "role": "system",
                "content": "You are ChatGPT, a large language model trained by OpenAI. Answer as concisely as possible."
            },
            {
                "role": "user",
                "content": "你是chatGPT多少？"
            }
        ]
    }
    
    response = requests.post(url, headers=headers, data=json.dumps(data).encode('utf-8') )
    result = response.content.decode("utf-8")
    
    print(result)
```

如需调用4.0，可将上面modle中 gpt-3.5-turbo改为gpt-4或gpt-4-0613即可。

### javascript 实例[​](https://www.openai-hk.com/docs/getting-started.html#javascript-%E5%AE%9E%E4%BE%8B)

```

    const axios = require('axios');
    
    const url = 'https://api.openai-hk.com/v1/chat/completions';
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer hk-替换为你的key'
    };
    
    const data = {
      max_tokens: 1200,
      model: 'gpt-3.5-turbo',
      temperature: 0.8,
      top_p: 1,
      presence_penalty: 1,
      messages: [
        {
          role: 'system',
          content: 'You are ChatGPT, a large language model trained by OpenAI. Answer as concisely as possible.'
        },
        {
          role: 'user',
          content: '你是chatGPT多少？'
        }
      ]
    };
    
    axios.post(url, data, { headers })
      .then(response => {
        const result = response.data;
        console.log(result);
      })
      .catch(error => {
        console.error(error);
      });
```

如需调用4.0，可将上面modle中 gpt-3.5-turbo改为gpt-4或gpt-4-0613即可。

### typescript 实例[​](https://www.openai-hk.com/docs/getting-started.html#typescript-%E5%AE%9E%E4%BE%8B)

```

    import axios from 'axios';
    
    const url = 'https://api.openai-hk.com/v1/chat/completions';
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer hk-替换为你的key'
    };
    
    const data = {
      max_tokens: 1200,
      model: 'gpt-3.5-turbo',
      temperature: 0.8,
      top_p: 1,
      presence_penalty: 1,
      messages: [
        {
          role: 'system',
          content: 'You are ChatGPT, a large language model trained by OpenAI. Answer as concisely as possible.'
        },
        {
          role: 'user',
          content: '你是chatGPT多少？'
        }
      ]
    };
    
    axios.post(url, data, { headers })
      .then(response => {
        const result = response.data;
        console.log(result);
      })
      .catch(error => {
        console.error(error);
      });
```
如需调用4.0，可将上面modle中 gpt-3.5-turbo改为gpt-4或gpt-4-0613即可。

### java 实例[​](https://www.openai-hk.com/docs/getting-started.html#java-%E5%AE%9E%E4%BE%8B)

```

    import okhttp3.*;
    
    import java.io.IOException;
    
    public class OpenAIChat {
    
        public static void main(String[] args) throws IOException {
            String url = "https://api.openai-hk.com/v1/chat/completions";
            
            OkHttpClient client = new OkHttpClient();
    
            MediaType mediaType = MediaType.parse("application/json");
    
            String json = "{\n" +
                    "  \"max_tokens\": 1200,\n" +
                    "  \"model\": \"gpt-3.5-turbo\",\n" +
                    "  \"temperature\": 0.8,\n" +
                    "  \"top_p\": 1,\n" +
                    "  \"presence_penalty\": 1,\n" +
                    "  \"messages\": [\n" +
                    "    {\n" +
                    "      \"role\": \"system\",\n" +
                    "      \"content\": \"You are ChatGPT, a large language model trained by OpenAI. Answer as concisely as possible.\"\n" +
                    "    },\n" +
                    "    {\n" +
                    "      \"role\": \"user\",\n" +
                    "      \"content\": \"你是chatGPT多少？\"\n" +
                    "    }\n" +
                    "  ]\n" +
                    "}";
    
            RequestBody body = RequestBody.create(mediaType, json);
            Request request = new Request.Builder()
                    .url(url)
                    .post(body)
                    .addHeader("Content-Type", "application/json")
                    .addHeader("Authorization", "Bearer hk-替换为你的key")
                    .build();
    
            Call call = client.newCall(request);
            Response response = call.execute();
            String result = response.body().string();
            System.out.println(result);
        }
    
    }
```

如需调用4.0，可将上面modle中 gpt-3.5-turbo改为gpt-4或gpt-4-0613即可。

### go 实例[​](https://www.openai-hk.com/docs/getting-started.html#go-%E5%AE%9E%E4%BE%8B)

```
    package main
    
    import (
    	"bytes"
    	"encoding/json"
    	"fmt"
    	"net/http"
    )
    
    func main() {
    	url := "https://api.openai-hk.com/v1/chat/completions"
    	apiKey := "hk-替换为你的key"
    
    	payload := map[string]interface{}{
    		"max_tokens":        1200,
    		"model":             "gpt-3.5-turbo",
    		"temperature":       0.8,
    		"top_p":             1,
    		"presence_penalty":  1,
    		"messages": []map[string]string{
    			{
    				"role":    "system",
    				"content": "You are ChatGPT, a large language model trained by OpenAI. Answer as concisely as possible.",
    			},
    			{
    				"role":    "user",
    				"content": "你是chatGPT多少？",
    			},
    		},
    	}
    
    	jsonPayload, err := json.Marshal(payload)
    	if err != nil {
    		fmt.Println("Error encoding JSON payload:", err)
    		return
    	}
    
    	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonPayload))
    	if err != nil {
    		fmt.Println("Error creating HTTP request:", err)
    		return
    	}
    
    	req.Header.Set("Authorization", "Bearer "+apiKey)
    	req.Header.Set("Content-Type", "application/json")
    
    	client := &http.Client{}
    	resp, err := client.Do(req)
    	if err != nil {
    		fmt.Println("Error making API request:", err)
    		return
    	}
    	defer resp.Body.Close()
    
    	// 处理响应
    	// 请根据实际需求解析和处理响应数据
    	fmt.Println("Response HTTP Status:", resp.StatusCode)
    }
```
如需调用4.0，可将上面modle中 gpt-3.5-turbo改为gpt-4或gpt-4-0613即可。

### 🚀js实现sse打字效果[​](https://www.openai-hk.com/docs/getting-started.html#%F0%9F%9A%80js%E5%AE%9E%E7%8E%B0sse%E6%89%93%E5%AD%97%E6%95%88%E6%9E%9C)

注意

可node.js 后端运行；也支持浏览器模式；需要注意的是如果是前端 注意保护好你的key。

如何保护好key？可以跟nginx 配合 将header 部分的 `'Authorization': 'Bearer hk-你的key'` 放到 nginx当中

```

    //记得引入 `axios`
    const chatGPT=( msg, opt )=>{
        let content=''; 
        const dataPar=(data)=>{
            let rz = {};
            let dz= data.split('data:',2);
            const str = dz[1].trim();
            if(str=='[DONE]') rz={ finish:true,text:''};
            else{
                rz=JSON.parse(str); 
                rz.text= rz.choices[0].delta.content;
            }
            return rz ;
        }
        const dd= ( data )=>{
            let arr = data.trim().split("\n\n");
            let rz={text:'',arr:[]};
            const atext= arr.map(v=>{
            const aa= dataPar(v);
            return aa.text;
            });
            rz.arr= atext;
            rz.text= atext.join("");
            if( opt.onMessage)  opt.onMessage(rz);
            return rz ;
        }
        return new Promise((resolve, reject) => {
            axios({
            method: 'post',
            url: 'https://api.openai-hk.com/v1/chat/completions',
            data: {
                "max_tokens": 1200, 
                "model": "gpt-3.5-turbo", //模型替换 如需调用4.0，改为gpt-4或gpt-4-0613即可
                "temperature": 0.8,
                "top_p": 1,
                "presence_penalty": 1,
                "messages": [
                    {
                        "role": "system",
                        "content": opt.system??"You are ChatGPT"
                    },
                    {
                        "role": "user",
                        "content": msg 
                    }
                ],
                "stream": true //数据流方式输出
            },
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer hk-你的key'
            },
            onDownloadProgress: e=>dd(  e.target.responseText)
            })
            .then(d=>  resolve(dd(d.data) ))
            .catch(e=> reject(e ) );
    
        })   
    }
    
    //调用
    chatGPT( '你是谁？' 
      ,{
          //system:'', //角色定义
          onMessage: d=> console.log('过程性结果：',d.text  ) 
        }
    ).then( d=> console.log('✅最终结果：', d ) ).catch( e=>  console.log('❎错误：', e )  );
```

😁embeddings 接口[​](https://www.openai-hk.com/docs/getting-started.html#%F0%9F%98%81embeddings-%E6%8E%A5%E5%8F%A3)
-----------------------------------------------------------------------------------------------------------------

> 请求地址： POST [https://api.openai-hk.com/v1/embeddings](https://api.openai-hk.com/v1/embeddings)

node.js 请求实例

```
    const fetch = require("node-fetch");
    
    fetch("https://api.openai-hk.com/v1/embeddings", {
     method: "POST",
     headers: {
       Authorization: "Bearer hk-替换为你的key",
       "Content-Type": "application/json",
     },
     body: JSON.stringify({
       input: "一起来使用ChatGPT",
       model: "text-embedding-ada-002",
     }),
    });
```

😁moderations 接口[​](https://www.openai-hk.com/docs/getting-started.html#%F0%9F%98%81moderations-%E6%8E%A5%E5%8F%A3)
-------------------------------------------------------------------------------------------------------------------

> 请求地址： POST [https://api.openai-hk.com/v1/moderations](https://api.openai-hk.com/v1/moderations)

node.js 请求实例

```
    const fetch = require("node-fetch");
    
    fetch("https://api.openai-hk.com/v1/moderations", {
     method: "POST",
     headers: {
       Authorization: "Bearer hk-替换为你的key",
       "Content-Type": "application/json",
     },
     body: JSON.stringify({ input: "有人砍我" }),
    });
```

😁各种应用[​](https://www.openai-hk.com/docs/getting-started.html#%F0%9F%98%81%E5%90%84%E7%A7%8D%E5%BA%94%E7%94%A8)
---------------------------------------------------------------------------------------------------------------

现实中有好多应用，可以选择一种你喜欢的

### chatgpt-web[​](https://www.openai-hk.com/docs/getting-started.html#chatgpt-web)

docker 启动 默认模型是gpt-3.5

```

    docker run --name chatgpt-web -d -p 6011:3002 \
    --env OPENAI_API_KEY=hk-替换为你的key \
    --env TIMEOUT_MS=600000  --env OPENAI_MAX_TOKEN=1000 \
    --env OPENAI_API_BASE_URL=https://api.openai-hk.com  chenzhaoyu94/chatgpt-web
```

> 然后访问 [http://127.0.0.1:6011](http://127.0.0.1:6011/)

### chatgpt-web gpt-4[​](https://www.openai-hk.com/docs/getting-started.html#chatgpt-web-gpt-4)

默认模型是gpt-3.5 如何起一个默认模型 gpt-4.0 呢? 使用环境变量 `OPENAI_API_MODEL`

```

    docker run --name chatgpt-web -d -p 6040:3002 \
    --env OPENAI_API_KEY=hk-替换为你的key \
    --env TIMEOUT_MS=600000  --env OPENAI_MAX_TOKEN=1000 \
    --env OPENAI_API_MODEL=gpt-4-0613 \
    --env OPENAI_API_BASE_URL=https://api.openai-hk.com  chenzhaoyu94/chatgpt-web
```

> 然后访问 [http://127.0.0.1:6040](http://127.0.0.1:6040/)

### 可选模型有哪些[​](https://www.openai-hk.com/docs/getting-started.html#%E5%8F%AF%E9%80%89%E6%A8%A1%E5%9E%8B%E6%9C%89%E5%93%AA%E4%BA%9B)

| 模型 | 说明 |
| --- | --- |
| gpt-3.5-turbo-0613 | 3.5的4k 上下文支持到4k |
| gpt-3.5-turbo-16k-0613 | 3.5的16k 能够支持更长的上下文 价格比普通3.5贵些 |
| gpt-3.5-turbo-1106 | 3.5的16k 价格与3.5 4k一样 |
| gpt-4 | 8k的4.0 上下文支持到8k |
| gpt-4-0613 | 4.0的0613版本 |
| gpt-4-1106-preview | 128k的4.0 价格是普通gpt-4的一半 |
| gpt-4-vision-preview | token价格跟 gpt-4-1106-preview 一样，支持4k, 有额外的图片费用 |
| dall-e-3 | openai的画图 |
| Midjourney | 非openai的画图产品 |

看效果![cover](https://www.openai-hk.com/docs/assets/web1.c5f841bf.png)

### chatgpt-next-web[​](https://www.openai-hk.com/docs/getting-started.html#chatgpt-next-web)

```

    docker run  --name chatgpt-next-web   -d -p 6013:3000 \
       -e OPENAI_API_KEY="hk-替换为你的key" \
       -e BASE_URL=https://api.openai-hk.com   yidadaa/chatgpt-next-web
```
> 然后访问 [http://127.0.0.1:6013](http://127.0.0.1:6013/)

看效果

![cover](https://www.openai-hk.com/docs/assets/web2.ad3a357b.png)

### 其他[​](https://www.openai-hk.com/docs/getting-started.html#%E5%85%B6%E4%BB%96)

如果还有其应用 请联系我们客服协助

🚀直接使用[​](https://www.openai-hk.com/docs/getting-started.html#%F0%9F%9A%80%E7%9B%B4%E6%8E%A5%E4%BD%BF%E7%94%A8)
---------------------------------------------------------------------------------------------------------------

### 1、chatgpt web 多模型自由切换[​](https://www.openai-hk.com/docs/getting-started.html#_1%E3%80%81chatgpt-web-%E5%A4%9A%E6%A8%A1%E5%9E%8B%E8%87%AA%E7%94%B1%E5%88%87%E6%8D%A2)

注意

1.访问 [](https://chat.ddaiai.com/)[https://chat.ddaiai.com/](https://chat.ddaiai.com/) (如果被墙，请换用将二级域名 `chat`更换为 `hi`)  
2.如果发现被墙了 可以自己换地址 `https://hello.ddaiai.com` 把 `hello` 换其他的 如 `https://202312.ddaiai.com` 都能访问

**设置**

    然后在下图相应的地方设置
    OpenAi接口地址: https://api.openai-hk.com
    OpenAi API KEY: hk-你的apiKey 
    
    如果想画图 把midjourney的资料也完善
    midjourney 接口地址: https://api.openai-hk.com
    midjourney Api Secret: hk-你的apiKey
 

![cover](https://www.openai-hk.com/docs/assets/mj3a2.b49731a5.jpg)**效果**

> 输入框 提问对话![cover](https://www.openai-hk.com/docs/assets/mj3a1.a470364a.jpg)

**模型切换** 支持自定义模型，多个可以用逗号隔开![cover](https://www.openai-hk.com/docs/assets/mj3a4.c3bf8bc4.jpg)

### 2、next-web 多模型自由切换[​](https://www.openai-hk.com/docs/getting-started.html#_2%E3%80%81next-web-%E5%A4%9A%E6%A8%A1%E5%9E%8B%E8%87%AA%E7%94%B1%E5%88%87%E6%8D%A2)

注意

1.访问 [](https://web.ccaiai.com/)[https://web.ccaiai.com/](https://web.ccaiai.com/) (需要科学)  
2.如果发现被墙了 可以自己换地址 `https://suibian.ccaiai.com` 把 `suibian` 换其他的 如 `https://abc.ccaiai.com` 都能访问

    然后在下图相应的地方设置
    接口地址：https://api.openai-hk.com
    API KEY: hk-你的apiKey
    模型：选择 GPT-4
 

![cover](https://www.openai-hk.com/docs/assets/help3.05f15a64.jpg)

> 输入框 提问对话

![cover](https://www.openai-hk.com/docs/assets/help4.522e1589.jpg)

