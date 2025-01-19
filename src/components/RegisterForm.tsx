import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useRegister } from '../hooks/useAuth';
import { RegisterInput, registerSchema } from '../lib/schemas';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';

export function RegisterForm() {
  const navigate = useNavigate();
  const register = useRegister();
  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: RegisterInput) => {
    register.mutate(data);
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <h2 className="text-2xl font-bold">Register</h2>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="text-start space-y-4">
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Confirm your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {register.error && (
              <p className="text-destructive text-sm px-1">
                {register.error instanceof Error ? register.error.message : 'Registration failed'}
              </p>
            )}
            <Button type="submit" className="w-full" disabled={register.isPending}>
              {register.isPending ? 'Registering...' : 'Register'}
            </Button>
            <Button
              type="button"
              variant="link"
              onClick={() => navigate('/login')}
              className="w-full"
            >
              Already have an account? Login
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
