# automate-jobcan
勤怠アプリ `ジョブカン` の操作を自動化する

## Description
jobcanにはslackコマンドが用意されているので、そのコマンドをバックエンドで叩いて自動化を測る。  
カレンダー通りの営業日のみslackに発信されるような作りになっている。  
採用アーキテクチャは、AWSのCloudWatch, Lambda。  
直接コンソールよりデプロイしている。


## Usage
### Install
```sh
$> git clone https://github.com/bonkeenu/automate-jobcan.git
$> cd automate-jobcan
$> npm i
```
- node version  
v 8.10.0
### slack 
```
1. slackの個人用legacy-tokensを取得  
- https://api.slack.com/custom-integrations/legacy-tokens  
```
![discription_1](https://user-images.githubusercontent.com/17017449/52456241-332aa680-2b97-11e9-9f69-b213041410fa.png)

```
2. channel id と.  
- ブラウザでslackを開いて、通知したいチャンネルをクリック。  
- URLの中の/message/の後ろにある文字列がchannel_idになる。  
```
![discription_2](https://user-images.githubusercontent.com/17017449/52456623-ef38a100-2b98-11e9-8b08-9470a61abf83.png)

### Settings

1. ディレクトリ内に.envファイルを作成する  
2. .envファイルにlegacy-tokensとchannelを書き込む  
```txt
SLACK_TOKEN = '************************************'
SLACK_CHANNEL = '***********'
```
### Note
#### Lambda
- Lambdaには直接コンソールよりデプロイする。
- ディレクトリをそのまま配置し、ハンドラにindex.jsと記述
![image](https://user-images.githubusercontent.com/17017449/52457810-109c8b80-2b9f-11e9-9883-0b1b614d0f52.png)

#### CloudWatch
- CloudWatchには始業と就業の2タイプを登録し、Lambdaのイベントハンドラとする。  
朝のcron式
![image](https://user-images.githubusercontent.com/17017449/52457919-9fa9a380-2b9f-11e9-830e-06fc483ceb79.png)
夜のcron式  
![image](https://user-images.githubusercontent.com/17017449/52457936-b51ecd80-2b9f-11e9-9131-0b4928a011a4.png)

## License
[MIT](LICENSE)