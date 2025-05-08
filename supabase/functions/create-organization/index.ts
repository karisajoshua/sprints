
// Using relative imports that will work in the Supabase Edge Function environment
import { serve } from "../http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface CreateOrgRequest {
  name: string;
  description?: string;
  logo_url?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the authorization header from the request
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Missing authorization header" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 401,
        }
      );
    }

    // Create a Supabase client with the user's JWT
    const supabaseClient = createClient(
      // These will be available within the Supabase Edge Function environment
      Deno.env.get("SUPABASE_URL") || '',
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || '',
      {
        global: {
          headers: {
            Authorization: authHeader,
          },
        },
      }
    );

    // Get the user from the JWT
    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser();

    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: "Unauthorized", details: userError }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 401,
        }
      );
    }

    // Create an admin client that bypasses RLS using service role
    const adminClient = createClient(
      Deno.env.get("SUPABASE_URL") || '',
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || '',
      {
        // Don't include the user's JWT here so we use the service role's full permissions
      }
    );

    // Parse the request body
    const { name, description, logo_url }: CreateOrgRequest = await req.json();

    if (!name) {
      return new Response(
        JSON.stringify({ error: "Organization name is required" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    // Create the organization using the admin client (bypassing RLS)
    const { data: organization, error: orgError } = await adminClient
      .from("organizations")
      .insert({
        name,
        description: description || null,
        logo_url: logo_url || null,
      })
      .select()
      .single();

    if (orgError) {
      console.error("Error creating organization:", orgError);
      return new Response(
        JSON.stringify({ error: "Failed to create organization", details: orgError }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
        }
      );
    }

    // Add the user as an admin of the organization (also using admin client)
    const { error: memberError } = await adminClient
      .from("organization_members")
      .insert({
        organization_id: organization.id,
        profile_id: user.id,
        role: "admin",
      });

    if (memberError) {
      console.error("Error adding member to organization:", memberError);
      return new Response(
        JSON.stringify({
          error: "Organization created but failed to add you as admin",
          details: memberError,
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
        }
      );
    }

    return new Response(JSON.stringify({ organization }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error: any) {
    console.error("Error in create-organization function:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error", details: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
