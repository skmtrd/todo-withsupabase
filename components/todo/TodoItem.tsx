"use client";

import { deleteTodo } from "@/app/actions";
import type { Todo } from "@/app/protected/page";
import { Trash2 } from "lucide-react";
import { useTransition } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { TodoCheckbox } from "./TodoCheckbox";

export const TodoItem = ({ todo }: { todo: Todo }) => {
	const [isPending, startTransition] = useTransition();
	const handleClick = async () => {
		startTransition(async () => {
			await deleteTodo(todo.id);
		});
	};

	return (
		<Card key={todo.id} className={`${isPending ? "hidden" : ""}`}>
			<CardContent className="p-4 flex flex-col gap-4">
				<div className="flex items-center gap-3">
					<TodoCheckbox isCompleted={todo.is_complete} id={todo.id} />
					<div className="flex-1">
						<p
							className={`${todo.is_complete ? "line-through text-muted-foreground" : ""}`}
						>
							{todo.title}
						</p>
						<p className="text-sm text-muted-foreground">
							{new Date(todo.created_at).toLocaleDateString("ja-JP")}
						</p>
					</div>
					<Button variant="ghost" size="icon" onClick={handleClick}>
						<Trash2 className="w-4 h-4" />
					</Button>
				</div>
				{todo.image_url && (
					<img
						className="w-full h-auto rounded-md max-h-40 object-contain"
						src={todo.image_url}
						alt={todo.title}
						width={100}
						height={100}
					/>
				)}
			</CardContent>
		</Card>
	);
};
