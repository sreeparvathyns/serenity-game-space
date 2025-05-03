
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Mail } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Mock password reset - in a real app this would connect to an auth service
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitted(true);
      
      toast({
        title: "Reset email sent",
        description: "Check your inbox for password reset instructions.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem sending the reset email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-serenity-50">
      <div className="mb-8 text-center">
        <Link to="/" className="flex items-center justify-center">
          <div className="rounded-full bg-serenity-500 w-12 h-12 flex items-center justify-center mr-3">
            <span className="text-white font-semibold text-lg">S</span>
          </div>
          <span className="font-bold text-3xl text-serenity-700">Serenity</span>
        </Link>
      </div>
      
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Reset your password</CardTitle>
          <CardDescription className="text-center">
            {!submitted 
              ? "Enter your email address and we'll send you a link to reset your password" 
              : "Check your email for a link to reset your password"}
          </CardDescription>
        </CardHeader>
        
        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="your.email@example.com" 
                    className="pl-10" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button 
                type="submit" 
                className="w-full bg-serenity-600 hover:bg-serenity-700" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin rounded-full h-4 w-4 border-2 border-t-transparent border-serenity-100"></span>
                    Sending...
                  </span>
                ) : (
                  "Send reset link"
                )}
              </Button>
            </CardFooter>
          </form>
        ) : (
          <CardContent className="space-y-4">
            <div className="text-center py-4 text-muted-foreground">
              <p>We've sent a password reset link to:</p>
              <p className="font-medium text-foreground mt-2">{email}</p>
              <p className="mt-4">Didn't receive the email? Check your spam folder or try again.</p>
            </div>
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => setSubmitted(false)}
            >
              Try again
            </Button>
          </CardContent>
        )}
        
        <div className="p-6 pt-0">
          <Button 
            variant="link" 
            asChild 
            className="p-0 flex items-center gap-1 text-muted-foreground hover:text-serenity-600"
          >
            <Link to="/login">
              <ArrowLeft className="h-4 w-4" />
              Back to login
            </Link>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ForgotPassword;
