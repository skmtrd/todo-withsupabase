import { ProfileEditForm } from "@/components/profile/ProfileEditForm";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function ProfileEditPage() {
	const supabase = await createClient();

	const { data: profile } = await supabase
		.from("profiles")
		.select("*")
		.single();

	if (!profile) {
		return redirect("/sign-in");
	}

	return (
		<div className="flex-1 w-full flex flex-col gap-6">
			<ProfileEditForm username={profile?.username} />
		</div>
	);
}
