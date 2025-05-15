import { TodoCheckbox } from "@/components/todo/TodoCheckbox";
import { TodoForm } from "@/components/todo/TodoForm";
import { TodoTrashButton } from "@/components/todo/TodoTrashButton";
import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { getTodos } from "../actions";

export default async function ProtectedPage() {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return redirect("/sign-in");
	}

	const todos = await getTodos();

	return (
		<div className="flex-1 w-full flex flex-col gap-6">
			<TodoForm />

			<div className="grid gap-4">
				{todos?.map((todo) => (
					<Card key={todo.id}>
						<CardContent className="p-4 flex flex-col gap-4">
							<div className="flex items-center gap-3">
								<TodoCheckbox isCompleted={todo.is_complete} id={todo.id} />
								<div className="flex-1">
									<p
										className={`${todo.completed ? "line-through text-muted-foreground" : ""}`}
									>
										{todo.title}
									</p>
									<p className="text-sm text-muted-foreground">
										{new Date(todo.created_at).toLocaleDateString("ja-JP")}
									</p>
								</div>
								<TodoTrashButton id={todo.id} />
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
				))}
			</div>
		</div>
	);
}
