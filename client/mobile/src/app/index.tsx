import { authClient, useSession } from '../lib/auth-client';

import { Avatar, Button, Card, Separator, Spinner } from 'heroui-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, Text, View } from 'react-native';

import { type JSX } from 'react';

function Row({ label, value }: { label: string; value?: string | null }) {
  return (
    <View className="flex-row justify-between py-3">
      <Text className="text-default-500">{label}</Text>
      <Text className="max-w-[60%] text-right font-medium">{value || '-'}</Text>
    </View>
  );
}

export default function HomeScreen(): JSX.Element {
  const { data: session, isPending, error, refetch, isRefetching } = useSession();

  async function signInWithGoogle() {
    await authClient.signIn.social({
      provider: 'google',
      callbackURL: process.env.EXPO_PUBLIC_BETTER_AUTH_CALLBACK_URL,
    });
  }

  async function signOut() {
    await authClient.signOut();
  }

  if (isPending) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Spinner size="lg" />
      </SafeAreaView>
    );
  }

  if (!session) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button variant="primary" size="md" onPress={signInWithGoogle}>
          Continue with Google
        </Button>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          padding: 20,
          paddingBottom: 40,
        }}
      >
        <View className="items-center">
          <Avatar>
            <Avatar.Image source={{ uri: session.user.image ?? undefined }} />
          </Avatar>
          <Text className="mt-4 text-3xl font-bold">{session.user.name}</Text>
          <Text className="text-default-500 mt-1">{session.user.email}</Text>
          <View className="mt-3 flex-row gap-2">
            <View
              className={`rounded-full px-3 py-1 ${session.user.emailVerified ? 'bg-success/10' : 'bg-danger/10'}`}
            >
              <Text
                className={`text-xs font-semibold ${session.user.emailVerified ? 'text-success' : 'text-danger'}`}
              >
                {session.user.emailVerified ? '✓ VERIFIED' : '✗ UNVERIFIED'}
              </Text>
            </View>
            <View className="rounded-full bg-blue-100 px-3 py-1">
              <Text className="text-xs font-semibold text-blue-700">Better Auth</Text>
            </View>
          </View>
        </View>

        <Card className="mt-8 bg-white">
          <Card.Body>
            <Text className="mb-2 text-lg font-semibold">User</Text>
            <Separator />

            <Row label="ID" value={session.user.id} />
            <Separator />

            <Row label="Name" value={session.user.name} />
            <Separator />

            <Row label="Email" value={session.user.email} />
            <Separator />

            <Row label="Email Verified" value={String(session.user.emailVerified)} />
            <Separator />

            <Row label="Image" value={String(session.user.image)} />
            <Separator />

            <Row label="Created At" value={new Date(session.user.createdAt).toLocaleString()} />
            <Separator />

            <Row label="Updated At" value={new Date(session.user.updatedAt).toLocaleString()} />
          </Card.Body>
        </Card>

        <Card className="mt-5 bg-white">
          <Card.Body>
            <Text className="mb-2 text-lg font-semibold">Session</Text>
            <Separator />

            <Row label="ID" value={session.session.id} />
            <Separator />

            <Row label="User ID" value={session.session.userId} />
            <Separator />

            <Row label="Created At" value={new Date(session.session.createdAt).toLocaleString()} />
            <Separator />

            <Row label="Updated At" value={new Date(session.session.updatedAt).toLocaleString()} />
            <Separator />

            <Row label="Expires At" value={new Date(session.session.expiresAt).toLocaleString()} />
            <Separator />

            <Row label="Token" value={session.session.token} />
            <Separator />

            <Row label="IP Address" value={session.session.ipAddress} />
            <Separator />

            <Row label="User Agent" value={session.session.userAgent} />
          </Card.Body>
        </Card>

        {error && <Text className="text-danger mt-5 text-center">{error.message}</Text>}

        <Button
          className="mt-8"
          variant="primary"
          isDisabled={isRefetching}
          onPress={() => refetch()}
        >
          Refresh Session
        </Button>

        <Button className="mt-3" variant="danger" onPress={signOut}>
          Sign Out
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}
