export default function UserProfile({params}: any) {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold mb-4">User Profile</h1>
            <p className="text-lg">This is the profile page for user with ID: {params.id}</p>
        </div>
    );
}