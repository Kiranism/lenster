import { POLYGON_AMOY_RPCS, POLYGON_RPCS } from "@hey/data/rpcs";
import type { FallbackTransport } from "viem";
import { http, fallback } from "viem";

const getRpc = ({ mainnet }: { mainnet: boolean }): FallbackTransport => {
  if (mainnet) {
    return fallback(POLYGON_RPCS.map((rpc) => http(rpc)));
  }

  return fallback(POLYGON_AMOY_RPCS.map((rpc) => http(rpc)));
};

export default getRpc;
