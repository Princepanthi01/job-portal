import * as Sentry from "@sentry/node";
import { nodeProfilingIntegration } from "@sentry/profiling-node";
import { mongooseIntegration } from "@sentry/node";

Sentry.init({
  dsn: "https://bfecc30085a2102c44427fb454a0e146@o4509870067351552.ingest.us.sentry.io/4509870072922112",
  integrations: [
    mongooseIntegration(),
    nodeProfilingIntegration(),
  ],
  sendDefaultPii: true,
});

