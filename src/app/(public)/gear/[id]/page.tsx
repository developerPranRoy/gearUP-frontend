import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function GearDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="font-display text-3xl font-semibold text-pine">Gear details</h1>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base">Coming in the next phase</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Image gallery, specs, provider info, and date-picker &quot;Rent Now&quot;
          flow for gear <code>{id}</code>.
        </CardContent>
      </Card>
    </div>
  );
}
