# backend

## 作業をするとき

それぞれに割り当てられている issue についている `#` のついた数字を `#` をつけて commit message に含めてください。

## start mysql server

```bash
cd db

docker-compose up -d
```

## start flask api server

```bash
cd backend/server

pipenv install

pipenv shell

python flask_server.py
```
