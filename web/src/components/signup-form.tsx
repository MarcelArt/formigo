import { GalleryVerticalEnd } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSeparator } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Link } from '@tanstack/react-router';

export function SignupForm({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div className={cn('flex flex-col gap-6', className)} {...props}>
			<form>
				<FieldGroup>
					<div className="flex flex-col items-center gap-2 text-center">
						<a href="#" className="flex flex-col items-center gap-2 font-medium">
							<div className="flex size-8 items-center justify-center rounded-md">
								<GalleryVerticalEnd className="size-6" />
							</div>
							<span className="sr-only">Formigo.</span>
						</a>
						<h1 className="text-xl font-bold">Welcome to Formigo.</h1>
						<FieldDescription>
							Already have an account? <Link to="/login">Sign in</Link>
						</FieldDescription>
					</div>
					<Field>
						<FieldLabel htmlFor="email">Email</FieldLabel>
						<Input id="email" type="email" placeholder="m@example.com" required />
					</Field>
					<Field>
						<FieldLabel htmlFor="username">Username</FieldLabel>
						<Input id="username" type="text" placeholder="Username" required />
					</Field>
					<Field className="grid gap-4 sm:grid-cols-2">
						<FieldLabel htmlFor="password">Password</FieldLabel>
						<FieldLabel htmlFor="confirm-password">Confirm password</FieldLabel>
						<Input id="password" type="password" placeholder="Password" required />
						<Input id="confirm-password" type="password" placeholder="Password" required />
					</Field>
					<Field>
						<Button type="submit">Create Account</Button>
					</Field>
				</FieldGroup>
			</form>
			<FieldDescription className="px-6 text-center">
				By clicking continue, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
			</FieldDescription>
		</div>
	);
}
