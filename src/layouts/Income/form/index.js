import { Card, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { PropTypes } from "prop-types";

const usersForm = ({ data }) => {
  return (
    <Card>
      <TextField
        autoFocus
        required
        margin="dense"
        id="user"
        name="user"
        value={data?.user}
        label="user"
        type="text"
        fullwidth
        variant="standard"
        sx={{ marginBottom: "20px" }}
      />
      <TextField
        autoFocus
        required
        margin="dense"
        id="storage"
        name="storage"
        value={data.storage}
        label="Storage"
        type="text"
        fullwidth
        variant="standard"
      />
      <TextField
        autoFocus
        required
        margin="dense"
        id="amount"
        name="amount"
        value={data.amount}
        label="Amount"
        type="text"
        fullwidth
        variant="standard"
      />
      <TextField
        autoFocus
        required
        margin="dense"
        id="boughtAt"
        value={data.boughtAt}
        name="boughtAt"
        label="boughtAt"
        type="text"
        fullwidth
        variant="standard"
      />
      <FormControl fullwidth>
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
          value={data.status}
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
export default usersForm;

usersForm.defaultProps = {
  data: {},
  type: "new",
};

usersForm.propTypes = {
  data: PropTypes.any,
  type: PropTypes.string,
};
