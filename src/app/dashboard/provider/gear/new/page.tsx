import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewGearPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold text-pine">Add gear</h1>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Coming in the next phase</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Gear creation form — name, category, price/day, stock, images.
        </CardContent>
      </Card>
    </div>
  );
}
