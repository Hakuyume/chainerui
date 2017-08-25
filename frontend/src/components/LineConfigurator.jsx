import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { ChromePicker } from 'react-color';
import { displayName } from '../utils';


const RESULT_NONE = -1;
const LOG_KEY_NONE = '';

const getLogKeys = (result = {}) => {
  const { logs = [] } = result;
  const logKeySet = {};
  logs.forEach((log) => {
    const { logItems = [] } = log;
    logItems.forEach((logItem) => {
      logKeySet[logItem.key] = true;
    });
  });
  return Object.keys(logKeySet);
};

const createResultOptionElems = (results = []) => [
  <option value={RESULT_NONE} key={RESULT_NONE} disabled>-- select result --</option>,
  ...Object.keys(results).map((resultId) => {
    const result = results[resultId];
    return (
      <option value={result.id} key={result.id}>{result.id}: {displayName(result)}</option>
    );
  })
];

const createLogKeyOptionElems = (result = {}) => {
  const logKeys = getLogKeys(result);
  return [
    <option value={LOG_KEY_NONE} key={LOG_KEY_NONE} disabled>-- select log key --</option>,
    ...logKeys.map((logKey) => (
      <option value={logKey} key={logKey}>{logKey}</option>
    ))
  ];
};

class LineConfigurator extends React.Component {
  constructor() {
    super();

    this.handleResultChange = this.handleResultChange.bind(this);
    this.handleLogKeyChange = this.handleLogKeyChange.bind(this);
    this.handleLineColorChange = this.handleLineColorChange.bind(this);
  }

  handleResultChange(e) {
    const { line, onChange } = this.props;
    const newResultId = parseInt(e.target.value, 10);
    onChange({ ...line, resultId: newResultId });
  }

  handleLogKeyChange(e) {
    const { line, onChange } = this.props;
    const newLogKey = e.target.value;
    onChange({ ...line, logKey: newLogKey });
  }

  handleLineColorChange(e) {
    const { line, onChange } = this.props;
    const { hex } = e;
    onChange({ ...line, config: { color: hex } });
  }

  render() {
    const { results, line = {}, errors = {} } = this.props;
    const { resultId = RESULT_NONE, logKey = LOG_KEY_NONE, config = {} } = line;
    const result = results[resultId] || {};
    const color = config.color;

    const colorBlockStyle = {
      backgroundColor: color
    };

    const resultOptionElems = createResultOptionElems(results);
    const logKeyOptionElems = createLogKeyOptionElems(result);

    return (
      <div className="line-configurator">
        <Form>
          <FormGroup>
            <Label>color</Label>
            <div style={colorBlockStyle}>{color}</div>
            <ChromePicker
              color={color}
              disableAlpha
              onChange={this.handleLineColorChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="line-configurator-result-select">result</Label><br />
            <Input
              className={`form-control${errors.resultIdNone ? ' is-invalid' : ''}`}
              type="select"
              name="select"
              id="line-configurator-result-select"
              value={resultId}
              onChange={this.handleResultChange}
            >
              {resultOptionElems}
            </Input>
            <div className="invalid-feedback">
              Select a result!!
            </div>
          </FormGroup>
          <FormGroup>
            <Label for="line-configurator-log-key-select">log key</Label><br />
            <Input
              className={`form-control${errors.logKeyNone ? ' is-invalid' : ''}`}
              type="select"
              name="select"
              id="line-configurator-log-key-select"
              value={logKey}
              disabled={resultId === RESULT_NONE}
              onChange={this.handleLogKeyChange}
            >
              {logKeyOptionElems}
            </Input>
            <div className="invalid-feedback">
              Select a log key!!
            </div>
          </FormGroup>
          <FormGroup>
            <Input
              className={`form-control${errors.hasSameLine ? ' is-invalid' : ''}`}
              hidden
            />
            <div className="invalid-feedback">
              Cannot add this line because it already exists.
            </div>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

LineConfigurator.propTypes = {
  results: PropTypes.objectOf(PropTypes.any).isRequired,
  line: PropTypes.shape({
    resultId: PropTypes.number,
    logKey: PropTypes.string,
    config: PropTypes.shape({
      color: PropTypes.string
    })
  }),
  errors: PropTypes.shape({
    resultIdNone: PropTypes.bool,
    logKeyNone: PropTypes.bool,
    hasSameLine: PropTypes.bool
  }),
  onChange: PropTypes.func
};

LineConfigurator.defaultProps = {
  line: {},
  errors: {},
  onChange: () => {}
};

export default LineConfigurator;

