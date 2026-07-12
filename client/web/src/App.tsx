import { authClient, useSession } from './lib/auth-client';

export default function App() {
  const { data: session, isPending, error, refetch, isRefetching } = useSession();

  async function signInWithGoogle() {
    await authClient.signIn.social({
      provider: 'google',
      callbackURL: import.meta.env.VITE_BETTER_AUTH_CALLBACK_URL,
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

  if (!session)
    return (
      <main className='flex min-h-screen items-center justify-center bg-neutral-100'>
        <button
          onClick={signInWithGoogle}
          className='rounded-xl bg-black px-6 py-3 font-medium text-white transition hover:bg-neutral-800 cursor-pointer'
        >
          Continue with Google
        </button>
      </main>
    );

  return (
    <main className='min-h-screen bg-neutral-100 py-12'>
      <div className='mx-auto max-w-6xl space-y-8 px-6'>
        <header className='rounded-3xl bg-white p-8 shadow-sm'>
          <div className='flex flex-col items-center gap-6 md:flex-row'>
            <img
              src={session.user.image ?? 'https://placehold.co/120x120?text=👤'}
              alt={session.user.name ?? 'Profile'}
              className='h-28 w-28 rounded-full border-4 border-neutral-200 object-cover'
            />

            <div className='flex-1'>
              <h1 className='text-4xl font-bold'>{session.user.name ?? 'Unknown User'}</h1>

              <p className='mt-2 text-lg text-neutral-600'>{session.user.email}</p>

              <div className='mt-4 flex flex-wrap gap-2'>
                <span className='rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700'>
                  {session.user.emailVerified ? '✓ Email Verified' : '✗ Email Not Verified'}
                </span>

                <span className='rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700'>
                  Better Auth
                </span>
              </div>
            </div>

            <div className='flex gap-3'>
              <button
                onClick={() => refetch()}
                className='rounded-xl border px-4 py-2 transition hover:bg-neutral-100 cursor-pointer'
              >
                {isRefetching ? 'Refreshing' : 'Refresh'}
              </button>

              <button
                onClick={signOut}
                className='rounded-xl bg-black px-5 py-2 text-white transition hover:bg-neutral-800 cursor-pointer'
              >
                Sign Out
              </button>
            </div>
          </div>
        </header>

        <div className='grid gap-6 lg:grid-cols-2'>
          <Section title='User Information'>
            <Row
              label='User ID'
              value={session.user.id}
            />
            <Row
              label='Name'
              value={session.user.name}
            />
            <Row
              label='Email'
              value={session.user.email}
            />
            <Row
              label='Email Verified'
              value={String(session.user.emailVerified)}
            />
            <Row
              label='Image'
              value={session.user.image}
            />
            <Row
              label='Created At'
              value={session.user.createdAt?.toString()}
            />
            <Row
              label='Updated At'
              value={session.user.updatedAt?.toString()}
            />
          </Section>

          <Section title='Session Information'>
            <Row
              label='Session ID'
              value={session.session.id}
            />
            <Row
              label='User ID'
              value={session.session.userId}
            />
            <Row
              label='Created At'
              value={session.session.createdAt?.toString()}
            />
            <Row
              label='Updated At'
              value={session.session.updatedAt?.toString()}
            />
            <Row
              label='Expires At'
              value={session.session.expiresAt?.toString()}
            />
            <Row
              label='IP Address'
              value={session.session.ipAddress}
            />
            <Row
              label='User Agent'
              value={session.session.userAgent}
            />
          </Section>
        </div>

        <Section title='Raw Session JSON'>
          <pre className='overflow-x-auto rounded-xl bg-neutral-950 p-5 text-sm text-red-500'>
            {JSON.stringify(session, null, 2)}
          </pre>
        </Section>

        {error && (
          <div className='rounded-xl border border-red-300 bg-red-50 p-4 text-red-600'>
            {error.message}
          </div>
        )}
      </div>
    </main>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className='flex items-center justify-between border-b border-neutral-200 py-3 last:border-none'>
      <span className='font-medium text-neutral-600'>{label}</span>
      <span className='max-w-sm truncate text-right text-neutral-900'>{value ?? '-'}</span>
    </div>
  );
}

function Section({ title, children }: React.PropsWithChildren<{ title: string }>) {
  return (
    <section className='rounded-2xl bg-white p-6 shadow-sm'>
      <h2 className='mb-5 text-xl font-semibold'>{title}</h2>
      {children}
    </section>
  );
}
