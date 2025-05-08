
// This file provides a compatible server interface for Supabase Edge Functions

export function serve(handler: (req: Request) => Response | Promise<Response>): void {
  // For Deno environment in Supabase Edge Functions
  // @ts-ignore - Deno namespace will exist in Edge Function environment
  if (typeof Deno !== "undefined") {
    // @ts-ignore - Deno.serve is available in Edge Function environment
    Deno.serve(handler);
  } else {
    // For local development or non-Deno environments
    console.warn('Running outside Deno environment, handler will not be registered automatically');
  }
}

export type ServeInit = {
  port?: number;
  hostname?: string;
  handler?: (req: Request) => Response | Promise<Response>;
  onError?: (error: unknown) => Response | Promise<Response>;
  onListen?: (params: { hostname: string; port: number }) => void;
};
