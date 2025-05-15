import { TodoForm } from "@/components/todo/TodoForm";
import { TodoItem } from "@/components/todo/TodoItem";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { getTodos } from "../actions";

export type Todo = {
	id: string;
	title: string;
	image_url: string;
	created_at: string;
	updated_at: string;
	is_complete: boolean;
	user_id: string;
};

export default async function ProtectedPage() {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return redirect("/sign-in");
	}

	const todos = await getTodos();

	console.log(todos);

	return (
		<div className="flex-1 w-full flex flex-col gap-6">
			<TodoForm />
			<div className="grid gap-4">
				{todos?.map((todo) => (
					<TodoItem key={todo.id} todo={todo} />
				))}
			</div>
		</div>
	);
}
