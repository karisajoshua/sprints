
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { createInvitation } from '@/services/workspaceService';
import { toast } from '@/hooks/use-toast';
import { useWorkspace } from './WorkspaceContext';
import { Clipboard, Check } from 'lucide-react';

const inviteSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  role: z.string().min(1, {
    message: 'Please provide a role for this member.',
  }),
  isAdmin: z.boolean().default(false),
  isHR: z.boolean().default(false),
});

export const InviteForm = () => {
  const { currentWorkspace } = useWorkspace();
  const [inviteUrl, setInviteUrl] = useState('');
  const [copied, setCopied] = useState(false);
  
  const form = useForm<z.infer<typeof inviteSchema>>({
    resolver: zodResolver(inviteSchema),
    defaultValues: {
      email: '',
      role: 'member',
      isAdmin: false,
      isHR: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof inviteSchema>) => {
    if (!currentWorkspace) {
      toast({
        title: 'Error',
        description: 'No workspace selected.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const result = await createInvitation(
        currentWorkspace.id,
        values.email,
        values.role,
        values.isAdmin,
        values.isHR
      );
      
      setInviteUrl(result.inviteUrl);
      
      toast({
        title: 'Invitation sent',
        description: `An invitation has been sent to ${values.email}.`,
      });
      
      // Reset form except for admin/hr toggles
      form.reset({
        email: '',
        role: 'member',
        isAdmin: values.isAdmin,
        isHR: values.isHR,
      });
    } catch (error: any) {
      toast({
        title: 'Failed to send invitation',
        description: error.message || 'An error occurred while sending the invitation.',
        variant: 'destructive',
      });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    
    toast({
      title: 'Copied!',
      description: 'Invitation link copied to clipboard.',
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Invite Team Members</CardTitle>
        <CardDescription>
          Send invitations to team members to join your workspace
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="colleague@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Designer, Developer" {...field} />
                  </FormControl>
                  <FormDescription>
                    The role of this member in your team
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="isAdmin"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Admin</FormLabel>
                      <FormDescription>
                        Can manage members and settings
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isHR"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">HR</FormLabel>
                      <FormDescription>
                        Can invite and manage members
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {inviteUrl && (
              <div className="rounded-lg border p-4 bg-accent/5">
                <div className="flex items-center justify-between mb-2">
                  <FormLabel className="text-base">Invitation Link</FormLabel>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 px-2" 
                    onClick={copyToClipboard}
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Clipboard className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <p className="text-sm break-all border p-2 rounded bg-background">
                  {inviteUrl}
                </p>
                <FormDescription className="mt-2">
                  Share this link with your team member. It will expire in 7 days.
                </FormDescription>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" variant="lavender" className="w-full">
              Send Invitation
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};
