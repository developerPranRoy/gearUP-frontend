import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function BrowseGearPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="font-display text-3xl font-semibold text-pine">Browse gear</h1>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base">Coming in the next phase</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Gear grid with search, category/price/brand filters, and pagination —
          fetched server-side from <code>GET /api/gear</code>.
        </CardContent>
      </Card>
    </div>
  );
}
