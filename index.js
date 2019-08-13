import React, { PureComponent } from "react";
import ReactDOM from "react-dom";
import { Input, Row } from "antd";
class TextAreaPlus extends PureComponent {
  static getDerivedStateFromProps(nextProps) {
    // Should be a controlled component.
    if ("value" in nextProps) {
      return {
        ...(nextProps.value || {})
      };
    }
    return null;
  }

  constructor(props) {
    super(props);
    let initval = props.value || {};
    let length = initval ? initval.length : 0;
    this.state = {
      value: initval.value || "",
      length: length || 0
    };
  }

  handleChange = e => {
    const value = e.target.value || "";

    this.setState({ value: value, length: value.length });
    this.triggerChange({ value: value, length: value.length });
  };

  triggerChange = changedValue => {
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue));
    }
  };

  render() {
    const maxlength = this.props.maxlength ? this.props.maxlength : 200;
    const rows = this.props.rows;
    let initval = this.props.value || {};
    let length = initval ? initval.length : 0;
    return (
      <Input.Group>
        <Row>
          <Input.TextArea
            placeholder="input"
            rows={rows}
            style={{ width: "100%" }}
            maxLength={maxlength}
            onChange={this.handleChange}
            value={this.state.value}
          />
        </Row>
        <Row>
          <span
            style={{
              bottom: 25,
              zIndex: 1000,
              float: "right",
              position: "relative"
              // position: "absolute",
            }}
          >
            {this.state.length || length || 0}/{maxlength}
          </span>
        </Row>
      </Input.Group>
    );
  }
}

const TestInput = () => {
  return <TextAreaPlus rows={4} maxlength={200} />;
};

ReactDOM.render(
  <div>
    <h1>Antd TextAreaPlus</h1>
    <TestInput placeholder="input  text" />
  </div>,
  document.getElementById("container")
);
