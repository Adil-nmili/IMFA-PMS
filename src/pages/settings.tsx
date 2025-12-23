// src/pages/settings.tsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { User, Mail, Phone, Calendar, MapPin, Shield, Key } from 'lucide-react';

// Define types
interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  bio: string;
  location: string;
  joinDate: string;
  role: string;
}

// Password change schema with validation
const passwordSchema = z.object({
  currentPassword: z.string().min(1, { message: 'Current password is required' }),
  newPassword: z.string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' })
    .regex(/[^A-Za-z0-9]/, { message: 'Password must contain at least one special character' }),
  confirmPassword: z.string().min(1, { message: 'Please confirm your password' }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type PasswordFormValues = z.infer<typeof passwordSchema>;

const SettingsPage: React.FC = () => {
  // Mock user data - in a real app, this would come from an API/context
  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: '1',
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    phone: '+1 (555) 123-4567',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    bio: 'Senior Software Engineer with 8+ years of experience in full-stack development. Passionate about creating user-friendly applications.',
    location: 'San Francisco, CA',
    joinDate: 'January 15, 2020',
    role: 'Administrator',
  });

  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Password form setup
  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  // Handle password change submission
  const onSubmitPassword = async (data: PasswordFormValues) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Password change data:', data);
      alert('Password changed successfully!');
      passwordForm.reset();
      setIsEditingPassword(false);
      setIsLoading(false);
    }, 1500);
  };

  // Personal info items
  const personalInfoItems = [
    {
      icon: <User className="h-4 w-4" />,
      label: 'Full Name',
      value: userProfile.name,
    },
    {
      icon: <Mail className="h-4 w-4" />,
      label: 'Email Address',
      value: userProfile.email,
    },
    {
      icon: <Phone className="h-4 w-4" />,
      label: 'Phone Number',
      value: userProfile.phone,
    },
    {
      icon: <Calendar className="h-4 w-4" />,
      label: 'Member Since',
      value: userProfile.joinDate,
    },
    {
      icon: <MapPin className="h-4 w-4" />,
      label: 'Location',
      value: userProfile.location,
    },
    {
      icon: <Shield className="h-4 w-4" />,
      label: 'Role',
      value: userProfile.role,
    },
  ];

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account settings and personal information
        </p>
      </div>

      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
          <TabsTrigger value="personal">
            <User className="h-4 w-4 mr-2" />
            Personal Information
          </TabsTrigger>
          <TabsTrigger value="security">
            <Key className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
        </TabsList>

        {/* Personal Information Tab */}
        <TabsContent value="personal" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                View and manage your personal information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Header */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
                  <AvatarFallback className="text-lg">
                    {userProfile.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-2xl font-bold">{userProfile.name}</h3>
                  <p className="text-muted-foreground mt-1">{userProfile.email}</p>
                  <p className="mt-3 text-sm">{userProfile.bio}</p>
                  <Button variant="outline" className="mt-4">
                    Edit Profile
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Personal Information Grid */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Personal Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {personalInfoItems.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 rounded-lg border">
                      <div className="p-2 rounded-md bg-muted">
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
                        <p className="font-medium">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Download My Data</Button>
              <div className="space-x-2">
                <Button variant="outline">Deactivate Account</Button>
                <Button>Edit Information</Button>
              </div>
            </CardFooter>
          </Card>

          {/* Additional Settings Card */}
          <Card>
            <CardHeader>
              <CardTitle>Account Preferences</CardTitle>
              <CardDescription>
                Manage your notification and privacy preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive email updates about your account
                  </p>
                </div>
                <Button variant="outline" size="sm">Configure</Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Button variant="outline" size="sm">Enable</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab - Password Change */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>
                Update your password to keep your account secure
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!isEditingPassword ? (
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg bg-muted/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Password Security</h4>
                        <p className="text-sm text-muted-foreground">
                          Last changed 3 months ago
                        </p>
                      </div>
                      <Button onClick={() => setIsEditingPassword(true)}>
                        Change Password
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium">Password Requirements</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                        At least 8 characters long
                      </li>
                      <li className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                        Contains uppercase and lowercase letters
                      </li>
                      <li className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                        Includes at least one number
                      </li>
                      <li className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                        Contains at least one special character
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                <Form {...passwordForm}>
                  <form onSubmit={passwordForm.handleSubmit(onSubmitPassword)} className="space-y-6">
                    <FormField
                      control={passwordForm.control}
                      name="currentPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Password</FormLabel>
                          <FormControl>
                            <Input 
                              type="password" 
                              placeholder="Enter your current password" 
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={passwordForm.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <Input 
                              type="password" 
                              placeholder="Enter your new password" 
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Must be at least 8 characters with uppercase, lowercase, number, and special character
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={passwordForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm New Password</FormLabel>
                          <FormControl>
                            <Input 
                              type="password" 
                              placeholder="Confirm your new password" 
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex gap-3 pt-4">
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="flex-1"
                      >
                        {isLoading ? (
                          <>
                            <span className="mr-2">Updating...</span>
                          </>
                        ) : (
                          'Update Password'
                        )}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setIsEditingPassword(false);
                          passwordForm.reset();
                        }}
                        disabled={isLoading}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </Form>
              )}
            </CardContent>
          </Card>

          {/* Security Session Card */}
          <Card>
            <CardHeader>
              <CardTitle>Security Sessions</CardTitle>
              <CardDescription>
                Manage your active sessions and devices
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="p-2 rounded-md bg-blue-100 dark:bg-blue-900">
                    <svg className="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Windows Desktop</p>
                    <p className="text-sm text-muted-foreground">
                      San Francisco, CA • Current Session
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Log Out</Button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="p-2 rounded-md bg-gray-100 dark:bg-gray-800">
                    <svg className="h-5 w-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">iPhone 14 Pro</p>
                    <p className="text-sm text-muted-foreground">
                      Last active 2 hours ago
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Log Out</Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Log Out From All Devices
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;