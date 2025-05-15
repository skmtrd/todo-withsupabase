"use client";

import { createTodo } from "@/app/actions";
import { useState, useTransition } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export const TodoForm = () => {
	const [title, setTitle] = useState("");
	const [image, setImage] = useState<File | null>(null);
	const [isPending, startTransition] = useTransition();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault();
			startTransition(async () => {
				await createTodo(title, image);
				setTitle("");
				setImage(null);
			});
		} catch (error) {
			console.error(error);
		}
	};

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			setImage(e.target.files[0]);
		}
	};

	return (
		<div className="flex flex-col gap-4">
			<h1 className="text-2xl font-bold">新規タスク</h1>
			<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
				<Input
					type="text"
					placeholder="タスクを入力してください"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<Input type="file" accept="image/*" onChange={handleImageChange} />
				<Button type="submit" disabled={isPending}>
					{isPending ? "追加中..." : "タスクを追加"}
				</Button>
			</form>
		</div>
	);
};
