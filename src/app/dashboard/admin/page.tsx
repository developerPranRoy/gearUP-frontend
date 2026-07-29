import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-pine">
          Platform overview
        </h1>
        <p className="text-sm text-muted-foreground">
          Users, gear listings, and rentals moderation will live here.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Coming in the next phase</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          User management table with suspend/activate actions, plus gear and
          rental oversight views.
        </CardContent>
      </Card>
    </div>
  );
}
