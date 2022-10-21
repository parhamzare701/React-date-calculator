import moment from "moment";
import { useState } from "react";
import "./style.css";

function App() {
  const [firstDateInput, setFirstDateInput] = useState("");
  const [secondDateInput, setSecondDateInput] = useState(
    moment().format("YYYY-MM-DD")
  );
  const [dateResult, setDateResult] = useState({ years: 0, months: 0 });
  function getYearsMonths(dateOne, dateTwo) {
    const firstDate = moment(dateOne);
    const secondDate = moment(dateTwo);
    const years = firstDate.diff(secondDate, "year");
    secondDate.add(years, "years");

    const noOfDaysInFirstDate = firstDate.daysInMonth();
    const noOfDaysInSecondDate = secondDate.daysInMonth();
    let months = 0;
    if (noOfDaysInSecondDate > noOfDaysInFirstDate) {
      months = secondDate.diff(firstDate, "months");
      firstDate.add(months, "months");
    } else {
      months = firstDate.diff(secondDate, "months");
      secondDate.add(months, "months");
    }
    const totalYears = Math.abs(years);
    const totalMonths = Math.abs(months);
    setDateResult({ years: totalYears, months: totalMonths });
  }

  return (
    <form
      className="date-calculator"
      onSubmit={(e) => {
        e.preventDefault();
        getYearsMonths(firstDateInput, secondDateInput);
      }}
    >
      <div className="date-calculator__container">
        <h1 className="date-calculator__container__text">Date Calculator</h1>
        <div className="date-calculator__container__content">
          <div className="date-calculator__container__content__date">
            <input
              type="month"
              value={firstDateInput}
              onChange={(e) => setFirstDateInput(e.target.value)}
            />
            <input
              type="month"
              value={secondDateInput}
              onChange={(e) => setSecondDateInput(e.target.value)}
            />
          </div>
          <div className="date-calculator__container__content__btn">
            <button className="date-calculator__container__content__btn--calculate">
              Calculate
            </button>
          </div>
        </div>
        <div className="date-calculator__container__result">
          <span className="date-calculator__container__result__text">{`${dateResult.years} years and ${dateResult.months} months`}</span>
        </div>
      </div>
    </form>
  );
}

export default App;
