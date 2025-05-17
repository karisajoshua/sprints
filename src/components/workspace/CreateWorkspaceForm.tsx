
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { createWorkspace } from '@/services/workspaceService';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const workspaceSchema = z.object({
  name: z.string().min(2, {
    message: 'Workspace name must be at least 2 characters.',
  }).max(50),
  description: z.string().max(500).optional(),
});

export const CreateWorkspaceForm = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof workspaceSchema>>({
    resolver: zodResolver(workspaceSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof workspaceSchema>) => {
    try {
      const workspace = await createWorkspace(
        values.name,
        values.description || null
      );
      
      toast({
        title: 'Workspace created!',
        description: `Your workspace "${workspace.name}" has been created successfully.`,
      });
      
      navigate('/dashboard/events');
    } catch (error: any) {
      toast({
        title: 'Error creating workspace',
        description: error.message || 'Failed to create workspace. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Create a Workspace</CardTitle>
        <CardDescription>
          Create a new workspace for your event team to collaborate
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Workspace Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter workspace name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe the purpose of this workspace" 
                      className="min-h-24 resize-none" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" variant="lavender">
              Create Workspace
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};
