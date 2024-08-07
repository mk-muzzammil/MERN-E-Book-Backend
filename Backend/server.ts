import { config } from "./config/config";
import app from "./src/app";
import startDBConnection from "./config/databaseConection";

const StartSevrer = () => {
  const PORT = config.PORT || 3000;
  app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    await startDBConnection();
  });
};

StartSevrer();
