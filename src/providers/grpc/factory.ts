import {LiveMatchServiceClient} from "./pb/live_grpc_web_pb";
import {liveMatchUrl} from "../../utils/urls";

export const LiveMatchServiceClientFactory = () => {
  return new LiveMatchServiceClient(liveMatchUrl, null, null);
};
