import { prisma } from "@/lib/prisma";
import SettingsForm from "@/components/admin/SettingsForm";

export default async function SettingsPage() {
  const settings = await prisma.siteSettings.findUnique({ where: { id: 1 } });

  if (!settings) {
    return (
      <div className="max-w-3xl">
        <h1 className="font-display text-3xl font-medium text-ink">Site Settings</h1>
        <p className="mt-4 border border-stone bg-red-50 p-4 text-sm text-red-800">
          Couldn&apos;t load site settings from the database right now. Try refreshing
          in a moment.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-3xl font-medium text-ink">Site Settings</h1>
      <p className="mt-2 text-ink-muted">
        Business info, hero, about section, hours and stats — everything shown across
        the public site.
      </p>
      <div className="mt-10">
        <SettingsForm settings={settings} />
      </div>
    </div>
  );
}
