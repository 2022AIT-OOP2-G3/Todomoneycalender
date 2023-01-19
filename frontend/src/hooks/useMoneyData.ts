import axios from "axios";
import { useState, useCallback } from "react";

const test = {
    "uid" : "test",
    "startingDate" : "2020-10-01",
    "endingDate" : "2020-10-01",
    "startingTime" : "10:00",
    "endingTime" : "12:00",
    "item": "testitem",
    "spendingAmount" : 10000,
    "incomeAmount" : 1682
}

export const useMoneyData = () => {
    axios.post('http://127.0.0.1:5000/schedule/test/2020/10', test)
    .then(function (response) {
        console.log(response.data);
      })
}