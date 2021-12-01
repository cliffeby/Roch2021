/**
 * Required External Modules
 */
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { itemsRouter } from "./items/items.router";
import { memberRoute } from './routes/member.route';
import { scoreRoute } from './routes/score.route';
import { scorecardRoute } from './routes/scorecard.route';
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";
import { connectToDatabase } from './databaseConnection';
import { matchRoute } from "./routes/match.route";
// import { ItemPermission } from "./item-permission";

dotenv.config();
/**
 * App Variables
 */
if (!process.env.PORT) {
   process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();
/**
 *  App Configuration
 */
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/api/menu/items", itemsRouter);
app.use('/api/members', memberRoute());
app.use('/api/scores', scoreRoute());
app.use('/api/scorecards/', scorecardRoute());
app.use('/api/matches', matchRoute());
app.use(errorHandler);
app.use(notFoundHandler);

/**
 * Server Activation
 */
 app.listen(PORT, async () => {
   await connectToDatabase()
   console.log(`Listening on port ${PORT}`);
 });
