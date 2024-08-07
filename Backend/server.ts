import { config } from "./config/config";
import app from "./src/app";

const StartSevrer = () => {
  const PORT = config.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

StartSevrer();
