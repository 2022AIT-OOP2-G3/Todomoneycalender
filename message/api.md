# データの形について

## データ登録について

フロントがデータを DB に登録(POSTで)するデータの種類は2つ

1. 月間の支出予定金額を登録、変更する時
2. スケジュールを登録、変更する時

### 登録する(フロントから送る)具体的なデータについて

1 のサンプルのデータ

```json
{
  "spendingAmount": 10000 //int 月間の支出予定金額
}
```

2 のサンプルのデータ

```json
{
  "date": "2022-10-01", //string 登録したい予定の年、月、日
  "startingTime": "10:00", //string 予定の開始時間
  "endingTime": "12:00", //string 予定の終了時間
  "item": "美容院", // string 予定、用事
  "cost": 5000, //int itemを達成するためにかかる金額
  "incomeAmount": 1000 //int itemを行った時に増える金額
}
```

## フロント側へ渡すデータについて

フロント側がバック側にデータを渡すタイミングは

1. カレンダーを「月」表示する時
2. カレンダーを「週」または「日」表示する時

### 登録する具体的なデータについて

1 のサンプルのデータ

- 年、月まで一致しているデータを返す

GET http://localhost:5000/uid/2022/10

```json
{
  "date": "2022-10", //string 年、月
  "spendingAmount": 10000, //int 月間の支出予定金額
  "usingAmount": 100000, //int 月間の支出金額
  "incomeAmount": 40000, //int 月間の収入金額
  "schedule": [
    {
      "date": "2022-10-01", //string 年、月、日
      "startingTime": "10:00", //string 予定の開始時間
      "endingTime": "12:00", //string 予定の終了時間
      "item": "美容院", // string 予定、用事
      "cost": 5000 //int itemを達成するためにかかる金額
    },
    {
      "date": "2022-10-01", //string 年、月、日
      "startingTime": "19:00", //string 予定の開始時間
      "endingTime": "21:00", //string 予定の終了時間
      "item": "飲み会", // string 予定、用事
      "cost": 8000 //int itemを達成するためにかかる金額
    },
    {
      "date": "2022-10-25", //string 年、月、日
      "startingTime": "19:00", //string 予定の開始時間
      "endingTime": "21:00", //string 予定の終了時間
      "item": "飲み会", // string 予定、用事
      "cost": 8000 //int itemを達成するためにかかる金額
    }
  ]
}
```

2 のサンプルのデータ

- 日付まで一致しているデータを返す
- 予定一つにつき要素をオブジェクトで定義し、それらを配列に
- データ 1 の schedule と異なる点として予定ごとにかかる金額データ入っている

GET http://localhost:5000/uid/2022/10/01

```json
[
  {
    "date": "2022-10-01", //string 年、月、日
    "startingTime": "10:00", //string 予定の開始時間
    "endingTime": "12:00", //string 予定の終了時間
    "item": "美容院", // string 予定、用事
    "cost": 5000, //int itemを達成するためにかかる金額
    "incomeAmount": 0 //int itemを行った時に増える金額
  },
  {
    "date": "2022-10-01", //string 年、月、日
    "startingTime": "19:00", //string 予定の開始時間
    "endingTime": "21:00", //string 予定の終了時間
    "item": "飲み会", // string 予定、用事
    "cost": 10000, //int itemを達成するためにかかる金額
    "incomeAmount": 1000 //int itemを行った時に増える金額
  }
]
```
