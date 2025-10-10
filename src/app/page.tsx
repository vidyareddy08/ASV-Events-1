import { redirect } from 'next/navigation';

export default function RootPage() {
  // The login page must be the initial view.
  // Access to all other pages is protected by the (app) layout.
  // This redirect ensures that users always start at the login page.
  redirect('/login');
}
