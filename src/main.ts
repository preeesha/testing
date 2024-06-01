import express, { Request, Response } from "express";
import cors from "cors";
import { exec } from "child_process";
import { existsSync, rmdirSync } from "fs";
import { config } from "dotenv";

config();

const app = express();
const port = process.env.PORT;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors({ origin: "*" }));

// Ingest endpoint
app.post("/ingest", (req: Request, res: Response) => {
  const codebase = "./image-stegnography";
  if (existsSync(codebase)) {
    console.log("Found existing codebase");
    rmdirSync(codebase, { recursive: true });
  }

  const gitCloneCommand = "git clone https://github.com/preeesha/image-stegnography";
  exec(gitCloneCommand, (error, stdout) => {
    if (error) {
      console.error(`Error executing command: ${error.message}`);
      res.status(500).send({ status: 500, message: "FETCH_FAIL" });
      return;
    }
    
    console.log(`stdout: ${stdout} successfully done `);
    res.status(200).send({ status: 200, message: "SUCCESSful cronjob :) " });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
