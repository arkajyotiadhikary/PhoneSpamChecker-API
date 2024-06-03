import app from "./app";
const port = process.env.PORT || 3000;
import dotenv from "dotenv";
dotenv.config();

app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
});
