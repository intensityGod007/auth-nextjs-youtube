export default async function UserProfile({ params }: any) {
    const resolvedParams = await params;
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold mb-4">User Profile</h1>
            <p className="text-lg">This is the profile page for user with ID: <span className="rounded bg-orange-400 p-2">{resolvedParams.id}</span></p>
        </div>
    );
}