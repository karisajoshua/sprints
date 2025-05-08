
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders, status: 200 });
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
      // These should be available at runtime
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
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

    // Parse the request body
    const requestData = await req.json();
    const { organizationName } = requestData;

    if (!organizationName) {
      return new Response(
        JSON.stringify({ error: "Organization name is required" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    // Start a transaction to create organization and add member
    const { data: organization, error: orgError } = await supabaseClient
      .from("organizations")
      .insert({ name: organizationName })
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

    // Add user as admin to the organization
    const { error: memberError } = await supabaseClient
      .from("organization_members")
      .insert({
        organization_id: organization.id,
        profile_id: user.id,
        role: "admin",
      });

    if (memberError) {
      console.error("Error adding user to organization:", memberError);
      
      // Try to clean up the organization if adding member failed
      await supabaseClient
        .from("organizations")
        .delete()
        .eq("id", organization.id);
        
      return new Response(
        JSON.stringify({ error: "Failed to add user to organization", details: memberError }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
        }
      );
    }

    return new Response(JSON.stringify({ success: true, organization }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
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
