"use client";

import { getTodos, toggleCompleted } from "@/app/actions";
import { CheckCircle2, Circle } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export const TodoCheckbox = ({
	isCompleted,
	id,
}: {
	isCompleted: boolean;
	id: string;
}) => {
	const router = useRouter();
	const handleClick = async () => {
		await toggleCompleted(id, isCompleted);
	};

	return (
		<Button
			onClick={handleClick}
			variant="ghost"
			size="icon"
			className="h-8 w-8"
		>
			{isCompleted ? (
				<CheckCircle2 className="h-5 w-5 text-green-500" />
			) : (
				<Circle className="h-5 w-5" />
			)}
		</Button>
	);
};
