import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProviderDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-pine">
          Provider overview
        </h1>
        <p className="text-sm text-muted-foreground">
          Inventory stats and incoming orders will live here.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Coming in the next phase</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Total gear listed, active rentals, and pending orders at a glance.
        </CardContent>
      </Card>
    </div>
  );
}
