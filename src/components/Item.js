import React from "react";
import "./item.css";
import { useState, useEffect } from "react";

let data = [
  { amount: 1402, date: "2022-05-10" },
  { amount: 1455, date: "2022-04-15" },
  { amount: 455, date: "2022-04-22" },
  { amount: 576, date: "2022-04-29" },
  { amount: 769, date: "2022-05-08" },
];

function Item() {
  const [record, setRecord] = useState(data);
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState("");
  const [points, setPoints] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    let eachTransPoints = record.map((item) => {
      let point = 0,
        amount = item.amount;
      if (amount > 100) {
        point = (amount - 100) * 2 + 50;
      } else if (amount > 50) {
        point = amount - 50;
      } else {
        point = 0;
      }
      return { ...item, point };
    });

    let m = new Map();
    let total = 0;
    eachTransPoints.forEach((item) => {
      let month = item.date.substring(0, 7);
      total += item.point;
      if (m.has(month)) m.set(month, m.get(month) + item.point);
      else m.set(month, item.point);
    });
    m.set("Total", total);
    setPoints([...m]);
  }, [record]);

  const handleChange = (event) => {
    let id = event.target.id;
    let value = event.target.value;

    if (id === "date") {
      setDate(value);
    } else {
      setAmount(value);
    }
  };
  const handleClick = () => {
    if (date && amount) {
      setError(false);
      setRecord([...record, { amount, date }]);
      setDate("");
    } else {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 5000);
    }
  };
  
  return (
    <div className="App">
      <label>Date: </label>
      <input
        type="date"
        id="date"
        value={date}
        onChange={handleChange}
        placeholder="2021-06-06"
      />
      <label>Amount: </label>
      <input type="number" value={amount} onChange={handleChange} />
      <button onClick={handleClick}>Add</button>
      {error && (
        <h2 className="error">
          Make sure pick a date && input an valid amount{" "}
        </h2>
      )}
      <table>
        <tr>
          <th>Date</th>
          <th> Amount</th>
        </tr>
        {record.map((item, idx) => {
          return (
            <tr key={idx + "date"}>
              <td>{item.date}</td>
              <td>{item.amount}</td>
            </tr>
          );
        })}
      </table>
      <table>
        <tr>
          <th>Month</th>
          <th>Points</th>
        </tr>
        {points.map((item, idx) => {
          return (
            <tr key={idx}>
              <td>{item[0]}</td>
              <td>{item[1]}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default Item;
