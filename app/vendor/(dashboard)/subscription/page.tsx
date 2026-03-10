'use client';

import { useAuth } from '@/context/AuthContext';
import { formatCurrency, formatDate } from '@/lib/utils';

export default function SubscriptionPage() {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Subscription</h1>

      <div className="bg-white p-6 rounded-xl shadow-sm border w-96">
        <p>
          <strong>Plan:</strong> {user?.subscription?.name} <small><i>({user?.subscription?.durationDays} days)</i></small>
        </p>
        <p>
          <strong>Price:</strong> {formatCurrency(user?.subscription?.price)}
        </p>
        <p>
          <strong>Valid Till:</strong> {formatDate(user.subscriptionEndsAt)}
        </p>
      </div>
    </div>
  );
}
