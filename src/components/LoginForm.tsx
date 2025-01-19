import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../hooks/useAuth';
import { LoginInput, loginSchema } from '../lib/schemas';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';

export function LoginForm() {
  const navigate = useNavigate();
  const login = useLogin();

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginInput) => {
    login.mutate(data);
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <h2 className="text-2xl font-bold">Login</h2>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 text-start">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {login.error && (
              <p className="text-destructive text-sm">
                {login.error instanceof Error ? login.error.message : 'Login failed'}
              </p>
            )}

            <Button type="submit" className="w-full" disabled={login.isPending}>
              {login.isPending ? 'Logging in...' : 'Login'}
            </Button>

            <Button
              type="button"
              variant="link"
              onClick={() => navigate('/register')}
              className="w-full"
            >
              Don't have an account? Register
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
