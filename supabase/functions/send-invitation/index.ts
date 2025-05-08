
// Using relative imports without ESM that will work in both Deno and Node environments
import { serve } from "http/server";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface InvitationRequest {
  email: string;
  role: 'admin' | 'manager' | 'member';
  organizationId: string;
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
      process.env.SUPABASE_URL || '',
      process.env.SUPABASE_SERVICE_ROLE_KEY || '',
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
    const { email, role, organizationId } = requestData as InvitationRequest;

    if (!email || !role || !organizationId) {
      return new Response(
        JSON.stringify({ error: "Email, role, and organizationId are required" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    // Check if user is admin of the organization
    const { data: isAdmin, error: adminCheckError } = await supabaseClient
      .rpc("is_organization_admin", { org_id: organizationId });

    if (adminCheckError || !isAdmin) {
      return new Response(
        JSON.stringify({ error: "You are not an admin of this organization" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 403,
        }
      );
    }

    // Generate a token and expiration date (7 days from now)
    const token = uuidv4();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    // Create the invitation
    const { data: invitation, error: inviteError } = await supabaseClient
      .from("invitations")
      .insert({
        organization_id: organizationId,
        email,
        role,
        token,
        expires_at: expiresAt.toISOString(),
      })
      .select()
      .single();

    if (inviteError) {
      console.error("Error creating invitation:", inviteError);
      return new Response(
        JSON.stringify({ error: "Failed to create invitation", details: inviteError }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
        }
      );
    }

    // In a real application, you would send an email with a link containing the token
    // For now, we'll just return the invitation object with token
    console.log(`Invitation created for ${email}, token: ${token}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        invitation: { 
          ...invitation,
          // Include the inviteUrl that would be sent in the email
          inviteUrl: `${process.env.PUBLIC_URL || window.location.origin}/join?token=${token}` 
        } 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error: any) {
    console.error("Error in send-invitation function:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error", details: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
