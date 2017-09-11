import React from 'react';
import PropTypes from 'prop-types';
import AxisConfigurator from './AxisConfigurator';
import LinesConfigurator from './LinesConfigurator';
import XAxisKeySelector from './XAxisKeySelector';
import AxisLogKeySelector from './AxisLogKeySelector';


const AxesConfigurator = (props) => {
  const {
    results,
    stats,
    config,
    onAxisConfigLineUpdate,
    onAxisConfigScaleUpdate,
    onAxisConfigXKeyUpdate,
    onAxisConfigScaleRangeTypeUpdate, onAxisConfigScaleRangeNumberUpdate,
    onAxisConfigLogKeySelectToggle
  } = props;
  const {
    xAxis = { axisName: 'xAxis' },
    yLeftAxis = { axisName: 'yLeftAxis' },
    yRightAxis = { axisName: 'yRightAxis' }
  } = config.axes || {};

  return (
    <div className="axes-configurator">
      <AxisConfigurator
        axisConfig={yLeftAxis}
        onChangeScale={onAxisConfigScaleUpdate}
        onAxisConfigScaleRangeTypeUpdate={onAxisConfigScaleRangeTypeUpdate}
        onAxisConfigScaleRangeNumberUpdate={onAxisConfigScaleRangeNumberUpdate}
      >
        <AxisLogKeySelector
          axisConfig={yLeftAxis}
          stats={stats}
          onAxisConfigLogKeySelectToggle={onAxisConfigLogKeySelectToggle}
        />
        <LinesConfigurator
          results={results}
          stats={stats}
          config={config}
          axisName="yLeftAxis"
          onAxisConfigLineUpdate={onAxisConfigLineUpdate}
        />
      </AxisConfigurator>
      <AxisConfigurator
        axisConfig={yRightAxis}
        onChangeScale={onAxisConfigScaleUpdate}
        onAxisConfigScaleRangeTypeUpdate={onAxisConfigScaleRangeTypeUpdate}
        onAxisConfigScaleRangeNumberUpdate={onAxisConfigScaleRangeNumberUpdate}
      >
        <AxisLogKeySelector
          axisConfig={yRightAxis}
          stats={stats}
          onAxisConfigLogKeySelectToggle={onAxisConfigLogKeySelectToggle}
        />
        <LinesConfigurator
          results={results}
          stats={stats}
          config={config}
          axisName="yRightAxis"
          onAxisConfigLineUpdate={onAxisConfigLineUpdate}
        />
      </AxisConfigurator>
      <AxisConfigurator
        axisConfig={xAxis}
        onChangeScale={onAxisConfigScaleUpdate}
        onAxisConfigScaleRangeTypeUpdate={onAxisConfigScaleRangeTypeUpdate}
        onAxisConfigScaleRangeNumberUpdate={onAxisConfigScaleRangeNumberUpdate}
      >
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <XAxisKeySelector value={xAxis.xAxisKey} onChange={onAxisConfigXKeyUpdate} />
          </li>
        </ul>
      </AxisConfigurator>
    </div>
  );
};

AxesConfigurator.propTypes = {
  results: PropTypes.objectOf(PropTypes.any).isRequired,
  stats: PropTypes.shape({
    logKeys: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  config: PropTypes.shape({
    axes: PropTypes.shape({
      xAxis: PropTypes.any,
      yLeftAxis: PropTypes.any,
      yRightAxis: PropTypes.any
    })
  }).isRequired,
  onAxisConfigLineUpdate: PropTypes.func.isRequired,
  onAxisConfigScaleUpdate: PropTypes.func.isRequired,
  onAxisConfigXKeyUpdate: PropTypes.func.isRequired,
  onAxisConfigScaleRangeTypeUpdate: PropTypes.func.isRequired,
  onAxisConfigScaleRangeNumberUpdate: PropTypes.func.isRequired,
  onAxisConfigLogKeySelectToggle: PropTypes.func.isRequired
};

AxesConfigurator.defaultProps = {
};

export default AxesConfigurator;
