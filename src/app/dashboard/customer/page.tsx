import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CustomerDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-pine">
          Your rentals
        </h1>
        <p className="text-sm text-muted-foreground">
          Order history, payment status, and reviews will live here.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Coming in the next phase</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Rental order list with status badges, payment history, and the
          review form for returned gear.
        </CardContent>
      </Card>
    </div>
  );
}
