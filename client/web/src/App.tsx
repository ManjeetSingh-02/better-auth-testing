import { authClient, useSession } from './lib/auth-client';

function App() {
  const { data: session, isPending, error } = useSession();

  async function signInWithGoogle() {
    await authClient.signIn.social({
      provider: 'google',
      callbackURL: 'http://localhost:5173',
    });
  }

  async function signOut() {
    await authClient.signOut();
  }

  if (isPending)
    return (
      <main className='flex min-h-screen items-center justify-center bg-neutral-100'>
        <p className='text-lg font-medium text-neutral-600'>Checking session...</p>
      </main>
    );

  if (error)
    return (
      <main className='flex min-h-screen items-center justify-center bg-neutral-100'>
        <p className='text-lg font-medium text-red-600'>{error.message}</p>
      </main>
    );

  return (
    <main className='flex min-h-screen items-center justify-center bg-neutral-100 p-6'>
      <div className='w-full max-w-md rounded-2xl bg-white p-8 shadow-xl'>
        <h1 className='mb-2 text-center text-3xl font-bold'>Better Auth Demo</h1>

        <p className='mb-8 text-center text-neutral-500'>React + Express + Better Auth</p>

        {session ? (
          <div className='space-y-6'>
            <div className='flex items-center justify-between rounded-xl bg-neutral-100 p-4'>
              <div className='min-w-0'>
                <p className='text-sm text-neutral-500'>Signed in as</p>

                <p className='mt-1 truncate font-semibold'>{session.user.name ?? 'Unknown User'}</p>

                <p className='truncate text-sm text-neutral-600'>{session.user.email}</p>
              </div>

              <img
                src={session.user.image ?? 'https://placehold.co/80x80?text=👤'}
                alt={session.user.name ?? 'Profile'}
                className='ml-4 h-16 w-16 rounded-full border border-neutral-300 object-cover'
              />
            </div>

            <button
              onClick={signOut}
              className='w-full rounded-xl bg-black px-4 py-3 font-medium text-white transition hover:bg-neutral-800'
            >
              Sign Out
            </button>
          </div>
        ) : (
          <button
            onClick={signInWithGoogle}
            className='w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 font-medium transition hover:bg-neutral-100'
          >
            Continue with Google
          </button>
        )}
      </div>
    </main>
  );
}

export default App;
