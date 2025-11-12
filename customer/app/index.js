// This will be the main entry point - redirecting to splash screen
import { Redirect } from 'expo-router';

export default function Index() {
  return <Redirect href="/splash" />;
}