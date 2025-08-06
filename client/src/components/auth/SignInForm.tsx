'use client';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';

import type { FormSettings } from '@/lib/wordpress-api';
import { Eye, EyeOff } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface SignInFormProps {
	formSettings?: FormSettings;
}

export function SignInForm({ formSettings }: SignInFormProps) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError('');

		try {
			const result = await signIn('credentials', {
				username,
				password,
				redirect: false,
			});

			if (result?.error) {
				setError('Invalid credentials');
			} else if (result?.ok) {
				router.push('/home');
			}
		} catch {
			setError('Something went wrong');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Card className="w-full mx-auto max-w-md">
			<CardHeader>
				<CardTitle>{formSettings?.formTitle || 'Sign In'}</CardTitle>
				<CardDescription>
					{formSettings?.formDescription ||
						'Enter your credentials to access your account'}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<Input
							type="text"
							placeholder="Username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							disabled={isLoading}
							required
						/>
					</div>
					<div className="relative">
						<Input
							type={showPassword ? 'text' : 'password'}
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							disabled={isLoading}
							required
						/>
						<Button
							type="button"
							variant="ghost"
							size="sm"
							className="absolute right-2 top-1/2 -translate-y-1/2 h-auto p-1"
							onClick={() => setShowPassword(!showPassword)}
						>
							{showPassword ? (
								<EyeOff className="h-4 w-4" />
							) : (
								<Eye className="h-4 w-4" />
							)}
						</Button>
					</div>
					{error && (
						<div className="text-ds-medium text-destructive">
							{error}
						</div>
					)}
					<Button
						type="submit"
						className="w-full"
						disabled={isLoading}
					>
						{isLoading
							? 'Signing in...'
							: formSettings?.buttonText || 'Sign In'}
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}
