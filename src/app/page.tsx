
import { redirect } from 'next/navigation';

export default function RootPage() {
  // Redirect to the main venues page by default
  redirect('/venues');
}
