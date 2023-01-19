# Todomoneycalender
オブジェクト指向プログラミングチーム開発課題

## システムの動作方法
### フロントエンド
#### 実行環境
- Node.js: v18.12.1
- npm: 9.2.0
  - [Reactのバージョン及び使用しているモジュールのバージョン](https://github.com/2022AIT-OOP2-G3/Todomoneycalender/blob/main/frontend/package.json)

#### 動作方法
1. モジュールのインストール
```bash
cd frontend

npm i
```
2. プロジェクト実行
```bash
npm start
```
3. ブラウザを開き、http://localhost:3000/ に接続

### バックエンド

#### 実行環境

- docker: Docker Desktop 4.15.0 (93002)
- pipenv: version 2022.12.19
  - [Python のバージョンと使用しているパッケージのバージョン](https://github.com/2022AIT-OOP2-G3/Todomoneycalender/blob/main/backend/server/Pipfile)

#### 動作方法
1. Docker内のMySQLサーバを立ち上げる
```bash
cd backend/db

docker-compose up -d
```
2. フロントエンドとMySQLサーバを繋ぐFlaskサーバを立ち上げる
```bash
cd backend/server

pipenv install

pipenv shell

python flask_server.py
```

## 全体像
![](https://i.imgur.com/CGUdKhK.png)
