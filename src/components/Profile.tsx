import { useLogout, useProfile } from '../hooks/useAuth';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';

export function Profile() {
  const { data: profile, isLoading, error } = useProfile();
  const logout = useLogout();

  if (isLoading) {
    return (
      <Card className="w-[350px]">
        <CardContent className="p-4">
          Loading...
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-[350px]">
        <CardContent className="p-4 text-destructive">
          Failed to load profile
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <h2 className="text-2xl font-bold">Profile</h2>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm font-medium">Email</p>
          <p className="text-sm text-muted-foreground">{profile?.email}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium">ID</p>
          <p className="text-sm text-muted-foreground">{profile?.id}</p>
        </div>
        <Button onClick={logout} className="w-full">
          Logout
        </Button>
      </CardContent>
    </Card>
  );
}