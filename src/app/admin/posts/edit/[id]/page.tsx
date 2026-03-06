import AdminPostEditor from "@/components/admin/AdminPostEditor";

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
    return <AdminPostEditor params={params} />;
}
