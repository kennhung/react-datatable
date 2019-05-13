import React, { Component } from "react";
import equal from "fast-deep-equal";
import {
  ClickAwayListener,
  Tooltip,
  Zoom,
  IconButton,
  InputAdornment,
  withStyles
} from "@material-ui/core";
import { Event as CalendarIcon } from "@material-ui/icons";
import { DatePicker } from "material-ui-pickers";
import { checkValue, setValue } from "./PickersFunction";
import { customVariant } from "../../MuiTheme";
import { dateFormatUser } from "../../../moment.config";
import {
  valueVerificationPropType,
  cellValPropType,
  classesPropType
} from "../../../proptypes";

class DatePickerWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      tooltipOpen: false,
      message: ""
    };
  }

  componentDidMount() {
    const { valueVerification } = this.props;
    if (valueVerification) {
      const newState = checkValue({
        ...this.props,
        mounting: true
      });
      if (!equal(this.state, newState)) {
        this.setState(newState);
      }
    }
  }

  onDateChange = date => {
    const newState = setValue({
      ...this.props,
      date
    });
    if (!equal(this.state, newState)) {
      this.setState(newState);
    }
  };

  toggleCloseTooltip = open => {
    const { error } = this.state;
    if (error) {
      this.setState({ tooltipOpen: open });
    }
  };

  render() {
    const { cellVal, classes } = this.props;
    const { tooltipOpen, message, error } = this.state;

    return (
      <Tooltip
        open={tooltipOpen}
        classes={{
          tooltip: classes.errorTooltip
        }}
        title={message}
        TransitionComponent={Zoom}
        interactive
      >
        <ClickAwayListener onClickAway={() => this.toggleCloseTooltip(false)}>
          <DatePicker
            clearable
            error={error}
            onOpen={() => this.setState({ tooltipOpen: false })}
            format={dateFormatUser}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <IconButton>
                    <CalendarIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
            helperText={null}
            value={cellVal === "" ? null : cellVal}
            onChange={this.onDateChange}
          />
        </ClickAwayListener>
      </Tooltip>
    );
  }
}

DatePickerWrapper.propTypes = {
  classes: classesPropType.isRequired,
  cellVal: cellValPropType.isRequired,
  valueVerification: valueVerificationPropType
};

export default withStyles(customVariant)(DatePickerWrapper);
