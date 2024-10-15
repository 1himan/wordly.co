import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const LoadingSpinner = () => {
  return (
    <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center">
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <CircularProgress style={{ color: "#6B7280" }} />
        <p className="mt-4 text-center text-gray-500">
          Loading, Please Wait...
        </p>
      </Box>
    </div>
  );
};

export default LoadingSpinner;
