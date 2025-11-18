import { UserRoundPlus } from 'lucide-react';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Combobox } from './combobox';
import { useQuery } from '@tanstack/react-query';
import { FiltersBuilder } from '@/types/paged.d';
import { useState } from 'react';
import userApi from '@/api/user.api';

export function InviteMemberDialog() {
	const [search, setSearch] = useState('');

	const filters = search ? new FiltersBuilder().like('username', search).or().like('email', search).build() : [];

	const { data, status } = useQuery({
		queryKey: ['users-combobox', search],
		queryFn: () => userApi.read({ filters }),
	});

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">
					<UserRoundPlus />
					Invite member
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Invite new member</DialogTitle>
					<DialogDescription>Invite existing accounts to this organization</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4">
					<div className="grid gap-3">
						<Label htmlFor="name-1">Username or Email</Label>
						<Combobox
              className='w-md'
							empty="No users found"
							searchPlaceholder="Search..."
							onSearch={setSearch}
							placeholder="Username or Email"
							items={status === 'success' ? data.items.map((item) => ({ value: item.ID.toString(), label: `${item.username} - ${item.email}` })) : []}
						/>
					</div>
				</div>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline">Cancel</Button>
					</DialogClose>
					<Button type="submit">Save changes</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
