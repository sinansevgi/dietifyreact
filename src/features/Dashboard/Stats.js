import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  VictoryAxis, VictoryChart, VictoryLine, VictoryTheme,
} from 'victory';
import style from '../../assets/Stats.module.css';

const Stats = ({ graphData }) => {
  const [graph, setGraph] = useState([{ food_id: 0, calories: 0 }, { food_id: 1, calories: 1 }]);
  useEffect(() => {
    if (typeof graphData !== 'undefined' && graphData.length > 1) {
      setGraph(graphData);
    }
  }, [graphData]);
  return (
    <div className={style.stats}>
      <VictoryChart
        theme={VictoryTheme.material}
        animate={{ duration: 1500 }}
      >
        <VictoryAxis dependentAxis />
        <VictoryAxis
          label="Calorie Intake"
          tickFormat={() => ''}
        />
        <VictoryLine
          data={graph}
          x="food_id"
          y="calories"
          padding={{ left: 75, right: 75 }}
        />
      </VictoryChart>
      <div className={style.welcome}>
        <h2>Welcome to Dietify</h2>
        <p>Dietify is an app to help you keep track of your calorie intake.</p>
        <ul>
          <li>You can see your calorie intake over time in the chart above.</li>
          <li>You can review and add your daily meals from the meals page.</li>
          <li>You can track your progress from the tracker page.</li>
        </ul>
      </div>
    </div>
  );
};

Stats.propTypes = {
  graphData: PropTypes.instanceOf(Array),
};

Stats.defaultProps = {
  graphData: [{ food_id: 0, calories: 0 }, { food_id: 1, calories: 1 }],
};
export default Stats;
