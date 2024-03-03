import { CircularProgress, Stack } from "@mui/material";

const Loading = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
        <CircularProgress color="success" />
        <h4 style={{ fontWeight: 600, fontSize: "18px" }}>NextWork Technologies</h4>
      </Stack>
    </div>
  );
};

export default Loading;
