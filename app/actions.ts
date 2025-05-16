"use server";

import { createClient } from "@/utils/supabase/server";
import { encodedRedirect } from "@/utils/utils";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signUpAction = async (formData: FormData) => {
	const email = formData.get("email")?.toString();
	const password = formData.get("password")?.toString();
	const supabase = await createClient();
	const origin = (await headers()).get("origin");

	if (!email || !password) {
		return encodedRedirect(
			"error",
			"/sign-up",
			"Email and password are required",
		);
	}

	const { error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			emailRedirectTo: `${origin}/auth/callback`,
		},
	});

	if (error) {
		// biome-ignore lint/style/useTemplate: <explanation>
		console.error(error.code + " " + error.message);
		return encodedRedirect("error", "/sign-up", error.message);
	// biome-ignore lint/style/noUselessElse: <explanation>
	} else {
		return encodedRedirect(
			"success",
			"/sign-up",
			"Thanks for signing up! Please check your email for a verification link.",
		);
	}
};

export const signInAction = async (formData: FormData) => {
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;
	const supabase = await createClient();

	const { error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) {
		return encodedRedirect("error", "/sign-in", error.message);
	}

	return redirect("/protected");
};

export const forgotPasswordAction = async (formData: FormData) => {
	const email = formData.get("email")?.toString();
	const supabase = await createClient();
	const origin = (await headers()).get("origin");
	const callbackUrl = formData.get("callbackUrl")?.toString();

	if (!email) {
		return encodedRedirect("error", "/forgot-password", "Email is required");
	}

	const { error } = await supabase.auth.resetPasswordForEmail(email, {
		redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
	});

	if (error) {
		console.error(error.message);
		return encodedRedirect(
			"error",
			"/forgot-password",
			"Could not reset password",
		);
	}

	if (callbackUrl) {
		return redirect(callbackUrl);
	}

	return encodedRedirect(
		"success",
		"/forgot-password",
		"Check your email for a link to reset your password.",
	);
};

export const resetPasswordAction = async (formData: FormData) => {
	const supabase = await createClient();

	const password = formData.get("password") as string;
	const confirmPassword = formData.get("confirmPassword") as string;

	if (!password || !confirmPassword) {
		encodedRedirect(
			"error",
			"/protected/reset-password",
			"Password and confirm password are required",
		);
	}

	if (password !== confirmPassword) {
		encodedRedirect(
			"error",
			"/protected/reset-password",
			"Passwords do not match",
		);
	}

	const { error } = await supabase.auth.updateUser({
		password: password,
	});

	if (error) {
		encodedRedirect(
			"error",
			"/protected/reset-password",
			"Password update failed",
		);
	}

	encodedRedirect("success", "/protected/reset-password", "Password updated");
};

export const signOutAction = async () => {
	const supabase = await createClient();
	await supabase.auth.signOut();
	return redirect("/sign-in");
};

export const getTodos = async () => {
	try {
		const supabase = await createClient();
		const { data, error } = await supabase
			.from("todos")
			.select("*")
			.order("created_at", { ascending: false });

		if (error) throw error;

		return data;
	} catch (error) {
		console.error("Error fetching todos:", error);
		alert((error as Error).message);
	}
};

export const toggleCompleted = async (id: string, isCompleted: boolean) => {
	try {
		const supabase = await createClient();
		const { error } = await supabase
			.from("todos")
			.update({ is_complete: !isCompleted })
			.eq("id", id);

		if (error) throw error;
		revalidatePath("/protected");
	} catch (error) {
		console.error("Error updating todo:", error);
		alert((error as Error).message);
	}
};

export const createTodo = async (title: string, image_url: File | null) => {
	if (!title.trim()) return;

	try {
		const supabase = await createClient();
		const {
			data: { user },
		} = await supabase.auth.getUser();

		if (!user) throw new Error("ログインしていません");

		let imageUrl = null;

		// 画像がある場合はアップロード
		if (image_url) {
			const fileExt = image_url.name.split(".").pop();
			const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
			const filePath = `${user.id}/${fileName}`;

			const { error: uploadError, data } = await supabase.storage
				.from("todo-images")
				.upload(filePath, image_url);

			if (uploadError) throw uploadError;

			// 公開URLを取得
			const {
				data: { publicUrl },
			} = supabase.storage.from("todo-images").getPublicUrl(filePath);

			imageUrl = publicUrl;
		}

		const { error } = await supabase.from("todos").insert([
			{
				title: title.trim(),
				user_id: user.id,
				image_url: imageUrl,
			},
		]);

		if (error) throw error;
		revalidatePath("/protected");
	} catch (error) {
		console.error("Error adding todo:", error);
		alert((error as Error).message);
	}
};

export const deleteTodo = async (id: string) => {
	try {
		const supabase = await createClient();

		const { error } = await supabase.from("todos").delete().eq("id", id);

		if (error) throw error;

		revalidatePath("/protected");
	} catch (error) {
		console.error("Error deleting todo:", error);
		alert((error as Error).message);
	}
};

export const updateProfile = async (username: string) => {
	try {		
		const supabase = await createClient();
		const { data: { user } } = await supabase.auth.getUser();

		if (!user) throw new Error("ユーザーが見つかりません");

		const { error } = await supabase
			.from("profiles")
			.update({ username })
			.eq("id", user.id);

		if (error) throw error;

		return redirect("/todo");
	} catch (error) {
		console.error("Error updating profile:", error);
		throw error;
	}
};
