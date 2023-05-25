import { connect } from "mongoose";
import config from "config";

const mongoDbConfig = config.get<{ uri: string }>("mongoDbConfig");

export const connectToDb = () => connect(mongoDbConfig.uri);
