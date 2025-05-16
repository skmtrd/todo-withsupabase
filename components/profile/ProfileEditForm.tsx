"use client";

import { updateProfile } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const profileEditSchema = z.object({
	username: z.string().min(1, "ユーザー名を入力してください"),
});

export function ProfileEditForm({ username }: { username: string }) {
	const { register, formState, handleSubmit } = useForm<
		z.infer<typeof profileEditSchema>
	>({
		resolver: zodResolver(profileEditSchema),
		defaultValues: {
			username: username,
		},
	});

	const onSubmit = async (data: z.infer<typeof profileEditSchema>) => {
		console.log(data);
		await updateProfile(data.username);
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex flex-col gap-4 max-w-md"
		>
			<div className="space-y-2">
				<Label htmlFor="username">ユーザー名</Label>
				<Input
					id="username"
					placeholder="ユーザー名を入力"
					required
					disabled={formState.isLoading}
					{...register("username")}
				/>
			</div>
			<Button type="submit" className="w-full">
				更新する
			</Button>
		</form>
	);
}
