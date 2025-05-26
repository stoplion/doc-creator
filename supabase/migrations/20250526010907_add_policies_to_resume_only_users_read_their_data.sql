create policy "Enable users to view their own data only"
on "public"."resumes"
as permissive
for select
to authenticated
using ((( SELECT auth.uid() AS uid) = user_id));



