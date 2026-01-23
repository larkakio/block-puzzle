import { miniappConfig } from "./lib/miniapp-config";

export const minikitConfig = {
  accountAssociation: miniappConfig.accountAssociation,
  miniapp: miniappConfig.miniapp,
} as const;
