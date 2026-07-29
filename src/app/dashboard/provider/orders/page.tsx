import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProviderOrdersPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold text-pine">Incoming orders</h1>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Coming in the next phase</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Orders table with Confirm / Mark Picked Up / Mark Returned actions.
        </CardContent>
      </Card>
    </div>
  );
}
