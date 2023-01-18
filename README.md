# Todomoneycalender
オブジェクト指向プログラミングチーム開発課題

## システムの動作方法
### フロントエンド
1. モジュールのインストール
```bash
cd frontend

npm i
```
2. プロジェクト実行
```bash
npm start
```

### バックエンド

#### 実行環境

- docker: Docker Desktop 4.15.0 (93002)
- pipenv: version 2022.12.19
  - [Python のバージョンと使用しているパッケージのバージョン](https://github.com/2022AIT-OOP2-G3/Todomoneycalender/blob/main/backend/server/Pipfile)
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

## 使⽤するライブラリのバージョン
### フロントエンド
```json
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-icons": "^4.7.1",
    "react-router-dom": "^6.6.1",
    "styled-components": "^5.3.6",
```
### バックエンド

## 全体像
![](https://i.imgur.com/CGUdKhK.png)
