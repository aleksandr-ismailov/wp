'use client';

import { Eye, EyeOff } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import {
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Input,
} from '@/shared/theme/components';

interface FormSettings {
	formTitle?: string;
	buttonText?: string;
}

interface SignInFormProps {
	formSettings?: FormSettings;
}

export const SignInForm = (props: SignInFormProps) => {
	const { formSettings } = props;
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
				router.push('/');
			}
		} catch {
			setError('Something went wrong');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>{formSettings?.formTitle || 'Sign In'}</CardTitle>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className="space-y-ds-16">
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
							className="absolute right-ds-8 top-1/2 -translate-y-1/2 h-auto p-ds-4"
							onClick={() => setShowPassword(!showPassword)}
						>
							{showPassword ? (
								<EyeOff className="size-ds-16" />
							) : (
								<Eye className="size-ds-16" />
							)}
						</Button>
					</div>
					{error && <div className="text-ds-14 text-destructive">{error}</div>}
					<Button type="submit" className="w-full" disabled={isLoading}>
						{isLoading
							? 'Signing in...'
							: formSettings?.buttonText || 'Sign In'}
					</Button>
				</form>
			</CardContent>
		</Card>
	);
};
