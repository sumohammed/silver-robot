import React, { useEffect, useState } from "react";
import { useFetch } from "../hooks";
import { types, api } from "../utils";
import Plus from "../components/common/svg/Plus";
import Minus from "../components/common/svg/Minus";
import "./Home.css";

const Home = () => {
  const [goal, setGoal] = useState();
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    useFetch("GET", api.getGoals).then(res => setGoals(res));
  }, []);

  const list = list => {
    if (!list) return;
    return list.map((item, i) => {
      return (
        <div
          className="item"
          onClick={e => (e.target.style.textDecorationLine = "line-through")}
          key={i}
        >
          <li>{item.goal}</li>
          <Minus onClick={() => deleteGoal(i, item.uid)} />
        </div>
      );
    });
  };

  const addGoal = () => {
    let formdata = new FormData();

    formdata.append("goal", goal);

    setGoals([...goals, { goal: goal }]);

    return useFetch("POST", api.addGoal, formdata);
  };

  const deleteGoal = (i, goal_uid) => {
    let formdata = new FormData();

    formdata.append("uid", goal_uid);

    let list = goals;

    list.splice(i, 1);

    setGoals(prev => [...goals]);

    return useFetch("POST", api.deleteGoal, formdata);
  };

  return (
    <div className="home">
      <div className="sidemenu">
        <div>
          <h1>Todos</h1>

          <form
            onSubmit={e => {
              e.preventDefault();
              addGoal();
            }}
          >
            <input
              type="text"
              onChange={e => {
                setGoal(e.target.value);
              }}
            />
            <Plus onClick={() => addGoal()} />
          </form>
        </div>
      </div>

      <div className="list">{list(goals)}</div>
    </div>
  );
};

export default Home;
