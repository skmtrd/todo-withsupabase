"use client";

import { deleteTodo } from "@/app/actions";
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";

export const TodoTrashButton = ({ id }: { id: string }) => {
	const handleClick = async () => {
		await deleteTodo(id);
	};

	return (
		<Button variant="ghost" size="icon" onClick={handleClick}>
			<Trash2 className="w-4 h-4" />
		</Button>
	);
};
