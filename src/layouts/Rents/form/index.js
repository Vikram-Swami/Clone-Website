import { Card, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { PropTypes } from "prop-types";

const RentForm = ({ data }) => {
  return (
    <Card>
      <TextField
        autoFocus
        required
        margin="dense"
        id="user"
        name="user"
        defaultValue={data?.userId}
        label="user"
        type="text"
        fullWidth
        variant="standard"
        sx={{ marginBottom: "20px" }}
      />
      <TextField
        autoFocus
        required
        margin="dense"
        id="level"
        name="level"
        defaultValue={data?.level}
        label="level"
        type="text"
        fullWidth
        variant="standard"
        sx={{ marginBottom: "20px" }}
      />
      <TextField
        autoFocus
        required
        margin="dense"
        id="storage"
        name="storage"
        defaultValue={data.storage}
        label="Storage"
        type="text"
        fullWidth
        variant="standard"
      />
      <TextField
        autoFocus
        required
        margin="dense"
        id="amount"
        name="amount"
        defaultValue={data.amount}
        label="Amount"
        type="text"
        fullWidth
        variant="standard"
      />
      <TextField
        autoFocus
        required
        margin="dense"
        id="connectionId"
        name="connectionId"
        defaultValue={data.connectionId}
        label="connectionId"
        type="text"
        fullWidth
        variant="standard"
      />
      <TextField
        autoFocus
        required
        margin="dense"
        id="endDate"
        defaultValue={data.endDate}
        name="endDate"
        label="endDate"
        type="text"
        fullWidth
        variant="standard"
      />
      <FormControl fullWidth>
        <InputLabel
          id="status-label"
          sx={{ transform: "translate(0, 1.5px) scale(0.75)", marginLeft: "10px" }}
        >
          Status
        </InputLabel>
        <Select
          labelId="status-label"
          id="status"
          name="status"
          defaultValue={data.status}
          sx={{
            "& .MuiSelect-root": {
              padding: "10px",
            },
          }}
        >
          <MenuItem value={true}>Active</MenuItem>
          <MenuItem value={false}>Inactive</MenuItem>
        </Select>
      </FormControl>
    </Card>
  );
};
export default RentForm;

RentForm.defaultProps = {
  data: {},
  type: "new",
};

RentForm.propTypes = {
  data: PropTypes.any,
  type: PropTypes.string,
};
