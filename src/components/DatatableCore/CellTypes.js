import React from "react";
import styled from "styled-components";
import { Checkbox } from "@material-ui/core";
import {
  moment,
  dateFormatUser,
  timeFormatUser,
  dateTimeFormatUser
} from "../../moment.config";
import CreateInput from "./InputTypes/CreateInput";
import {
  cellValPropType,
  rowIdPropType,
  columnIdPropType,
  editingPropType,
  setRowEditedPropType
} from "../../proptypes";

export const NumberWrapper = styled.div`
  text-align: center;
`;

export const NumberType = properties => {
  const { cellVal, editing } = properties;
  const type = "number";
  if (editing) {
    return CreateInput({ ...properties, type });
  }
  const formatVal = cellVal
    ? cellVal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    : cellVal;
  return <NumberWrapper>{formatVal}</NumberWrapper>;
};

export const TextWrapper = styled.div`
  text-align: left;
`;

export const TextType = properties => {
  const { cellVal, editing } = properties;
  const type = "text";
  if (editing) {
    return CreateInput({ ...properties, type });
  }
  return <TextWrapper>{cellVal}</TextWrapper>;
};

export const BooleanWrapper = styled.div`
  text-align: center;
`;

export const BooleanType = ({
  cellVal,
  editing,
  rowId,
  columnId,
  setRowEdited
}) => {
  return (
    <BooleanWrapper>
      <Checkbox
        checked={cellVal}
        color="primary"
        disabled={!editing}
        onChange={(e, checked) =>
          setRowEdited({ rowId, columnId, newValue: checked })
        }
      />
    </BooleanWrapper>
  );
};

BooleanType.propTypes = {
  cellVal: cellValPropType.isRequired,
  rowId: rowIdPropType.isRequired,
  columnId: columnIdPropType.isRequired,
  setRowEdited: setRowEditedPropType,
  editing: editingPropType
};

export const DateWrapper = styled.div`
  text-align: left;
`;

export const DateType = properties => {
  const { cellVal, editing, inputType = "datePicker" } = properties;
  if (editing) {
    return CreateInput({
      ...properties,
      inputType
    });
  }

  return (
    <DateWrapper>
      {cellVal !== "" ? moment(cellVal).format(dateFormatUser) : cellVal}
    </DateWrapper>
  );
};

export const TimeWrapper = styled.div`
  text-align: left;
`;

export const TimeType = properties => {
  const { cellVal, editing, inputType = "timePicker" } = properties;
  if (editing) {
    return CreateInput({
      ...properties,
      inputType
    });
  }
  return (
    <TimeWrapper>
      {cellVal ? moment(cellVal).format(timeFormatUser) : cellVal}
    </TimeWrapper>
  );
};

export const DateTimeWrapper = styled.div`
  text-align: left;
`;

export const DateTimeType = properties => {
  const { cellVal, editing, inputType = "dateTimePicker" } = properties;
  if (editing) {
    return CreateInput({
      ...properties,
      inputType
    });
  }
  return (
    <DateTimeWrapper>
      {cellVal ? moment(cellVal).format(dateTimeFormatUser) : cellVal}
    </DateTimeWrapper>
  );
};
