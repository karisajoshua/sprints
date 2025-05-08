
// Type declarations for HTTP server
export function serve(handler: (req: Request) => Response | Promise<Response>): void;

export type ServeInit = {
  port?: number;
  hostname?: string;
  handler?: (req: Request) => Response | Promise<Response>;
  onError?: (error: unknown) => Response | Promise<Response>;
  onListen?: (params: { hostname: string; port: number }) => void;
};
