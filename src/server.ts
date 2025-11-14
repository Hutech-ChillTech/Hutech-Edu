import app from "./app";
const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";

app.listen(Number(PORT), HOST, () =>
  console.log(
    `🚀 Server is running on http://localhost:${PORT} in ${process.env.NODE_ENV} mode`
  )
);
